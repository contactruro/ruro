# RURO — Digital Identity Studio

The official RURO website. *Your name carries weight. Own what it says.*

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion for React · three.js (one scene only)

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, Open Graph. Defaults to `https://ruro.in`. |
| `ENQUIRY_WEBHOOK_URL` | Optional. Enquiries are POSTed here as JSON (Slack, Make, Zapier, CRM). If unset, they are validated and logged server-side only. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact address. Defaults to `studio@ruro.in`. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional. Turns on cookieless analytics (Plausible) and the tracked events. |
| `NEXT_PUBLIC_CLARITY_ID` | Optional. Microsoft Clarity heatmaps and recordings, loaded only after a visitor allows it; form fields masked. |
| `NEXT_PUBLIC_BOOKING_URL` | Optional. Shows "Book a call" on the contact page. |

## Before launch: facts only the studio can supply

`studio` in `lib/site.ts` holds the business facts the site needs: starting price, stewardship price, reply time, audit turnaround, city and registered company name. Anything left `null` is simply not shown, so the site never implies a commitment the studio has not made. The team in `lib/content.ts` (`team`) renders with visible **Team placeholder** tags until real people, photographs and bios are added. Legal pages and the third-party screenshots under `/work` still need review by counsel.

### Analytics events

Sent through `track()` in `lib/analytics.ts` (no-op until a tool is configured) or any element with `data-track`: `cta_click`, `nav_click`, `scroll_depth`, `hero_complete`, `before_after_use`, `study_open`, `sample_estate_open`, `showcase_tab`, `showcase_visit`, `form_start`, `form_error` (field names only), `form_submit_success`, `booking_start`.

No secrets are committed. `.env*` files are git-ignored except `.env.example`.

## Creative system

