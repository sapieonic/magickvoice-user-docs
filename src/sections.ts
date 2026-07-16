import {
  BookOpen,
  ChevronRight,
  Clipboard,
  Film,
  Hash,
  Monitor,
  PanelLeft,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export interface SectionGuidance {
  workflowVerb: string;
  tips: string[];
}

export interface SectionConfig {
  /** Content folder name under `content/`, e.g. `voice`. Drives which pages belong to this section. */
  folder: string;
  /** Display name used in the UI and stored on each `DocPage.section`. */
  name: string;
  icon: LucideIcon;
  guidance: SectionGuidance;
}

/**
 * The single source of truth for sections: order, display name, folder, icon, and guidance.
 * Sidebar order follows this array. Adding a section = adding one entry here plus a
 * matching `content/<folder>/` directory. Nothing else needs to stay in sync.
 */
export const sectionConfig = [
  {
    folder: 'access',
    name: 'Access',
    icon: ShieldCheck,
    guidance: {
      workflowVerb: 'complete access steps',
      tips: [
        'If a verification message is delayed, check spam, promotions, and any alternate inbox tied to the invite.',
        'Use the same sign-in method your team used when inviting you; switching methods can create a separate account.',
      ],
    },
  },
  {
    folder: 'overview',
    name: 'Overview',
    icon: Monitor,
    guidance: {
      workflowVerb: 'review workspace status',
      tips: [
        'Treat dashboard numbers as a starting point, then open the linked page for row-level detail.',
        'Use the dashboard after major campaigns to spot failed calls, low balance, or pending setup work quickly.',
      ],
    },
  },
  {
    folder: 'voice',
    name: 'Voice',
    icon: Sparkles,
    guidance: {
      workflowVerb: 'place, inspect, or manage voice activity',
      tips: [
        'Open the detail page after a call to review transcript, outcome, recording, and follow-up options in one place.',
        'When comparing calls, use status and date filters first, then open only the calls that need action.',
      ],
    },
  },
  {
    folder: 'phone-menus',
    name: 'Phone Menus',
    icon: Hash,
    guidance: {
      workflowVerb: 'build or review IVR phone menus',
      tips: [
        'Use short labels for IVR steps so the canvas remains readable as the menu grows.',
        'Test no-input and invalid-input paths; they are the most common places callers get stuck.',
      ],
    },
  },
  {
    folder: 'automations',
    name: 'Automations',
    icon: ChevronRight,
    guidance: {
      workflowVerb: 'create and monitor follow-up automation',
      tips: [
        'Start with a narrow trigger, test it, then broaden conditions after confirming the first run behaves correctly.',
        'Use the run drawer or detail page when you need evidence of what happened during an automation run.',
      ],
    },
  },
  {
    folder: 'campaigns',
    name: 'Campaigns',
    icon: Film,
    guidance: {
      workflowVerb: 'prepare, send, and analyze campaigns',
      tips: [
        'Review campaign settings before dispatch because recipient mistakes can be expensive to unwind.',
        'Use analytics after delivery to compare completion, failures, and response trends before sending the next batch.',
      ],
    },
  },
  {
    folder: 'messaging',
    name: 'Messaging',
    icon: Clipboard,
    guidance: {
      workflowVerb: 'connect channels and manage messages',
      tips: [
        'Keep connection health visible before sending important messages; disconnected accounts cannot deliver reliably.',
        'Open the message detail page for delivery evidence, payload review, and troubleshooting context.',
      ],
    },
  },
  {
    folder: 'scheduling',
    name: 'Scheduling',
    icon: Monitor,
    guidance: {
      workflowVerb: 'schedule one-time or recurring sends',
      tips: [
        'Use recurring schedules for repeating operational sends, not one-off campaigns.',
        'Review upcoming instances after editing a recurring schedule so you know which future sends changed.',
      ],
    },
  },
  {
    folder: 'contacts',
    name: 'Contacts',
    icon: BookOpen,
    guidance: {
      workflowVerb: 'manage contacts, catalogs, and documents',
      tips: [
        'Use detail pages to validate imported rows, files, and test queries before using data in live workflows.',
        'Keep names descriptive because lists and documents appear in campaign, automation, and prompt pickers.',
      ],
    },
  },
  {
    folder: 'administration',
    name: 'Administration',
    icon: ShieldCheck,
    guidance: {
      workflowVerb: 'manage workspace settings',
      tips: [
        'Use the audit log after configuration changes to confirm who changed what and when.',
        'Rotate API keys and remove unused phone numbers as part of regular workspace hygiene.',
      ],
    },
  },
  {
    folder: 'super-admin',
    name: 'Super Admin',
    icon: PanelLeft,
    guidance: {
      workflowVerb: 'operate the platform as a super admin',
      tips: [
        'Use tenant detail and audit pages together when investigating a customer-impacting change.',
        'Prefer scoped changes over broad platform toggles unless the rollout plan explicitly calls for a global change.',
      ],
    },
  },
] as const satisfies readonly SectionConfig[];

export type SectionId = (typeof sectionConfig)[number]['name'];

export const sections: SectionId[] = sectionConfig.map((section) => section.name);

export const sectionByFolder = new Map<string, (typeof sectionConfig)[number]>(
  sectionConfig.map((section) => [section.folder, section]),
);

export const sectionByName = new Map<SectionId, (typeof sectionConfig)[number]>(
  sectionConfig.map((section) => [section.name, section]),
);

export const sectionIcons = Object.fromEntries(
  sectionConfig.map((section) => [section.name, section.icon]),
) as Record<SectionId, LucideIcon>;
