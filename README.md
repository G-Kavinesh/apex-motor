# APEX Motor Atelier

A complete, responsive showroom pitch concept built with **Next.js 16 App Router, React 19 and TypeScript**. The project builds a static export and can be hosted on Vercel or any static web host.

## Run locally

Requires Node.js 20.9+ (Node 22 recommended).

```sh
npm ci
npm run dev
```

Open **http://localhost:3000**. Start a client presentation at **/studio** to set the showroom name, descriptor and one of four accent palettes, then return to the home page. Studio changes and saved cars persist only in that browser.

```sh
npm run typecheck
npm test
npm run build
```

The production build writes `out/`. To preview the static export:

```sh
npm start
```

`npm start` uses the bundled static preview server; `next start` is not used with a static export. No API keys or environment variables are required.

## The experience

- **/** — cinematic home, featured collection, lifestyle collections, showroom story, sell-your-car introduction and journal.
- **/inventory** — six vehicles, category/make/price filters, keyword search, sorting and empty states.
- **/inventory/[slug]** — six prerendered vehicle pages with photography crops, accessible full-screen gallery, specification, options and prefilled viewing enquiry.
- **/shortlist** — browser-persisted favourites, comparison table and downloadable shortlist.
- **/showroom** — brand story, principles and private viewing experience.
- **/ownership** — ownership services, interactive fixed-rate finance estimator and FAQs.
- **/sell** — two-step vehicle introduction with validation and downloadable enquiry.
- **/journal** and **/journal/[slug]** — editorial index and three complete stories.
- **/contact** — prefilled viewing and test-drive enquiry, optional date and time preferences, downloadable note.
- **/studio** — browser-only brand and theme customisation for pitches.
- **/privacy** — transparent information about demo content, local storage and third-party assets.
- Custom **404** page.

## Rebrand for a dealer

1. Change `src/lib/site.ts`: brand name, descriptor, accent, address, opening times, phone and email.
2. Update `src/app/layout.tsx` metadata and page-specific metadata. Studio changes intentionally do not rewrite build-time metadata.
3. Replace inventory in `src/lib/vehicles.ts` with verified dealer information. This file is the single source for cards, detail pages, filters, forms and comparison.
4. Replace editorial images with the dealer's approved vehicle photos. The image component currently loads Unsplash photos; on failure it shows a bundled original SVG silhouette. Gallery angles are labelled crops of the same editorial image, not claimed to be distinct vehicle photos.
5. Update stories in `src/lib/journal.ts` and brand-specific editorial copy throughout the pages.
6. Replace `public/icon.svg`, then run a new build.

The display identity and accent are exposed in `Providers` and CSS variables. All CSS is in `src/app/globals.css`; reusable components are under `src/components`.

## Lead and appointment behaviour

**This is a pitch demo, not a live dealership system.** Forms validate inputs, retain them in page memory, and create a downloadable enquiry. They do not send email, write to a database, make a valuation or book an appointment. A real email configured in `site.ts` enables an optional `mailto:` draft after the form is completed. The user must send that draft in their own email app.

For production, replace the form completion in `src/components/enquiry-form.tsx` with a dealer-approved CRM/form endpoint, consent text and success/error handling. Keep credentials server-side. If adding a Next.js POST route or server actions, remove `output: 'export'` from `next.config.ts` and deploy to a Next.js server host. Add real scheduling/availability before representing an appointment as confirmed.

Shortlists and studio settings use localStorage. Form data is never put in localStorage. No analytics or marketing trackers are included. Remote photography and Google Fonts do create requests to their providers; for a fully offline or self-hosted presentation, bundle licensed photos/fonts and adjust the image and layout components.

## Finance estimator

`src/lib/finance.mjs` implements standard fixed-rate amortisation with a zero-interest branch and input validation. The UI shows deposit, financed principal, monthly payment, interest and total repayment. It is an illustrative calculator, excludes taxes/fees/balloon payments, and does not submit a credit application. Four unit tests verify repayment, zero interest, full deposit and invalid inputs.

## Hosting

- **Vercel:** import the project; Next.js is detected automatically. Keep the static export or switch to server deployment when integrating backend functionality.
- **Static hosting:** publish `out/`. `trailingSlash: true` generates route directories so direct page loads work on ordinary static servers.
- **Sites:** `.openai/hosting.json` preserves the existing Site ID and points to `out/`. Publishing requires source-host network access. Do not create a replacement Site because source sync is temporarily unavailable.

The previous HTML prototype is retained in `dist/` locally as a reference; it is ignored by Git and is not the new app or deployment output.
