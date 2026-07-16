import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Camera,
  Check,
  CircleHelp,
  ChevronDown,
  ChevronRight,
  Clipboard,
  ExternalLink,
  Film,
  Menu,
  Moon,
  Palette,
  Search,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import { docs, getDocById, sections, type DocPage, type SectionId } from './docs';
import { sectionIcons } from './sections';
import { InlineMarkdown } from './markdown';

const logoUrl = 'https://magickvoice.com/brand/logo-256.png';
const productBaseUrl = (import.meta.env.VITE_MAGICKVOICE_APP_URL as string | undefined)?.replace(/\/$/, '');

const pageContents = [
  ['visual-reference', 'Visual reference'],
  ['how-to-use-this-page', 'How to use'],
  ['tips-and-troubleshooting', 'Troubleshooting'],
] as const;

type Theme = 'dark' | 'light';
type Accent = 'signal' | 'mint' | 'copper';

function getInitialDocId(): string {
  const match = window.location.pathname.match(/\/docs\/([^/]+)\/?$/);
  const fromPath = match?.[1];
  return fromPath && docs.some((doc) => doc.id === fromPath) ? fromPath : 'dashboard';
}

function getSearchText(doc: DocPage): string {
  return [
    doc.title,
    doc.section,
    doc.appPath,
    doc.audience,
    doc.summary,
    doc.capability ?? '',
    ...doc.primaryActions,
    ...doc.tips,
    ...doc.workflows.flatMap((workflow) => [workflow.title, workflow.goal, ...workflow.steps]),
  ].join(' ').toLowerCase();
}

function scoreDoc(doc: DocPage, query: string): number {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return 1;

  const terms = normalized.split(/\s+/).filter(Boolean);
  const haystack = getSearchText(doc);
  let score = 0;

  for (const term of terms) {
    if (doc.title.toLowerCase().includes(term)) score += 8;
    if (doc.appPath.toLowerCase().includes(term)) score += 5;
    if (doc.section.toLowerCase().includes(term)) score += 3;
    if (doc.primaryActions.some((action) => action.toLowerCase().includes(term))) score += 3;
    if (haystack.includes(term)) score += 1;
  }

  return terms.every((term) => haystack.includes(term)) ? score : 0;
}

function setDocPath(id: string): void {
  window.history.pushState({ docId: id }, '', `/docs/${id}`);
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, [query]);

  return matches;
}

function useInert<T extends HTMLElement>(inactive: boolean) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    if (inactive) element.setAttribute('inert', '');
    else element.removeAttribute('inert');
  }, [inactive]);

  return elementRef;
}

