---
title: Edit automation
appPath: /app/automations/:id/edit
audience: Operations users
order: 3
summary: Change an existing automation in the same visual builder used to create one. Editing an enabled automation changes what future matching events do, so preview the revised flow in Dry-run before saving.
primaryActions:
  - Open the automation in the builder
  - Adjust the trigger, conditions, or steps
  - Preview the change in Dry-run
  - Save and monitor the next runs
tips:
  - Edit and create use the same builder and the same trigger, condition, and step controls, so everything on the New automation page applies here too.
  - An edit to an enabled automation takes effect for future matching events; disable the automation first if you want to stage several changes before any of them go live.
---

## Open the automation for editing

Get to the builder for the automation you want to change.

1. From **Automations**, open the automation, then choose to edit it. The builder opens on the saved flow — the same canvas, node settings, and Editor / Dry-run tabs used when creating one.
2. Confirm you are editing the intended automation by checking its **Name** in the right panel.

## Make and preview your changes

Adjust the flow and confirm the new behavior before it reaches live events.

1. Change the **Trigger**, **Workflow conditions**, or any **action step** exactly as you would when building a new automation. Each step re-checks its required fields, so watch for any step that flips to **incomplete**.
2. Switch to **Dry-run** and evaluate against sample data or a recent run to confirm the revised conditions match — and skip — the calls you expect.
3. Use the **Status** toggle to disable the automation while you stage a larger change, then re-enable it once the flow is correct.
4. Save your changes. Because an enabled automation acts on future matching events, treat an edit as affecting calls that complete from now on, and check the next runs to confirm it behaves as intended.
