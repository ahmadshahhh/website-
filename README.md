# Webzivo

Marketing website for **Webzivo** — website design and development for businesses in Kuwait.

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4. Every page is
statically pre-rendered, the only images are the logo, and the whole site runs on
two self-hosted fonts and zero runtime UI dependencies.

---

## Table of contents

1. [Run it locally](#run-it-locally)
2. [Configure your details](#configure-your-details) — WhatsApp, email, Maps, domain
3. [Receive contact form enquiries](#receive-contact-form-enquiries)
4. [Edit the content](#edit-the-content) — services, portfolio, FAQ
5. [Replace a demo with a real client project](#replace-a-demo-with-a-real-client-project)
6. [Analytics](#analytics)
7. [Deploy](#deploy)
8. [Before you publish](#before-you-publish)
9. [Project structure](#project-structure)

---

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
cp .env.example .env.local     # then fill in the values (see next section)
npm run dev
```

Open <http://localhost:3000>.

Other commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build locally |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run check` | Typecheck + lint + build, all in one |

> The site runs correctly with no `.env` file at all — the WhatsApp number,
> email, Maps listing, site URL and contact form all have working defaults
> committed in `src/config/site.ts`.

---

## Configure your details

Your WhatsApp number and contact email are already set as committed defaults in
**`src/config/site.ts`**, so they work in every environment with no setup. Every
one of these values can also be overridden per deployment through **`.env.local`**,
without touching code:

```bash
cp .env.example .env.local
```

### 📱 WhatsApp number

Already set to **+965 9498 6039** (`96594986039`), committed as
`DEFAULT_WHATSAPP_NUMBER` in `src/config/site.ts`. Override it per deployment with:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=96594986039
```

Digits only — no `+`, no spaces, no dashes — and **drop the leading `0`** from
the national part. Kuwait's code is 965, so `9498 6039` becomes `96594986039`.

This one value powers the floating WhatsApp button, the contact card, the
pricing section, the final call to action and the footer. Every WhatsApp link
opens with this message pre-filled:

> "Hello Webzivo, I am interested in building a website for my business."

To change that wording, edit `WHATSAPP_MESSAGE` in `src/config/site.ts`.

### ✉️ Email address

Already set to **webzivodesignz@gmail.com**, committed as `DEFAULT_CONTACT_EMAIL`
in `src/config/site.ts`. Override it per deployment with:

```bash
NEXT_PUBLIC_CONTACT_EMAIL=hello@webzivo.com
```

This is the address visitors see, in the contact section and the footer. It is
separate from where form submissions are delivered (see the next section).

### 🖼️ Logo

Your logo lives at **`public/logo.jpeg`** — the full square lockup (monogram,
WEBZIVO, WEB DESIGN AGENCY, ESTD. 2026). It is what search engines use as the
business logo.

The header can't use that file directly: at the ~40px a header allows, the two
smallest lines render around 2px tall and the grey backdrop shows as a box
against the white header. So the header uses a **horizontal lockup cut from the
same artwork** — the monogram and the WEBZIVO wordmark, each with the grey
turned into transparency:

- `public/logo-mark.png` — the WB monogram
- `public/logo-wordmark.png` — the WEBZIVO wordmark

Both are black, and the site flips them to white on dark backgrounds (the
footer) in CSS, so there is only one copy of each to maintain.

**To replace the logo**, drop your new file in as `public/logo.jpeg` and run:

```bash
pip install pillow
python3 scripts/generate-logo-assets.py
```

It finds the stacked blocks automatically and prints what it detected — check
that before committing. The script assumes dark artwork on a flat light
background; for a different arrangement, adjust the crops in
`src/components/ui/Logo.tsx` instead.

### 🌐 Your domain

Already set to **https://webzivo-kw.vercel.app**. Override it once a custom
domain replaces the Vercel one:

```bash
NEXT_PUBLIC_SITE_URL=https://webzivo.com
```

This drives canonical URLs, `sitemap.xml`, `robots.txt` and the social share
image, and it is also the domain shown in the demo mockups' browser bars — so
they always match the real address.

### 📍 Location

"Mangaf, Kuwait" appears in the footer, the about section and the contact card,
and every instance links to the Google Maps listing. All three read from
`LOCATION_LABEL` and `NEXT_PUBLIC_GOOGLE_MAPS_URL` in `src/config/site.ts`, so
changing it once updates them together.

The contact card also embeds a map. It uses Google's keyless `output=embed`
form, so there is no Maps API key or billing account to set up.

To show a street address above the location, set:

```bash
NEXT_PUBLIC_BUSINESS_ADDRESS=Block 4, Street 12
```

---

## Receive contact form enquiries

The contact form posts **from the browser straight to [Web3Forms](https://web3forms.com)**,
which emails every submission to **webzivodesignz@gmail.com**. It works out of
the box — no setup required.

**Web3Forms decides the destination from the access key itself**; there is no
"send to" field in its API. The key lives at the top of
**`src/components/ContactForm.tsx`**:

```ts
const WEB3FORMS_ACCESS_KEY = "e6f145bb-075e-4944-83ff-e29eb218f09c";
```

To change where enquiries land, create a new key at web3forms.com using that
address and replace that value. There is no environment variable to set.

Keeping it in the source is fine here: Web3Forms keys are public by design —
they ship inside the page that submits the form either way, and the key alone
only lets someone send mail to the inbox it is already registered to.

> **Why not post from the server?** It used to, and it failed in production.
> Relaying through a shared datacentre IP is exactly the traffic a form service
> filters, and it added a hop that could fail silently. Posting direct is the
> documented Web3Forms usage and removes that failure mode.

**What's already handled:** required-field validation, email and phone format
checks, length limits, control-character and email-header-injection stripping,
a honeypot field for bots, a disabled submit button that prevents
double-submits, and UTF-8 so Arabic and other non-Latin input arrives intact.

If a submission fails — network error or a non-success response — the form says
so and offers WhatsApp and email instead, so a visitor is never stuck.

**Using a different provider?** Replace the `fetch` call in `handleSubmit`
inside `src/components/ContactForm.tsx`. Validation and the UI states stay as
they are.

---

## Edit the content

All editable content is centralised in **`src/config/`**. You do not need to touch
components to change what the site says.

| File | What it controls |
| --- | --- |
| `src/config/site.ts` | Business name, tagline, description, country, social links |
| `src/config/nav.ts` | Navigation items and the main call-to-action |
| `src/config/services.ts` | The six service cards **and** their detail pages |
| `src/config/projects.ts` | Portfolio projects and their case-study pages |
| `src/config/faq.ts` | FAQ questions and answers |

Add an entry to any of these arrays and the card, the detail page, the navigation,
the sitemap and the structured data all update automatically.

**Adding a service** also adds `/services/<slug>` and a footer link.
**Adding an FAQ** also updates the `FAQPage` structured data Google reads.

---

## Replace a demo with a real client project

All six portfolio projects ship as **demos** — concept designs clearly labelled as
such throughout the site. Nothing claims to be client work.

When you land a real project, open `src/config/projects.ts` and:

1. Set `isDemo: false` — this removes the "Demo Project" label everywhere.
2. Add `liveUrl: "https://theircustomerdomain.com"` — the "Visit Live Site" button
   appears automatically, and the featured section links to it.
3. Add `clientName` and `year`.
4. *(Optional)* Add a screenshot: save it to `public/work/their-site.jpg` and set
   `image: "/work/their-site.jpg"`. It replaces the built-in mockup on both the
   card and the case-study page.
5. Update `summary`, `description`, `pages` and `features` to describe the real work.

> Only name a business as a client once they have agreed to it.

To change which project appears in the large featured section on the home page,
edit `featuredProjectSlug` at the bottom of the same file.

### About the portfolio previews

The demo previews are not screenshots — each one is a miniature website built in
HTML and CSS (`src/components/previews/SitePreview.tsx`). They scale to any size,
stay sharp on every screen, and add nothing to page weight. Add a new variant by
extending the `THEMES` and `CONTENT` maps in that file.

---

## Analytics

No tracking runs until you provide an ID, so the site sets no analytics cookies
out of the box. Add any of these to `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX          # Google Analytics 4
NEXT_PUBLIC_META_PIXEL_ID=123456789012345           # Meta (Facebook) Pixel
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123…        # Search Console verification
```

The scripts live in `src/components/Analytics.tsx`. If you add a cookie-consent
banner later, gate them there.

---

## Deploy

### Vercel (recommended — made by the Next.js team)

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Add every variable from your `.env.local` under **Settings → Environment Variables**.
4. Deploy, then point your domain at it under **Settings → Domains**.

Vercel detects Next.js automatically — no build configuration needed.

### Anywhere else

The site needs a Node.js host (the contact form uses a server action, so a purely
static export would lose it).

```bash
npm run build
npm start          # serves on port 3000
```

Works on Netlify, Railway, Render, a VPS with PM2, or Docker. Remember to set the
environment variables on the host — they are not read from `.env.local` in production.

---

## Before you publish

- [x] Site URL set to https://webzivo-kw.vercel.app (update if you buy a custom domain)
- [x] WhatsApp number set to +965 9498 6039 — **click the floating button and confirm it opens your chat**
- [x] Contact email set to webzivodesignz@gmail.com
- [ ] **Send a test submission through the live form and confirm it reaches your inbox**
- [x] Google Maps listing linked from every location label, and embedded in the contact card
- [ ] Review the About and FAQ copy — adjust anything that doesn't match how you work
- [ ] Decide what to do about the six demo projects: keep them labelled as demos, or replace them
- [ ] Add real social links to `socials` in `src/config/site.ts` (empty by default — no fake accounts)
- [ ] Submit `https://yourdomain.com/sitemap.xml` to Google Search Console
- [ ] Add the site link to your Google Business Profile
- [ ] Run `npm run check` one last time

### Deliberately left blank

These are empty on purpose, and the site adapts rather than showing placeholder
text to visitors. Fill them in when you have real information:

- **Pricing** — the FAQ says pricing depends on requirements and invites contact
- **Testimonials, reviews, ratings, client logos** — none are shown
- **Years in business, client counts, awards, certifications** — none are claimed
- **Street address** — only "Kuwait" is shown unless you add one
- **Social media accounts** — none are linked

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              Root layout: fonts, SEO, header, footer
│   ├── page.tsx                Home page (all sections, in order)
│   ├── globals.css             Design tokens, typography, motion
│   ├── work/                   Portfolio index + /work/[slug] case studies
│   ├── services/[slug]/        One page per service
│   ├── not-found.tsx           404
│   ├── sitemap.ts robots.ts    Generated from the config files
│   ├── icon.svg apple-icon.tsx opengraph-image.tsx
│   └── ...
├── components/
│   ├── sections/               One file per home page section
│   ├── layout/                 Header, Footer, WhatsApp button
│   ├── previews/               CSS website mockups + browser/phone frames
│   ├── ui/                     Button, Container, Section, Reveal, Logo
│   └── icons/                  Hand-built SVG icon set
├── config/                     ← edit your content here
└── lib/                        Validation, email delivery, contact action
```

### Design and technical notes

- **Palette** — near-black, white and layered greys with one warm gold accent.
  All tokens are defined once at the top of `src/app/globals.css`.
- **Accessibility** — audited with axe-core against WCAG 2.1 AA across desktop and
  mobile: no violations. Semantic landmarks, visible focus rings, labelled form
  fields, a native `<details>` FAQ accordion that works without JavaScript, and
  full `prefers-reduced-motion` support.
- **Performance** — no UI or icon libraries, no images to download, two variable
  fonts self-hosted at build time, and every page pre-rendered as static HTML.
  Scroll animations use a single `IntersectionObserver` per element that
  disconnects after firing.
- **Security** — secrets are server-only (no `NEXT_PUBLIC_` prefix), all form input
  is validated and sanitised server-side, and external links carry
  `rel="noopener noreferrer"`.
- **Favicon** — regenerate from the logo mark with `python3 scripts/generate-favicon.py`.