function AppHeader({
  query,
  onQueryChange,
  theme,
  setTheme,
  accent,
  setAccent,
  onMenu,
  inactive,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accent: Accent;
  setAccent: (accent: Accent) => void;
  onMenu: () => void;
  inactive: boolean;
}) {
  const headerRef = useInert<HTMLElement>(inactive);

  return (
    <header className="topbar" ref={headerRef}>
      <button
        className="iconButton mobileOnly"
        type="button"
        aria-label="Open navigation"
        data-open-navigation
        onClick={onMenu}
      >
        <Menu size={18} />
      </button>

      <div className="brandBlock">
        <img className="brandMark" src={logoUrl} alt="MagickVoice" />
        <div>
          <div className="brandName">MagickVoice Help Center</div>
          <div className="brandMeta">Step-by-step guides</div>
        </div>
      </div>

      <label className="searchBox" aria-label="Search documentation">
        <Search size={17} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search pages, tasks, and help"
        />
      </label>

      <div className="toolbar">
        <details className="appearanceMenu">
          <summary className="iconButton" aria-label="Open appearance settings" title="Appearance settings">
            <Palette size={18} />
          </summary>
          <div className="appearancePopover">
            <div className="appearanceHeading">
              <strong>Appearance</strong>
              <span>Choose what is easiest to read.</span>
            </div>

            <div className="appearanceGroup">
              <span>Display</span>
              <div className="segmented labeled" aria-label="Display theme">
                <button
                  type="button"
                  className={theme === 'light' ? 'active' : ''}
                  onClick={() => setTheme('light')}
                  aria-pressed={theme === 'light'}
                >
                  <Sun size={15} />
                  Light
                </button>
                <button
                  type="button"
                  className={theme === 'dark' ? 'active' : ''}
                  onClick={() => setTheme('dark')}
                  aria-pressed={theme === 'dark'}
                >
                  <Moon size={15} />
                  Dark
                </button>
              </div>
            </div>

            <div className="appearanceGroup">
              <span>Highlight color</span>
              <div className="accentPicker" aria-label="Highlight color">
                {(['signal', 'mint', 'copper'] as Accent[]).map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    className={`accentChoice ${accent === choice ? 'active' : ''}`}
                    onClick={() => setAccent(choice)}
                    aria-pressed={accent === choice}
                  >
                    <span className={`swatch ${choice}`} />
                    {choice === 'signal' ? 'Violet' : choice === 'mint' ? 'Teal' : 'Copper'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}

function Sidebar({
  activeId,
  selectDoc,
  open,
  onClose,
  mobile,
}: {
  activeId: string;
  selectDoc: (id: string) => void;
  open: boolean;
  onClose: () => void;
  mobile: boolean;
}) {
  const activeSection = getDocById(activeId).section;
  const [expandedSections, setExpandedSections] = useState<SectionId[]>([activeSection]);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setExpandedSections((current) => current.includes(activeSection) ? current : [...current, activeSection]);
  }, [activeSection]);

  useEffect(() => {
    if (!mobile || !open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => {
      sidebarRef.current?.querySelector<HTMLButtonElement>('[data-close-navigation]')?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      onClose();
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLButtonElement>('[data-open-navigation]')?.focus();
      });
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobile, onClose, open]);

  if (mobile && !open) return null;

  return (
    <>
      {mobile && (
        <button className="scrim show" type="button" tabIndex={-1} aria-label="Close navigation" onClick={onClose} />
      )}
      <aside
        ref={sidebarRef}
        className={`sidebar ${open ? 'open' : ''}`}
        aria-label="Help topics"
        aria-modal={mobile ? true : undefined}
        role={mobile ? 'dialog' : undefined}
      >
        <div className="sidebarHead">
          <span>Browse help</span>
          <button
            className="iconButton mobileOnly"
            type="button"
            aria-label="Close navigation"
            data-close-navigation
            onClick={onClose}
          >
            <X size={17} />
          </button>
        </div>

        <div className="sectionList">
          {sections.map((section) => {
            const Icon = sectionIcons[section];
            const sectionDocs = docs.filter((doc) => doc.section === section);
            const isExpanded = expandedSections.includes(section);
            return (
              <details
                className="sectionGroup"
                key={section}
                open={isExpanded}
                onToggle={(event) => {
                  const shouldOpen = event.currentTarget.open;
                  setExpandedSections((current) => {
                    const alreadyOpen = current.includes(section);
                    if (shouldOpen === alreadyOpen) return current;
                    return shouldOpen ? [...current, section] : current.filter((item) => item !== section);
                  });
                }}
              >
                <summary className={activeSection === section ? 'active' : ''}>
                  <Icon size={16} />
                  <span>{section}</span>
                  <small>{sectionDocs.length}</small>
                  <ChevronDown className="sectionChevron" size={15} />
                </summary>
                <div className="sectionDocs">
                  {sectionDocs.map((doc) => (
                    <button
                      key={doc.id}
                      className={`navDoc ${activeId === doc.id ? 'active' : ''}`}
                      type="button"
                      onClick={() => {
                        selectDoc(doc.id);
                        onClose();
                      }}
                    >
                      <span>{doc.title}</span>
                    </button>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </aside>
    </>
  );
}

function AssetFrame({ doc }: { doc: DocPage }) {
  const [missingImages, setMissingImages] = useState<string[]>([]);
  const [videoMissing, setVideoMissing] = useState(false);
  const [zoomed, setZoomed] = useState<{ src: string; alt: string } | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const screenshots = doc.asset.screenshots ?? [{
    src: doc.asset.screenshot,
    alt: `${doc.title} screenshot`,
  }];

  useEffect(() => {
    if (!zoomed) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => lightboxCloseRef.current?.focus());

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setZoomed(null);
      } else if (event.key === 'Tab') {
        // Only the close button is focusable inside the dialog — keep focus on it.
        event.preventDefault();
        lightboxCloseRef.current?.focus();
      }
    }
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [zoomed]);

  return (
    <section className="assetPanel" id="visual-reference" aria-label="Screenshots and animations">
      <div className="assetHeader">
        <div>
          <h2>Visual reference</h2>
          <p>Use this visual guide to find the main controls and follow the steps on screen.</p>
        </div>
      </div>

      <div className={`assetGrid ${screenshots.length > 1 ? 'multiple' : ''} ${doc.asset.compact ? 'compact' : ''} ${doc.asset.stacked ? 'stacked' : ''}`}>
        {screenshots.map((screenshot) => (
          <figure className="mediaFigure" key={screenshot.src}>
            <div className="mediaFrame">
              {!missingImages.includes(screenshot.src) ? (
                <button
                  type="button"
                  className="mediaZoomTrigger"
                  onClick={() => setZoomed({ src: screenshot.src, alt: screenshot.alt })}
                  aria-label={`Zoom in on ${screenshot.alt}`}
                >
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    onError={() => setMissingImages((current) => [...current, screenshot.src])}
                  />
                </button>
              ) : (
                <div className="mediaFallback">
                  <Camera size={34} />
                  <strong>Visual guide coming soon</strong>
                  <span>A screenshot of the {doc.title} page will appear here.</span>
                </div>
              )}
            </div>
            {screenshot.label && <figcaption>{screenshot.label}</figcaption>}
          </figure>
        ))}

        {doc.asset.animation && (
          <div className="mediaFrame motion">
            {!videoMissing ? (
              <video
                src={doc.asset.animation}
                controls
                muted
                playsInline
                onError={() => setVideoMissing(true)}
              />
            ) : (
              <div className="mediaFallback">
                <Film size={34} />
                <strong>Walkthrough coming soon</strong>
                <span>A short demonstration will appear here.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {zoomed && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={zoomed.alt}
          onClick={() => setZoomed(null)}
        >
          <button
            ref={lightboxCloseRef}
            type="button"
            className="lightboxClose"
            onClick={() => setZoomed(null)}
            aria-label="Close zoomed image"
          >
            <X size={22} />
          </button>
          <img
            className="lightboxImage"
            src={zoomed.src}
            alt={zoomed.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

function DocArticle({ doc, selectDoc }: { doc: DocPage; selectDoc: (id: string) => void }) {
  const [copied, setCopied] = useState(false);

  async function copyPath() {
    await navigator.clipboard?.writeText(doc.appPath);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <article className="docArticle">
      <div className="hero">
        <div className="heroContent">
          <div className="eyebrow">{doc.section}</div>
          <h1>{doc.title}</h1>
          <p>{doc.summary}</p>
          <div className="heroMeta">
            <span>{doc.audience}</span>
            {doc.capability && <span>Your admin may need to enable this feature</span>}
          </div>
        </div>
        <div className="pageAddress">
          <div className="pageAddressText">
            <span className="pageAddressLabel">
              Page address
              <span className="helpTip">
                <button type="button" aria-label="What is a page address?">
                  <CircleHelp size={15} />
                </button>
                <span role="tooltip">
                  This identifies the page inside MagickVoice. Support may ask you to share it when helping with a problem.
                </span>
              </span>
            </span>
            <code>{doc.appPath}</code>
          </div>
          <button className="copyAddress" type="button" onClick={copyPath} aria-live="polite">
            {copied ? <Check size={15} /> : <Clipboard size={15} />}
            {copied ? 'Copied' : 'Copy address'}
          </button>
        </div>
      </div>

      <details className="mobileToc">
        <summary>
          On this page
          <ChevronDown size={16} />
        </summary>
        <nav aria-label="Page contents">
          {pageContents.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
      </details>

      <AssetFrame doc={doc} />

      {doc.primaryActions.length > 0 && (
        <section className="contentBand tasksMobile" id="common-jobs">
          <div className="sectionTitle">
            <h2>Common tasks</h2>
            <p>Choose what you want to do on this page.</p>
          </div>
          <div className="actionGrid">
            {doc.primaryActions.map((action) => (
              <div className="actionCard" key={action}>
                <ChevronRight size={17} />
                <span>{action}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="contentBand" id="how-to-use-this-page">
        <div className="sectionTitle">
          <h2>How to use this page</h2>
          <p>Follow these steps in order to complete the task.</p>
        </div>
        <div className="workflowStack">
          {doc.workflows.map((workflow, workflowIndex) => (
            <div className="workflow" key={workflow.title}>
              <div className="workflowHead">
                <span>{String(workflowIndex + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{workflow.title}</h3>
                  <InlineMarkdown as="p" text={workflow.goal} />
                </div>
              </div>
              <ol>
                {workflow.steps.map((step) => (
                  <InlineMarkdown as="li" key={step} text={step} />
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="contentBand" id="tips-and-troubleshooting">
        <div className="sectionTitle">
          <h2>Tips and troubleshooting</h2>
          <p>Use these notes when the page looks empty, blocked, or inconsistent.</p>
        </div>
        <div className="tipGrid">
          {doc.tips.map((tip) => (
            <div className="tip" key={tip}>
              <Sparkles size={16} />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="contentBand">
        <div className="sectionTitle">
          <h2>Related pages</h2>
          <p>Continue to another guide that may help.</p>
        </div>
        <div className="relatedGrid">
          {doc.related.map((id) => {
            const related = getDocById(id);
            return (
              <button key={id} type="button" onClick={() => selectDoc(id)}>
                <span>{related.title}</span>
                <small>{related.section}</small>
              </button>
            );
          })}
        </div>
      </section>
    </article>
  );
}

function SearchResults({
  query,
  results,
  selectDoc,
}: {
  query: string;
  results: DocPage[];
  selectDoc: (id: string) => void;
}) {
  if (!query.trim()) return null;

  return (
    <section className="searchResults" aria-label="Search results">
      <div className="resultsHead">
        <strong>{results.length} results</strong>
        <span>for "{query}"</span>
      </div>
      {results.length > 0 ? (
        <div className="resultsGrid">
          {results.map((doc) => (
            <button key={doc.id} type="button" onClick={() => selectDoc(doc.id)}>
              <div>
                <strong>{doc.title}</strong>
                <span>{doc.summary}</span>
              </div>
              <small>{doc.section}</small>
            </button>
          ))}
        </div>
      ) : (
        <div className="emptyResults">
          <Search size={22} />
          <strong>No matching guides</strong>
          <span>Try a shorter phrase, a page name, or the task you want to complete.</span>
        </div>
      )}
    </section>
  );
}

export function App() {
  const [activeId, setActiveId] = useState(getInitialDocId);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('mv-doc-theme') as Theme) || 'dark');
  const [accent, setAccent] = useState<Accent>(() => (localStorage.getItem('mv-doc-accent') as Accent) || 'signal');
  const [navOpen, setNavOpen] = useState(false);
  const mobileNavigation = useMediaQuery('(max-width: 860px)');
  const mainRef = useInert<HTMLElement>(mobileNavigation && navOpen);
  const rightRailRef = useInert<HTMLElement>(mobileNavigation && navOpen);

  const activeDoc = getDocById(activeId);
  const productUrl = productBaseUrl && !activeDoc.appPath.includes(':')
    ? `${productBaseUrl}${activeDoc.appPath}`
    : null;

  const closeNavigation = useCallback(() => setNavOpen(false), []);

  const results = useMemo(() => {
    return docs
      .map((doc) => ({ doc, score: scoreDoc(doc, query) }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
      .map((result) => result.doc);
  }, [query]);

  function selectDoc(id: string) {
    setActiveId(id);
    setDocPath(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.accent = accent;
    localStorage.setItem('mv-doc-theme', theme);
    localStorage.setItem('mv-doc-accent', accent);
  }, [theme, accent]);

  useEffect(() => {
    const handler = () => {
      const next = getInitialDocId();
      setActiveId(next);
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  return (
    <div className="appShell">
      <AppHeader
        query={query}
        onQueryChange={setQuery}
        theme={theme}
        setTheme={setTheme}
        accent={accent}
        setAccent={setAccent}
        onMenu={() => setNavOpen(true)}
        inactive={mobileNavigation && navOpen}
      />

      <div className={`layout ${query.trim() ? 'searchMode' : ''}`}>
        <Sidebar
          activeId={activeId}
          selectDoc={selectDoc}
          open={navOpen}
          onClose={closeNavigation}
          mobile={mobileNavigation}
        />

        <main className="mainPane" ref={mainRef}>
          {query.trim() ? (
            <SearchResults
              query={query}
              results={results}
              selectDoc={(id) => {
                selectDoc(id);
                setQuery('');
              }}
            />
          ) : (
            <DocArticle doc={activeDoc} selectDoc={selectDoc} />
          )}
        </main>

        {!query.trim() && <aside className="rightRail" ref={rightRailRef} aria-label="Page contents">
          <div className="railCard">
            <div className="railTitle">On this page</div>
            {pageContents.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </div>
          {activeDoc.primaryActions.length > 0 && (
            <div className="railCard railTasks">
              <div className="railTitle">Common tasks</div>
              <ul className="railTaskList">
                {activeDoc.primaryActions.map((action) => (
                  <li key={action}>
                    <ChevronRight size={15} />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {productUrl && <a className="productLink" href={productUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={15} />
            Open {activeDoc.title} in MagickVoice
          </a>}
        </aside>}
      </div>
    </div>
  );
}
