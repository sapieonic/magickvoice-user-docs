---
title: New automation
appPath: /app/automations/new
audience: Operations users
order: 2
summary: 'Build a follow-up automation in the visual builder: a flow canvas showing the trigger and its action steps, a settings panel on the right for the selected node, and a Dry-run view that previews what would send against sample or real call data. Pick a trigger, add conditions, configure one or more channel steps, preview, then create.'
primaryActions:
  - Name the automation and choose a trigger
  - Add workflow conditions
  - Configure each action step and its channel
  - Preview in Dry-run, then Create
tips:
  - Start with a narrow trigger and tight conditions, preview it in Dry-run, then broaden the conditions once the first run behaves the way you expect.
  - A step stays marked "incomplete" until its required fields are set — a message channel needs a connection and a body; a webhook needs a public https URL — and an incomplete step will not send.
  - Message channels need a messaging connection to exist first. If a step reports "No connections yet," add one on [Messaging connections](/docs/messaging-connections), then return to the builder.
screenshots:
  - src: /assets/screenshots/automation-builder.png
    alt: New Automation builder showing a flow canvas with a Trigger node connected to a Step 1 Telegram node and an Add step control, plus a right-hand settings panel with Name, Description, Trigger, Status, and Workflow conditions
    label: The builder opens with a trigger and one action step already on the canvas. The right panel edits whichever node is selected; the Editor / Dry-run tabs on the far right switch between building and previewing.
  - src: /assets/screenshots/automation-trigger-conditions.png
    alt: Right panel with the automation name filled in, a Trigger dropdown set to After AI call completes, an Enabled status toggle, and a Workflow conditions row with an operator, a path field, and a value field
    label: Selecting the trigger node shows the automation-level settings — name, description, trigger event, enabled status, and the workflow conditions that gate the whole flow. A condition combines an operator, a variable path such as call.status, and a value.
  - src: /assets/screenshots/automation-step-config.png
    alt: Step settings panel showing a Channel dropdown set to Telegram, a Connection field reading "No Telegram connections yet" with a Create one link, disabled To and Body fields, a Variables section, and an "Only run if" per-step condition control
    label: Selecting an action step shows its channel settings. Telegram, WhatsApp, and WhatsApp Personal send a message to a recipient; the To and Body fields unlock once a connection is chosen.
  - src: /assets/screenshots/automation-webhook-config.png
    alt: Webhook step settings with a URL field, POST/PUT/PATCH method radios, a Headers editor, a Body template, a signing-secret field with Generate secret, and a Delivery details box explaining retry and signing behavior
    label: The Webhook channel posts a request to a public https endpoint. It adds method, custom headers, an optional body template, an optional HMAC signing secret, and a Delivery details box describing the headers sent, the retry rules, and the per-send cost.
  - src: /assets/screenshots/automation-multistep.png
    alt: Flow canvas with a Trigger node, a Step 1 Webhook node, a Step 2 Telegram node, and an Add step control, with the Step 2 settings panel showing Duplicate step and Remove step buttons
    label: Add step appends another action, and steps run top to bottom. Each step can be duplicated or removed, and every step can carry its own "Only run if" condition on top of the workflow-level conditions.
  - src: /assets/screenshots/automation-dry-run.png
    alt: Dry-run preview showing a Context source toggle between Sample data and A recent run, an Edit context JSON button, a Run locally button, and a result reading "Workflow conditions matched no" with a step marked "Workflow conditions didn't match — no steps would run"
    label: The Dry-run view evaluates the draft against sample data (or a recent real run) and shows whether the workflow conditions matched and what each step would do — so you can confirm the flow before enabling it. No message is sent and no credits are spent.
---

## Name the automation and pick a trigger

Set the identity and the starting event, since the trigger decides which calls the automation reacts to.

