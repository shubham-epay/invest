# Static-host service configuration

Edit `public/service-links.json`, then rebuild. For an uploaded site, edit its root `service-links.json` directly.

| Key | Approved destination |
| --- | --- |
| `signIn` | Secure broker portal sign-in |
| `register` | Secure broker account registration |
| `demo` | Broker demo-account setup |
| `webTerminal` | Broker-connected MetaTrader web terminal |

Use HTTPS URL strings without embedded credentials. Leave unavailable URLs `null`. This file is public; do not include passwords, tokens or API keys.

Enquiry forms prepare email drafts for `support@invest.to`. Visitors send them through their email client. The site does not authenticate trading accounts, create financial accounts, reset passwords or process transactions.

For direct contact submission, connect an approved form/email service, confirm delivery and update the Privacy Policy. Show a sent confirmation only after submission succeeds.
