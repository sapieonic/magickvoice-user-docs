# MagickVoice User Docs

This is a standalone Vite React app for end-user documentation.

```bash
npm install
npm run dev      # dev server on http://localhost:5180
npm run build    # type-check (tsc -b) and bundle to dist/
npm run preview  # serve the production build on http://localhost:5181
```

## Product links

Set `VITE_MAGICKVOICE_APP_URL` to the base URL of the live MagickVoice app when the docs should offer an "Open in MagickVoice" action. The action stays hidden when the base URL is not configured or the page address needs a specific record ID.

Documentation pages use `/docs/:slug` URLs and section links use hash anchors. Configure the production host with a standard single-page-app fallback to `index.html` so shared documentation links load directly.

## Asset workflow

Add screenshots to `public/assets/screenshots` and short GIF/WebM clips to `public/assets/animations`. Use the documentation page slug as the filename, for example:

- `public/assets/screenshots/dashboard.png`
- `public/assets/animations/dialer.webm`

If an asset is missing, the docs app shows a neutral "coming soon" message to readers while keeping the expected filename available to authors in the page data.
