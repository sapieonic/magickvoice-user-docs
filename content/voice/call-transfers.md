---
title: Call transfers
appPath: /app/prompts/:id/transfer-destinations
audience: Script authors and voice operators
order: 8
summary: Set up human transfer destinations so an AI agent can hand off a live call to a person when help is needed. Define transfer destinations in a call script, test them before going live, and let the AI decide when escalation is appropriate based on the conversation.
primaryActions:
  - Configure transfer destinations in a call script
  - Test a transfer destination
  - Review transfer outcomes
  - Update or remove transfer destinations
tips:
  - Test each transfer destination before using it in a live campaign to confirm the number works and a human answers.
  - The AI decides when to transfer based on the conversation flow and its instructions — make those instructions clear in the call script.
  - A transferred call leaves the AI and becomes a regular person-to-person phone call, so standard per-minute charges apply for the remaining duration.
---

## Understand what call transfers are

Know when and why to use human escalation before you configure it.

1. A call transfer hands off a live AI call to a real person when the AI determines someone needs human assistance. The AI stays on the line until the transfer completes, then disconnects.
2. Transfer destinations are configured per call script. Each destination is a phone number and a label (for example "Sales team" or "Support hotline").
3. The AI decides when to transfer based on the conversation context and the instructions in your call script. Write clear transfer guidelines in the script's instructions so the AI knows when escalation is appropriate.
4. Use transfers when customers need help the AI cannot provide — complex issues, sensitive matters, or explicit requests to speak with a person.

## Configure transfer destinations in a call script

Set up the phone numbers the AI can transfer to, so escalation works when needed.

1. Open Voice, then Call Scripts. Select a script or create a new one.
2. In the script editor, find the Transfer Destinations section. This is where you define the roster of people or teams the AI can transfer to.
3. Select Add destination. Enter a descriptive Label (for example "Billing support" or "Sales team") and the Phone number to transfer to, including the country code.
4. Add as many destinations as your workflow needs. Each one appears in the roster with its label and number.
5. Use Edit on a destination to change its details, or Remove to delete one you no longer need.
6. Save the call script after adding or changing destinations.

## Test a transfer destination

Confirm a destination works before using it in live calls, so customers are not left waiting when they need help.

1. In the Transfer Destinations section of the script editor, find the destination you want to test.
2. Use the Test action on that destination. The platform places a live test call to the configured number.
3. Answer the test call when it arrives to confirm the number is correct and reachable. A working test proves the destination is ready for live transfers.
4. Repeat the test whenever you change a destination's phone number or add a new one.
5. Remove or fix any destinations that fail the test before launching a campaign with this script.

## Write clear transfer instructions in your call script

Tell the AI when and how to transfer, so it escalates appropriately.

1. In your call script's instructions, describe the situations when the AI should transfer — for example "If the customer asks to speak with a person, transfer to Sales team" or "If the issue is about billing and the customer is frustrated, transfer to Billing support."
2. Be explicit about which destination to use for which situation, especially when you have multiple transfer options.
3. Include any required preamble or handoff message the AI should say before initiating the transfer, such as "Let me connect you to someone who can help."
4. Test the full conversation flow with a sample call to confirm the AI transfers at the right moment with the right destination.

## Review transfer outcomes

Track how often calls are escalated and whether transfers succeed.

1. After a call is transferred, open the [call detail](/docs/call-detail) page for that call to see the transfer outcome in the call information panel.
2. Check the transcript to understand what triggered the transfer and whether the AI followed your instructions correctly.
3. If transfers are happening too often or not often enough, adjust the instructions in your call script and test again.
4. Use the status and outcome filters on [Calls](/docs/calls) to find transferred calls and review their patterns over time.
