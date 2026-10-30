# Content and design references

Reviewed 10 September 2026. Copy is original; references guide information architecture and factual checks.

- [CMS Prime](https://cmsprime.com/): brokerage navigation and content categories, white-led layout, account comparison and platform presentation. No competitor text, metrics, testimonials, registration numbers or artwork have been reused.
- [Mazi Finance](https://www.mazifinance.com/): account / market / platform / partner coverage and clear onboarding sequence. Its current AI, bonuses, zero-spread and performance claims are not Invest.to capabilities and are not repeated.
- SynraPay approved local visual guide: `/Users/princesehgal/Documents/ChatGPT/synrapay marketting/source/brand-guidelines.md`, dated 10 September 2026. Used for verified Poppins font choice, primary red and restrained white-led direction. Invest.to uses a separate mark and brand line.
- [MetaTrader 5 official platform description](https://www.metatrader5.com/en/trading-platform): desktop analysis, charting, automated strategies, mobile and web platform capabilities. The site explicitly describes Invest.to integration as planned.
- [ASIC Moneysmart — CFDs](https://moneysmart.gov.au/complex-investment-products/contracts-for-difference-cfds): general definition and risks, used to verify educational principles. Australian authorization rules are not represented as Invest.to permissions.
- [ASIC Moneysmart — Forex](https://moneysmart.gov.au/complex-investment-products/forex-trading): general foreign-exchange derivative and execution risk context.
- [FCA CFD price and value review](https://www.fca.org.uk/publications/multi-firm-reviews/contracts-difference-providers-provision-price-and-value): general cost and leveraged-risk context. UK retail protections are not claimed for Invest.to.
- [Saint Lucia FSRA 2023/24 annual report](https://www.fsrastlucia.org/images/FSRA2024v6.5Final.pdf), pages 23 and 53: FSRA states it does not license or regulate forex brokerage / CFDs. The owner’s document remains unverified; do not equate incorporation with regulated status.

Hero artwork: original AI-generated asset created for this project, inspected before use, optimized as WebP. Current trading-desk hero prompt retained in `source/gold-strategy-scene-prompt.txt`; the earlier bullion photograph is retained as a secondary asset.

The homepage market chart is provided by the TradingView Advanced Chart widget, configured for OANDA:EURUSD, OANDA:XAUUSD and OANDA:XAGUSD. It contains provider-supplied indicative data, not Invest.to execution prices; no prices are fabricated or stored as fallbacks. The gold-bullion homepage picture is an editorial concept, not a representation of company gold holdings. The secondary Market Atlas artwork is an imagined map, not a geographic footprint. Numerical education examples are synthetic and explicitly labelled hypothetical.

## Typography verification — 10 September 2026

CMS Prime live computed styles: hero heading Poppins, weight 600, size 56 px, line height 70 px, letter spacing -1.12 px; introduction Poppins 400, size 21 px, line height 32 px. Verified both rendered styles and [homepage CSS](https://cmsprime.com/wp-content/uploads/elementor/css/post-13.css). Mobile CSS specifies 42 px / 43 px for the heading. Invest.to already used the same family; this revision changes its typographic treatment to the reference and corrects the static semibold font-face weight declaration.

Artwork revision: the rejected glass orbit is replaced across the homepage, company and brand pages and in the downloadable kit by a bespoke Invest.to Market Atlas. Source prompt: `source/market-atlas-prompt.txt`.


Gold hero revision — 10 September 2026: at the owner’s request, the homepage now uses a custom gold-bullion image with a red brand accent. Removed the Market Atlas labels from that image frame. The Atlas remains secondary artwork on the company and brand pages.


## Homepage revision — 11 September 2026

- Gold editorial hero with a staggered panel reveal, slow photograph movement, pointer and scroll response, a pause control and a reduced-motion alternative. Original gold image retained.
- Platform tagline: “Read the market. Refine your next move.” Rich burgundy / plum background with champagne highlights; closing panel changed to deeper plum.
- [TradingView Advanced Chart widget](https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/): official embed configuration with EUR/USD, XAU/USD and XAG/USD; provider attribution retained.
- [TradingView worldwide widget data](https://www.tradingview.com/widget-docs/markets/worldwide/): OANDA is listed as a source of real-time forex / indices / commodities data. The page discloses potential interruptions or delays and distinguishes third-party data from Invest.to execution quotes.
- Widget failure handling: a 20-second loading timeout, retry action, and permanent direct links to all three provider market pages. No synthetic fallback values. Provider iframe load only confirms document delivery, not individual price ticks.
- Third-party widget is loaded directly in the visitor browser; preview privacy and terms copy updated accordingly.


## Dimensional logo revision — 11 September 2026

The website logo is now a dimensional treatment of the original outlined Poppins wordmark and stepped emblem. Existing vector paths are retained; material gradients, shallow layered extrusion and specular edge lighting supply depth. Primary graphite/red and reversed silver/red assets are exported as transparent PNG and optimized WebP. A matching dimensional emblem is used for the favicon and application icon. Sources: `source/build-3d-logo.py` and `source/render-3d-logo.mjs`. Initial generated raster candidates were rejected for baked backgrounds and are not shipped. The brand kit includes editable SVGs and flat production companions.

## Perspective identity and Market Desk refinement — 11 September 2026

New flat logo authored as native SVG with outlined Poppins Medium lettering and two offset red framing corners. It replaces the prior 3D identity. Market Desk now follows the hero/ribbon, using a full-width Advanced Chart and accessible instrument tabs for EUR/USD, XAU/USD and XAG/USD. Provider prices are never synthesized.

## Gold strategy scene — 11 September 2026

At the owner’s request, the isolated bullion photograph was replaced with a fictional trading environment: an analyst reviewing paper strategy charts, two market monitors and a small gold bar. Created with built-in imagegen, visually inspected and exported as a 1536 by 1024 WebP. Tiny chart labels are synthetic elements of the illustration, never presented as current quotes. The full image is displayed without crop, with a single short entrance animation and reduced-motion support. The real Market Desk remains the source of provider market prices. Source prompt: `source/gold-strategy-scene-prompt.txt`.


## Plus500-reference brokerage redesign — 11 September 2026

- Reference inspected: https://www.plus500.com/en-ae/ (the English homepage redirected to this regional page). Referenced the compact dark header, split hero, market strip, modular benefit sections, platform presentation, market discovery, funding information, learning journey and footer hierarchy.
- Built original Invest.to copy and visuals with the existing flat Perspective logo, Poppins, red actions, white surfaces and charcoal header. Retained the navy TradingView Market Desk. Plus500 figures, reviews, awards, sponsorships, licence details and payment-provider claims are not Invest.to evidence and were not transferred.
- Added original anonymous financial-district background via imagegen: `public/brand/invest-financial-district.webp`. Conceptual imagery, no claim about Invest.to offices.
- Coordinated the original task's approved gold-strategy scene into `HomeHero` via `GoldStrategyScene`; the gold-bar-only image is no longer shown on the homepage.
- All pricing, platform, account, demo and country-eligibility launch boundaries remain in place. Search, market categories and FAQs use local content; Market Watch retains its existing attributed third-party chart integration.
- This redesign was validated by TypeScript, production compilation, source link/asset checks and route-response checks. Browser interaction and responsive screenshot QA were not performed in this task.
