---
title: Schedule detail
appPath: /app/schedules/:id
audience: Campaign schedulers
order: 2
capability: scheduling
summary: 'Inspect one scheduled campaign — its timing, recipients, and the content it will send — and, once it has run, the individual contact outcomes and retry history. The place to confirm a scheduled send is set up correctly, or to review how it went.'
primaryActions:
  - Review the schedule's timing and status
  - Check recipients and content
  - Read contact-level outcomes after it runs
  - Review retry history
tips:
  - A scheduled send does not run until its planned time — until then this page shows what will happen rather than results.
  - Cancel a schedule from here (or the list) before it starts executing if you need to stop it.
---

## Review the scheduled send

Confirm what a schedule will do, and when, before it runs.

1. Open the detail page by selecting a schedule on the [Schedules](/docs/schedules) list.
2. Review the schedule's **timing** (the planned date, time, and timezone) and its current **status** — for example Scheduled, Executing, Completed, or Cancelled.
3. Check the **recipients** and the **content** it will send — the voice message, AI call script, phone menu, or message — so you know it is set up the way you intended.
4. Confirm the tenant in the top bar matches where the calls or messages should go.

## Read outcomes after it runs

Use the detail page as evidence once the scheduled send has executed.

1. After the schedule fires, review the **individual contact outcomes** — whether each recipient connected, and how the call or message ended.
2. Check the **retry history** for any recipients the system retried after a failure.
3. For an overview across many sends rather than this one, open [Campaign analytics](/docs/campaign-analytics); for the campaign's full per-call breakdown, see its [campaign detail](/docs/campaign-detail).

## Manage the schedule

Act on the schedule from its detail page.

1. To stop a scheduled campaign that has not started, **cancel** it — you can cancel any time before it begins executing.
2. To set up repeating sends instead of a single future run, create a [recurring schedule](/docs/new-recurring-schedule).
3. Return to the [Schedules](/docs/schedules) list to review your other scheduled sends.
