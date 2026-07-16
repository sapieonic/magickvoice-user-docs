export type SectionId =
  | 'Access'
  | 'Overview'
  | 'Voice'
  | 'Phone Menus'
  | 'Automations'
  | 'Campaigns'
  | 'Messaging'
  | 'Scheduling'
  | 'Contacts'
  | 'Administration'
  | 'Super Admin';

export interface Workflow {
  title: string;
  goal: string;
  steps: string[];
}

interface VisualReference {
  src: string;
  alt: string;
  label?: string;
}

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
    animation?: string;
  };
  related: string[];
}

interface PageSeed {
  title: string;
  path: string;
  section: SectionId;
  audience: string;
  summary: string;
  capability?: string;
  primaryActions: string[];
  before?: string[];
  workflows?: Workflow[];
  tips?: string[];
  screenshots?: VisualReference[];
  compactScreenshot?: boolean;
  animation?: boolean;
}

const sectionGuidance: Record<SectionId, { before: string[]; tips: string[]; workflowVerb: string }> = {
  Access: {
    workflowVerb: 'complete access steps',
    before: [
      'Use a supported browser and keep the same tab open until the access step finishes.',
      'Have your workspace invitation, phone number, email inbox, or verification code available before you begin.',
    ],
    tips: [
      'If a verification message is delayed, check spam, promotions, and any alternate inbox tied to the invite.',
      'Use the same sign-in method your team used when inviting you; switching methods can create a separate account.',
    ],
  },
  Overview: {
    workflowVerb: 'review workspace status',
    before: [
      'Confirm the account selector and tenant context in the top bar before acting on any metric.',
      'Check whether the date range or filter controls reflect the period you want to review.',
    ],
    tips: [
      'Treat dashboard numbers as a starting point, then open the linked page for row-level detail.',
      'Use the dashboard after major campaigns to spot failed calls, low balance, or pending setup work quickly.',
    ],
  },
  Voice: {
    workflowVerb: 'place, inspect, or manage voice activity',
    before: [
      'Confirm the phone number, contact, and call script before starting any outbound call.',
      'Make sure your browser has microphone permission when using browser or WebRTC dialer pages.',
    ],
    tips: [
      'Open the detail page after a call to review transcript, outcome, recording, and follow-up options in one place.',
      'When comparing calls, use status and date filters first, then open only the calls that need action.',
    ],
  },
  'Phone Menus': {
    workflowVerb: 'build or review IVR phone menus',
    before: [
      'Prepare the caller journey: greeting, keypad choices, retry behavior, and final destination.',
      'Confirm the prompts, variables, and routing rules before publishing a menu used by live callers.',
    ],
    tips: [
      'Use short labels for IVR steps so the canvas remains readable as the menu grows.',
      'Test no-input and invalid-input paths; they are the most common places callers get stuck.',
    ],
  },
  Automations: {
    workflowVerb: 'create and monitor follow-up automation',
    before: [
      'Decide the trigger condition, target channel, and follow-up template before opening the builder.',
      'Verify that any messaging connection, template, or attachment you reference is already available.',
    ],
    tips: [
      'Start with a narrow trigger, test it, then broaden conditions after confirming the first run behaves correctly.',
      'Use the run drawer or detail page when you need evidence of what happened during an automation run.',
    ],
  },
  Campaigns: {
    workflowVerb: 'prepare, send, and analyze campaigns',
    before: [
      'Prepare a reviewed contact list, approved voice message or script, and a sender number before sending.',
      'Check credits and calling limits before launching a large campaign.',
    ],
    tips: [
      'Review campaign settings before dispatch because recipient mistakes can be expensive to unwind.',
      'Use analytics after delivery to compare completion, failures, and response trends before sending the next batch.',
    ],
  },
  Messaging: {
    workflowVerb: 'connect channels and manage messages',
    before: [
      'Confirm which messaging channel you are using, such as WhatsApp or Telegram, before selecting templates.',
      'Use approved templates for structured outbound messages and free-form replies only where the channel permits them.',
    ],
    tips: [
      'Keep connection health visible before sending important messages; disconnected accounts cannot deliver reliably.',
      'Open the message detail page for delivery evidence, payload review, and troubleshooting context.',
    ],
  },
  Scheduling: {
    workflowVerb: 'schedule one-time or recurring sends',
    before: [
      'Confirm timezone, audience, sender, and content before saving a schedule.',
      'Check whether the workflow should be a one-time schedule or a recurring schedule before starting.',
    ],
    tips: [
      'Use recurring schedules for repeating operational sends, not one-off campaigns.',
      'Review upcoming instances after editing a recurring schedule so you know which future sends changed.',
    ],
  },
  Contacts: {
    workflowVerb: 'manage contacts, catalogs, and documents',
    before: [
      'Prepare clean files with consistent columns, headers, and phone number formats before uploading.',
      'Decide whether the information is a contact list, product catalog, or knowledge document before adding it.',
    ],
    tips: [
      'Use detail pages to validate imported rows, files, and test queries before using data in live workflows.',
      'Keep names descriptive because lists and documents appear in campaign, automation, and prompt pickers.',
    ],
  },
  Administration: {
    workflowVerb: 'manage workspace settings',
    before: [
      'Confirm you are in the correct tenant before changing team, credit, API, audit, or phone number settings.',
      'Use the least-privilege role or permission set that allows the person to do their work.',
    ],
    tips: [
      'Use the audit log after configuration changes to confirm who changed what and when.',
      'Rotate API keys and remove unused phone numbers as part of regular workspace hygiene.',
    ],
  },
  'Super Admin': {
    workflowVerb: 'operate the platform as a super admin',
    before: [
      'Confirm the tenant, user, provider, or platform object before changing anything at super-admin scope.',
      'Treat feature flags and governance settings as production controls; verify intended rollout before saving.',
    ],
    tips: [
      'Use tenant detail and audit pages together when investigating a customer-impacting change.',
      'Prefer scoped changes over broad platform toggles unless the rollout plan explicitly calls for a global change.',
    ],
  },
};

