// Post-build prerender + machine-readable exports.
//
// The app is a client-rendered SPA: a raw fetch of any URL returns an empty
// `<div id="root">` shell, so LLM web-fetch tools and crawlers that do not execute
// JavaScript see no content. This script runs after `vite build` and, reusing the exact
// same content pipeline as the app (`src/content-core.ts`), writes static, content-bearing
// artifacts into `dist/`:
//
//   dist/index.html                     home page with landing content baked in
//   dist/docs/<slug>/index.html         each doc page prerendered at its real URL
//   dist/docs/<slug>.md                 clean Markdown version of each page
//   dist/llms.txt                       llms.txt index (https://llmstxt.org/)
//   dist/llms-full.txt                  every page concatenated as Markdown
//   dist/sitemap.xml                    all page URLs
//   dist/robots.txt                     crawler allow + sitemap pointer
//
// The prerendered HTML injects readable content INTO `#root`. When the JS bundle loads,
// `createRoot().render()` replaces those children with the live interactive app, so human
// visitors are unaffected while fetchers and crawlers get the full text.
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import {
  buildDocs,
  buildSeeds,
  parseChangelog,
  CHANGELOG_PATH,
  type DocPage,
  type ReleaseNote,
} from '../src/content-core';
import { sections } from '../src/sections';

marked.setOptions({ gfm: true, breaks: false });

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = join(root, 'content');
const distDir = join(root, 'dist');

const SITE = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://magickvoice-user-docs.vercel.app')
  .replace(/\/$/, '');
const SITE_TITLE = 'MagickVoice User Docs';
const SITE_DESCRIPTION =
  'Step-by-step end-user documentation for MagickVoice — an AI voice and messaging platform for placing calls, building phone menus, sending campaigns, and automating follow-ups.';

// --- helpers ---------------------------------------------------------------

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Inline Markdown (bold, links, code) → HTML, matching the app's `InlineMarkdown`. */
function inline(text: string): string {
  return marked.parseInline(text) as string;
}

/** Read every `content/**\/*.md` file into the `{ globKey: raw }` shape `buildSeeds` expects. */
function loadModules(): Record<string, string> {
  const modules: Record<string, string> = {};
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (entry.endsWith('.md')) {
        // Mirror Vite's glob keys (relative to src/): `../content/<folder>/<slug>.md`.
        modules[`../content/${relative(contentDir, full).split('\\').join('/')}`] = readFileSync(full, 'utf8');
      }
    }
  };
  walk(contentDir);
  return modules;
}

// --- HTML rendering --------------------------------------------------------

const PRERENDER_STYLE = `<style id="prerender-style">
.prerender-fallback{max-width:52rem;margin:0 auto;padding:2.5rem 1.25rem;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#1c1c28;background:#fff}
.prerender-fallback a{color:#5b3df5}
.prerender-fallback code{background:#f0f0f5;padding:.1em .35em;border-radius:.25em;font-size:.9em}
.prerender-fallback h1{font-size:2rem;margin:.2em 0 .3em}
.prerender-fallback h2{font-size:1.35rem;margin:1.6em 0 .4em;padding-top:.6em;border-top:1px solid #e6e6ef}
.prerender-fallback h3{font-size:1.1rem;margin:1.2em 0 .2em}
.prerender-fallback .pf-eyebrow{text-transform:uppercase;letter-spacing:.06em;font-size:.75rem;color:#6b6b7b;margin-bottom:.4em}
.prerender-fallback figure{margin:1em 0}
.prerender-fallback img{max-width:100%;height:auto;border-radius:.5rem;border:1px solid #e6e6ef}
.prerender-fallback figcaption{font-size:.85rem;color:#6b6b7b;margin-top:.4em}
</style>`;

function docStructuredData(doc: DocPage): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: doc.title,
    description: doc.summary,
    articleSection: doc.section,
    url: `${SITE}/docs/${doc.id}`,
    isPartOf: { '@type': 'WebSite', name: SITE_TITLE, url: SITE },
  };
  // Escape `<` so a value containing `</script>` can't break out of the block.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

function renderScreenshots(doc: DocPage): string {
  const shots = doc.asset.screenshots ?? [];
  if (shots.length === 0) return '';
  return shots
    .map(
      (shot) =>
        `<figure><img src="${escapeHtml(shot.src)}" alt="${escapeHtml(shot.alt)}" loading="lazy" />` +
        (shot.label ? `<figcaption>${escapeHtml(shot.label)}</figcaption>` : '') +
        `</figure>`,
    )
    .join('\n');
}

