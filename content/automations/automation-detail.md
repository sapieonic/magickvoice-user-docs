---
title: Automation detail
appPath: /app/automations/:id
audience: Operations users
order: 3
summary: Review one automation at a glance — its trigger, status, step count, and version — and read its run history for evidence of what happened when it fired. The jump-off point to edit the flow.
primaryActions:
  - Check the trigger, status, steps, and version
  - Read the run history
  - Open a run for detail
  - Edit the automation
screenshots:
  - src: /assets/screenshots/automation-detail.png
    alt: Automation detail page showing a breadcrumb, the automation name, Back and Edit buttons, summary tiles for Trigger, Status, Steps, and Version, and a Run history section reading "No runs yet"
    label: The detail page summarizes the automation — Trigger, Status, Steps, and Version tiles — and lists its Run history below. It is read-only; use Edit to change the flow in the builder.
compactScreenshot: true
---

## Review an automation at a glance

Confirm what an automation is set to do without opening the full builder.

1. Open the detail page by selecting an automation's row on the [Automations](/docs/automations) list, or the **Run history** action on that row. The breadcrumb reads Automations > the automation name, and the name is the page title.
2. Read the summary tiles: **Trigger** (the event it fires on, such as *After AI call completes*), **Status** (**Enabled** or **Disabled**), **Steps** (how many action steps it runs), and **Version** (for example *v1*).
3. Confirm the tenant shown in the top bar matches where the calls happen — an automation only reacts to events within its own tenant.
4. Use **Back** to return to the list, or **Edit** to open the flow in the builder.

## Read the run history

Use the run history as evidence of what the automation actually did when events fired.

1. Find the **Run history** section below the summary; the count beside it shows how many runs have been recorded.
2. When the automation has not fired yet — because it is disabled, unattached, or no matching event has occurred — the section reads **No runs yet**, with a note that runs appear once matching events fire and the automation is attached to calls.
3. Once runs exist, review them here to see whether each fired, matched its conditions, and sent — the same outcome the [Dry-run preview](/docs/new-automation) estimates before enabling.

## Decide what to do next

Move from reviewing to acting once you know the automation's state.

1. Select **Edit** to change the trigger, conditions, or steps — see [Create or edit an automation](/docs/new-automation).
2. To turn follow-ups on or off without losing the configuration, open it in the builder and toggle **Status**.
3. Check that each message step still points at a live [messaging connection](/docs/messaging-connections) if sends are unexpectedly failing.
