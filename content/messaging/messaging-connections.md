---
title: Messaging connections
appPath: /app/messaging/connections
audience: Messaging operators
order: 1
capability: messaging
summary: Connect and manage the messaging accounts MagickComms sends through — a WhatsApp Business number, a Telegram bot, an email sending domain, or a linked personal WhatsApp number — and monitor each connection's send, delivery, and failure counts.
primaryActions:
  - Add a connection
  - Review connection health and status
  - Copy a connection's invite link
  - Edit or revoke a connection
screenshots:
  - src: /assets/screenshots/messaging-connections-list.png
    alt: Connections list with an Add Connection button and a table showing Provider, Name, the phone/bot/domain, sent/delivered/read and failed counts, status, created date, and per-row actions
    label: Each row is one connection — its provider, name, address, message counts, live status, and per-row Copy invite link, Edit, and Revoke controls. Selecting a row opens its detail page.
  - src: /assets/screenshots/messaging-connections-add-dialog.png
    alt: Add Connection dialog showing four provider cards — WhatsApp Business, Telegram Bot, Email (Resend), and WhatsApp Personal
    label: Add Connection opens a provider picker with four options — WhatsApp Business, Telegram Bot, Email (Resend), and WhatsApp Personal.
  - src: /assets/screenshots/messaging-connections-telegram-form.png
    alt: Add Telegram Connection form with Connection Name, Bot Token, Welcome Message, and Contact Shared Message fields
    label: The Telegram form needs a connection name and the bot token from @BotFather, with optional welcome and contact-shared messages.
  - src: /assets/screenshots/messaging-connections-whatsapp-form.png
    alt: Add WhatsApp Connection form with Connection Name, Phone Number ID, Display Phone Number, Business Account ID, Access Token, and App Secret fields
    label: The WhatsApp Business form takes the Meta Phone Number ID and API credentials for a Meta WhatsApp Business number.
  - src: /assets/screenshots/messaging-connections-email-form.png
    alt: Add Email Connection form with Connection Name, Sending Domain, From Name, From Email, and Reply-To Email fields
    label: The Email form takes a sending domain that is verified through generated DNS records, plus the from name and address.
  - src: /assets/screenshots/messaging-connections-whatsapp-personal-form.png
    alt: Add WhatsApp Personal Connection form with a Connection Name field and a note about scanning a QR code after creating
    label: The WhatsApp Personal form only asks for a name; the QR code to link the account appears on the connection page after it is created.
---

## Understand what a connection is

Know what connections do before adding one, because messaging cannot happen without at least one.

1. A connection links MagickComms to one place it can send from — a WhatsApp phone number, a Telegram bot, or an email sending domain. The page guide summarizes this at the top.
2. You need at least one active connection before you can send messages. Both [automations](/docs/automations) and direct [message](/docs/messages) sends deliver through the connections managed here.
3. Note the prerequisites per provider: WhatsApp connections require a Meta Business phone number; Telegram connections require a bot token from @BotFather; email connections require a verified sending domain.
4. WhatsApp and Email sends use approved [messaging templates](/docs/messaging-templates), so set up the matching connection here first, then author templates against it.

## Read the connections list

Check the health of every connection at a glance and find the one you need.

1. Open Connections. The count beside the heading shows how many connections exist, and the table lists one row per connection.
2. Read across the columns: Provider (WhatsApp, Telegram, or Email), Name, the connection's address (Phone / Bot / Domain), the Sent / Delivered / Read counts, the Failed count, Status, and Created date.
3. Check Status to confirm a connection is usable — for example, "Active — Currently running and operational" means it is running and can send.
4. Select any row to open its [connection detail](/docs/messaging-connection-detail) page for the full connection information, stats, and provider-specific setup such as an invite link or QR code.

## Add a connection

Create a new connection when you need a new sending identity or channel.

1. Select Add Connection to open the provider picker dialog. It shows four cards: WhatsApp Business ("Connect a Meta WhatsApp Business phone number to send template messages"), Telegram Bot ("Connect a Telegram bot to send messages to users who interact with it"), Email (Resend) ("Send bulk campaign emails via Resend. Verify your sending domain"), and WhatsApp Personal ("Link a personal WhatsApp number via QR code and send free-text messages").
2. Choose the card for the channel you want. Each opens a form with the fields that provider needs, described in the sections below.
3. Fill in the required fields and select Create, or Cancel to close without adding. The new connection appears in the list.
4. After creating, open the connection's [detail page](/docs/messaging-connection-detail) to finish any provider-specific setup — for WhatsApp Personal, scanning the QR code to link the account; for Email, completing DNS verification of the domain.

## Add a Telegram connection

Connect a Telegram bot so it can message users who interact with it.

1. On the Telegram card, select it, then enter a Connection Name (for example, "Support Bot") to identify it in the list.
2. Enter the Bot Token obtained from @BotFather.
3. Optionally set a Welcome Message — the message sent when a user first starts the bot — and a Contact Shared Message, sent when a user shares their contact.
4. Select Create. The connection's detail page then provides an invite link to share with customers so they can start the bot and share their phone number.

## Add a WhatsApp Business connection

Connect a Meta WhatsApp Business phone number for template-based messaging.

1. Enter a Connection Name (for example, "Production WhatsApp").
2. Enter the Phone Number ID (the Meta Phone Number ID) and, optionally, the Display Phone Number shown to recipients.
3. Optionally enter the Business Account ID (the WhatsApp Business Account ID), which is needed for template sync.
4. Enter the Access Token (Meta API access token) and the App Secret (Meta App Secret), then select Create. Use approved [messaging templates](/docs/messaging-templates) to send through this connection.

## Add an Email connection

Connect a verified sending domain to send campaign emails via Resend.

1. Enter a Connection Name (for example, "Collections Email").
2. Enter the Sending Domain (for example, "mail.acme-collections.com") — the domain you want to send emails from. DNS records will be generated for verification.
3. Set the From Name (for example, "Acme Collections") and the From Email (for example, "collections@mail.acme-collections.com"), and optionally a Reply-To Email.
4. Select Create. Complete the DNS verification for the domain, then send using your [messaging templates](/docs/messaging-templates).

## Add a WhatsApp Personal connection

Link a personal WhatsApp number by QR code to send free-text messages.

1. Enter a Connection Name (for example, "My WhatsApp").
2. Note the on-screen message: after creating, you will be taken to the connection page to scan a QR code and link your WhatsApp account.
3. Select Create.
4. On the [connection detail](/docs/messaging-connection-detail) page, scan the QR code with the WhatsApp app on the phone you are linking to complete the connection.

## Manage an existing connection

Keep connections current and remove ones you no longer use.

1. Use Copy invite link on a row to copy the connection's share link — most useful for Telegram, where customers use it to start the bot.
2. Use Edit on a row to change a connection's settings, such as its name or credentials.
3. Use Revoke on a row to disable a connection you no longer want to send through. Confirm it is not still used by an [automation](/docs/automations) or a pending [message](/docs/messages) send before revoking it.
