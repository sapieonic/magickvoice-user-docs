---
title: New recurring schedule
appPath: /app/recurring-schedules/new
audience: Campaign schedulers
order: 4
capability: scheduling
summary: 'Create a recurring schedule in one form: name it and pick a type (AI Voice, IVR, Static Call, or WhatsApp), set the repeat cadence (daily, weekly, or monthly) with a time and timezone, choose recipients manually or from a contact list, configure the call or message content, and optionally enable retries. The call configuration section changes to match the type you pick.'
primaryActions:
  - Name the schedule and pick a type
  - Set the repeat cadence, time, and timezone
  - Choose recipients and content
  - Enable retries, then create
tips:
  - Pick a schedule type first — the call configuration section below changes based on your choice.
  - Use a contact list for dynamic recipients — the list is re-read on every run, so contacts you add later are picked up automatically.
screenshots:
  - src: /assets/screenshots/new-recurring-schedule.png
    alt: Create Recurring Schedule form with Basic Configuration (Name, Schedule Type), a Recurrence section (Frequency, Time, Timezone, Start/End dates), a Contacts section with contact-list picker, a Call Configuration section, and Retry Configuration
    label: The recurring-schedule builder is a single form — basic configuration, recurrence, contacts, call configuration, and retry. The call configuration section adapts to the schedule type you choose.
---

## Name the schedule and pick a type

Set the identity and communication type first, since the content section adapts to it.

1. Open the builder with **Create** on the [Recurring schedules](/docs/recurring-schedules) page.
2. Under **Basic Configuration**, give the schedule an optional **Name** (for example *Daily customer check-in*).
3. Choose the **Schedule Type**: **AI Voice Call**, **IVR Call**, **Static Call** (voice message), or **WhatsApp Message**. The **Call Configuration** section further down changes to match.

## Set the recurrence

Decide how often the schedule runs and when.

1. In **Recurrence**, choose a **Frequency**: **Daily**, **Weekly**, or **Monthly**.
2. Set the **Time** and **Timezone** the schedule fires at.
3. For **Weekly**, pick the **Days of Week** it should run; for **Monthly**, set the **Day of Month**.
4. Set a **Start Date**, and optionally an **End Date** — leave the end date blank to run indefinitely.

## Choose recipients

Set who each run reaches.

1. In **Contacts**, choose **Enter Manually** to type numbers, or **Use Contact List** to select a saved [contact list](/docs/contact-lists).
2. Prefer a contact list for dynamic recipients: **the list is re-read on every recurrence**, so contacts you add to it later are picked up automatically without editing the schedule.
3. The selected list shows its contact count and columns, with a link to view the full preview.

## Configure the content and retries

Set what each run sends, and how failures are handled.

1. In **Call Configuration**, fill the fields for your type — for a voice message (Static Call) that is the **Announcement** and the **Caller ID**; other types show their own required fields. Advanced users can use **Edit as JSON**.
2. Under **Retry Configuration**, optionally **Enable retry on failure** so the system automatically retries calls that fail (for example no answer or busy).
3. Select **Create Recurring Schedule**. You land on the schedule's [detail page](/docs/recurring-schedule-detail), and it appears in the [Recurring schedules](/docs/recurring-schedules) list.