1. Open the builder with **New Automation** from the Automations page. It starts with a **Trigger** node and one action step already on the canvas, and the right panel showing the automation settings.
2. Give it a **Name** (required) so it is easy to find later, and add an optional **Description** for context your teammates will read.
3. Choose the **Trigger** — the event that starts the automation: **After AI call completes**, **After analysis is ready**, **After IVR completes**, or **After announcement completes**. Pick the one that matches the follow-up you want; for example, use *After analysis is ready* when your condition depends on the call's analyzed outcome rather than just that it ended.
4. Leave **Status** set to **Enabled** for the automation to fire on matching events, or clear it to save the automation without it running yet.

## Gate the flow with workflow conditions

Decide which calls actually deserve a follow-up, so you do not message everyone who was called.

1. With the trigger node selected, find **Workflow conditions** in the right panel. All conditions here must match before *any* step runs.
2. Leave the operator on **Always** to run for every matching event, or choose an operator to add a rule: comparisons (**=**, **≠**, **>**, **≥**, **<**, **≤**), list membership (**In**, **Not in**), presence (**Exists**, **Missing**), text tests (**Contains**, **Starts with**, **Ends with**), or the logical groups **AND group**, **OR group**, and **NOT** for combining several rules.
3. For a comparison, fill in the **path** and the **value**. The path is a dotted reference to call data — for example `call.status`, `call.talk_time_seconds`, `callee.phone`, `callee.name`, `callee.language`, `callee.metadata.<key>`, or `variables.<key>`. The field suggests the common paths as you type.
4. Once a condition is set, the trigger node on the canvas is labeled **has conditions** so you can see at a glance that the flow is gated.

## Configure an action step

Set up what actually gets sent. Each step has one **Channel**, and a step will not fire until its required fields are complete — until then the canvas node is labeled **incomplete**.

1. Select the action step on the canvas to open its settings, then choose a **Channel**. There are five step types: four *message* channels — **Telegram**, **WhatsApp**, **WhatsApp Personal**, and **Email** — and one *request* channel, **Webhook**. Each is defined in its own section below.
2. Fill in the channel's fields (recipient, body, and so on). Text fields accept `{{variable}}` placeholders that are resolved per run from the call context — for example `{{callee.name}}` or `{{call.status}}`.
3. Use the **Variables** section and **+ Add variable** to define named values the step can reuse across its fields.
4. Use **Only run if (per-step condition)** to add a condition that gates just this step, on top of the workflow-level conditions — useful when one step in a chain should only send in a narrower case. It uses the same operators and paths as the workflow conditions.

## How steps connect to messaging connections

Understand the link between a step's channel and your messaging setup, because the four message channels can't send until a matching connection exists.

1. A **connection** links MagickVoice to an account it can send through. Message channels reuse the same connections you manage on [Messaging connections](/docs/messaging-connections), so each channel maps to a connection type: **Telegram** → a Telegram bot connection, **WhatsApp** and **WhatsApp Personal** → a WhatsApp connection, and **Email** → a verified email sending domain.
2. When a message step's **Connection** field reads *No connections yet*, use its **Create one** link — it opens [Messaging connections](/docs/messaging-connections) where you add the connection (a Telegram bot token, a Meta Business WhatsApp number, or an email domain). Add it, then return to the builder and pick it.
3. Until a connection is selected, the **To** and **Body** fields stay disabled and the step remains **incomplete**, so it will not send.
4. The **Webhook** channel is the exception — it needs no connection. It posts directly to a URL you supply, so it works without any Messaging setup.

## Step type — Telegram, WhatsApp, and WhatsApp Personal

Send the contact a chat message after the call. These three message channels share the same fields.

1. **Connection** (required): the messaging connection to send through — a Telegram bot for Telegram, or a WhatsApp connection for WhatsApp and WhatsApp Personal. See [Messaging connections](/docs/messaging-connections) to set one up.
2. **To** (required): the recipient, defaulting to `{{callee.phone}}` so it messages the person who was called. Change it, or use another `{{variable}}`, to send elsewhere.
3. **Body** (required): the message text. Supports `{{variable}}` placeholders for per-run personalization.
4. Use these when the follow-up is a direct message to the contact — a confirmation, a link, or a next-step prompt right after the call ends.