function renderDocFallback(doc: DocPage): string {
  const actions = doc.primaryActions.length
    ? `<h2>Common tasks</h2>\n<ul>${doc.primaryActions.map((a) => `<li>${escapeHtml(a)}</li>`).join('')}</ul>`
    : '';
  const workflows = doc.workflows
    .map(
      (w, i) =>
        `<section><h3>${i + 1}. ${escapeHtml(w.title)}</h3><p>${inline(w.goal)}</p>` +
        `<ol>${w.steps.map((s) => `<li>${inline(s)}</li>`).join('')}</ol></section>`,
    )
    .join('\n');
  const tips = doc.tips.length
    ? `<h2>Tips and troubleshooting</h2>\n<ul>${doc.tips.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>`
    : '';
  const related = doc.related.length
    ? `<h2>Related pages</h2>\n<ul>${doc.related
        .map((id) => {
          const r = docsById.get(id);
          return r ? `<li><a href="/docs/${r.id}">${escapeHtml(r.title)}</a></li>` : '';
        })
        .join('')}</ul>`
    : '';

  return `<main class="prerender-fallback">
<div class="pf-eyebrow">MagickVoice Help Center — ${escapeHtml(doc.section)}</div>
<h1>${escapeHtml(doc.title)}</h1>
<p>${escapeHtml(doc.summary)}</p>
<p><strong>Audience:</strong> ${escapeHtml(doc.audience)} · <strong>Page address:</strong> <code>${escapeHtml(doc.appPath)}</code>${
    doc.capability ? ' · Your admin may need to enable this feature' : ''
  }</p>
${renderScreenshots(doc)}
${actions}
<h2>How to use this page</h2>
${workflows}
${tips}
${related}
<p><a href="/">Back to the MagickVoice Help Center home</a></p>
</main>`;
}

function renderHomeFallback(releaseNotes: ReleaseNote[]): string {
  const whatsNew = releaseNotes.length
    ? `<h2>What's new</h2>\n${releaseNotes
        .map(
          (n) =>
            `<section><h3>${n.date ? `${escapeHtml(n.date)} — ` : ''}${escapeHtml(n.title)}</h3>` +
            `<ul>${n.items.map((i) => `<li>${inline(i)}</li>`).join('')}</ul></section>`,
        )
        .join('\n')}`
    : '';
  const bySection = sections
    .map((section) => {
      const pages = docs.filter((d) => d.section === section);
      if (pages.length === 0) return '';
      return (
        `<section><h3>${escapeHtml(section)}</h3><ul>` +
        pages.map((d) => `<li><a href="/docs/${d.id}">${escapeHtml(d.title)}</a> — ${escapeHtml(d.summary)}</li>`).join('') +
        `</ul></section>`
      );
    })
    .join('\n');

  return `<main class="prerender-fallback">
<div class="pf-eyebrow">MagickVoice Help Center</div>
<h1>Learn how to run voice, messaging, and campaigns with MagickVoice</h1>
<p>${escapeHtml(SITE_DESCRIPTION)}</p>
<p>Machine-readable exports: <a href="/llms.txt">/llms.txt</a> · <a href="/llms-full.txt">/llms-full.txt</a>. Every page also has a Markdown version at <code>/docs/&lt;slug&gt;.md</code>.</p>
${whatsNew}
<h2>Explore by area</h2>
${bySection}
</main>`;
}

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  extraHead: string;
  bodyHtml: string;
}

function renderHtml(template: string, meta: PageMeta): string {
  const fullTitle = meta.title === SITE_TITLE ? SITE_TITLE : `${meta.title} — ${SITE_TITLE}`;
  const ogTags = [
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_TITLE)}" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`,
    `<meta name="twitter:card" content="summary" />`,
  ].join('\n    ');

  let html = template;
  // Each anchor MUST exist. A silent no-op here would ship a degraded page (stale
  // description, or — for the root div — no content at all) while the build still
  // reports success, so fail loudly if Vite's output format ever drifts.
  html = mustReplace(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`, '<title>');
  html = mustReplace(
    html,
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    'description meta',
  );
  html = mustReplace(html, '</head>', `    ${ogTags}\n    ${PRERENDER_STYLE}\n    ${meta.extraHead}\n  </head>`, '</head>');
  // Keep #root empty (so the SPA mounts cleanly with no hydration warning) and place the
  // static content in a sibling that main.tsx removes once React has mounted.
  html = mustReplace(
    html,
    '<div id="root"></div>',
    `<div id="root"></div>\n    <div id="prerender-fallback">${meta.bodyHtml}</div>`,
    '#root element',
  );
  return html;
}

/** Replace the first match of `anchor`, throwing if it is not present in `source`. */
function mustReplace(source: string, anchor: string | RegExp, replacement: string, label: string): string {
  const found = typeof anchor === 'string' ? source.includes(anchor) : anchor.test(source);
  if (!found) {
    throw new Error(
      `prerender: expected anchor "${label}" not found in the built HTML. ` +
        `Vite's output format may have changed — update scripts/prerender.ts.`,
    );
  }
  return source.replace(anchor, replacement);
}

// --- Markdown rendering ----------------------------------------------------

