---
title: Schedules
appPath: /app/schedules
audience: Campaign schedulers
order: 1
capability: scheduling
summary: 'View every one-time scheduled campaign — calls and messages set to go out at a future date and time. Schedules are created from the Campaign Composer or the Messages page by choosing "Schedule for Later"; this page lists them with their type, status, and planned time, and lets you open one for contact-level outcomes or cancel it before it runs.'
primaryActions:
  - Review upcoming one-time sends
  - Filter by status and type
  - Open a schedule for contact outcomes
  - Cancel a schedule before it runs
tips:
  - Schedules are created from a call or messaging page — choose "Schedule for Later" there. This page is where you track and manage them afterward.
  - You can cancel a scheduled campaign any time before it starts executing.
screenshots:
  - src: /assets/screenshots/schedules.png
    alt: Schedules page with a page guide explaining scheduled campaigns, status and type filter dropdowns, and an empty state reading "No schedules found" with an Open the Campaign Composer link
    label: The Schedules page lists one-time scheduled campaigns. Filters narrow by status and type; when nothing is scheduled it shows an empty state pointing to the Campaign Composer.
---

## Understand what a schedule is

Know what this page tracks so you look in the right place.

1. A schedule is a **one-time campaign set to go out at a future date and time** — calls or messages that have not run yet.
2. Schedules are **created elsewhere**: from the [Campaign Composer](/docs/new-campaign) (AI voice, voice message, or IVR calls) or from Messages (WhatsApp/Email), by choosing **Schedule for Later**. This page is where you review and manage them.
3. Each schedule shows its **type** (AI Voice, IVR, Static Call, or WhatsApp), its **status**, and its planned time.
4. For repeating sends on a daily, weekly, or monthly cadence, use [Recurring schedules](/docs/recurring-schedules) instead.

## Review and filter schedules

Find the scheduled send you care about.

1. Open **Schedules** from the sidebar. Confirm the tenant in the top bar — schedules belong to the tenant they were created in.
2. Filter by **status** — Scheduled, Executing, Completed, Partially Failed, Failed, or Cancelled — using the first dropdown.
3. Filter by **type** — AI Voice, IVR, Static Call, or WhatsApp — using the second dropdown.
4. Select **Refresh** to pull the latest state.
5. Before anything is scheduled, the page shows **No schedules found** with an **Open the Campaign Composer** shortcut.

## Open or cancel a schedule

Move from the list to one schedule, or stop it before it runs.

1. Select a schedule to open its [schedule detail](/docs/schedule-detail) page, where you can see individual contact outcomes and retry history.
2. To stop a scheduled campaign that has not started yet, cancel it — you can cancel any time before it begins executing.
3. To create a new scheduled send, go to the [Campaign Composer](/docs/new-campaign) and choose **Schedule for Later**.
