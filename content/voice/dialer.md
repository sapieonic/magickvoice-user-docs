---
title: Dialer
appPath: /app/calls/dialer
audience: WebRTC dialer users
order: 3
capability: calls.dialer
summary: Call a phone number directly from the browser by selecting an approved caller ID, entering a full phone number, and acknowledging recording consent when needed.
primaryActions:
  - Select a caller ID
  - Enter or key in a full number
  - Choose whether to record
  - Place a browser call
tips:
  - The Credits panel shows the available workspace balance and the approximate per-minute talk-time rate. Confirm there is enough balance before a longer call.
  - Use a complete international number. The dialer accepts the number you intend to reach, not a contact name.
screenshots:
  - src: /assets/screenshots/dialer.png
    alt: Browser dialer with caller ID, phone number field, keypad, recording option, and call button
    label: Use the number field for the recipient; the keypad is an alternative way to enter digits.
compactScreenshot: true
---

## Place a browser-dialer call

Call a number from the browser with the correct visible caller ID.

1. Open Voice, then Dialer. Use Call history in the page header when you need previous browser-dialer records instead.
2. Choose Caller ID. This is the active workspace number the recipient will see; only available tenant numbers appear in the selector.
3. Enter Number to call with the country code. You can type it directly or use the keypad. Hold 0 on the keypad to enter a plus sign.
4. Select Record this call only if recording is appropriate. The page explicitly reminds you to make sure everyone on the call consents to being recorded.
5. Review the caller ID and recipient number, then select Call. The call button remains unavailable until the required information is present.
