# Invest.to — launch handoff

## Delivered scope

Original identity and responsive English marketing website, covering home, markets, four market explainers, proposed account structures, planned MetaTrader 5 access, Academy with four articles, company, partners, funding, contact, support, pre-launch access states, legal information and brand guide. No live trade, payment, account-creation or lead-submission service is connected.

## Owner-confirmed inputs

- Brand: Invest.to.
- Business: upcoming CFD trading platform.
- Company: Eptra Prime ltd, Saint Lucia (spelling retained from owner).
- Intended markets: India, Turkey, Southeast Asia.
- Visual direction: CMS Prime style with white, charcoal and SynraPay red.
- CRM: already available; provider, URL and integration documentation not yet supplied.
- Owner says a Saint Lucia licence has been bought. The actual document, issuer, number, scope and validity have not been provided or verified.

## To turn the website into the public launch site

1. Verify the corporate document and exact registered details. Establish the legal basis and approved marketing / client onboarding countries, including each specific Southeast Asian country. A Saint Lucia registration alone does not establish authorization in any target country.
2. Approve the actual account names, pricing, leverage, margin and stop-out rules, minimum deposits, instrument list, client-money arrangements and trading / financing schedules. Replace every proposed / pending statement with supported information.
3. Provide the existing CRM's official client login, live registration, demo registration and password-recovery URLs, plus supported partner and lead interfaces. Use approved redirects or server-side integration. Never expose CRM secrets in client code.
4. Confirm the MetaTrader product and licensing / white-label arrangement. MT5 is the working design assumption. Obtain exact broker-server names, official download links, approved WebTrader URL and mobile connection instructions. The homepage shows a TradingView market-data widget, not the MT5 interface or a broker-server connection.
5. Configure and validate the selected bridge and LP connection independently of this public site. Agree symbol mapping, contract sizing, trading sessions, markups, execution model and reconciliation. Confirm failure handling and price-feed behaviour before exposing trade execution or Invest.to broker quotes. The homepage currently carries separately attributed, third-party indicative OANDA data through TradingView.
6. Approve payment methods, currencies, fees, timing, limits and refund / withdrawal handling. Wire funding in the authenticated client area after agreement and verification requirements are implemented.
7. Supply official support, complaints and privacy contacts, registered address, service hours and approved translations. Draft and review the client agreement, privacy policy, risk disclosure, execution policy and funding terms with qualified local advisers.
8. Complete browser interaction, responsive, accessibility and integration acceptance testing, including the real CRM handoff, the actual trading-server connection, demo-account creation, support channels and any funding journey. Obtain approved country restrictions and disclosures before domain launch.
9. Replace preview metadata / noindex settings deliberately, configure production domain and redirect policy, and publish publicly only once ready.

## Planned connection points

Public website → approved CRM registration / login → KYC and account administration → MetaTrader account provisioning.

MetaTrader → configured bridge / gateway → selected LP for the agreed execution model.

CRM / finance operations → approved payment providers and reconciliation.

This is an implementation handoff, not confirmation that any of these vendor connections exist. No vendor has been purchased or contracted by this task.

## Intentionally excluded until confirmed

Competitor performance metrics, reviews, awards, commissions, withdrawal speed claims, banking relationships, licences, AI trading services, prop trading, funded accounts, copy trading and PAMM offers. These may be added only if part of Invest.to’s approved service scope with suitable terms. The website does not copy CMS Prime or Mazi Finance wording or brand assets.

## Dependency audit boundary

The pinned Sites scaffold currently reports 11 dependency advisories (8 high, 2 moderate, 1 low). The high findings involve React Server Components denial-of-service, image parsers, and development/runtime tooling (Vite, Miniflare, Sharp, Undici, ws). This site has no Server Functions, uploads or user-supplied image processing. Dependencies were not force-upgraded across the scaffold during the brand build. Recheck and patch the supported runtime before public launch; successful compilation is not a clean security audit.

## Homepage market data

TradingView Advanced Chart supplies EUR/USD, XAU/USD and XAG/USD using OANDA symbols. This is a public embedded display and does not require a CRM, MT5, LP connection or API key. It is not proof of an OANDA relationship or Invest.to executable prices. Keep TradingView attribution. Loading failure shows a retry action and direct source links; never replace missing data with simulated prices. The September 11 refinement was inspected in the browser at 467 px mobile and 1170 px desktop widths. All three OANDA charts displayed provider OHLC values. Gold and silver tab switches were verified. Quotes may update on the provider’s interval; this is not a broker price feed.


## September 11 brokerage layout refresh

The homepage now follows a Plus500-referenced brokerage layout with Invest.to’s flat Perspective logo, dark header, red actions, original gold-strategy hero scene, anonymous skyline background, market category tabs, full-width TradingView Market Desk, platform concept, funding guidance, planned account comparisons, learning journey and FAQ section. Shared navigation includes site search and a menu drawer across existing routes. The market chart component and provider attribution are preserved.

No live accounts, demo accounts, CRM, payment, lead submission or trading connections were added. The separate phone-style platform concept uses an explicitly illustrative chart with no executable quotes or return figures. The existing private Site access remains unchanged.