## Step type — Email

Send an email after the call, either free-form or from a saved template.

1. **Connection** (required): an email connection backed by a verified sending domain (managed on [Messaging connections](/docs/messaging-connections)).
2. **To** (required): the recipient address; use `{{callee.email}}` to reach the contact from the call context.
3. **Subject** (required): the email subject line; supports `{{variables}}`.
4. **Template**: optionally choose one of your active email templates (managed on [Messaging templates](/docs/messaging-templates)). The dropdown reads *No active email templates* until you have one.
5. **Body**: used only when no template is selected — supply HTML or plain text, with `{{variables}}` allowed.
6. Use Email for longer or formatted follow-ups, or when you want a consistent branded layout via a template.

## Step type — Webhook

Post the call data to your own system instead of messaging a person — for example, to sync an outcome into your CRM. This channel needs no messaging connection.

1. **URL** (required): a public `https://` endpoint that receives the request. Private or internal addresses are rejected — the endpoint must be reachable from the public internet. The URL supports `{{dotted.path}}` variables resolved per run.
2. **Method**: **POST**, **PUT**, or **PATCH**.
3. **Headers**: up to 20 custom request headers; values support `{{variables}}`. `Content-Type` defaults to `application/json`, and the framing headers `Host`, `Content-Length`, `Connection`, and `Transfer-Encoding` are managed for you and cannot be set.
4. **Body**: leave blank to send the default JSON envelope (use the **Default JSON envelope** disclosure to see its shape), or supply your own template with `{{variables}}`.
5. **Signing secret**: optional. Enter one or use **Generate secret**. When set, each request is signed with HMAC-SHA256 and carries `X-Magick-Signature` and `X-Magick-Timestamp` so your receiver can verify the request genuinely came from MagickVoice. Leave it blank to send unsigned requests.
6. Note the **Delivery details** shown in the panel: every request carries `X-Magick-Event`, `X-Magick-Delivery-Id`, and an `Idempotency-Key` (the run id) so your receiver can safely dedupe retries; network errors, 15-second timeouts, and `5xx` responses are retried, while `4xx`, redirects (not followed), and blocked URLs are terminal; each successful send costs 10 millicredits (~0.01 credits).

## Chain multiple steps

Build a sequence when one event should trigger more than one follow-up.

1. Select **Add step** on the canvas to append another action. Steps run top to bottom in the order shown.
2. Configure each step's channel independently — for example, post a webhook to your CRM, then send the lead a Telegram confirmation.
3. Use **Duplicate step** to copy a configured step, or **Remove step** to delete one. At least one step is always required, so the remove control is disabled when only one step remains.
4. Give any step its own **Only run if** condition so different steps in the same flow can fire under different circumstances.

## Preview in Dry-run, then create

Confirm the flow behaves before it messages real contacts, since a live automation sends to real recipients and spends credits.

1. Switch to the **Dry-run** tab (top right, or the **Dry-run** button in the header). It evaluates the current draft and updates as you edit.
2. Choose a **Context source**: **Sample data** (a built-in example call) or **A recent run** when a real run is available to replay against.
3. Use **Edit context JSON** to inspect or adjust the sample context — the `call`, `callee`, `tenant`, and `account` objects whose fields your conditions and `{{variables}}` read from.
4. Read the result: it reports whether **Workflow conditions matched** and, for each step, whether it would send or was skipped (for example, *Workflow conditions didn't match — no steps would run*). Use **Run locally** to re-evaluate. Nothing is sent and no credits are spent in Dry-run.
5. When the preview looks right, select **Create** to save the automation. If **Status** is enabled, it begins firing on matching events; otherwise it is saved paused until you enable it.
