import * as yaml from 'js-yaml';
import { sectionByFolder, sectionByName, type SectionId } from './sections';

// The pure content pipeline: parsing raw Markdown into `PageSeed[]` and transforming
// those into `DocPage[]`. This module has NO Vite-specific code (no `import.meta.glob`)
// and NO DOM/browser dependencies, so it can run in three places from one source of
// truth: the app (`content.ts`/`docs.ts`) and the build-time prerender script
// (`scripts/prerender.ts`).

export interface Workflow {
  title: string;
  goal: string;
  steps: string[];
}

export interface VisualReference {
  src: string;
  alt: string;
  label?: string;
}

/** A single dated release entry on the home page's "What's new" list. */
export interface ReleaseNote {
  /** Raw heading text, e.g. `2026-07-13 — Weekly release`. */
  heading: string;
  /** The leading date token, when the heading starts with one. */
  date: string;
  /** The remainder of the heading after the date/separator. */
  title: string;
  /** `- ` bullet items describing the changes (inline Markdown allowed). */
  items: string[];
}

/**
 * A page authored as `content/<folder>/<slug>.md`. Frontmatter carries the scalar and
 * array metadata; the Markdown body carries workflows as `## ` blocks. `slug` and
 * `section` are derived from the file path, not authored in frontmatter.
 */
export interface PageSeed {
  slug: string;
  section: SectionId;
  title: string;
  path: string;
  audience: string;
  summary: string;
  capability?: string;
  primaryActions: string[];
  workflows: Workflow[];
  tips: string[];
  screenshots?: VisualReference[];
  compactScreenshot?: boolean;
  stackedScreenshots?: boolean;
  animation?: boolean;
  order: number;
}

interface Frontmatter {
  title?: string;
  appPath?: string;
  audience?: string;
  summary?: string;
  capability?: string | null;
  primaryActions?: string[];
  tips?: string[];
  screenshots?: VisualReference[];
  compactScreenshot?: boolean;
  stackedScreenshots?: boolean;
  animation?: boolean;
  order?: number;
}

/** The public content model the UI consumes, derived from a `PageSeed`. */
export interface DocPage {
  id: string;
  title: string;
  section: SectionId;
  appPath: string;
  audience: string;
  summary: string;
  capability?: string;
  primaryActions: string[];
  workflows: Workflow[];
  tips: string[];
  asset: {
    screenshot: string;
    screenshots?: VisualReference[];
    compact?: boolean;
    stacked?: boolean;
    animation?: string;
  };
  related: string[];
}

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;

/** Glob-style key of the root-level changelog file (not a section page). */
export const CHANGELOG_PATH = '../content/whats-new.md';

function splitFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) {
    throw new Error('Content file is missing a `---` frontmatter block');
  }
  const data = (yaml.load(match[1]) ?? {}) as Frontmatter;
  return { data, body: match[2] };
}

/**
 * Parse the Markdown body into workflows. Each `## Heading` starts a workflow: the
 * first non-empty paragraph is the goal, and each ordered-list item (`1. `) is a step.
 * A body with no `## ` headings yields an empty array, so the doc pipeline falls back
 * to a generated overview workflow.
 */
