---
title: Create or edit a phone menu
appPath: /app/ivr-workflows/new
audience: IVR builders
order: 2
capability: ivr
summary: 'Build a new IVR workflow from a template or a blank canvas, or edit an existing one, in the same visual builder: a step palette on the left, the call-flow canvas in the middle, the selected step’s settings on the right, and a dock for problems, variables, and a no-cost simulator.'
primaryActions:
  - Start from a template or blank canvas
  - Add and connect call steps
  - Configure each step’s settings and routes
  - Simulate, resolve problems, and save
tips:
  - New and edit use the same builder and the same steps; an edit changes the workflow that live calls follow, so treat it as affecting callers already routed through it.
  - Give every step a clear Title and a stable Step ID — routes wire to the Step ID, so renaming or removing a step can break the branches that point to it.
  - Test the no-input and invalid-input paths in the Simulator; they are the most common places callers get stuck.
screenshots:
  - src: /assets/screenshots/ivr-workflow-templates.png
    alt: 'Start a workflow dialog with template cards: Blank workflow, Greeting to talk to AI, Press-1 phone menu, Verify a code, and Satisfaction survey'
    label: 'A new workflow starts with a template picker: pick a ready-made flow such as Press-1 phone menu, or choose Blank workflow for an empty canvas.'
  - src: /assets/screenshots/ivr-builder.png
    alt: IVR builder showing the Add to the call step palette, the call-flow canvas, the Play message step inspector, and the Problems dock
    label: 'The builder is the same for creating and editing: the step palette on the left, the call flow on the canvas, the selected step’s settings on the right, and the Problems / Variables / Simulator dock below.'
---

## Choose a starting point

Begin with a structure that matches the call flow, whether the workflow is new or an edit.

1. For a new workflow, select Create workflow from Phone Menus, then pick a template — Blank workflow, Greeting → talk to AI, Press-1 phone menu, Verify a code, or Satisfaction survey. Each template card shows how many steps it starts with.
2. To change an existing workflow, select Edit on its row. The builder opens on the same canvas; a header shows the workflow name, the step count, and whether the flow is ready to save.
3. Give the workflow a clear name in the name field at the top so it is easy to find later.

## Build the caller’s journey

Lay out the steps a caller moves through, from greeting to a final destination.

1. From the Add to the call palette, add steps: Play message (speak text-to-speech or an uploaded clip), Gather input (ask the caller to press keys and save the result to a variable), Decision (branch on a collected value), Webhook (call an external service mid-call), AI handoff (connect the live caller to an AI assistant — a terminal step), and Hang up (end the call, optionally with a final message).
2. Select any step on the canvas to edit it in the right-hand inspector. For a Play message step you set the Title, the required Step ID (used to wire routes), what the caller hears, and the Language and Voice; High-quality audio pre-generates natural-sounding speech instead of the phone network’s robotic text-to-speech.
3. Routes read in caller language on the canvas — “if the caller presses 1”, “no input”, “otherwise” — so the branches show exactly how a caller reaches each step.
4. Use Undo and Redo while you arrange steps. Only blocking problems stop you saving; reachability and variable hints are advisory.

## Step type — Play message (Speak)

Speak something to the caller — a greeting or read-out information — then continue down the call line. Plays text-to-speech or an uploaded audio clip.

1. What the caller hears: the text spoken via text-to-speech. Use {{variable}} to insert values collected earlier in the call.
2. Language and Voice: the language and voice used to speak the message; leave on Default to inherit the workflow’s settings.
3. High-quality audio: pre-generates natural-sounding speech through the provider instead of the phone network’s robotic text-to-speech, and falls back to standard audio if it cannot be generated.
4. Audio file: choose an uploaded clip to play instead of the text — upload clips under Audio Files first. Advanced options add a Loop count to repeat the message before continuing (defaults to once).
5. Use it to open the call, read back information, or bridge between steps.

## Step type — Gather input (Listen)

