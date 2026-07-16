import { pageSeeds, releaseNotes, type PageSeed, type ReleaseNote, type VisualReference, type Workflow } from './content';
import { sectionByName, sections, type SectionId } from './sections';

export type { SectionId, Workflow, VisualReference, ReleaseNote };
export { sections, releaseNotes };

export interface DocPage {
  id: string;
  title: string;
  section: SectionId;
  appPath: string;
  audience: string;
  summary: string;
  capability?: string;
  primaryActions: string[];
  workflows: Workflow[];
  tips: string[];
  asset: {
    screenshot: string;
    screenshots?: VisualReference[];
    compact?: boolean;
    stacked?: boolean;
    animation?: string;
  };
  related: string[];
}

function overviewWorkflow(seed: PageSeed): Workflow {
  const guidance = sectionByName.get(seed.section)!.guidance;
  return {
    title: `Use this page to ${guidance.workflowVerb}`,
    goal: `Understand what is available on ${seed.title} and choose the right next action.`,
    steps: [
      `Open ${seed.title} from the ${seed.section} area of MagickVoice.`,
      `Read the page heading, description, and any status message before selecting an action.`,
      `Choose the common task that matches what you came to do and follow the labels shown on screen.`,
      `Review any summary, warning, or confirmation before completing an action that changes data.`,
      `After the action finishes, look for a confirmation message or updated status before leaving the page.`,
    ],
  };
}

function toDoc(seed: PageSeed): DocPage {
  const id = seed.slug;
  const guidance = sectionByName.get(seed.section)!.guidance;
  return {
    id,
    title: seed.title,
    section: seed.section,
    appPath: seed.path,
    audience: seed.audience,
    summary: seed.summary,
    capability: seed.capability,
    workflows: seed.workflows.length > 0 ? seed.workflows : [overviewWorkflow(seed)],
    primaryActions: seed.primaryActions,
    tips: [...guidance.tips, ...seed.tips],
    asset: {
      screenshot: `/assets/screenshots/${id}.png`,
      screenshots: seed.screenshots,
      compact: seed.compactScreenshot,
      stacked: seed.stackedScreenshots,
      animation: seed.animation ? `/assets/animations/${id}.webm` : undefined,
    },
    related: [],
  };
}

const docsWithoutRelated = pageSeeds.map(toDoc);

export const docs: DocPage[] = docsWithoutRelated.map((page) => ({
  ...page,
  related: docsWithoutRelated
    .filter((candidate) => candidate.section === page.section && candidate.id !== page.id)
    .slice(0, 4)
    .map((candidate) => candidate.id),
}));

export function getDocById(id: string): DocPage {
  return docs.find((doc) => doc.id === id) ?? docs[0];
}