function docToMarkdown(doc: DocPage): string {
  const lines: string[] = [];
  lines.push(`# ${doc.title}`, '');
  lines.push(`> ${doc.summary}`, '');
  lines.push(`- **Section:** ${doc.section}`);
  lines.push(`- **Audience:** ${doc.audience}`);
  lines.push(`- **Page address:** \`${doc.appPath}\``);
  if (doc.capability) lines.push(`- **Access:** Your admin may need to enable this feature`);
  lines.push('');
  if (doc.primaryActions.length) {
    lines.push('## Common tasks', '');
    for (const action of doc.primaryActions) lines.push(`- ${action}`);
    lines.push('');
  }
  lines.push('## How to use this page', '');
  doc.workflows.forEach((w, i) => {
    lines.push(`### ${i + 1}. ${w.title}`, '');
    if (w.goal) lines.push(w.goal, '');
    w.steps.forEach((step, si) => lines.push(`${si + 1}. ${step}`));
    lines.push('');
  });
  if (doc.tips.length) {
    lines.push('## Tips and troubleshooting', '');
    for (const tip of doc.tips) lines.push(`- ${tip}`);
    lines.push('');
  }
  if (doc.related.length) {
    lines.push('## Related pages', '');
    for (const id of doc.related) {
      const r = docsById.get(id);
      if (r) lines.push(`- [${r.title}](${SITE}/docs/${r.id})`);
    }
    lines.push('');
  }
  return lines.join('\n').trim() + '\n';
}

function buildLlmsTxt(): string {
  const lines: string[] = [];
  lines.push(`# ${SITE_TITLE}`, '');
  lines.push(`> ${SITE_DESCRIPTION}`, '');
  lines.push(
    'This file follows the llms.txt convention (https://llmstxt.org/). The full text of every page ' +
      `is at ${SITE}/llms-full.txt, and each page has a Markdown version at ${SITE}/docs/<slug>.md.`,
    '',
  );
  for (const section of sections) {
    const pages = docs.filter((d) => d.section === section);
    if (pages.length === 0) continue;
    lines.push(`## ${section}`, '');
    for (const doc of pages) {
      lines.push(`- [${doc.title}](${SITE}/docs/${doc.id}.md): ${doc.summary}`);
    }
    lines.push('');
  }
  return lines.join('\n').trim() + '\n';
}

function buildLlmsFullTxt(): string {
  const header = `# ${SITE_TITLE}\n\n> ${SITE_DESCRIPTION}\n\nFull text of every documentation page, generated from source.\n`;
  return header + '\n---\n\n' + docs.map(docToMarkdown).join('\n---\n\n');
}

function buildSitemap(): string {
  const urls = [SITE + '/', ...docs.map((d) => `${SITE}/docs/${d.id}`)];
  const entries = urls
    .map((u) => `  <url><loc>${escapeHtml(u)}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function buildRobots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
}

function writeFile(relPath: string, contents: string): void {
  const full = join(distDir, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, contents);
}

// --- run -------------------------------------------------------------------

const templatePath = join(distDir, 'index.html');
if (!existsSync(templatePath)) {
  console.error('prerender: dist/index.html not found — run `vite build` first.');
  process.exit(1);
}
const template = readFileSync(templatePath, 'utf8');
if (template.includes('id="prerender-fallback"')) {
  console.error(
    'prerender: dist/index.html is already prerendered. Run a fresh `vite build` first ' +
      '(it empties dist/) — running this script twice would double-inject.',
  );
  process.exit(1);
}

const modules = loadModules();
const seeds = buildSeeds(modules);
const docs = buildDocs(seeds);
const docsById = new Map(docs.map((d) => [d.id, d]));
const releaseNotes = parseChangelog(modules[CHANGELOG_PATH] ?? '');

// Per-doc: prerendered HTML at its real URL + a Markdown twin.
for (const doc of docs) {
  writeFile(
    `docs/${doc.id}/index.html`,
    renderHtml(template, {
      title: doc.title,
      description: doc.summary,
      canonical: `${SITE}/docs/${doc.id}`,
      extraHead: docStructuredData(doc),
      bodyHtml: renderDocFallback(doc),
    }),
  );
  writeFile(`docs/${doc.id}.md`, docToMarkdown(doc));
}

// Home page: bake landing content into the existing dist/index.html.
writeFile(
  'index.html',
  renderHtml(template, {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    canonical: `${SITE}/`,
    extraHead: '',
    bodyHtml: renderHomeFallback(releaseNotes),
  }),
);

// Machine-readable exports.
writeFile('llms.txt', buildLlmsTxt());
writeFile('llms-full.txt', buildLlmsFullTxt());
writeFile('sitemap.xml', buildSitemap());
writeFile('robots.txt', buildRobots());

console.log(
  `✅ prerender: ${docs.length} doc pages + home, ${docs.length} .md files, ` +
    `llms.txt, llms-full.txt, sitemap.xml, robots.txt written to dist/.`,
);
