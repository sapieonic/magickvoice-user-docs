---
title: Messaging connection detail
appPath: /app/messaging/connections/:id
audience: Messaging operators
order: 2
capability: messaging
summary: Inspect one messaging connection — its provider settings, live status, and message counts — and complete provider-specific setup such as sharing a Telegram invite link, scanning a WhatsApp Personal QR code, or verifying an email domain.
primaryActions:
  - Review connection status and information
  - Read the sent and failed message counts
  - Copy and share the invite link
  - Edit or revoke the connection
screenshots:
  - src: /assets/screenshots/messaging-connection-detail.png
    alt: Connection detail page for a Telegram connection showing a Connections breadcrumb, the connection name with a status pill and Edit and Revoke buttons, a Connection Information section, Messages Sent and Messages Failed tiles, and a Customer Onboarding section with a copyable invite link
    label: The detail page shows the connection's status, its provider information, message counts, and a Customer Onboarding section with the invite link to share.
compactScreenshot: true
---

## Review the connection

Confirm a connection's identity and state before relying on it to send.

1. Open the page by selecting a row on [Messaging connections](/docs/messaging-connections). The breadcrumb reads Connections > the connection name, and the title is the connection's name.
2. Read the Status pill beside the title — for example, "Active — Currently running and operational" means the connection is running and can send.
3. Use Edit to change the connection's settings, or Revoke to disable it. Confirm the connection is not still used by an [automation](/docs/automations) or a pending [message](/docs/messages) send before revoking it.

## Read the connection information

Check the provider settings recorded for this connection.

1. Find the Connection Information section, which lists the details specific to the provider. For a Telegram connection this shows the Bot Username (a t.me link), the Bot Display Name, the Created timestamp, and the Last Used timestamp.
2. A WhatsApp or Email connection shows the settings for its provider instead — the phone number or the sending domain that identifies the connection.
3. Use these details to verify the connection points at the account you expect before sending through it.

## Check the message counts

See how much this connection has sent and whether anything is failing.

1. Read the stat tiles: Messages Sent shows the total messages sent through the connection, and Messages Failed shows how many did not go through.
2. A rising Messages Failed count is the signal to open Edit and check the connection's credentials or status.
3. For the fuller send, delivery, and read breakdown across all connections, return to the [connections list](/docs/messaging-connections).

## Onboard customers (Telegram)

Bring customers onto a Telegram bot so it can message them.

1. In the Customer Onboarding section, find the copyable invite link — for example, https://t.me/<bot>?start=ref — and use the Copy button to copy it.
2. Share the link with your customers. When they open it, Telegram prompts them to start your bot and share their phone number.
3. Watch the counter showing how many contacts have shared their phone number to track onboarding progress.

## Finish setup for other providers

Complete the provider-specific step that makes a non-Telegram connection usable.

1. For a WhatsApp Personal connection, scan the QR code shown on this page with the WhatsApp app on the phone you are linking, to connect the account.
2. For an Email connection, verify the sending domain by adding the generated DNS records; the connection can send once the domain is verified.
3. Once setup is complete and the Status reads active, the connection is ready for [automations](/docs/automations) and [message](/docs/messages) sends. WhatsApp and Email sends use your approved [messaging templates](/docs/messaging-templates).
