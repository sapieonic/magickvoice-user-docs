---
title: Automation detail
appPath: /app/automations/:id
audience: Operations users
order: 4
summary: Review a single automation's configuration and status, and use it as the jump-off point to edit the flow, enable or disable it, or open the builder's Dry-run to preview behavior.
primaryActions:
  - Check the trigger, conditions, and steps
  - Confirm whether the automation is enabled
  - Open the builder to edit
  - Preview behavior with Dry-run
---

## Review a single automation

Confirm what an automation is set to do before you rely on it or change it.

1. Open the automation from the **Automations** list. The detail view shows its name and description, the **trigger** it fires on, the **workflow conditions** that gate it, and the **action steps** in order — each with its channel and, for message channels, the [messaging connection](/docs/messaging-connections) it sends through.
2. Check whether it is **enabled** — a disabled automation is saved but does not fire on matching events.
3. Verify the tenant shown in the top bar matches where the calls happen; an automation only reacts to events within its own tenant.

## Decide what to do next

Move from reviewing to acting once you know the automation's current state.

1. Open the builder to **edit** the trigger, conditions, or steps when the flow needs to change.
2. Use the builder's **Dry-run** view to preview what the automation would do against sample data or a recent run, without sending anything or spending credits.
3. Enable or disable the automation to turn follow-ups on or off without deleting the configuration.
