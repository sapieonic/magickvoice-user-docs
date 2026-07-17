# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev       # Vite dev server on http://localhost:5180 (host 0.0.0.0)
npm run validate  # check content/**/*.md invariants (runs first in build)
npm run build     # validate → tsc -b (type-check) → vite build → prerender → dist/
npm run preview   # serve the production build on http://localhost:5181
```

There is no test runner, linter, or formatter configured. `npm run build` is the correctness gate: it runs `scripts/validate-content.mjs`, then `tsc -b` in strict mode, then bundles, then runs `scripts/prerender.ts` (via `tsx`). A content-invariant violation or a type error fails the build.

### Prerendering for crawlers and LLMs

The app is client-rendered, so a raw fetch of any URL would otherwise return an empty `#root` shell — invisible to LLM web-fetch tools and non-JS crawlers. After `vite build`, `scripts/prerender.ts` reuses the same `content-core` pipeline to write static, content-bearing artifacts into `dist/`: per-route HTML (`dist/docs/<slug>/index.html`) with the page text baked into a `#prerender-fallback` sibling of `#root`, plus `dist/docs/<slug>.md`, `llms.txt`, `llms-full.txt`, `sitemap.xml`, and `robots.txt`. On load, `main.tsx` mounts the SPA into the empty `#root` and removes the fallback, so human visitors are unaffected. Set `SITE_URL` (see `.env.example`) so canonical URLs and the exports point at the deployed origin.

## Architecture

This is a standalone Vite + React 18 + TypeScript single-page app that renders **end-user documentation for the MagickVoice product**. It is content-only: it has no backend and imports nothing from the main MagickVoice app.

**Content is separated from code.** Each page is a Markdown file under `content/<section-folder>/<slug>.md`; the app source only loads, transforms, and renders it.

Source files under `src/`:

- **`sections.ts`** — the single source of truth for sections: an ordered `sectionConfig` array of `{ folder, name, icon, guidance }`. `SectionId`, the `sections` order, `sectionByFolder`/`sectionByName` maps, and `sectionIcons` are all derived from it. Adding a section = adding one entry here + a matching `content/<folder>/` directory. Nothing else needs updating.
- **`content-core.ts`** — the pure, framework-free content pipeline: splits YAML frontmatter (`js-yaml`) from the Markdown body, parses the body into workflows/release notes, and transforms seeds into `DocPage`s (`buildSeeds`, `parseChangelog`, `buildDocs`, and the content model types). It has no Vite (`import.meta.glob`) or DOM dependency, so both the app and the build-time prerender script share one source of truth.
- **`content.ts`** — the Vite entry point: loads `content/**/*.md` via `import.meta.glob` (eager, raw) and hands the raw Markdown to `content-core`. Exports `pageSeeds` and `releaseNotes`.
- **`docs.ts`** — thin public API over `content-core`: `docs` (from `buildDocs`) and `getDocById()` are what the UI consumes.
- **`markdown.tsx`** — `InlineMarkdown`, a thin `marked.parseInline` wrapper for rendering trusted first-party inline Markdown (bold, links, code) in workflow goals/steps.
- **`App.tsx`** — the whole UI (header, sidebar, article, search) as function components in one file.
- **`main.tsx`** — React root mount.
- **`styles.css`** — all styling, driven by `data-theme` and `data-accent` attributes on `<html>`.

### Content model — the most important thing to understand

A page's `.md` file has YAML frontmatter (metadata) plus a Markdown body (workflows). `content.ts` parses it into a `PageSeed`, and `toDoc()` (in `docs.ts`) derives the exported `DocPage`. Understand this before editing content:

- **`slug`/`id`** is the filename (e.g. `content/voice/new-call.md` → `new-call`). It drives the `/docs/:slug` URL *and* the default asset filenames (`/assets/screenshots/<slug>.png`, `/assets/animations/<slug>.webm`). Renaming the file changes the URL and expected asset paths.
- **`section`** comes from the containing folder (`content/voice/` → `Voice`), matched against `sectionConfig[].folder`. It is *not* in frontmatter.
- **Frontmatter** carries `title`, `appPath`, `audience`, `summary`, `primaryActions`, and optional `capability`, `tips`, `screenshots`, `compactScreenshot`, `animation`, `order`. Required: `title`, `appPath`, `audience`, `summary`, `primaryActions`.
- **Body → workflows**: each `## Heading` is a workflow title; the paragraph after it is the `goal`; each `1.`-numbered item is a step. A file with no `##` blocks gets a generated `overviewWorkflow()` instead. Goals and steps may use inline Markdown (bold UI labels, links, `code`).
- **`tips`** are the per-section defaults from `sectionConfig[].guidance.tips` concatenated with any page-specific `tips`.
- **`related`** is computed automatically — the first 4 other pages in the same section. Do not author it.
- **`order`** sets within-section sidebar order; pages are sorted by section order then `order`.
- Adding a page = adding a `content/<folder>/<slug>.md` file. Run `npm run validate` to check invariants.

### Routing & search (`App.tsx`)

- Routing is hand-rolled with the History API — no router library. `getInitialDocId()` parses `/docs/:slug` from `window.location.pathname`, `setDocPath()` calls `pushState`, and a `popstate` listener syncs back/forward. **Production hosting must have an SPA fallback to `index.html`** or deep links break.
- Search is fully client-side: `scoreDoc()` ranks pages with weighted term matching (title > appPath > section > actions > full text), requiring all terms to match. Entering a query swaps the article view for `SearchResults`.
- Theme (`dark`/`light`) and accent (`signal`/`mint`/`copper`) persist to `localStorage` and are applied as `data-*` attributes on the document element.

### Assets (`public/assets/`)

Screenshots go in `screenshots/`, short clips in `animations/`, named by page slug. The app expects these predictable paths and renders a "coming soon" placeholder via `onError` when a file is missing — so a missing asset is a non-blocking, expected state, not a bug.

### Product link

`VITE_MAGICKVOICE_APP_URL` (see `.env.example`) is the base URL of the live app. When set, the right rail shows an "Open in MagickVoice" link built from `appPath` — but only for pages whose `appPath` has no `:` route parameter (a specific record ID would be required).