Ask the caller to press keys and save what they enter into a variable you can branch on later — a menu choice, an OTP, or any keypad input.

1. What the caller hears: the prompt played before input, for example “Press 1 for sales, or 2 for support.” Supports {{variable}} personalization.
2. Save the answer as: the required variable name the keypad input is stored under (for example menu_choice) so later steps can test it or pass it to the AI.
3. Digits: how many keypad digits to collect (1–20). Timeout: seconds to wait for input before treating it as no input (1–120). Retries: how many times to re-prompt after no input (0–10).
4. If the caller gives no input: where to send the caller after they run out of retries; leave blank to continue down the call line.
5. Language, Voice, and High-quality audio behave as they do for Play message. Use it whenever the flow needs a decision or data from the caller.

## Step type — Decision (Decide)

Route the caller differently based on a collected value — “if they pressed 1, do this; otherwise, do that.” Adds no audio; it only chooses a path.

1. Decide based on: the collected variable to test (for example menu_choice). Every rule below compares this value.
2. Rules: each rule is an operator — Equals, Not equals, In (list), Greater than, or Less than — a value, and a destination step. Each rule peels off the canvas as a labeled detour, and the first matching rule wins.
3. Otherwise (no rule matched): the catch-all destination when no rule matches; leave blank to continue down the call line to the next step.
4. Use Add rule to add more branches. Use it right after a Gather input step to send each keypad choice to the right place.

## Step type — Webhook (Decide)

Call an external service mid-call to fetch or send data — for example look up an account — and optionally save the response and reroute on failure.

1. Endpoint URL (required) and Method (POST or GET): the service to call; use {{variable}} in the URL to pass collected values.
2. If the request fails: where to send the caller if the service errors or times out.
3. Advanced — Save response as: store the response (or a field of it) under a name for later steps. Request body: a JSON template sent with the request, using {{variable}} placeholders.
4. Advanced — Timeout (500–30000 ms) and Retries (0–5) control how long to wait and how many times to retry. Wait message plays to the caller while the request runs.
5. Use it to personalize the flow with live data, such as branching on an account status returned by your system.

## Step type — AI handoff (Connect)

End the IVR and connect the live caller to an AI assistant on the same line. A terminal step — nothing runs after it — and variables collected earlier flow into the AI prompt automatically.

1. AI prompt template (required): the call script the AI agent uses once it takes over; choose one of your saved Call Scripts.
2. AI’s opening line: the first thing the AI says when it takes over, with {{variable}} personalization.
3. Prompt variables: map collected values into the prompt — the builder offers quick chips such as {{menu_choice}} for the values already gathered.
4. Advanced — AI quality sets an optional quality tier (Bronze through Platinum, or the server default) and Language sets the language the AI converses in.
5. Use it to let callers self-serve through the menu and then talk to the AI for anything the menu cannot handle.

## Step type — Hang up (End)

End the call cleanly, optionally after a final message. A terminal step — the call ends here.

1. Final message: an optional line played to the caller right before the call ends, for example “Thanks for calling. Goodbye!”
2. Language and Voice control how that final message is spoken.
3. Use it to close every branch of the flow so callers always reach a defined ending rather than dropping off unexpectedly.

## Simulate, resolve problems, and save

Confirm the flow routes correctly before it handles live callers.

1. Open the Problems tab in the dock. Items there are clickable and jump straight to the step that needs attention — for example “Webhook step needs a valid URL”, “prompt_template_id is required”, or a step that “can’t be reached from the start of the flow”. The flow is ready to save when it reports no blocking problems.
2. Use the Variables tab to review the values the flow collects and references, such as menu_choice.
3. Open the Simulator, set the sample call details (for example a phone value and a menu_choice), and select Run call to walk the flow step by step. Nothing is dialed and no credits are spent.
4. Select Save once the flow is correct. For a significant edit to a live workflow, simulate the revised routing first, since an edit changes the flow that future calls will follow.
