---
title: Dialer call history
appPath: /app/calls/dialer/history
audience: WebRTC dialer users
order: 4
capability: calls.dialer
summary: Review calls that were placed from the browser dialer, filter them by final status or exact number, view AI-generated summaries and transcripts, and open the dialer to make the next call.
primaryActions:
  - Filter browser calls by status
  - Search an exact number
  - View call summaries and transcripts
  - Refresh the call log
  - Open the dialer
tips:
  - An AI call initiated from Calls is not the same as a browser-dialer call. Check the correct history before assuming a record is missing.
  - A call that is still initiating or ringing may take time to reach a final outcome. Refresh instead of placing a duplicate call.
screenshots:
  - src: /assets/screenshots/dialer-history.png
    alt: Dialer call history empty state with filters and Open Dialer button
    label: An empty state is expected until the first browser-dialer call has ended and been logged.
---

## Find a browser-dialer record

Confirm the result of a call placed from your browser.

1. Open Voice, then Call History. This history is specifically for calls placed from the browser dialer, not the wider AI Calls list.
2. Use All Statuses to limit the view to Initiating, Ringing, In Progress, Completed, Failed, No Answer, Busy, or Canceled calls.
3. Use Search phone (exact) with the full country-code number when you know the recipient.
4. Select Refresh after a recent call finishes if its record has not appeared yet.
5. If there are no records, use Open Dialer to make the first browser call. The empty-state message changes after a call is logged.

## View call summaries and transcripts

Review what was discussed on completed dialer calls, just like AI calls.

1. Select a completed call from the history list to open its detail page.
2. Scroll to the Call Analysis section to read the AI-generated summary of the conversation, key topics discussed, and overall sentiment.
3. Continue to the Transcript section to see the full turn-by-turn conversation with timestamps and speaker labels, similar to how AI call transcripts are presented.
4. Use the summary to quickly understand what happened on the call without listening to the full recording, saving time when reviewing many calls.
5. Summaries and transcripts are generated after the call completes. They appear automatically on the [call detail](/docs/call-detail) page for dialer calls, alongside the recording and delivery facts.
