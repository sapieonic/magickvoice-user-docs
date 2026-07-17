import { pageSeeds, releaseNotes } from './content';
import { buildDocs, type DocPage, type ReleaseNote, type VisualReference, type Workflow } from './content-core';
import { sections, type SectionId } from './sections';

export type { SectionId, Workflow, VisualReference, ReleaseNote, DocPage };
export { sections, releaseNotes };

export const docs: DocPage[] = buildDocs(pageSeeds);

export function getDocById(id: string): DocPage {
  return docs.find((doc) => doc.id === id) ?? docs[0];
}