const pages: PageSeed[] = [
  {
    title: 'Sign in',
    path: '/login',
    section: 'Access',
    audience: 'All users',
    summary: 'Sign in to an existing account or create one from the two tabs on the MagickVoice access page.',
    primaryActions: ['Sign in with email and password', 'Create an account with email, password, and an optional phone number', 'Use Google sign-in when your organisation supports it'],
    before: [
      'Use the email address you want associated with the account. The Email field is required and rejects an address without an @ sign before the form is submitted.',
      'Keep the Sign In and Sign Up tabs straight: each tab keeps the same email and password values when you switch, but only Sign Up shows Confirm Password and Phone Number.',
    ],
    workflows: [
      {
        title: 'Sign in with email and password',
        goal: 'Open your existing MagickVoice workspace.',
        steps: [
          'Keep the Sign In tab selected.',
          'Enter the email address in Email and the matching account password in Password.',
          'Select the lower Sign In button below the fields. The tab button at the top only changes the form; it does not sign you in.',
          'If the account has not been verified, MagickVoice opens Verify your email. Complete that guide before trying to work in the product.',
          'If a temporary network error appears, wait briefly and select Sign In once more. Do not change the credentials unless the page specifically says they are incorrect.',
        ],
      },
      {
        title: 'Create a new account',
        goal: 'Register an email-and-password account, then move to email verification.',
        steps: [
          'Select the Sign Up tab.',
          'Enter your email address in Email. The browser focuses this field and explains the problem if the address is blank or not in email format.',
          'Enter a new password in Password, then enter exactly the same value in Confirm Password. Both fields are required.',
          'Phone Number is optional. If you add one, choose the correct country first and enter the number in that country format; the field displays the completed international number.',
          'Select Create Account. While the request is running, the button changes to Please wait... and the Google option is temporarily disabled.',
          'After a successful request, sign in with the same email and password if MagickVoice leaves you on the access page. It then opens Verify your email.',
          'If the first request shows a network error, wait and try signing in before submitting the signup form again. An email-already-in-use message means the account was created and you should use the Sign In tab.',
        ],
      },
    ],
    tips: [
      'The access page also offers Continue with Google. Use the method your organisation expects, otherwise you can create a separate account for the same person.',
      'The page can return a temporary Firebase network message even when the account action completed. Check the next state before repeating an action.',
    ],
    screenshots: [
      {
        src: '/assets/screenshots/sign-in.png',
        alt: 'MagickVoice sign-in form with email, password, password recovery, and Google sign-in controls',
        label: 'Sign in',
      },
      {
        src: '/assets/screenshots/sign-up-form.png',
        alt: 'MagickVoice account creation form with email, password confirmation, phone country selector, and Create Account button',
        label: 'Create an account',
      },
    ],
  },
  {
    title: 'Verify email',
    path: '/verify-email',
    section: 'Access',
    audience: 'New and invited users',
    summary: 'Confirm the link sent to your inbox, then ask MagickVoice to recheck the verified account.',
    primaryActions: ['Open the verification link in your email', 'Confirm verification in the app', 'Resend the email when the original message is unavailable', 'Sign out and use another account'],
    before: [
      'The page states the exact email address it is waiting for. Verify that inbox, not a different personal or work mailbox.',
      'Leave this browser tab open while you use the link from your email. You return here after the external link has completed.',
      'If the message is not in your inbox, check Spam or Junk before requesting another verification email.',
    ],
    workflows: [
      {
        title: 'Verify your email',
        goal: 'Confirm the email address shown on the page and continue into MagickVoice.',
        steps: [
          'Open the inbox for the email address printed on the page.',
          'Find the latest MagickVoice verification message and select the link inside it. Complete any browser confirmation the link presents.',
          'Return to the MagickVoice tab and select I\'ve verified my email.',
          'The button changes to Checking... while MagickVoice refreshes your account state.',
          'When the check succeeds, new accounts open the Dashboard. The Dashboard includes the first-run Getting Started checklist rather than a separate setup wizard.',
          'If the first check displays a temporary network error, wait briefly and select I\'ve verified my email once more.',
        ],
      },
      {
        title: 'Send the verification email again',
        goal: 'Request a new message when the first one does not arrive or has expired.',
        steps: [
          'Check Spam or Junk, Promotions, and any filtered inbox folders first. Verification emails can be filtered out of the main inbox.',
          'Return to the Verify your email page and select Resend verification email.',
          'Wait for the page to confirm that the request finished before checking the inbox again.',
          'Open the newest verification message, select its link, then return and select I\'ve verified my email.',
        ],
      },
    ],
    tips: [
      'Use Sign out only when the email address on this page is wrong or you need to use a different account. It ends the current session.',
      'A verification link proves email ownership. Selecting I\'ve verified my email is the separate in-app check that lets MagickVoice continue.',
      'If you cannot find the message in your inbox, search for MagickVoice and check Spam or Junk before using Resend verification email.',
    ],
    compactScreenshot: true,
  },
  {
    title: 'Dashboard',
    path: '/app',
    section: 'Overview',
    audience: 'Workspace operators and admins',
    summary: 'Use Dashboard as the workspace home page for credit balance, first-run setup, quick actions, and links into every MagickVoice channel.',
    screenshots: [
      {
        src: '/assets/screenshots/dashboard-guide.png',
        alt: 'Light-theme MagickVoice Dashboard with masked user name, credit balance, collapsed getting started guide, channel cards, and activity chart',
      },
    ],
    primaryActions: ['Check the active organisation, workspace, and credit balance', 'Start a first call or browse call scripts', 'Complete the Getting Started checklist', 'Open messaging, contacts, scheduling, and channel setup pages'],
    before: [
      'Check the organisation name and workspace selector in the top bar before acting. Dashboard can show a different tenant or workspace from the one you expected.',
      'Treat the credit balance as a live operational signal. Calls consume credits, so review it before launching a call or campaign.',
      'A new workspace can show no recent activity. Start with the checklist or one of the quick actions instead of expecting historical charts or records.',
    ],
    workflows: [
      {
        title: 'Orient yourself on Dashboard',
        goal: 'Confirm you are in the right workspace and choose the correct starting point.',
        steps: [
          'Open Dashboard from Overview in the left navigation.',
          'Read the organisation and workspace controls in the top bar, then check the credit balance beside them.',
          'Use the welcome panel for a direct first action: select Make your first call to open the call form, or Browse call scripts to choose or create an AI call script.',
          'Leave the Page guide expanded the first time you use Dashboard. It explains how credit balance, activity, and channel cards relate to the rest of MagickVoice.',
          'Use the profile control in the top-right corner only for account-level actions. It is separate from the workspace selector and channel navigation.',
        ],
      },
      {
        title: 'Complete the Getting Started checklist',
        goal: 'Set up the minimum pieces needed to run a useful first voice workflow.',
        steps: [
          'Find Getting Started below the Page guide. The progress label shows how many of the four tasks have been completed.',
          'Select Go next to Create a call script to define what the AI should do during a call.',
          'Return to Dashboard, then select Go next to Upload a contact list to import the people your campaigns or calls will reach.',
          'Select Go next to Make your first call when you are ready to test the script with a real recipient.',
          'Use Schedule a campaign when the first call works and you want to plan a group of calls for a future time.',
          'Do not dismiss the checklist while you still need its links. Dismiss hides the guide; it does not finish or undo any setup task.',
        ],
      },
      {
        title: 'Use a quick action or channel card',
        goal: 'Jump directly into the type of work you want to do without navigating through multiple menus.',
        steps: [
          'Use Send Message to open the messaging workflow, Upload Contacts to open contact-list import, or Schedule Campaign to plan a future campaign.',
          'Use the AI calls card to start voice-call setup, Phone menus to build a press-a-key menu, Voice messages to prepare an announcement, or Messaging to connect a supported message channel.',
          'After choosing a card, use the destination page for detailed configuration. Dashboard is a launch point, not the place where you enter all campaign or call settings.',
        ],
      },
    ],
    tips: [
      'The credit balance updates as calls start and finish. Open the Credits page from the balance when you need to review or add credits.',
      'Channel cards are shortcuts to detailed records and setup pages. Use them to narrow the task, then continue in the linked feature area.',
      'If the welcome panel or checklist is hidden, Dashboard still remains the same home page; use the left navigation to reach Calls, Call scripts, Contacts, Scheduling, and Messaging directly.',
    ],
  },
  {
    title: 'Calls',
    path: '/app/calls',
    section: 'Voice',
    audience: 'Voice operators',
    summary: 'Monitor AI call activity, narrow the list to the records that matter, export it when needed, and start one-off calls.',
    primaryActions: ['Filter AI call records', 'Search for one exact phone number', 'Export the visible data', 'Start a single AI call'],
    screenshots: [
      {
        src: '/assets/screenshots/calls-list.png',
        alt: 'Calls page showing the Campaign Composer notice and call filters',
        label: 'Use the notice for bulk work; use the filters to investigate individual AI calls.',
      },
    ],
    workflows: [
      {
        title: 'Find the calls you need',
        goal: 'Reduce a long call list to a precise operational view.',
        steps: [
          'Open Voice, then Calls. The table shows each AI call with its status, direction, pipeline, provider, duration, talk time, recording indicator, and time.',
          'Use All Statuses to isolate outcomes such as Queued, Ringing, In Progress, Completed, Failed, No Answer, Busy, or Switched Off.',
          'Use pipeline, provider, and direction filters when you need to compare the same type of call. The phone search is an exact match, so enter the complete number with its country code.',
          'Use Filter by Batch ID when investigating a known batch. Use the Duration or Talk Time column headings to sort the resulting table.',
          'Check the outcome text and recording indicator before continuing with any follow-up. Select the conversation follow-up control only when you are ready to continue work on that contact.',
        ],
      },
      {
        title: 'Export or choose the right calling workflow',
        goal: 'Use this page without accidentally starting a bulk job from the legacy area.',
        steps: [
          'Apply the filters first; Export CSV exports the data currently represented by your filtered view.',
          'Use Customize export columns to decide which call fields are included before exporting.',
          'Select New Call for one AI-assisted outbound call. Complete its required recipient, caller ID, prompt, and AI quality fields before the call button becomes available.',
          'For a list of recipients, use Open the Campaign Composer in the notice. The page explicitly marks Bulk Calls here as a retiring workflow.',
        ],
      },
    ],
    tips: [
      'A completed status means the call finished; it does not by itself indicate the business outcome. Review the call context before marking the work done.',
      'Do not use the exact-number search with a partial local number. Include the plus sign and country code to avoid an empty result.',
    ],
  },
  {
    title: 'New call',
    path: '/app/calls/new',
    section: 'Voice',
    audience: 'Voice operators',
    summary: 'Configure and launch one outbound AI call with the recipient, caller ID, script, quality, recording, and scheduling controls in one guided form.',
    primaryActions: ['Enter the recipient', 'Choose the displayed caller ID', 'Select the script and AI quality', 'Schedule or start one call'],
    screenshots: [
      {
        src: '/assets/screenshots/new-call-form.png',
        alt: 'Initiate Call form with recipient, caller ID, prompt, and AI quality fields',
        label: 'The form keeps the launch button unavailable until every required call setting is complete.',
      },
    ],
    compactScreenshot: true,
    workflows: [
      {
        title: 'Set up a single AI call',
        goal: 'Provide the information the AI needs to call the right person from the right number.',
        steps: [
          'In Who are we calling?, enter Phone number with the country code, for example +91 for India. This field is required.',
          'Optionally enter Their name. It helps the AI greet the recipient more personally.',
          'Choose Call from. This is the MagickVoice number the recipient sees when the phone rings. If the selector is still loading, wait for the workspace phone numbers to load rather than entering a number manually.',
          'Under What should the AI say?, choose a Prompt template. A template is the reusable script that directs the AI during the conversation.',
          'Choose the AI quality that matches the conversation. Higher tiers are described on screen as more natural and better at handling conversation. Then choose a Voice after selecting a quality tier.',
        ],
      },
      {
        title: 'Choose call behavior and launch time',
        goal: 'Make the one-off call with the intended safeguards.',
        steps: [
          'Select a Language only when the prompt is configured to use it. Selecting a language makes it available, but the prompt instructions must explicitly tell the agent to speak that language.',
          'Leave Record this call on when you need an audio copy for review. The screen notes that recording has a small additional charge.',
          'Turn on Detect answering machines when voicemail detection is useful. Use Attach automations or Advanced settings only when your workflow requires them; advanced settings are for reference ID and developer options.',
          'Choose Send Now to place the call after review, or Schedule for Later to choose a future date and time.',
          'Read the helper line above the action buttons. It lists every missing requirement. Start call now becomes available only after valid phone number, caller ID, prompt template, and AI pipeline are set.',
        ],
      },
    ],
    tips: [
      'Use this page for one recipient. For a group of recipients, select Try the Campaign Composer instead of repeating individual calls.',
      'Cancel leaves the setup screen without placing a call. Starting a call is an external action, so review the caller ID, recipient, and script together before selecting it.',
    ],
  },
  {
    title: 'Dialer',
    path: '/app/calls/dialer',
    section: 'Voice',
    audience: 'WebRTC dialer users',
    capability: 'calls.dialer',
    summary: 'Call a phone number directly from the browser by selecting an approved caller ID, entering a full phone number, and acknowledging recording consent when needed.',
    primaryActions: ['Select a caller ID', 'Enter or key in a full number', 'Choose whether to record', 'Place a browser call'],
    screenshots: [
      {
        src: '/assets/screenshots/dialer.png',
        alt: 'Browser dialer with caller ID, phone number field, keypad, recording option, and call button',
        label: 'Use the number field for the recipient; the keypad is an alternative way to enter digits.',
      },
    ],
    compactScreenshot: true,
    workflows: [
      {
        title: 'Place a browser-dialer call',
        goal: 'Call a number from the browser with the correct visible caller ID.',
        steps: [
          'Open Voice, then Dialer. Use Call history in the page header when you need previous browser-dialer records instead.',
          'Choose Caller ID. This is the active workspace number the recipient will see; only available tenant numbers appear in the selector.',
          'Enter Number to call with the country code. You can type it directly or use the keypad. Hold 0 on the keypad to enter a plus sign.',
          'Select Record this call only if recording is appropriate. The page explicitly reminds you to make sure everyone on the call consents to being recorded.',
          'Review the caller ID and recipient number, then select Call. The call button remains unavailable until the required information is present.',
        ],
      },
    ],
    tips: [
      'The Credits panel shows the available workspace balance and the approximate per-minute talk-time rate. Confirm there is enough balance before a longer call.',
      'Use a complete international number. The dialer accepts the number you intend to reach, not a contact name.',
    ],
  },
  {
    title: 'Dialer call history',
    path: '/app/calls/dialer/history',
    section: 'Voice',
    audience: 'WebRTC dialer users',
    capability: 'calls.dialer',
    summary: 'Review calls that were placed from the browser dialer, filter them by final status or exact number, and open the dialer to make the next call.',
    primaryActions: ['Filter browser calls by status', 'Search an exact number', 'Refresh the call log', 'Open the dialer'],
    screenshots: [
      {
        src: '/assets/screenshots/dialer-history.png',
        alt: 'Dialer call history empty state with filters and Open Dialer button',
        label: 'An empty state is expected until the first browser-dialer call has ended and been logged.',
      },
    ],
    workflows: [
      {
        title: 'Find a browser-dialer record',
        goal: 'Confirm the result of a call placed from your browser.',
        steps: [
          'Open Voice, then Call History. This history is specifically for calls placed from the browser dialer, not the wider AI Calls list.',
          'Use All Statuses to limit the view to Initiating, Ringing, In Progress, Completed, Failed, No Answer, Busy, or Canceled calls.',
          'Use Search phone (exact) with the full country-code number when you know the recipient.',
          'Select Refresh after a recent call finishes if its record has not appeared yet.',
          'If there are no records, use Open Dialer to make the first browser call. The empty-state message changes after a call is logged.',
        ],
      },
    ],
    tips: [
      'An AI call initiated from Calls is not the same as a browser-dialer call. Check the correct history before assuming a record is missing.',
      'A call that is still initiating or ringing may take time to reach a final outcome. Refresh instead of placing a duplicate call.',
    ],
  },
  {
    title: 'Call detail',
    path: '/app/calls/:id',
    section: 'Voice',
    audience: 'Voice operators and managers',
    summary: 'Open a completed AI call from Calls to review its delivery facts, recording, AI-generated outcome analysis, and turn-by-turn transcript before deciding on a follow-up.',
    primaryActions: ['Review delivery facts', 'Play or download a permitted recording', 'Interpret call analysis', 'Read the transcript', 'Choose a follow-up'],
    screenshots: [
      {
        src: '/assets/screenshots/call-detail-information.png',
        alt: 'Call Information panel with redacted contact data, status, direction, pipeline, provider, timing, duration, talk time, and cost link',
        label: 'The opening panel confirms the call identity, delivery result, timing, routing, and usage facts. Contact-specific values are redacted in this guide.',
      },
      {
        src: '/assets/screenshots/call-detail-recording.png',
        alt: 'Recording panel with play, elapsed time, waveform, volume, and download controls',
        label: 'Use the recording player to validate how the call sounded; download only when your access policy permits it.',
      },
      {
        src: '/assets/screenshots/call-detail-analysis.png',
        alt: 'Call Analysis metrics showing sentiment, key topics, coherence, effectiveness score, and resolution achieved',
        label: 'Generated analysis converts the conversation into directional signals for review, not an automatic decision.',
      },
      {
        src: '/assets/screenshots/call-detail-transcript.png',
        alt: 'Transcript with assistant and user turns, per-turn sentiment, timestamps, and a redacted personal name',
        label: 'The transcript keeps the conversation in order, with speaker labels, timestamps, and per-turn sentiment.',
      },
    ],
    workflows: [
      {
        title: 'Open the right call and confirm the delivery facts',
        goal: 'Establish what happened before relying on interpretation or taking another action.',
        steps: [
          'In Voice, open Calls. Narrow the list by status, direction, provider, pipeline, exact phone number, or batch ID until the correct record is visible.',
          'Select the call row to open Call Detail. Start at Call Information rather than jumping straight to the transcript.',
          'Check Phone and Recipient to confirm that this is the correct person. These values are customer data, so do not copy them into an unapproved channel.',
          'Read Status and its plain-language outcome first. Then use Direction, Pipeline, Provider, and Language to understand how the call was routed and configured.',
          'Compare Created, Answered, and Ended with Duration and Talk Time. Duration covers the complete call lifecycle; talk time reflects the connected conversation portion.',
          'Use See credits when you need to investigate the cost associated with the call. If Template Variables appear below the facts, they show the values that were inserted into the script for this recipient.',
        ],
      },
      {
        title: 'Review a recording responsibly',
        goal: 'Verify the actual audio without exposing call content unnecessarily.',
        steps: [
          'Scroll to Recording. When a recording exists, use Play, the elapsed-time display, waveform, and volume control to review the audio in place.',
          'Use the player to check material questions such as whether the call connected clearly, whether a hand-off was understood, or whether the transcript reflects what was said.',
          'Use Download only when you are authorized to retain a local copy. The recording can contain personal and commercially sensitive information.',
          'If no recording is shown, check whether recording was enabled for the call and whether your role is allowed to view it before assuming the call failed.',
        ],
      },
      {
        title: 'Understand the generated call analysis',
        goal: 'Use the analysis as a fast review aid while keeping human judgement in the decision loop.',
        steps: [
          'Scroll to Call Analysis. Read the generated summary first to understand the stated request, response, and apparent outcome without replaying the entire call.',
          'Use Overall Sentiment and its score as a directional signal for the conversation tone. A score is not a customer commitment and should not be used by itself to trigger a high-impact action.',
          'Review Key Topics to see the issues or requests detected in the call. Use them to route the record to the right team or to check whether a required subject was covered.',
          'Use Conversation Quality to compare Coherence and Effectiveness Score on their 10-point scales. Resolution Achieved indicates whether the analysis judged the stated objective to be met.',
          'Open the recording or transcript when a score, topic, or summary does not match the operational outcome you expect.',
        ],
      },
      {
        title: 'Read the transcript and take a follow-up action',
        goal: 'Confirm the details that matter and continue the customer relationship in context.',
        steps: [
          'Continue to Transcript. Each entry is labelled Assistant or User, includes a timestamp, and shows the sentiment detected for that turn.',
          'Read in sequence to distinguish an explicit agreement from a question, a proposed alternative, or an unresolved objection. Use the recording when exact wording or tone matters.',
          'Compare the final transcript turn with Resolution Achieved before marking work complete or starting another contact attempt.',
          'Use Follow up at the top of the page only after reviewing the record. Choose the available conversation action that matches the confirmed outcome rather than creating a duplicate interaction.',
        ],
      },
    ],
    tips: [
      'Analysis, sentiment, and transcripts are generated aids. Check the recording or the operational facts before making a consequential customer, billing, or compliance decision.',
      'A completed call can still have a short talk time. Compare the timestamps, duration, recording, and transcript before deciding that the objective was achieved.',
      'Treat recordings, transcripts, template values, and contact information as customer data. Follow your organization’s retention, export, and access rules.',
      'If a call failed or did not answer, use the delivery facts to check the number, caller ID, provider, and final outcome before retrying.',
    ],
  },
  {
    title: 'Conversation thread',
    path: '/app/threads/:id',
    section: 'Voice',
    audience: 'Support and follow-up users',
    summary: 'Use the contextual conversation timeline to understand the most recent customer interaction before continuing a call or message follow-up.',
    primaryActions: ['Review the latest interaction', 'Find related call context', 'Choose the next follow-up', 'Return to the originating Voice record'],
    screenshots: [
      {
        src: '/assets/screenshots/calls-list.png',
        alt: 'Calls list with a follow-up control that leads into related conversation work',
        label: 'Begin from the relevant call or follow-up action, then use the thread to keep the conversation in context.',
      },
    ],
    workflows: [
      {
        title: 'Continue a conversation in context',
        goal: 'Avoid losing the history behind a follow-up.',
        steps: [
          'Start from the relevant call record or its Follow up on this conversation control.',
          'Read the newest timeline entry before composing or starting another interaction.',
          'Open related call or message context when you need the reason for a prior status or outcome.',
          'Carry out the next customer action only after confirming it belongs to the same contact and conversation.',
        ],
      },
    ],
    tips: [
      'A conversation thread is context, not a signal to contact someone again automatically. Check the latest outcome first.',
      'Return to the original call record when you need its technical result, duration, recording indicator, or provider information.',
    ],
  },
  {
    title: 'Call scripts',
    path: '/app/prompts',
    section: 'Voice',
    audience: 'Script authors',
    summary: 'Create, reuse, export, edit, and remove the AI call scripts that tell a voice agent what to say and do on the phone.',
    primaryActions: ['Create a call script', 'Import a script from JSON', 'Edit an existing script', 'Export or delete a script'],
    screenshots: [
      {
        src: '/assets/screenshots/call-scripts.png',
        alt: 'Call scripts library with page guide, Import JSON and Create call script buttons, and a script card showing language chips and guideline count',
        label: 'Each script card shows its name, enabled language chips, guideline count, and per-card export, edit, and delete controls.',
      },
    ],
    workflows: [
      {
        title: 'Manage a reusable call script',
        goal: 'Keep voice-agent behavior organized and ready for safe use in calls and campaigns.',
        steps: [
          'Open Voice, then Call Scripts. The count beside the heading shows how many scripts exist; each card lists the script name, its enabled language chips, and its guideline count.',
          'Select Create call script to build a new script from a template or a blank canvas. Select Edit on an existing card to open the same editor for that script.',
          'Use Import JSON only with a script file you have reviewed. Use Export as JSON on a card to save a script definition for transfer or backup.',
          'Use Delete on a card only when the script is no longer needed. Confirm it is not selected by a live call or campaign before removing it.',
        ],
      },
    ],
    tips: [
      'The page guide points to the Quick Start templates for common use cases and reminds you to test a script from the editor’s Test tab before using it with real customers.',
      'Language chips reflect which languages the script enables; the instructions still have to tell the agent which language to actually speak.',
      'Export a script before a major rewrite when you want an easy rollback reference.',
    ],
  },
  {
    title: 'Create or edit a call script',
    path: '/app/prompts/new',
    section: 'Voice',
    audience: 'Script authors',
    summary: 'Build a new AI call script from a template or blank canvas, or edit an existing one, using the same structured editor of sections for instructions, guardrails, silence handling, languages, integrations, and captured outcomes.',
    primaryActions: ['Start from a template or blank canvas', 'Write agent instructions and the opening message', 'Set rules, hand-off, silence, and languages', 'Preview, test, and save'],
    screenshots: [
      {
        src: '/assets/screenshots/call-script-editor-templates.png',
        alt: 'New call script template picker with industry categories such as Collections, Healthcare, Restaurant, and a Start from scratch option',
        label: 'A new script starts with a template picker: choose an industry category and template, or Start from scratch for a blank canvas.',
      },
      {
        src: '/assets/screenshots/call-script-editor.png',
        alt: 'Call script editor showing the left section navigation, the instructions field with Improve writing and Personalize, the opening message, and the Preview and Test inspector',
        label: 'The editor is the same for creating and editing: left-hand sections on the left, the active section in the middle, and a live Preview or Test inspector on the right.',
      },
    ],
    workflows: [
      {
        title: 'Choose a starting point',
        goal: 'Begin with structure that matches the call type, whether the script is new or an edit.',
        steps: [
          'For a new script, select Create call script from Call Scripts, then either pick an industry category and template or select Start from scratch (blank canvas).',
          'To change an existing script, select Edit on its card. The editor opens titled with the script name and shows a Save changes button instead of Save script; new scripts show New call script and a Save script button.',
          'Work through the left-hand sections in order. Name and What your agent should do carry a needs-attention marker until they are complete, and the save button stays disabled until the required information is present.',
        ],
      },
      {
        title: 'Define how the agent speaks and behaves',
        goal: 'Give the agent specific, usable instructions rather than a vague topic.',
        steps: [
          'In Name, give the script a name you can find later. This field is required.',
          'In What your agent should do, write Instructions for your agent — the role, objective, boundaries, and desired outcome. Use Improve writing for a refinement suggestion, and Personalize to insert per-recipient details such as a name into the text.',
          'Add the Opening message: the first line the agent speaks when the call connects. Personalized fields you insert appear as chips in both the instructions and the opening message.',
          'In Do’s and don’ts, add concrete rules the agent must follow, and under When to hand off to a person, list the situations that should pass the call to a human.',
        ],
      },
      {
        title: 'Tune silence, languages, and captured data',
        goal: 'Set the operational behavior that keeps calls on track.',
        steps: [
          'In If the caller goes quiet, enable Silence handling to reveal the Directive (what the agent says when the caller is quiet), Threshold in seconds before nudging, and Max nudges before ending the call. Note that the highest voice-quality tier does not support nudging, so these settings have no effect there.',
          'In Languages it can speak, check the languages to make them selectable at call time. Checking a language only makes it available — the agent speaks another language only if your instructions explicitly tell it to (for example, “Speak in Tamil”).',
          'Use What to capture from each call to add specific details to note from every conversation, such as whether the caller agreed to pay.',
          'Use Connect to your systems when the agent must look up information mid-call. This section, along with Preview and Test, requires you to save the script first, so save once the required sections are complete and continue editing.',
        ],
      },
      {
        title: 'Preview, test, and save',
        goal: 'Confirm the script behaves as intended before using it live.',
        steps: [
          'Use the Preview tab to inspect the rendered opening message and instructions. For a saved script, fill the personalized sample fields so the preview shows realistic values.',
          'Switch to the Test tab to exercise the script on a real test call. Both Preview detail and Test require the script to be saved first.',
          'Select Save script (new) or Save changes (edit) once the preview matches the intended behavior. For a significant edit, run the revised script on a single call before broad use.',
          'Use Close to leave the editor. Closing before saving discards the unsaved draft, so save a working version before a large experimental change.',
        ],
      },
    ],
    tips: [
      'New and edit use the same editor and the same sections; an edit changes the reusable script, so assume it affects future calls and campaigns that select it.',
      'Keep instructions concrete: say what the agent should do, what it must not do, and when it must hand off. That is more reliable than a short topic-only prompt.',
      'If you need to preserve the original behavior, export the script before a major rewrite or create a separate script for the new use case.',
    ],
  },
  {
    title: 'SIP Connections',
    path: '/app/sip/connections',
    section: 'Voice',
    audience: 'Telephony administrators',
    summary: 'Connect an approved SIP trunk so MagickVoice can place outbound calls through your carrier, using either SIP credentials or an IP allowlist.',
    primaryActions: ['Add a SIP connection', 'Enter the trunk domain', 'Choose credentials or IP allowlist', 'Allow MagickVoice egress IPs'],
    screenshots: [
      {
        src: '/assets/screenshots/sip-connection-form.png',
        alt: 'Add SIP Connection form with connection name, SIP domain, and authentication mode options',
        label: 'Choose the authentication method your carrier supports before creating the connection.',
      },
    ],
    compactScreenshot: true,
    workflows: [
      {
        title: 'Add a credential-based SIP trunk',
        goal: 'Save the connection details supplied by a carrier that authenticates with a SIP username and password.',
        steps: [
          'Open Voice, then SIP Connections, and select Add SIP Connection.',
          'Enter a clear Connection Name, such as the carrier name and intended environment, so users can recognize it later.',
          'Enter the SIP Domain exactly as provided by the carrier. Include a port only when one is required, but do not include the sip: prefix.',
          'Leave Credentials selected, then enter the SIP username and SIP password from the carrier. The form notes that credentials are encrypted at rest.',
          'Review the values and create the connection. Use it first with a controlled test call before routing operational calling through it.',
        ],
      },
      {
        title: 'Use IP allowlisting instead',
        goal: 'Connect a trunk that trusts MagickVoice network addresses rather than a SIP username and password.',
        steps: [
          'Enter the connection name and SIP domain as above, then select IP whitelist as the authentication mode.',
          'Create the connection without entering credentials.',
          'Open the saved connection detail page and copy the MagickVoice egress IP addresses shown there.',
          'Allow those addresses on the SIP trunk or firewall with your carrier. Calls cannot authenticate until the carrier-side allowlist is in place.',
        ],
      },
    ],
    tips: [
      'A SIP connection can direct outbound call traffic through your carrier. Coordinate ownership and testing with the person who manages the carrier account before saving production settings.',
      'If the carrier gives a hostname with a non-standard port, include the port after the hostname, for example sip.example.com:5060.',
      'Use a distinct connection name for sandbox and production trunks so the correct route is obvious during call setup.',
    ],
  },
  {
    title: 'Phone menus',
    path: '/app/ivr-workflows',
    section: 'Phone Menus',
    audience: 'IVR builders',
    capability: 'ivr',
    summary: 'Manage press-a-key phone menu workflows and open the visual builder for routing changes.',
    primaryActions: ['Search phone menus', 'Create a menu', 'Edit a menu', 'Review published routing'],
  },
  {
    title: 'New phone menu',
    path: '/app/ivr-workflows/new',
    section: 'Phone Menus',
    audience: 'IVR builders',
    capability: 'ivr',
    summary: 'Build a new phone menu using canvas steps, prompts, keypad branches, and validation tools.',
    primaryActions: ['Add menu steps', 'Connect keypad routes', 'Configure retry behavior', 'Simulate and save'],
    animation: true,
  },
  {
    title: 'Edit phone menu',
    path: '/app/ivr-workflows/:id/edit',
    section: 'Phone Menus',
    audience: 'IVR builders',
    capability: 'ivr',
    summary: 'Update an existing IVR workflow while preserving clear routing and tested caller paths.',
    primaryActions: ['Open the workflow canvas', 'Adjust steps or routes', 'Resolve validation issues', 'Test before publishing'],
    animation: true,
  },
  {
    title: 'Menu activity',
    path: '/app/ivr-sessions',
    section: 'Phone Menus',
    audience: 'IVR operators',
    capability: 'ivr',
    summary: 'Review IVR session activity to understand how callers moved through menus.',
    primaryActions: ['Filter sessions', 'Open a session', 'Compare routes taken', 'Investigate abandoned sessions'],
  },
  {
    title: 'Menu session detail',
    path: '/app/ivr-sessions/:id',
    section: 'Phone Menus',
    audience: 'IVR operators',
    capability: 'ivr',
    summary: 'Inspect a single IVR session, including route choices, timing, and the caller journey.',
    primaryActions: ['Review caller path', 'Inspect keypad input', 'Identify routing problems'],
  },
  {
    title: 'Automations',
    path: '/app/automations',
    section: 'Automations',
    audience: 'Operations users',
    summary: 'Manage post-call and event-based automations that send messages, run follow-ups, or apply workflow logic.',
    primaryActions: ['Search automations', 'Create an automation', 'Open run history', 'Pause or edit an automation'],
  },
  {
    title: 'New automation',
    path: '/app/automations/new',
    section: 'Automations',
    audience: 'Operations users',
    summary: 'Build a new automation with triggers, conditions, actions, attachments, and templates.',
    primaryActions: ['Choose a trigger', 'Add conditions', 'Select an action', 'Test and save'],
    animation: true,
  },
  {
    title: 'Edit automation',
    path: '/app/automations/:id/edit',
    section: 'Automations',
    audience: 'Operations users',
    summary: 'Modify an automation while keeping trigger conditions and downstream actions clear.',
    primaryActions: ['Review the current flow', 'Change trigger logic', 'Update actions', 'Save and monitor new runs'],
    animation: true,
  },
  {
    title: 'Automation detail',
    path: '/app/automations/:id',
    section: 'Automations',
    audience: 'Operations users',
    summary: 'Review automation configuration, status, and run results for a single automation.',
    primaryActions: ['Check automation status', 'Inspect recent runs', 'Open run details', 'Decide whether to edit'],
  },
  {
    title: 'Contact lists',
    path: '/app/contact-lists',
    section: 'Contacts',
    audience: 'Campaign and data managers',
    summary: 'Manage imported recipient lists used by campaigns, calls, schedules, and messaging workflows.',
    primaryActions: ['Upload a contact list', 'Search lists', 'Open list details', 'Validate list readiness'],
  },
  {
    title: 'Contact list detail',
    path: '/app/contact-lists/:id',
    section: 'Contacts',
    audience: 'Campaign and data managers',
    summary: 'Inspect contacts, columns, import status, and row-level details for a recipient list.',
    primaryActions: ['Review list summary', 'Check imported rows', 'Find invalid records', 'Use the list in a campaign'],
  },
  {
    title: 'Catalogs',
    path: '/app/catalogs',
    section: 'Contacts',
    audience: 'Knowledge managers',
    capability: 'knowledge_bases',
    summary: 'Manage product or service catalogs that call scripts and automations can reference.',
    primaryActions: ['Create a catalog', 'Search catalogs', 'Open catalog details', 'Prepare catalog data for prompts'],
  },
  {
    title: 'Catalog detail',
    path: '/app/catalogs/:id',
    section: 'Contacts',
    audience: 'Knowledge managers',
    capability: 'knowledge_bases',
    summary: 'Review catalog entries, test lookup behavior, and confirm catalog readiness for AI workflows.',
    primaryActions: ['Inspect catalog entries', 'Run a test lookup', 'Fix missing fields', 'Use catalog in a script'],
  },
  {
    title: 'Documents',
    path: '/app/documents',
    section: 'Contacts',
    audience: 'Knowledge managers',
    capability: 'knowledge_bases',
    summary: 'Manage knowledge documents that can be attached to prompts and used to answer caller questions.',
    primaryActions: ['Upload a document', 'Search documents', 'Open document detail', 'Check processing state'],
  },
  {
    title: 'Document detail',
    path: '/app/documents/:id',
    section: 'Contacts',
    audience: 'Knowledge managers',
    capability: 'knowledge_bases',
    summary: 'Inspect a knowledge document, its files, chunks, metadata, and test answers against the uploaded content.',
    primaryActions: ['Review uploaded files', 'Test document answers', 'Inspect chunks', 'Upload an updated file'],
  },
  {
    title: 'Document file detail',
    path: '/app/documents/:id/files/:docId',
    section: 'Contacts',
    audience: 'Knowledge managers',
    capability: 'knowledge_bases',
    summary: 'Review a specific file inside a knowledge document and inspect its processing or extraction output.',
    primaryActions: ['Open file metadata', 'Inspect extracted content', 'Troubleshoot processing issues'],
  },
  {
    title: 'Schedules',
    path: '/app/schedules',
    section: 'Scheduling',
    audience: 'Campaign schedulers',
    capability: 'scheduling',
    summary: 'Review one-time scheduled sends, upcoming activity, and schedule execution status.',
    primaryActions: ['Search schedules', 'Open schedule detail', 'Cancel or inspect a scheduled send'],
  },
  {
    title: 'Schedule detail',
    path: '/app/schedules/:id',
    section: 'Scheduling',
    audience: 'Campaign schedulers',
    capability: 'scheduling',
    summary: 'Inspect one scheduled send, including audience, timing, content, and execution result.',
    primaryActions: ['Review schedule timing', 'Check recipients and content', 'Inspect execution status'],
  },
  {
    title: 'Recurring schedules',
    path: '/app/recurring-schedules',
    section: 'Scheduling',
    audience: 'Campaign schedulers',
    capability: 'scheduling',
    summary: 'Manage repeating campaign or message schedules and review their upcoming runs.',
    primaryActions: ['Search recurring schedules', 'Create a recurring schedule', 'Open future instances', 'Edit recurrence rules'],
  },
  {
    title: 'New recurring schedule',
    path: '/app/recurring-schedules/new',
    section: 'Scheduling',
    audience: 'Campaign schedulers',
    capability: 'scheduling',
    summary: 'Create a recurring schedule with repeat rules, audience, sender, and campaign content.',
    primaryActions: ['Choose repeat frequency', 'Select audience and content', 'Preview upcoming runs', 'Save schedule'],
    animation: true,
  },
  {
    title: 'Edit recurring schedule',
    path: '/app/recurring-schedules/:id/edit',
    section: 'Scheduling',
    audience: 'Campaign schedulers',
    capability: 'scheduling',
    summary: 'Update recurrence rules, recipients, or content for a repeating schedule.',
    primaryActions: ['Review existing recurrence', 'Change schedule settings', 'Preview future runs', 'Save changes'],
    animation: true,
  },
  {
    title: 'Recurring schedule detail',
    path: '/app/recurring-schedules/:id',
    section: 'Scheduling',
    audience: 'Campaign schedulers',
    capability: 'scheduling',
    summary: 'Review a recurring schedule, its configuration, upcoming instances, and recent execution history.',
    primaryActions: ['Inspect recurrence settings', 'Review upcoming instances', 'Open execution history', 'Decide whether to edit'],
  },
  {
    title: 'Voice messages',
    path: '/app/announcements',
    section: 'Campaigns',
    audience: 'Campaign creators',
    capability: 'campaigns',
    summary: 'Manage prerecorded or generated voice messages used in campaign sends.',
    primaryActions: ['Create a voice message', 'Review existing messages', 'Select a recording for a campaign'],
  },
  {
    title: 'Recordings',
    path: '/app/audio-files',
    section: 'Campaigns',
    audience: 'Campaign creators',
    capability: 'campaigns',
    summary: 'Manage uploaded audio assets and recordings that campaigns can use.',
    primaryActions: ['Upload audio', 'Preview a recording', 'Verify audio readiness', 'Reuse audio in campaigns'],
  },
  {
    title: 'Static calls',
    path: '/app/static-calls',
    section: 'Campaigns',
    audience: 'Campaign creators',
    capability: 'campaigns',
    summary: 'Review legacy or static call workflows that support voice campaign sending.',
    primaryActions: ['Open static call records', 'Review configuration', 'Use records for campaign troubleshooting'],
  },
  {
    title: 'New campaign',
    path: '/app/campaigns/new',
    section: 'Campaigns',
    audience: 'Campaign creators',
    capability: 'campaigns',
    summary: 'Compose a campaign by choosing the campaign type, audience, message, sender, variables, and review settings.',
    primaryActions: ['Choose campaign type', 'Select contacts', 'Configure message and variables', 'Review and send'],
    animation: true,
  },
  {
    title: 'All campaigns',
    path: '/app/bulk-dispatch-jobs',
    section: 'Campaigns',
    audience: 'Campaign managers',
    capability: 'campaigns',
    summary: 'Track sent campaigns, dispatch jobs, delivery progress, and completion status.',
    primaryActions: ['Search dispatched campaigns', 'Filter by status', 'Open campaign detail', 'Review failures'],
  },
  {
    title: 'Campaign detail',
    path: '/app/bulk-dispatch-jobs/:id',
    section: 'Campaigns',
    audience: 'Campaign managers',
    capability: 'campaigns',
    summary: 'Inspect one dispatched campaign, including recipient progress, failures, analytics, and run details.',
    primaryActions: ['Review delivery progress', 'Inspect failed recipients', 'Export or compare results', 'Open analytics context'],
  },
  {
    title: 'Campaign analytics',
    path: '/app/campaign-analytics',
    section: 'Campaigns',
    audience: 'Campaign managers',
    capability: 'campaigns',
    summary: 'Analyze campaign delivery, channel trends, call outcomes, and performance over time.',
    primaryActions: ['Set a reporting period', 'Compare campaign outcomes', 'Review trends', 'Use results to improve the next campaign'],
  },
  {
    title: 'Messaging connections',
    path: '/app/messaging/connections',
    section: 'Messaging',
    audience: 'Messaging operators',
    capability: 'messaging',
    summary: 'Connect and manage messaging accounts such as WhatsApp and Telegram.',
    primaryActions: ['Add a connection', 'Check connection health', 'Open connection detail', 'Reconnect when required'],
    animation: true,
  },
  {
    title: 'Messaging connection detail',
    path: '/app/messaging/connections/:id',
    section: 'Messaging',
    audience: 'Messaging operators',
    capability: 'messaging',
    summary: 'Inspect one messaging connection, its channel settings, QR or auth state, health, and analytics.',
    primaryActions: ['Review connection state', 'Complete QR authentication', 'Check delivery analytics', 'Disconnect or troubleshoot'],
    animation: true,
  },
  {
    title: 'Messaging templates',
    path: '/app/messaging/templates',
    section: 'Messaging',
    audience: 'Messaging operators',
    capability: 'messaging',
    summary: 'Review and manage reusable message templates used for outbound messaging workflows.',
    primaryActions: ['Search templates', 'Review template variables', 'Confirm approval or readiness', 'Use a template in a send'],
  },
  {
    title: 'Messages',
    path: '/app/messaging/messages',
    section: 'Messaging',
    audience: 'Messaging operators',
    capability: 'messaging',
    summary: 'Send and review outbound messages, delivery state, and follow-up message activity.',
    primaryActions: ['Send a message', 'Filter message history', 'Open message detail', 'Start follow-up from context'],
  },
  {
    title: 'Message detail',
    path: '/app/messaging/messages/:id',
    section: 'Messaging',
    audience: 'Messaging operators',
    capability: 'messaging',
    summary: 'Review a single message, including recipient, channel, template, payload, delivery state, and error context.',
    primaryActions: ['Review message payload', 'Inspect delivery status', 'Troubleshoot failed delivery', 'Open related thread'],
  },
  {
    title: 'SIP connection detail',
    path: '/app/sip/connections/:id',
    section: 'Voice',
    audience: 'Telephony admins',
    capability: 'sip and custom_sip flag',
    summary: 'Inspect one SIP connection and review configuration required for reliable telephony routing.',
    primaryActions: ['Review SIP settings', 'Check connection status', 'Update routing configuration', 'Test with a call'],
  },
  {
    title: 'Team',
    path: '/app/team',
    section: 'Administration',
    audience: 'Workspace admins',
    summary: 'Invite teammates, manage roles, and review team membership.',
    primaryActions: ['Invite a user', 'Change a role', 'Remove access', 'Confirm team analytics'],
  },
  {
    title: 'Accounts',
    path: '/app/accounts',
    section: 'Administration',
    audience: 'Workspace admins',
    summary: 'Manage account records and billing-related account organization used by the workspace.',
    primaryActions: ['Review accounts', 'Create an account', 'Open account details', 'Confirm ownership'],
  },
  {
    title: 'Credits',
    path: '/app/credits',
    section: 'Administration',
    audience: 'Workspace admins and finance users',
    summary: 'Review credit balance, consumption, pricing, and recharge readiness.',
    primaryActions: ['Check available credits', 'Review usage', 'Estimate upcoming spend', 'Plan recharge timing'],
  },
  {
    title: 'API keys',
    path: '/app/api-keys',
    section: 'Administration',
    audience: 'Developers and admins',
    summary: 'Create and manage API keys used by external systems to access MagickVoice APIs.',
    primaryActions: ['Create an API key', 'Copy a new key once', 'Rotate a key', 'Delete unused keys'],
  },
  {
    title: 'Audit log',
    path: '/app/audit-log',
    section: 'Administration',
    audience: 'Workspace admins and compliance users',
    summary: 'Search workspace audit events to understand who changed what and when.',
    primaryActions: ['Filter by actor or event', 'Review event details', 'Investigate configuration changes', 'Export evidence where needed'],
  },
  {
    title: 'Settings',
    path: '/app/settings',
    section: 'Administration',
    audience: 'Workspace admins',
    summary: 'Manage tenant-level settings and workspace configuration.',
    primaryActions: ['Review workspace settings', 'Update tenant details', 'Save configuration changes', 'Verify changes in audit log'],
  },
  {
    title: 'Phone numbers',
    path: '/app/phone-numbers',
    section: 'Administration',
    audience: 'Telephony admins',
    summary: 'Manage phone numbers available for calls, campaigns, and sender selection.',
    primaryActions: ['Review available numbers', 'Assign or release numbers', 'Check number readiness', 'Use numbers in campaigns'],
  },
  {
    title: 'Super admin home',
    path: '/super-admin',
    section: 'Super Admin',
    audience: 'Super admins',
    summary: 'Open the default super-admin tenant operations view for platform-level customer management.',
    primaryActions: ['Search tenants', 'Open tenant detail', 'Review tenant health', 'Navigate platform tools'],
  },
  {
    title: 'Super admin tenants',
    path: '/super-admin/tenants',
    section: 'Super Admin',
    audience: 'Super admins',
    summary: 'Review and manage tenants from the explicit tenant route.',
    primaryActions: ['Search tenants', 'Open tenant detail', 'Compare tenant state', 'Investigate customer issues'],
  },
  {
    title: 'Super admin tenant detail',
    path: '/super-admin/tenants/:id',
    section: 'Super Admin',
    audience: 'Super admins',
    summary: 'Inspect a tenant, its usage, feature flags, governance, users, and operational state.',
    primaryActions: ['Review tenant profile', 'Inspect feature access', 'Check usage or credits', 'Investigate tenant-specific issues'],
  },
  {
    title: 'Super admin users',
    path: '/super-admin/users',
    section: 'Super Admin',
    audience: 'Super admins',
    summary: 'Search platform users and investigate account-level access questions.',
    primaryActions: ['Search users', 'Review user identity', 'Find tenant membership', 'Investigate access problems'],
  },
  {
    title: 'Super admin admins',
    path: '/super-admin/admins',
    section: 'Super Admin',
    audience: 'Super admins',
    summary: 'Manage the set of users with super-admin permissions.',
    primaryActions: ['Review admin list', 'Add an admin when approved', 'Remove admin access', 'Confirm changes in audit logs'],
  },
  {
    title: 'Super admin providers',
    path: '/super-admin/providers',
    section: 'Super Admin',
    audience: 'Super admins',
    summary: 'Inspect provider configuration and platform-level integrations.',
    primaryActions: ['Review providers', 'Check provider health', 'Inspect configuration', 'Investigate provider issues'],
  },
  {
    title: 'Super admin phone numbers',
    path: '/super-admin/phone-numbers',
    section: 'Super Admin',
    audience: 'Super admins',
    summary: 'Manage phone numbers at platform scope across tenants.',
    primaryActions: ['Search numbers', 'Review tenant assignment', 'Investigate availability', 'Resolve number conflicts'],
  },
  {
    title: 'Super admin feature flags',
    path: '/super-admin/feature-flags',
    section: 'Super Admin',
    audience: 'Super admins',
    summary: 'Control feature flag rollout and tenant-specific feature access.',
    primaryActions: ['Search flags', 'Review rollout state', 'Apply tenant override', 'Verify flag behavior'],
  },
  {
    title: 'Super admin governance',
    path: '/super-admin/governance',
    section: 'Super Admin',
    audience: 'Super admins',
    summary: 'Manage governance capabilities and entitlement controls that determine what tenants can use.',
    primaryActions: ['Review capabilities', 'Adjust tenant access', 'Confirm dependencies', 'Audit governance changes'],
  },
  {
    title: 'Super admin usage',
    path: '/super-admin/usage',
    section: 'Super Admin',
    audience: 'Super admins',
    summary: 'Analyze platform usage across tenants for operational and billing insight.',
    primaryActions: ['Set usage period', 'Compare tenant usage', 'Identify anomalies', 'Open tenant detail for follow-up'],
  },
  {
    title: 'Super admin audit',
    path: '/super-admin/audit',
    section: 'Super Admin',
    audience: 'Super admins',
    summary: 'Search platform-level audit events for investigation, compliance, and support escalation.',
    primaryActions: ['Filter audit events', 'Review event payloads', 'Trace actor activity', 'Export or record evidence'],
  },
];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function overviewWorkflow(page: PageSeed): Workflow {
  const guidance = sectionGuidance[page.section];
  return {
    title: `Use this page to ${guidance.workflowVerb}`,
    goal: `Understand what is available on ${page.title} and choose the right next action.`,
    steps: [
      `Open ${page.title} from the ${page.section} area of MagickVoice.`,
      `Read the page heading, description, and any status message before selecting an action.`,
      `Choose the common task that matches what you came to do and follow the labels shown on screen.`,
      `Review any summary, warning, or confirmation before completing an action that changes data.`,
      `After the action finishes, look for a confirmation message or updated status before leaving the page.`,
    ],
  };
}

