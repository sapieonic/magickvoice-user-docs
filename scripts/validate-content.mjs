// Build-time invariant checks for content/**/*.md. Runs before tsc + vite build.
// Fatal errors exit non-zero and fail the build; asset gaps are warnings only,
// because the app intentionally renders a "coming soon" placeholder for missing media.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as yaml from 'js-yaml';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = join(root, 'content');
const publicDir = join(root, 'public');

// Section folders recognised by the app. Mirrors src/sections.ts.
const KNOWN_FOLDERS = new Set([
  'access',
  'overview',
  'voice',
  'phone-menus',
  'automations',
  'campaigns',
  'messaging',
  'scheduling',
  'contacts',
  'administration',
  'super-admin',
]);

const REQUIRED_FIELDS = ['title', 'appPath', 'audience', 'summary', 'primaryActions'];

const errors = [];
const warnings = [];
const slugs = new Map();

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else if (entry.endsWith('.md')) files.push(full);
  }
  return files;
}

if (!existsSync(contentDir)) {
  console.error('validate-content: content/ directory not found');
  process.exit(1);
}

// Root-level content files that are not section pages (loaded separately by the app).
const NON_PAGE_FILES = new Set(['content/whats-new.md']);

for (const file of walk(contentDir)) {
  const rel = file.slice(root.length + 1);
  if (NON_PAGE_FILES.has(rel)) continue;
  const parts = rel.split('/');
  const folder = parts[1];
  const slug = parts[parts.length - 1].replace(/\.md$/, '');

  if (!KNOWN_FOLDERS.has(folder)) {
    errors.push(`${rel}: unknown section folder "${folder}"`);
    continue;
  }

  if (slugs.has(slug)) {
    errors.push(`${rel}: duplicate slug "${slug}" (also in ${slugs.get(slug)})`);
  } else {
    slugs.set(slug, rel);
  }

  const raw = readFileSync(file, 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    errors.push(`${rel}: missing --- frontmatter block`);
    continue;
  }

  let data;
  try {
    data = yaml.load(match[1]) ?? {};
  } catch (err) {
    errors.push(`${rel}: unparseable frontmatter (${err.message})`);
    continue;
  }

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      errors.push(`${rel}: missing required frontmatter field "${field}"`);
    }
  }
  if (data.primaryActions && !Array.isArray(data.primaryActions)) {
    errors.push(`${rel}: "primaryActions" must be a list`);
  }

  // Each ## workflow heading must own at least one numbered step.
  const body = match[2];
  const blocks = body.split(/^##\s+/m).slice(1);
  for (const block of blocks) {
    const heading = block.split('\n', 1)[0].trim();
    const hasStep = /^\d+\.\s+/m.test(block);
    if (!hasStep) {
      errors.push(`${rel}: workflow "${heading}" has no numbered steps`);
    }
  }

  // Asset presence: warn only. `/assets/...` maps to public/assets/...
  const assetRefs = [];
  for (const shot of data.screenshots ?? []) {
    if (shot.src) assetRefs.push(shot.src);
  }
  if (data.animation === true) assetRefs.push(`/assets/animations/${slug}.webm`);
  for (const ref of assetRefs) {
    const assetPath = join(publicDir, ref.replace(/^\//, ''));
    if (!existsSync(assetPath)) {
      warnings.push(`${rel}: asset not found (placeholder will show): ${ref}`);
    }
  }
}

// Changelog (content/whats-new.md): not a section page, but each `## ` release must
// have at least one `- ` bullet, else parseChangelog() silently drops it at runtime.
const changelogPath = join(contentDir, 'whats-new.md');
if (existsSync(changelogPath)) {
  const raw = readFileSync(changelogPath, 'utf8');
  const blocks = raw.split(/^##\s+/m).slice(1);
  for (const block of blocks) {
    const heading = block.split('\n', 1)[0].trim();
    if (!/^[-*]\s+/m.test(block)) {
      errors.push(`content/whats-new.md: release "${heading}" has no bullet items`);
    }
  }
}

for (const warning of warnings) console.warn(`⚠️  ${warning}`);

if (errors.length) {
  console.error(`\n❌ Content validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`   ${error}`);
  process.exit(1);
}

console.log(`✅ Content validation passed: ${slugs.size} pages, ${warnings.length} asset warning(s).`);
