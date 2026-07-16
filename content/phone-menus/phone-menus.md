---
title: Phone menus
appPath: /app/ivr-workflows
audience: IVR builders
order: 1
capability: ivr
summary: Manage IVR workflows — automated call flows that greet callers, offer press-a-key menus, collect input, route the call, or hand it off to an AI assistant — and open the visual builder to create or change one.
primaryActions:
  - Create a workflow from a template
  - Import a workflow
  - Edit an existing workflow
  - Export or delete a workflow
tips:
  - The page guide explains that each workflow is a sequence of steps — play audio, gather input, make a decision, call a webhook, or hand off to an AI assistant.
  - Test a workflow before going live by launching a small batch from the Campaign Composer, then review the run on Menu Activity.
screenshots:
  - src: /assets/screenshots/ivr-workflows-list.png
    alt: IVR Workflows list with Import and Create workflow buttons and a table of workflows showing steps, variables, version, status, and last updated
    label: Each row shows a workflow with its step and variable counts, version, live status, and per-row edit, export, and delete controls.
compactScreenshot: true
---

## Manage your phone menu workflows

Keep IVR call flows organized and ready to attach to live calling.

1. Open Phone Menus. The count beside the heading shows how many workflows exist; the table lists each workflow with its description, step count, variable count, version, status (for example Active), and when it was last updated.
2. Select Create workflow to start from a ready-made template or a blank canvas. Select Edit on a row to open the same builder for that workflow.
3. Use Import only with a workflow file you have reviewed, and Export on a row to save a workflow definition for transfer or backup.
4. Use Delete on a row only when the workflow is no longer needed. Confirm it is not attached to a live number or campaign before removing it.
