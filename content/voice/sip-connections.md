---
title: SIP Connections
appPath: /app/sip/connections
audience: Telephony administrators
order: 9
summary: Connect an approved SIP trunk so MagickVoice can place outbound calls through your carrier, using either SIP credentials or an IP allowlist.
primaryActions:
  - Add a SIP connection
  - Enter the trunk domain
  - Choose credentials or IP allowlist
  - Allow MagickVoice egress IPs
tips:
  - A SIP connection can direct outbound call traffic through your carrier. Coordinate ownership and testing with the person who manages the carrier account before saving production settings.
  - If the carrier gives a hostname with a non-standard port, include the port after the hostname, for example sip.example.com:5060.
  - Use a distinct connection name for sandbox and production trunks so the correct route is obvious during call setup.
  - SIP trunks are used only when the effective telephony provider supports them (VoBiz). If your workspace is on another provider, a saved connection will not carry calls until that provider is in effect.
screenshots:
  - src: /assets/screenshots/sip-connection-form.png
    alt: Add SIP Connection form with connection name, SIP domain, and authentication mode options
    label: Choose the authentication method your carrier supports before creating the connection.
compactScreenshot: true
---

## Add a credential-based SIP trunk

Save the connection details supplied by a carrier that authenticates with a SIP username and password.

1. Open Voice, then SIP Connections, and select Add SIP Connection.
2. Enter a clear Connection Name, such as the carrier name and intended environment, so users can recognize it later.
3. Enter the SIP Domain exactly as provided by the carrier. Include a port only when one is required, but do not include the sip: prefix.
4. Leave Credentials selected, then enter the SIP username and SIP password from the carrier. The form notes that credentials are encrypted at rest.
5. Review the values and create the connection. Use it first with a controlled test call before routing operational calling through it.

## Use IP allowlisting instead

Connect a trunk that trusts MagickVoice network addresses rather than a SIP username and password.

1. Enter the connection name and SIP domain as above, then select IP whitelist as the authentication mode.
2. Create the connection without entering credentials.
3. Open the saved connection’s detail page and find the Egress IPs to Whitelist section. If the addresses are listed, copy them; if the section says they are not available yet, contact support to obtain them.
4. Allow those addresses on the SIP trunk or firewall with your carrier. Calls cannot authenticate until the carrier-side allowlist is in place.

## Review or remove an existing connection

Manage the trunks already saved in the workspace.

1. Once connections exist, the page lists them in a table with Name, SIP Domain, Auth Mode, Calls Placed, Test result, Status, and Created date.
2. Select a row to open its detail page, or use the row’s Edit control to change its settings.
3. Use Revoke to take a trunk out of service. A confirmation warns that calls relying on it will fail, so confirm only when nothing live depends on that route.
