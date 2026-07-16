# Repository Guidelines

## Project Structure & Module Organization

This is a standalone Vite + React 18 + TypeScript app for MagickVoice end-user documentation.

- `src/docs.ts` is the content source of truth. Pages are authored as page seeds and transformed into exported docs.
- `src/App.tsx` contains UI, routing, search, theme, and section icons.
- `src/main.tsx` mounts the React app.
- `src/styles.css` contains application styling.
- `public/assets/` stores documentation media. Use `public/assets/screenshots/` for screenshots and `public/assets/animations/` for short GIF/WebM clips.
- `index.html`, `vite.config.ts`, and `tsconfig.json` define the app shell, build, and TypeScript settings.

Page slugs are generated from page titles in `docs.ts`. Renaming a title changes `/docs/:slug` URLs and the expected asset filenames.

## Build, Test, and Development Commands

- `npm install` installs dependencies from `package-lock.json`.
- `npm run dev` starts Vite on `http://localhost:5180`.
- `npm run build` runs `tsc -b` and then creates the production bundle in `dist/`.
- `npm run preview` serves the production build on `http://localhost:5181`.

There is no configured test runner, linter, or formatter. Treat `npm run build` as the correctness gate before submitting changes.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Follow the existing style: two-space indentation, single quotes, semicolons, explicit union types for constrained values, and descriptive camelCase names. Keep content data in `docs.ts`; keep UI behavior in `App.tsx`.

When adding a new documentation section, update the `SectionId` union, `sectionGuidance`, `sections`, and `sectionIcons` together. Name assets by the generated page slug, for example `public/assets/screenshots/dashboard.png` or `public/assets/animations/automation-builder.webm`.

## Testing Guidelines

No automated tests are currently present. Validate changes with `npm run build` and, for UI or content changes, manually check relevant pages with `npm run dev`. Verify `/docs/:slug` links, hash anchors, search results, theme toggles, and missing-asset placeholders when relevant.

## Commit & Pull Request Guidelines

This checkout does not include Git history, so no repository-specific commit pattern can be inferred. Use short, imperative messages such as `Add campaign docs page` or `Fix docs search scoring`.

Pull requests should include a concise description, the pages or components changed, verification steps such as `npm run build`, and screenshots or clips for visible UI changes. Link related issues when available and call out title changes that affect generated slugs.

## Configuration & Hosting Notes

Set `VITE_MAGICKVOICE_APP_URL` in `.env` when docs should show links into the live MagickVoice app. Production hosting must provide a single-page-app fallback to `index.html` so shared `/docs/:slug` links load correctly.
