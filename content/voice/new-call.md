---
title: New call
appPath: /app/calls/new
audience: Voice operators
order: 2
summary: Configure and launch one outbound AI call with the recipient, caller ID, script, quality, recording, and scheduling controls in one guided form.
primaryActions:
  - Enter the recipient
  - Choose the displayed caller ID
  - Select the script and AI quality
  - Schedule or start one call
tips:
  - Use this page for one recipient. For a group of recipients, select Try the Campaign Composer instead of repeating individual calls.
  - Cancel leaves the setup screen without placing a call. Starting a call is an external action, so review the caller ID, recipient, and script together before selecting it.
screenshots:
  - src: /assets/screenshots/new-call-form.png
    alt: Initiate Call form with recipient, caller ID, prompt, and AI quality fields
    label: The form keeps the launch button unavailable until every required call setting is complete.
compactScreenshot: true
---

## Set up a single AI call

Provide the information the AI needs to call the right person from the right number.

1. In Who are we calling?, enter Phone number with the country code, for example +91 for India. This field is required.
2. Optionally enter Their name. It helps the AI greet the recipient more personally.
3. Choose Call from. This is the MagickVoice number the recipient sees when the phone rings. If the selector is still loading, wait for the workspace phone numbers to load rather than entering a number manually.
4. Under What should the AI say?, choose a Prompt template. A template is the reusable script that directs the AI during the conversation.
5. Choose the AI quality that matches the conversation. Higher tiers are described on screen as more natural and better at handling conversation. Then choose a Voice after selecting a quality tier.

## Choose call behavior and launch time

Make the one-off call with the intended safeguards.

1. Select a Language only when the prompt is configured to use it. Selecting a language makes it available, but the prompt instructions must explicitly tell the agent to speak that language.
2. Leave Record this call on when you need an audio copy for review. The screen notes that recording has a small additional charge.
3. Turn on Detect answering machines when voicemail detection is useful. Use Attach automations or Advanced settings only when your workflow requires them; advanced settings are for reference ID and developer options.
4. Choose Send Now to place the call after review, or Schedule for Later to choose a future date and time.
5. Read the helper line above the action buttons. It lists every missing requirement. Start call now becomes available only after valid phone number, caller ID, prompt template, and AI pipeline are set.
