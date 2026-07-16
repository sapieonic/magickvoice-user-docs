# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev      # Vite dev server on http://localhost:5180 (host 0.0.0.0)
npm run build    # tsc -b (type-check) then vite build → dist/
npm run preview  # serve the production build on http://localhost:5181
```

There is no test runner, linter, or formatter configured. `npm run build` is the only correctness gate — it runs `tsc -b` in strict mode before bundling, so a type error fails the build.

## Architecture

This is a standalone Vite + React 18 + TypeScript single-page app that renders **end-user documentation for the MagickVoice product**. It is content-only: it has no backend and imports nothing from the main MagickVoice app.

The entire app is four source files under `src/`:

- **`docs.ts`** — the content model and the single source of truth for every page. Nothing here is fetched at runtime; all documentation lives as data in this file.
- **`App.tsx`** — the whole UI (header, sidebar, article, search) as function components in one file.
- **`main.tsx`** — React root mount.
- **`styles.css`** — all styling, driven by `data-theme` and `data-accent` attributes on `<html>`.

### Content model (`docs.ts`) — the most important thing to understand

Pages are authored as a `PageSeed[]` array (`pages`), then transformed into the exported `DocPage[]` (`docs`) by `toDoc()`. Understand this transform before editing content:

- **`id`/slug** is derived from the page `title` via `slugify()` — it is not authored directly. The slug drives the `/docs/:slug` URL *and* the default asset filenames (`/assets/screenshots/<id>.png`, `/assets/animations/<id>.webm`). Renaming a title changes the URL and expected asset paths.
- **`workflows`** default to a generated `overviewWorkflow()` when a seed omits them.
- **`tips`** are the per-section defaults from `sectionGuidance[section].tips` concatenated with any seed-specific `tips`.
- **`related`** is computed automatically — the first 4 other pages in the same `section`. Do not author it.
- Adding a page = appending a `PageSeed` to `pages`. Adding a new category = extending the `SectionId` union, the `sectionGuidance` map, the `sections` export order, and the `sectionIcons` map in `App.tsx` (all must stay in sync).

### Routing & search (`App.tsx`)

- Routing is hand-rolled with the History API — no router library. `getInitialDocId()` parses `/docs/:slug` from `window.location.pathname`, `setDocPath()` calls `pushState`, and a `popstate` listener syncs back/forward. **Production hosting must have an SPA fallback to `index.html`** or deep links break.
- Search is fully client-side: `scoreDoc()` ranks pages with weighted term matching (title > appPath > section > actions > full text), requiring all terms to match. Entering a query swaps the article view for `SearchResults`.
- Theme (`dark`/`light`) and accent (`signal`/`mint`/`copper`) persist to `localStorage` and are applied as `data-*` attributes on the document element.

### Assets (`public/assets/`)

Screenshots go in `screenshots/`, short clips in `animations/`, named by page slug. The app expects these predictable paths and renders a "coming soon" placeholder via `onError` when a file is missing — so a missing asset is a non-blocking, expected state, not a bug.

### Product link

`VITE_MAGICKVOICE_APP_URL` (see `.env.example`) is the base URL of the live app. When set, the right rail shows an "Open in MagickVoice" link built from `appPath` — but only for pages whose `appPath` has no `:` route parameter (a specific record ID would be required).
