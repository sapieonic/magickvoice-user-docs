---
title: Voice message calls
appPath: /app/static-calls
audience: Campaign creators
order: 3
capability: campaigns
summary: 'The older per-call log for voice message campaigns, showing each recipient with its phone number, campaign, status, carrier, duration, and voice. This page is being retired — new voice message campaigns should be sent from the Campaign Composer — but it remains useful for browsing and exporting historical voice message call records.'
primaryActions:
  - Review historical voice message calls
  - Filter by campaign ID or phone number
  - Export the results to CSV
  - Move new sends to the Campaign Composer
tips:
  - This page is being retired. Start new voice message campaigns from the [Campaign Composer](/docs/new-campaign) — it does everything this page did and more.
  - Use the phone search for an exact match — enter the full number with country code, e.g. +919876543210.
screenshots:
  - src: /assets/screenshots/static-calls.png
    alt: Voice message calls page with a page guide and a highlighted banner reading "Voice message calls have moved to the Campaign Composer" with an "Open the Campaign Composer" link
    label: The page carries a banner noting voice message calls have moved to the Campaign Composer. The page itself still lists and exports historical voice message call records.
---

## Understand this page

Know what this page is so you use the current tool for new sends and keep this one for history.

1. This is the **older voice message call log**. Each row is one recipient of a voice message campaign, with its **Phone**, **Campaign** ID, **Voice message**, **Status** (Connected, No answer, Didn't connect), **Carrier**, **Duration**, **Voice**, and **Time**.
2. A banner at the top notes that **voice message calls have moved to the Campaign Composer** and that this page is being retired soon. For anything new, use **Open the Campaign Composer** or see [New campaign](/docs/new-campaign).
3. The page is still useful for **browsing and exporting** historical voice message call records that were sent before the move.

## Review historical calls

Look up past voice message calls and their outcomes.

1. Open the page and read the table. Confirm the tenant in the top bar matches where the calls were made.
2. Use **Filter by campaign ID** to narrow to one campaign, or the **Search phone (exact)** box to find a single recipient — enter the full number with country code, for example `+919876543210`.
3. Read each row's **Status** to see whether the call connected, and **Duration** for how long it played.
4. Use the pager at the bottom to move through pages of results.

## Export the records

Take the call data out for reporting or troubleshooting.

1. Select **Export CSV** to download the current results.
2. Use **Customize export columns** to choose which fields the export includes.
3. Keep exports for auditing or to compare against the newer [campaign detail](/docs/campaign-detail) view for campaigns sent from the Composer.

## Move new sends to the Composer

Stop using this page for anything new so your work lands in the supported tool.

1. Select **Open the Campaign Composer** on the banner, or go to [New campaign](/docs/new-campaign).
2. Choose the **Voice message** campaign type there — it covers everything this page did, plus AI calls and phone menus, contact lists, scheduling, and cost preview in one place.
3. Track sent campaigns on [All campaigns](/docs/all-campaigns) and open any one for its per-recipient breakdown on [campaign detail](/docs/campaign-detail).