function parseWorkflows(body: string): Workflow[] {
  const lines = body.split('\n');
  const workflows: Workflow[] = [];
  let current: { title: string; goalLines: string[]; steps: string[] } | null = null;

  const flush = () => {
    if (!current) return;
    workflows.push({
      title: current.title.trim(),
      goal: current.goalLines.join(' ').trim(),
      steps: current.steps,
    });
    current = null;
  };

  for (const line of lines) {
    const heading = line.match(/^##\s+(.*)$/);
    if (heading) {
      flush();
      current = { title: heading[1], goalLines: [], steps: [] };
      continue;
    }
    if (!current) continue;

    const step = line.match(/^\d+\.\s+(.*)$/);
    if (step) {
      current.steps.push(step[1].trim());
      continue;
    }
    // Non-empty, non-step lines before the first step form the goal paragraph.
    if (line.trim() && current.steps.length === 0) {
      current.goalLines.push(line.trim());
    }
  }
  flush();

  return workflows;
}

/** Path looks like `../content/<folder>/<slug>.md`. */
function parsePath(path: string): { folder: string; slug: string } {
  const parts = path.split('/');
  const file = parts[parts.length - 1];
  const folder = parts[parts.length - 2];
  const slug = file.replace(/\.md$/, '');
  return { folder, slug };
}

/**
 * Turn a map of `{ globKey: rawMarkdown }` into ordered `PageSeed[]`. The key format
 * matches Vite's `import.meta.glob('../content/**\/*.md')` (e.g. `../content/voice/x.md`);
 * the prerender script rebuilds the same keys from the filesystem. The changelog file is
 * skipped here and parsed separately via `parseChangelog`.
 */
export function buildSeeds(modules: Record<string, string>): PageSeed[] {
  const seeds: PageSeed[] = [];

  for (const [path, raw] of Object.entries(modules)) {
    if (path === CHANGELOG_PATH) continue;
    const { folder, slug } = parsePath(path);
    const section = sectionByFolder.get(folder);
    if (!section) {
      throw new Error(`content/${folder}/ has no matching section in sections.ts`);
    }

    const { data, body } = splitFrontmatter(raw);
    if (!data.title || !data.appPath || !data.audience || !data.summary || !data.primaryActions) {
      throw new Error(`content/${folder}/${slug}.md is missing required frontmatter`);
    }

    seeds.push({
      slug,
      section: section.name,
      title: data.title,
      path: data.appPath,
      audience: data.audience,
      summary: data.summary,
      capability: data.capability ?? undefined,
      primaryActions: data.primaryActions,
      workflows: parseWorkflows(body),
      tips: data.tips ?? [],
      screenshots: data.screenshots,
      compactScreenshot: data.compactScreenshot,
      stackedScreenshots: data.stackedScreenshots,
      animation: data.animation,
      order: data.order ?? Number.MAX_SAFE_INTEGER,
    });
  }

  // Order pages by section (sidebar order) then by their authored `order`.
  const sectionOrder = new Map(
    [...sectionByFolder.values()].map((section, index) => [section.name, index]),
  );
  seeds.sort((a, b) => {
    const sectionDelta = (sectionOrder.get(a.section) ?? 0) - (sectionOrder.get(b.section) ?? 0);
    if (sectionDelta !== 0) return sectionDelta;
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

  return seeds;
}

/**
 * Parse the changelog body into release notes. Each `## Heading` starts a release; the
 * `- ` bullet lines beneath it are its items. When the heading begins with an ISO date
 * (`YYYY-MM-DD`) followed by a separator, the date is split off and the rest becomes the
 * title; otherwise the whole heading is the title and `date` is empty. Entries keep
 * authored order (newest-first), so no sorting is applied here.
 */
export function parseChangelog(raw: string): ReleaseNote[] {
  const lines = raw.split('\n');
  const notes: ReleaseNote[] = [];
  let current: ReleaseNote | null = null;

  for (const line of lines) {
    const heading = line.match(/^##\s+(.*)$/);
    if (heading) {
      const text = heading[1].trim();
      // Only a leading ISO date followed by a separator (—, –, -, or :) is treated as a
      // date. Anything else (e.g. `Real-time updates`) stays intact as the title.
      const split = text.match(/^(\d{4}-\d{2}-\d{2})\s*[—–:-]\s*(.*)$/);
      current = {
        heading: text,
        date: split ? split[1] : '',
        title: split ? split[2].trim() : text,
        items: [],
      };
      notes.push(current);
      continue;
    }
    if (!current) continue;

    const item = line.match(/^[-*]\s+(.*)$/);
    if (item) current.items.push(item[1].trim());
  }

  return notes.filter((note) => note.items.length > 0);
}

function overviewWorkflow(seed: PageSeed): Workflow {
  const guidance = sectionByName.get(seed.section)!.guidance;
  return {
    title: `Use this page to ${guidance.workflowVerb}`,
    goal: `Understand what is available on ${seed.title} and choose the right next action.`,
    steps: [
      `Open ${seed.title} from the ${seed.section} area of MagickVoice.`,
      `Read the page heading, description, and any status message before selecting an action.`,
      `Choose the common task that matches what you came to do and follow the labels shown on screen.`,
      `Review any summary, warning, or confirmation before completing an action that changes data.`,
      `After the action finishes, look for a confirmation message or updated status before leaving the page.`,
    ],
  };
}

function toDoc(seed: PageSeed): DocPage {
  const id = seed.slug;
  const guidance = sectionByName.get(seed.section)!.guidance;
  return {
    id,
    title: seed.title,
    section: seed.section,
    appPath: seed.path,
    audience: seed.audience,
    summary: seed.summary,
    capability: seed.capability,
    workflows: seed.workflows.length > 0 ? seed.workflows : [overviewWorkflow(seed)],
    primaryActions: seed.primaryActions,
    tips: [...guidance.tips, ...seed.tips],
    asset: {
      screenshot: `/assets/screenshots/${id}.png`,
      screenshots: seed.screenshots,
      compact: seed.compactScreenshot,
      stacked: seed.stackedScreenshots,
      animation: seed.animation ? `/assets/animations/${id}.webm` : undefined,
    },
    related: [],
  };
}

/** Transform ordered seeds into `DocPage[]`, computing each page's `related` list. */
export function buildDocs(seeds: PageSeed[]): DocPage[] {
  const docsWithoutRelated = seeds.map(toDoc);
  return docsWithoutRelated.map((page) => ({
    ...page,
    related: docsWithoutRelated
      .filter((candidate) => candidate.section === page.section && candidate.id !== page.id)
      .slice(0, 4)
      .map((candidate) => candidate.id),
  }));
}