- **Motif: metamorphosis.** RURO's butterfly is drawn in tens of thousands of fine dots in many shades of blue, pre-rendered into a static body and two wings (`public/butterfly`, made from `components/butterfly/specimen.ts`) that fold together in CSS (`components/ui/ButterflyDots.tsx`). The hero shows the idea in one picture: scattered search results gather into a finished page while the butterfly flies in and perches on it (`components/sections/HeroStage.tsx`). The `/process` page tells the full life cycle as a scroll-driven particle scene.
- **Palette: one hue, led by a luminous space blue.** Space blue (`--color-space`, #1e30a0) is the brand colour: buttons, the footer and the dark engagement chapter, as a flat ground. A brighter blue (`--color-accent`, #2a3fc0) is for highlighted words and links. The dark grounds carry a light glitter (`.sparkle` in `app/globals.css`): two sparse layers of tiny twinkling dots, no gradient wash, switched off under reduced motion. All colours are tokens in that file. The butterfly's wing shades, from deep blue at the body to sky and ice at the edges, are in `BLUE` in `components/butterfly/specimen.ts`; re-render the sprites in `public/butterfly` if you change them.
- **Type:** Fraunces (display and journal reading) + Geist (text) + Geist Mono (labels), plus Cinzel at one weight for the wordmark only. Keep it to these four.
- **Motion:** one signature moment (the metamorphosis) and quiet fades. Above-the-fold entrances are CSS (`mask-rise`, `rise-in` in `globals.css`) so text paints without waiting for JavaScript.

## Where things live

| Path | What |
| --- | --- |
| `lib/content.ts` | **All editorial content**: layers, process timeline, deliverables, stewardship, audience, studies, journal essays, FAQs. |
| `lib/site.ts` | Brand strings, navigation, URLs. |
| `lib/enquiry.ts` | Enquiry schema and validation, shared by client and server. |
| `app/api/enquiry/route.ts` | Enquiry endpoint (validation, honeypot, webhook delivery). |
| `components/sections/*` | Homepage chapters, in buying order: hero, problem, showcase, what's included, engagement and cost, studio, field notes, fit, FAQ, close. |
| `components/Showcase.tsx`, `lib/showcase.ts`, `app/sample` | The showcase: unofficial concept sites for well-known people, as RURO would build them. |
| `components/ui/*` | Primitives: `Reveal`, `MaskLines`, `Button` (magnetic, tracked), `Wordmark`. |

### Estates we study

`studies` in `lib/content.ts` holds eight real personal websites (schwarzenegger.com, tim.blog, nav.al…) that RURO **did not build**. They sit directly after the hero on the homepage, list on `/work`, and each has a breakdown page at `/work/[slug]` covering design, functionality, "the luxury, decoded" and what to borrow. Previews in `public/studies/` are homepage captures from 8 October 2026, and the palette swatches were sampled from them. Keep everything framed as studies, never as client work, and re-capture or re-check a site before changing what is said about it. gatesnotes.com and stevenbartlett.com block automated captures, which is why they are not included.

## Quality notes

- **Reduced motion:** honoured globally (`MotionConfig reducedMotion="user"` plus a CSS media query). The butterfly stops flapping and drifting but still follows scroll, which the user controls.
- **Performance:** two particle scenes only (homepage hero, /process). Both are code-split (`next/dynamic`, client only), use 8,000 particles and a 1.5 pixel ratio on phones, and pause when off-screen. The hero scene starts when the browser is idle, after the headline has painted.
- **Accessibility:** skip link, semantic landmarks, visible focus states, keyboard-operable layer list and before/after slider, labelled form fields with inline errors.
- **SEO:** per-route metadata and canonicals, Open Graph image (`app/opengraph-image.tsx`), `sitemap.xml`, `robots.txt`, JSON-LD (ProfessionalService, FAQPage, Article).
- **Legal pages** (`/privacy`, `/terms`) are drafts and need review by counsel before launch.

## Deploy

Deploy to Vercel (zero config) or any Node host with `npm run build && npm start`. Set the environment variables in the host's dashboard.

### Showcase concepts

`concepts` in `lib/showcase.ts` holds unofficial concept sites for well-known people. RURO was not commissioned by, and has no connection with, anyone shown: every factual statement must come from public sources, and every concept is labelled unofficial on the page. Add nothing you cannot source, and re-check a fact before editing it. If anyone objects, remove their entry.

## Home scene: a clip, split into frames

The home page plays a 10-second clip as you scroll, in two cuts of the same story: a **landscape** cut (1280x720) for laptops and big screens, and a **portrait** cut (720x1280) for phones and tablets held upright. Each is stored as 120 still frames: `public/frames/l_001.webp` … `l_120.webp` (landscape) and `p_001.webp` … `p_120.webp` (portrait). The canvas (`components/cinema/FrameCanvas.tsx`) draws them by scroll position and picks the cut by screen shape (`CinemaStage.tsx`), switching if the device is turned. Timing is `CINEMA_RANGE` in `CinemaStage.tsx`. To change a clip, extract new frames (keep the names and count, or update `FRAME_COUNT`):

```bash
ffmpeg -i landscape.mp4 -vf "select='not(mod(n,2))',scale=1280:720" -vsync vfr -c:v libwebp -quality 66 public/frames/l_%03d.webp
ffmpeg -i portrait.mp4  -vf "select='not(mod(n,2))',scale=720:1280" -vsync vfr -c:v libwebp -quality 66 public/frames/p_%03d.webp
```

The story captions that play over the frames are in `components/sections/StoryScrub.tsx`. The loading screen image is `public/loader/ruro.jpg`.

## Atelier art: where the images come from

- `public/art/myth/*.webp`: transparent cutouts used as floating, parallax objects (statues, painted clouds, putti, the hands of the Creation). They were made from images the studio chose on Pinterest: statues and hands cut out with a background-removal model (`rembg`), clouds and putti keyed out by colour because the source files carried a baked-in checkerboard. The untouched downloads are in `design-archive/pinterest-raw/` (not served by the site). **Check the rights to each image before launch**: they belong to their creators.
- `public/art/statue.webp`, `curtain-*.webp`, `sitting.webp`, `screens.webp`: cut from the art direction reference collage.
- The parallax is `components/atelier/Parallax.tsx` (scroll depth, pointer tilt, float, drag), the compositions are in `components/atelier/Scenes.tsx`, and the live clouds are a WebGL shader in `components/atelier/CloudBank.tsx`.
- The retired butterfly design is kept in `design-archive/butterfly/` (see its README).