function toDoc(seed: PageSeed): DocPage {
  const id = slugify(seed.title);
  return {
    id,
    title: seed.title,
    section: seed.section,
    appPath: seed.path,
    audience: seed.audience,
    summary: seed.summary,
    capability: seed.capability,
    primaryActions: seed.primaryActions,
    workflows: seed.workflows ?? [overviewWorkflow(seed)],
    tips: [...sectionGuidance[seed.section].tips, ...(seed.tips ?? [])],
    asset: {
      screenshot: `/assets/screenshots/${id}.png`,
      screenshots: seed.screenshots,
      compact: seed.compactScreenshot,
      animation: seed.animation ? `/assets/animations/${id}.webm` : undefined,
    },
    related: [],
  };
}

const docsWithoutRelated = pages.map(toDoc);

export const docs: DocPage[] = docsWithoutRelated.map((page) => ({
  ...page,
  related: docsWithoutRelated
    .filter((candidate) => candidate.section === page.section && candidate.id !== page.id)
    .slice(0, 4)
    .map((candidate) => candidate.id),
}));

export const sections: SectionId[] = [
  'Access',
  'Overview',
  'Voice',
  'Phone Menus',
  'Automations',
  'Campaigns',
  'Messaging',
  'Scheduling',
  'Contacts',
  'Administration',
  'Super Admin',
];

export function getDocById(id: string): DocPage {
  return docs.find((doc) => doc.id === id) ?? docs[0];
}
