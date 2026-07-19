---
title: Automations
appPath: /app/automations
audience: Operations users
order: 1
summary: Manage post-call follow-up automations — chained actions that send a Telegram, WhatsApp, or email message, or call a webhook, after a call completes, conditional on the call outcome, IVR responses, or analysis results. The same automation can be reused across single calls, bulk dispatches, and schedules.
primaryActions:
  - Create a new automation
  - Review the automations table
  - Open an automation's detail and run history
  - Edit or delete an automation
tips:
  - An automation only fires on events in the tenant it was created in; switch to the right tenant before you build it.
  - Every message channel needs a matching messaging connection first (Telegram bot, WhatsApp number, or email domain), so set those up on [Messaging connections](/docs/messaging-connections) before you expect a step to send.
screenshots:
  - src: /assets/screenshots/automations-list.png
    alt: Automations page with a New Automation button, a page guide explaining triggers, conditions, and action steps, and a table listing automations with Name, Trigger, Steps, Status, Version, and Updated columns plus Run history, Edit, and Delete row actions
    label: The Automations page lists every automation in the current tenant, showing each one's trigger, step count, status, version, and when it was last updated. Each row has Run history, Edit, and Delete actions.
  - src: /assets/screenshots/automations-empty.png
    alt: Automations page empty state reading "No automations yet" with a Create Automation shortcut
    label: Before you create one, the page shows an empty state with a Create Automation shortcut. The page guide above explains how triggers, conditions, and action steps fit together.
compactScreenshot: true
---

## Understand what an automation does

Know what the feature is for before you build one, so the trigger and actions you pick match the follow-up you want.

1. An automation chains **follow-up actions** that run after a call finishes — send a Telegram, WhatsApp, or email message, or call a webhook — without anyone doing it by hand.
2. Each automation has three parts: a **trigger** (the event that starts it, such as an AI call completing), optional **conditions** (rules on the call outcome, IVR responses, or analysis results that must match), and one or more **action steps** (what gets sent). An action step sends on one of five channels — Telegram, WhatsApp, WhatsApp Personal, Email, or a Webhook — and the four message channels send through the accounts you set up on [Messaging connections](/docs/messaging-connections).
3. The same automation is reusable. Attach it to a single call, a bulk dispatch, or a schedule, and it runs for every matching event across those dispatches.
4. Read the **page guide** at the top of the page for a short refresher; use the **Hide page guide** control to collapse it once you are familiar with the feature.

## Review your automations

Keep track of what is set up and which automations are live before adding more.

1. Open **Automations** from the sidebar. The table lists every automation in the current tenant with its **Name**, **Trigger**, **Steps** count, **Status** (Enabled or Disabled), **Version**, and when it was **Updated**. Confirm you are in the intended tenant (shown in the top bar) — automations only fire on events within the tenant they belong to.
2. Before you create your first one, the page shows **No automations yet** with a **Create Automation** shortcut instead of the table.
3. Select a row — or its **Run history** action — to open the [automation detail](/docs/automation-detail) page for its summary and run history. Select **Edit** on a row to open the flow in the builder.
4. Use **New Automation** in the top right to start building; this opens the visual builder on a fresh draft. See [Create or edit an automation](/docs/new-automation).

## Delete an automation

Remove an automation you no longer need, understanding what happens to runs already under way.

1. Select **Delete** on the automation's row.
2. Confirm in the dialog. It warns that the deletion cannot be undone, that in-flight runs referencing the automation will still complete, and that new dispatches will not fire it.
3. To stop an automation firing without deleting it, edit it and clear its **Status** instead — that keeps the configuration for later.
