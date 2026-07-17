import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Prerendered pages (see scripts/prerender.ts) ship static content in a #prerender-fallback
// sibling so crawlers and LLM web-fetch tools can read the page without running JavaScript.
// Once React has mounted, remove it so visitors only see the interactive app.
document.getElementById('prerender-fallback')?.remove();
