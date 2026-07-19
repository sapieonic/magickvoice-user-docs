---
title: Edit recurring schedule
appPath: /app/recurring-schedules/:id/edit
audience: Campaign schedulers
order: 5
capability: scheduling
summary: 'Update a recurring schedule using the same form as creation — change its name, cadence, recipients, content, or retry settings. Changes apply to future runs only; the schedule type and start date are fixed after creation and cannot be changed here.'
primaryActions:
  - Change the cadence, time, or timezone
  - Update recipients or content
  - Adjust retry settings
  - Save changes for future runs
tips:
  - Schedule type and start date are fixed after creation — everything else can be changed.
  - Changes apply to future runs only; instances that already fired are unaffected, and retry changes apply to future failures only.
screenshots:
  - src: /assets/screenshots/edit-recurring-schedule.png
    alt: Edit Recurring Schedule form pre-filled with the schedule's settings, with the Schedule Type and Start Date fields disabled and a note that they are fixed after creation
    label: Editing uses the same form as creation, pre-filled with the current settings. Schedule Type and Start Date are disabled — fixed after creation — while cadence, recipients, content, and retries remain editable.
---

## Open the schedule for editing

Reach the edit form from the schedule you want to change.

1. Open the schedule's [detail page](/docs/recurring-schedule-detail) from the [Recurring schedules](/docs/recurring-schedules) list, then select **Edit**.
2. The form is the same one used to [create a schedule](/docs/new-recurring-schedule), pre-filled with the current settings.
3. Confirm you have the right schedule by its **Name** at the top before making changes.

## Change what you can

Update the settings that are still editable after creation.

1. Change the **Recurrence** — frequency, time, timezone, and (for weekly or monthly) the days — and the optional **End Date**.
2. Update the **Contacts** (manual numbers or the [contact list](/docs/contact-lists), which is still re-read on each future run) and the **Call Configuration** content.
3. Adjust **Retry Configuration**. Retry changes apply to **future failures only**.
4. Note the fixed fields: **Schedule Type** and **Start Date** are disabled and cannot be changed after creation.

## Save the changes

Apply your edits to future runs.

1. Select **Save Changes**. Changes apply to **future scheduled runs** — instances that already fired are unaffected.
2. Back on the [detail page](/docs/recurring-schedule-detail), confirm the updated configuration and watch the next entries in **Execution History**.
3. To stop the schedule instead of editing it, **Pause** it (temporarily) or **Cancel** it (permanently) from the detail page.
