---
title: Menu activity
appPath: /app/ivr-sessions
audience: IVR operators
order: 3
capability: ivr
summary: Review IVR call sessions — one session per phone call through a workflow — and filter them by status, workflow, phone number, or batch to see how callers moved through your menus.
primaryActions:
  - Filter sessions by status or workflow
  - Search for one exact phone number
  - Filter by batch ID
  - Open a session to inspect the caller path
tips:
  - The phone search is an exact match — enter the complete number with its country code, for example +919876543210.
  - Session data reflects real caller activity and may include customer phone numbers; treat it as customer data and do not copy it into unapproved channels.
screenshots:
  - src: /assets/screenshots/ivr-sessions.png
    alt: IVR Sessions page with Refresh and Initiate Batch buttons, a notice that batch IVR calls have moved to the Campaign Composer, and status, workflow, phone, and batch filters
    label: Filter sessions by status, workflow, exact phone number, or batch ID. A notice points to the Campaign Composer, which now launches IVR batches.
compactScreenshot: true
---

## Find and review IVR sessions

Locate the right call sessions and understand how callers moved through a menu.

1. Open Menu Activity. Use the status filter (Queued, Ringing, In Progress, Completed, Failed, No Answer, and more), the workflow filter, Search phone (exact) with the full country-code number, or Batch ID to narrow the list.
2. Active sessions auto-refresh about every 10 seconds, so you can watch progress live; use Refresh to update immediately.
3. Open a session to inspect the caller path — the steps taken, keypad input, and where the call ended — when you need to investigate an abandoned or misrouted call.
4. To launch new IVR calls, use Open the Campaign Composer. Batch initiation has moved there and running batches from this page is being retired.
