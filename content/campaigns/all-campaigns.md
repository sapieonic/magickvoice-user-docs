---
title: All campaigns
appPath: /app/bulk-dispatch-jobs
audience: Campaign managers
order: 5
capability: campaigns
summary: 'Track every group of calls you have sent, newest first. Live tiles show what is happening now and what needs a look; the table lists each campaign with its type, how it started, status, progress, contact count, and created date. Open any campaign for its full per-recipient breakdown, stop queued calls, or retry failed calls.'
primaryActions:
  - Scan the live status tiles
  - Search and filter campaigns
  - Open a campaign's detail and run history
  - Stop remaining queued calls
  - Retry calls that didn't connect
tips:
  - The "Needs a look" tile filters straight to campaigns that need attention — start there after a big send.
  - Campaigns only show for the tenant they were sent in; confirm the tenant in the top bar before assuming a campaign is missing.
screenshots:
  - src: /assets/screenshots/all-campaigns.png
    alt: Campaigns page with status tiles for Happening now, People being called, On a call now, and Needs a look, a search box and status/type/date filters, and a table listing each campaign's Name, Type, How it started, Status, Progress, Contacts, and Created date
    label: The Campaigns page lists every group of calls you've sent. Status tiles summarize live activity, filters narrow the list, and each row shows the campaign's type, how it started, status, and progress.
---

## Understand this page

Know what this page tracks so you can find and monitor your sends.

1. Every row is a **campaign** — one group of calls you sent, whether a voice message, AI call, or phone menu — listed newest first.
2. The tiles across the top summarize live activity: **Happening now**, **People being called**, **On a call now**, and **Needs a look** (campaigns that need attention).
3. When nothing is running, the page reads **All quiet — no campaigns running right now**.
4. Confirm the tenant in the top bar — campaigns belong to the tenant they were sent in.

## Scan live status

Get a quick read on what is running before you dig into any one campaign.

1. Read the tiles at the top. **Needs a look** is a button — select it to filter the table straight to campaigns that need attention.
2. The **How it started** column shows whether a campaign was **Created here** (in the Composer) or came **From a contact list**.
3. The **Progress** column shows a breakdown of outcomes (for example connected, no answer, busy, failed, voicemail) with a total.

## Search and filter

Narrow a long list to the campaigns you care about.

1. Use **Search by name** to find a campaign by its name.
2. Filter by **status** (Waiting, In progress, Sending, Done, Done — some didn't connect, Couldn't send, Stopped), by **type** (Voice message, AI call, Phone menu, WhatsApp, Telegram), or by a **From / To** date range.
3. Use **More filters** to filter by how a campaign started, and the column headers (Name, Status, Contacts, Created) to sort.
4. **Refresh** re-fetches the latest, and **Views** switches how the list is presented.

## Open a campaign

Move from the list to the full detail of one campaign.

1. Select a campaign's row to open its [campaign detail](/docs/campaign-detail) page — its summary, configuration, outcome breakdown, and per-call table.
2. For a running campaign or one with queued calls, use **Stop remaining calls** on the detail page to cancel any pending calls that have not yet started.
3. For a campaign with failures, use the row's **Try the calls that didn't go through** action to retry the recipients that didn't connect.
4. To start a new campaign, go to [New campaign](/docs/new-campaign).
