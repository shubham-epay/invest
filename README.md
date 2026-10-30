# Invest.to — portable static source

Editable project for the 12 October 2026 independent-hosting handoff. See `../README-FOR-RUSHI.md` for deployment steps and connections still needed.

```sh
npm ci
npm run build
npm start
```

Use Node.js 22.13 or later. Upload the contents of `dist/client/` to the domain root. Keep source code and dependencies outside the public web root.

Edit `public/service-links.json` with approved broker portal URLs. Never store secrets there. Enquiry forms prepare email drafts to `support@invest.to`; no trading authentication, account creation, payment processing or automatic delivery backend is connected.

Styles are in `app/globals.css`, `app/broker.css`, `app/perspective.css`, `app/service-pages.css` and `app/platform-access.css`. Page content is in `app/content.ts`, `app/site-pages.tsx` and `app/service-pages.tsx`. Brand assets are in `public/brand/`; local fonts and licenses are in `public/fonts/`.

The nested `source/` folder contains supporting historical design references and asset-generation scripts. Current hosting behavior is documented here and in `docs/service-configuration.md`.
