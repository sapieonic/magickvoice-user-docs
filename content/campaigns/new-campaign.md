---
title: New campaign
appPath: /app/campaigns/new
audience: Campaign creators
order: 4
capability: campaigns
summary: 'Send a group of calls in three steps using the Campaign Composer: choose what happens on the call (a voice message, an AI call, or a phone menu), choose who you are calling, then set the sender number and timing. A running summary on the right shows how many people you are reaching and the estimated cost before you send.'
primaryActions:
  - Choose the campaign type
  - Pick what happens on the call
  - Add recipients manually or from a contact list
  - Set the sender number and send now or schedule
tips:
  - The summary rail on the right shows your recipient count and an estimated cost before you send — check it every time, since a live campaign calls real people and spends credits.
  - Manual entry is capped at 100 numbers per batch. To reach more, upload a [contact list](/docs/contact-lists) and choose "Use Contact List".
  - Estimated cost is per-minute, so it is a "from ~" figure — the real cost depends on how long each call lasts.
screenshots:
  - src: /assets/screenshots/new-campaign.png
    alt: New campaign composer with a Voice message / AI call / IVR Flow type selector at the top and three numbered steps — What happens on the call, Who you're calling, and Settings & timing — plus a Summary rail on the right
    label: The Campaign Composer. Pick the campaign type at the top, then work through the three steps — what happens on the call, who you're calling, and settings & timing. The Summary rail on the right tracks recipients and cost.
  - src: /assets/screenshots/new-campaign-ai.png
    alt: The "What happens on the call" step for an AI call, showing a Call script dropdown, AI quality tiers (Copper, Silver, Gold, Gold II, Platinum), Voice and Language pickers, and toggles for recording calls and detecting answering machines
    label: For an AI call, step 1 picks the call script the AI follows, the AI quality tier, voice and language, and options like recording the call and detecting answering machines.
  - src: /assets/screenshots/new-campaign-summary.png
    alt: Campaign summary rail showing what people will hear, the number of people being called, an estimated cost, the account balance, and a send button that is disabled until recipients are added
    label: The Summary rail previews what people will hear, how many you're reaching, the estimated cost, and your balance. The send button stays disabled until you add recipients.
---

## Pick the campaign type

Choose what kind of call this campaign makes, since the rest of the form changes to match.

1. Open the composer with **New Campaign**, **Start a campaign** on the dashboard, or [go straight to it](/docs/all-campaigns) from the Campaigns list.
2. At the top, choose the **Campaign type**: **Voice message** (play a recorded or read-aloud message), **AI call** (an AI agent holds a real conversation with each person), or **IVR Flow** (a phone menu where people press keys).
3. The three steps below adapt to your choice. The **Summary** rail on the right updates live as you fill things in.

## Choose what happens on the call

Set the content of the call — this is step 1, and it differs by campaign type.

1. For a **Voice message**, pick one of your [voice messages](/docs/voice-messages) from the list and use **Play preview** to hear it. Manage the messages themselves on the [Voice messages](/docs/voice-messages) page.
2. For an **AI call**, choose the **Call script** the AI follows, then set the **AI quality** tier (**Copper**, **Silver**, **Gold**, **Gold II**, or **Platinum** — higher tiers sound more natural and cost more per minute), and pick a **Voice** and **Language**. Manage scripts on [Call scripts](/docs/call-scripts).
3. For an AI call, also set call handling: **Record these calls** (a small extra charge applies), **Detect answering machines** (so the AI knows whether a person or voicemail picked up), and an optional **Greeting grace period** in seconds so the AI's greeting is not cut off.
4. For an **IVR Flow**, pick the [phone menu](/docs/phone-menus) to run.

## Choose who you're calling

Set the recipient list — this is step 2.

1. Choose an input mode: **Enter Manually** to type numbers, or **Use Contact List** to select a saved list.
2. For manual entry, type one number per line. This is capped at **100 numbers per batch**; Indian numbers without `+91` are normalized automatically (for example `9876543210` becomes `+919876543210`).
3. To reach more than 100 recipients, upload them as a [contact list](/docs/contact-lists) and choose **Use Contact List** — lists of any size are supported.
4. If your message or script is personalized, fill in each person's details so the per-contact fields resolve at send time.

## Set the sender and timing

Choose the number people see and when the campaign runs — this is step 3.

1. Under **Number people will see**, pick one or more of your [phone numbers](/docs/phone-numbers). When several are selected, they are rotated evenly across recipients; a voice message campaign dials with a single number, so it uses the first one you pick. Filter by provider (for example Vobiz, Telnyx) using the buttons above the list.
2. Optionally set a **Campaign name** so it is easy to find later on [All campaigns](/docs/all-campaigns).
3. Under **Attach automations**, add a compatible [automation](/docs/automations) to run after each call — or **Create one** if none exists yet.
4. Choose a **Scheduling mode**: **Send Now**, or **Schedule for Later** to set a schedule name, date and time, timezone, a status-check interval, and optional retry rules for calls that fail.

## Review the summary and send

Confirm what you are about to do before it reaches real people.

1. Read the **Summary** rail: **What people will hear**, **People you're calling** (the recipient count), **Est. cost**, and your **Balance**.
2. The estimated cost is a per-minute **"from ~"** figure — the real cost varies with how long each call lasts.
3. The send button stays disabled (**Not ready yet** / **Add recipients to continue**) until the campaign has recipients and the required fields are set.
4. When everything is set, send the campaign — or save the schedule if you chose **Schedule for Later**. Track it afterward on [All campaigns](/docs/all-campaigns) and open it for the full breakdown on [campaign detail](/docs/campaign-detail).
