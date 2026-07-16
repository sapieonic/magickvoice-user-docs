import * as yaml from 'js-yaml';
import { sectionByFolder, type SectionId } from './sections';

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

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;

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

const modules = import.meta.glob('../content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function loadSeeds(): PageSeed[] {
  const seeds: PageSeed[] = [];

  for (const [path, raw] of Object.entries(modules)) {
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

export const pageSeeds: PageSeed[] = loadSeeds();
