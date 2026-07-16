import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

/**
 * Render trusted, first-party inline Markdown (bold, links, inline code) from content
 * files. Content is authored in-repo, so we render it directly. Only inline-level
 * Markdown is produced — no block wrapping — so it can sit inside `<p>`, `<li>`, etc.
 */
export function InlineMarkdown({ as: Tag = 'span', text }: { as?: 'span' | 'p' | 'li'; text: string }) {
  const html = marked.parseInline(text) as string;
  return <Tag dangerouslySetInnerHTML={{ __html: html }} />;
}
