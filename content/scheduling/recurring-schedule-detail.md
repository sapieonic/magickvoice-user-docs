---
title: Recurring schedule detail
appPath: /app/recurring-schedules/:id
audience: Campaign schedulers
order: 6
capability: scheduling
summary: 'Review one recurring schedule at a glance — its status, type, cadence, timezone, start and end dates, retry setting, run counts, last run, and next fire — and read its execution history. The jump-off point to edit, pause, resume, or cancel the schedule.'
primaryActions:
  - Read the recurrence configuration
  - Check run counts and next fire
  - Review execution history
  - Edit, pause, resume, or cancel
tips:
  - "Next Fire and Last Run tell you at a glance whether the schedule is producing runs on its cadence."
  - Pause a schedule to stop it temporarily; cancelling is permanent and creates no future instances.
screenshots:
  - src: /assets/screenshots/recurring-schedule-detail.png
    alt: Recurring schedule detail page showing the name, an Active status pill, Edit/Pause/Cancel buttons, a Recurrence Configuration grid (Status, Schedule Type, Frequency, Recurrence, Timezone, Start/End dates, Retry, Total Runs, Last Run, Next Fire, Created), and an Execution History section reading "No executions yet"
    label: The detail page summarizes the schedule — status, type, cadence, dates, retry, and run counters — and lists its execution history below. Edit, Pause, and Cancel act on the schedule.
compactScreenshot: true
---

## Review the schedule at a glance

Confirm what a recurring schedule is set to do without opening the editor.

1. Open the detail page by selecting a schedule's row on the [Recurring schedules](/docs/recurring-schedules) list. The breadcrumb reads Recurring Schedules > the schedule name.
2. Read the **Recurrence Configuration** grid: **Status** (Active, Paused, or Cancelled), **Schedule Type**, **Frequency**, the human-readable **Recurrence** (for example *Every day at 09:00*), **Timezone**, **Start Date**, **End Date** (or *Indefinite*), and **Retry**.
3. Check the run counters: **Total Runs**, **Last Run** (or *Never*), **Next Fire**, and **Created**.
4. Confirm the tenant in the top bar matches where the calls or messages should go.

## Read the execution history

Use the history as evidence of what the schedule actually did.

1. Find the **Execution History** section; the count beside it shows how many instances have run.
2. When the schedule has not fired yet, it reads **No executions yet** with a note that the first instance appears after the next scheduled fire.
3. Once instances exist, review them to see how each run went, and drill into individual runs for their contact-level outcomes.

## Act on the schedule

Move from reviewing to managing the schedule.

1. Select **Edit** to change the cadence, recipients, or content — see [Edit recurring schedule](/docs/edit-recurring-schedule).
2. Select **Pause** to stop the schedule temporarily (resume it later), or **Cancel** to stop it permanently.
3. Cancelling asks for confirmation and warns that **no future instances will be created**, though existing instances are not affected.
