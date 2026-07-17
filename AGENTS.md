# Repository Guidelines

## Project Structure & Module Organization

This is a standalone Vite + React 18 + TypeScript app for MagickVoice end-user documentation.

- `content/<section-folder>/<slug>.md` files are the content source of truth. Each page is Markdown with YAML frontmatter (metadata) plus a body of `##` workflow blocks. The folder determines the section.
- `src/content-core.ts` holds the pure (no Vite/DOM) parse + transform pipeline; `src/content.ts` loads the Markdown via `import.meta.glob`; `src/docs.ts` exposes the transformed `DocPage[]`. `scripts/prerender.ts` reuses `content-core` after `vite build` to emit static per-route HTML plus `llms.txt`, `llms-full.txt`, `sitemap.xml`, and per-page `.md` for crawlers and LLM web-fetch tools.
- `src/sections.ts` is the single source for section order, names, folders, icons, and guidance.
- `src/App.tsx` contains UI, routing, search, and theme; `src/markdown.tsx` renders inline Markdown in workflow steps.
- `src/main.tsx` mounts the React app.
- `src/styles.css` contains application styling.
- `public/assets/` stores documentation media. Use `public/assets/screenshots/` for screenshots and `public/assets/animations/` for short GIF/WebM clips.
- `scripts/validate-content.mjs` checks content invariants; `index.html`, `vite.config.ts`, and `tsconfig.json` define the app shell, build, and TypeScript settings.

Page slugs are the Markdown filenames. Renaming a file changes `/docs/:slug` URLs and the expected asset filenames.

## Build, Test, and Development Commands

- `npm install` installs dependencies from `package-lock.json`.
- `npm run dev` starts Vite on `http://localhost:5180`.
- `npm run build` runs `tsc -b`, creates the production bundle, then prerenders static HTML + machine-readable exports into `dist/`.
- `npm run preview` serves the production build on `http://localhost:5181`.

There is no configured test runner, linter, or formatter. Treat `npm run build` as the correctness gate before submitting changes.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Follow the existing style: two-space indentation, single quotes, semicolons, explicit union types for constrained values, and descriptive camelCase names. Keep page content in `content/**/*.md`; keep UI behavior in `App.tsx`.

To add a page, create a `content/<folder>/<slug>.md` file with the required frontmatter (`title`, `appPath`, `audience`, `summary`, `primaryActions`) and optional `##` workflow blocks, then run `npm run validate`. To add a new section, add one entry to `sectionConfig` in `src/sections.ts` and create the matching `content/<folder>/` directory — everything else (type, order, icon, guidance) derives from that entry. Name assets by the page slug, for example `public/assets/screenshots/dashboard.png` or `public/assets/animations/new-automation.webm`.

## Testing Guidelines

No automated tests are currently present. Validate changes with `npm run build` and, for UI or content changes, manually check relevant pages with `npm run dev`. Verify `/docs/:slug` links, hash anchors, search results, theme toggles, and missing-asset placeholders when relevant.

## Commit & Pull Request Guidelines

This checkout does not include Git history, so no repository-specific commit pattern can be inferred. Use short, imperative messages such as `Add campaign docs page` or `Fix docs search scoring`.

Pull requests should include a concise description, the pages or components changed, verification steps such as `npm run build`, and screenshots or clips for visible UI changes. Link related issues when available and call out title changes that affect generated slugs.

## Configuration & Hosting Notes

Set `VITE_MAGICKVOICE_APP_URL` in `.env` when docs should show links into the live MagickVoice app. Production hosting must provide a single-page-app fallback to `index.html` so shared `/docs/:slug` links load correctly.
