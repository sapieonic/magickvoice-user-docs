import { buildSeeds, parseChangelog, CHANGELOG_PATH, type PageSeed, type ReleaseNote } from './content-core';

export type { Workflow, VisualReference, ReleaseNote, PageSeed, DocPage } from './content-core';

// Vite-specific entry point: load every content file at build time and hand the raw
// Markdown to the pure pipeline in `content-core.ts`. Keeping the glob isolated here lets
// the build-time prerender script reuse the same parsing without a browser/Vite runtime.
const modules = import.meta.glob('../content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export const pageSeeds: PageSeed[] = buildSeeds(modules);

export const releaseNotes: ReleaseNote[] = parseChangelog(modules[CHANGELOG_PATH] ?? '');
