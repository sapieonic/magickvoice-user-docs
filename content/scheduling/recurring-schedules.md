---
title: Recurring schedules
appPath: /app/recurring-schedules
audience: Campaign schedulers
order: 3
capability: scheduling
summary: 'Automate outreach with schedules that repeat on a daily, weekly, or monthly cadence with no manual intervention. Each recurrence creates a one-time schedule instance you can track individually; pause a schedule to stop it temporarily, then resume when ready.'
primaryActions:
  - Create a recurring schedule
  - Filter by status and frequency
  - Open a schedule's execution history
  - Pause, resume, or cancel a schedule
tips:
  - Each recurrence creates a one-time schedule instance — so a recurring schedule is a template that keeps producing runs on its cadence.
  - Pause a recurring schedule to stop it temporarily without losing its configuration, then resume when you are ready.
screenshots:
  - src: /assets/screenshots/recurring-schedules.png
    alt: Recurring Schedules page with Refresh and Create buttons, a page guide, status and frequency filter dropdowns, and an empty state reading "No recurring schedules" with a Create Recurring Schedule button
    label: The Recurring Schedules page lists every repeating schedule in the tenant. Filters narrow by status and frequency; Create starts a new one, and the empty state offers the same shortcut.
---

## Understand recurring schedules

Know how repeating schedules work before you build one.

1. A recurring schedule sends calls or messages **automatically on a daily, weekly, or monthly cadence** — no manual step each time.
2. **Each recurrence creates a one-time schedule instance** that you can track individually, so the recurring schedule acts as a template that keeps producing runs.
3. You can **pause** a schedule to stop it temporarily and **resume** it later, or **cancel** it permanently so no future instances are created.
4. For a single future send rather than a repeating one, use a one-time [schedule](/docs/schedules) from the Composer instead.

## Review your recurring schedules

See what is automated before adding more.

1. Open **Recurring** from the sidebar. Confirm the tenant in the top bar — schedules belong to the tenant they were created in.
2. Filter by **status** (Active, Paused, Cancelled) or by **frequency** (Daily, Weekly, Monthly) using the dropdowns.
3. Each row shows the schedule's name, type, cadence, status, run count, and last run. Select **Refresh** to update.
4. Before you create your first one, the page shows **No recurring schedules** with a **Create Recurring Schedule** shortcut.

## Create or open a schedule

Start a new recurring schedule, or drill into an existing one.

1. Select **Create** (or **Create Recurring Schedule** on the empty state) to open the builder — see [New recurring schedule](/docs/new-recurring-schedule).
2. Select any schedule's row to open its [recurring schedule detail](/docs/recurring-schedule-detail), where you can read its configuration and execution history and drill into individual runs.
3. From the detail page you can **Edit**, **Pause** or resume, or **Cancel** the schedule.
