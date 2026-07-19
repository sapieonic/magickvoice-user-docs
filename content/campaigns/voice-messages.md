---
title: Voice messages
appPath: /app/announcements
audience: Campaign creators
order: 1
capability: campaigns
summary: 'Create and manage voice messages — a straight recorded or read-aloud message played to people when they answer your call, with no AI conversation. Type a message we read aloud, or upload your own recording, then send it to a list of numbers from the Campaign Composer.'
primaryActions:
  - Create a typed or recorded voice message
  - Personalize the message with per-contact fields
  - Review existing voice messages
  - Select a voice message for a campaign
tips:
  - A voice message is a one-way announcement — the person hears it and the call ends. Use an AI call instead when you need a two-way conversation.
  - To upload your own audio, add it on [Recordings](/docs/recordings) first, then create a voice message here that points at it.
screenshots:
  - src: /assets/screenshots/voice-messages.png
    alt: Voice messages page with a New voice message button, a page guide, and a table listing each message's Name, Type (Recording or Typed), Language, Personalized fields, Status, and Created date, with Edit and Delete row actions
    label: The Voice messages page lists every message in the current tenant, showing whether each is a typed (read-aloud) message or an uploaded recording, its language, and any personalized fields. Each row can be edited or deleted.
  - src: /assets/screenshots/voice-messages-create.png
    alt: New voice message dialog with a Name field, a Type toggle between "Type a message" and "Upload a recording", a "Message to read aloud" text box with a Personalize button, and a Voice options section
    label: Creating a voice message. Name it, choose whether to type a message we read aloud or upload a recording, write the text, and use Personalize to insert per-contact fields. Voice options control how a typed message sounds.
---

## Understand what a voice message is

Know what this feature does before you build one, so you pick it only when a one-way message is what you want.

1. A voice message is a **recorded or typed-aloud message** played to each person when they answer — there is no AI conversation, just a straight message, and the call ends after it plays.
2. There are two types: **Typed** (you write text and we read it aloud in a clear voice) and **Recording** (you upload your own audio file). The table's **Type** column shows which each one is.
3. Once created, a voice message is sent to a list of phone numbers from the **Campaign Composer** — see [New campaign](/docs/new-campaign). The message itself is reusable across many campaigns.
4. Use the **page guide** at the top for a refresher, and **Hide page guide** to collapse it once you are familiar.

## Review your voice messages

Keep track of what is set up before creating more or launching a campaign.

1. Open **Voice Messages** from the sidebar. The table lists each message with its **Name**, **Type** (Typed or Recording), **Language**, **Personalized fields**, **Status** (On or off), and **Created** date.
2. Confirm you are in the intended tenant (shown in the top bar) — voice messages belong to the tenant they were created in.
3. Use **Edit** on a row to change a message, or **Delete** to remove one you no longer need.

## Create a typed voice message

Write a message we read aloud — the fastest way to send an announcement without recording anything.

1. Select **New voice message**. In the dialog, give it a **Name** (for example *Payment reminder*) so it is easy to find later.
2. Leave **Type** on **Type a message**.
3. In **Message to read aloud**, write what each person should hear. Keep it short and clear.
4. To personalize it, select **Personalize** (or **+ Personalize**) to insert a per-contact field such as the person's name — these are filled in for each recipient at send time from the campaign's contact data.
5. Open **Voice options** to adjust how the message sounds if you want something other than the default clear voice.
6. Select **Create**. The message appears in the list, ready to select in the [Campaign Composer](/docs/new-campaign).

## Create a voice message from a recording

Use your own audio when you have a professionally recorded or pre-approved message.

1. First upload the audio on the [Recordings](/docs/recordings) page so it is available to attach.
2. Select **New voice message**, name it, then choose **Upload a recording** under **Type**.
3. Pick the uploaded audio, then **Create**. The message shows **Recording** in the Type column.
4. Use recordings when the exact wording and voice must be consistent — for example a brand message or a legally reviewed script.
