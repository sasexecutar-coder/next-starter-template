# Developer Handoff Spec — Branded Mainline Astro Site

Prepared 7 Oct 2026 · Sources: 4 design references + `STACK.md` (Mainline Astro Template) · Status: draft for engineering review

## 0. Read this first

**What this is.** A build spec for turning the Mainline Astro template into a branded site, using four design references: a real-estate landing-page wireframe (desktop + mobile), a news/blog UI kit, article-page components, and a mobile task-list screen. It covers the full stack, design tokens, components, every route, states, responsive behaviour, motion, accessibility and a brand-personalization path for each route.

**How I worked.** From screenshots only. No Figma file and no brand guidelines were attached, so:

- Measurements and colours marked `≈` are estimated by eye. Replace them with Figma values where they differ.
- Brand values are written as `{{BRAND_…}}` slots. Nothing here hardcodes your brand. Section 4 lists exactly what to collect.
- Mock copy in the designs must not ship: lorem text, typos ("Enviornment", "abosolutely"), a truncated URL, and the stray space in "Wednesday , 11 May".
- I have not seen the template repo, so folder paths are conventions. Map them to the template's actual folders.

**Assumptions (defaults chosen so work can start; confirm in Section 13).**

1. The four references are *pattern* references for one site, not four products. Real-estate wireframe → Home and Listings. News kit → Blog. Task screen → authenticated app route `/app/tasks`.
2. Static-first Astro with React islands. The template has no backend, so forms, comments, search and auth need an endpoint decision (Section 2.5).
3. One locale at launch, with all strings and formats centralised so a second locale can be added later.

## 1. Source designs and what they become

| Ref | Shows | Becomes |
| --- | --- | --- |
| A — Real-estate wireframe (desktop + mobile) | Hero with CTA pair, amenity strip, tabbed listing carousel, 4-step guide, testimonial, stats, blog carousel, 3 services, footer | Home page blocks; `/listings` |
| B — News UI kit | Featured article card, category nav, search + hashtags, tag chips, media card, author card, circular carousel arrows | `/blog` index and sidebar |
| C — Article components | Share link, tags, pull quote, article header with overlapping card, comments, newsletter card | `/blog/[slug]` |
| D — Mobile task screen | Underline tabs, filter chips with counts, task cards, avatar stack | `/app/tasks` |

## 2. Full stack description

### 2.1 Stack

| Layer | Technology | Role here | Rules |
| --- | --- | --- | --- |
| Framework | Astro 5 | Routing, static rendering, content collections, image optimisation, islands | Static by default. Use `export const prerender = false` (needs an adapter) only for session-dependent routes. |
| UI runtime | React 19 | Interactive islands only: carousel, tabs, accordion, forms, task list | Static markup stays in `.astro`. A `.tsx` component in an `.astro` file needs a `client:*` directive or it renders as inert HTML. |
| Language | TypeScript | All code | Strict mode. Export a props interface per component. No `any`. |
| Styling | Tailwind CSS 4 | CSS-first config: tokens live in CSS variables and `@theme` | Components use token-backed utilities. No arbitrary hex or px values. |
| Components | shadcn/ui | Primitive layer (Radix + Tailwind), copied into the repo | Extend through `cva` variants. Don't restyle inline. |
| Theming | astro-themes, tweakcn-compatible variables | Light/dark via a class on `<html>` | Brand colours live only in the `:root` and `.dark` blocks. |
| Content | MDX + Astro content collections | Blog posts, listings, legal pages | Typed schemas in `src/content.config.ts`. |
| Motion | Motion (Framer Motion) | Entrance, layout and gesture animation inside islands | Honour reduced motion (Section 10). |
| Fonts | DM Sans (template default) | Headings and body | Replace through `--font-sans` (Section 3.2). |
| Icons | Lucide React, React Icons | Lucide for UI, React Icons for brand and social glyphs | One stroke weight for all UI icons. |
| Formatting | Prettier | Pre-configured | Run before every commit. |
| Component preview | Styleglide | Isolated component and token review | Register every new component. |
| SEO | Template metadata + OG images | Per-route meta | Pass props per route (Section 6). |

### 2.2 Folder conventions

```
src/
  config/brand.ts        single source: name, nav, socials, locale, currency, SEO defaults, feature flags
  styles/global.css      Tailwind import, tokens (:root / .dark), @theme inline
  content.config.ts      collections: blog, listings, authors
  content/{blog,listings,authors}/
  components/ui/         shadcn primitives
  components/blocks/     page sections (Hero, Features, Pricing, FAQ ...)
  components/patterns/   new: cards, chips, share link, task list ...
  layouts/               BaseLayout, ArticleLayout, AppLayout
  pages/                 routes (Section 6)
  lib/                   format.ts (Intl helpers), motion.ts (duration/ease constants), utils.ts
public/brand/            logos, favicon, default OG image
```

### 2.3 Rendering and hydration rules

| Pattern | Directive | Why |
| --- | --- | --- |
| Navbar mobile menu, theme toggle | `client:load` | Needed immediately. |
| Carousels, tabs, accordion, share link (below the fold) | `client:visible` | No JS cost until scrolled into view. |
| Newsletter, comment form | `client:idle` | Low priority. |
| Task list (`/app/tasks`) | `client:only="react"` with `prerender = false` | Depends on session, so server HTML adds nothing. |
| Cards, steps, stats, services, footer | none (`.astro`) | Zero JS. |

Tab and carousel content must exist in the server HTML so crawlers and no-JS users see it. Hydration only adds behaviour.

### 2.4 Data layer (content collections)

Blog posts, listings and authors are typed collections. The `listings.type` enum mirrors the tab labels in reference A. Rename it to your own categories.

```ts
// src/content.config.ts
import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string().max(90),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).max(6).default([]),
    author: reference("authors"),
    cover: image(),
    coverAlt: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const listings = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/listings" }),
  schema: ({ image }) => z.object({
    title: z.string().max(70),
    summary: z.string().max(140),
    type: z.enum(["apartment", "office", "warehouse"]),
    price: z.number().positive(),
    currency: z.string().length(3),
    gallery: z.array(z.object({ src: image(), alt: z.string() })).min(1),
    location: z.string(),
    featured: z.boolean().default(false),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/authors" }),
  schema: ({ image }) => z.object({
    name: z.string(), role: z.string(), avatar: image().optional(),
  }),
});

export const collections = { blog, listings, authors };
```

Filter `draft: true` out of every production query. Format prices, dates and numbers only through `lib/format.ts` (`Intl.NumberFormat`, `Intl.DateTimeFormat`) using the locale and currency in `brand.ts`.

### 2.5 Backend-dependent features: decisions needed

| Feature | Reference | Recommended | Fallback |
| --- | --- | --- | --- |
| Contact form, newsletter | Template, C | Astro Actions (`defineAction`, Zod validation) posting to your email or CRM endpoint | Third-party form service |
| Login / signup | Template | Keep as UI; wire to your auth provider | Hide the routes until ready |
| Blog search | B | Pagefind (build-time index, client-side search) | Hide the search bar |
| Comments | C | Feature-flag **off** by default. Static sites can't store comments. Use a hosted service (e.g. Giscus) or build an API | Show the count only when enabled |
| Follow / Chat on author card | B | Remove. Show name, role, bio and social links | — |
| Task data | D | Mock JSON until an API exists | — |

## 3. Design tokens

Reference values are estimates from the screenshots. Components reference semantic tokens only, never raw values. The brand slot column is what you replace.

### 3.1 Colour (light theme)

| Token | Reference ≈ | Brand slot | Usage |
| --- | --- | --- | --- |
| `--background` | `#FFFFFF` | `{{BRAND_BACKGROUND}}` | Page canvas |
| `--foreground` | `#1F2430` (A uses near-black `#0B0B0B`) | `{{BRAND_TEXT}}` | Headings, body text |
| `--surface` (new) | `#F4F5F7` (A panels), `#EBEEF3` (B/C canvas) | `{{BRAND_SURFACE}}` | Rounded section panels behind white cards |
| `--card`, `--card-foreground` | `#FFFFFF`, same as foreground | — | Cards, popovers |
| `--primary` | `#4B6BFB` (B/C), `#1560D4` (D), `#0B0B0B` (A buttons) | `{{BRAND_PRIMARY}}` | CTAs, links, active states, check badges |
| `--primary-foreground` | `#FFFFFF` | `{{BRAND_ON_PRIMARY}}` | Text and icons on primary |
| `--secondary` | `#F1F4F9` | `{{BRAND_SECONDARY}}` | Input fills, chips, ghost buttons |
| `--muted`, `--muted-foreground` | `#F1F4F9`, `#7A8499` | — | Metadata, placeholders. **Must reach 4.5:1** |
| `--accent` | primary at 10% (`#E1ECFA` in D) | `{{BRAND_ACCENT}}` | Tinted buttons ("+ New Task"), hover tint |
| `--border`, `--input` | `#E5E8EF` | — | Hairlines, dividers, input outlines |
| `--ring` | same as primary | — | Focus ring |
| `--destructive` | `#E5484D` (not in designs) | `{{BRAND_DANGER}}` | Form errors, destructive actions |
| `--success` (new, not in designs) | `#2E9E6B` | `{{BRAND_SUCCESS}}` | "Link copied", form success |
| `--warning` (new, not in designs) | `#F5B301` | `{{BRAND_WARNING}}` | Star rating fill |

**Dark theme.** None of the references show one. Derive it from the brand: background at roughly 8–10% lightness, card +3–4%, surface +2%. Do not invert the light palette. Re-check every contrast pair.

**Contrast flags from the references.** Light grey metadata on white (timestamps, inactive tabs, disabled count badges, tag text, input placeholders) looks below 4.5:1. The B/C blue with white text measures about 4.4:1 on my sampled value, which is borderline for normal-size text. Verify with real brand values.

### 3.2 Typography

| Token | Size / line-height / weight / tracking ≈ | Usage |
| --- | --- | --- |
| `text-display` | `clamp(2.5rem, 1rem + 5vw, 4.5rem)` / 1.05 / 600 / −0.02em | Hero H1 |
| `text-h2` | `clamp(1.75rem, 0.5rem + 3vw, 2.75rem)` / 1.1 / 600 / −0.01em | Section titles ("User guide…", "Services") |
| `text-h3` | 1.5rem / 1.25 / 600 | Featured article title, service title |
| `text-h4` | 1.125rem / 1.35 / 600 | Listing, task and compact article titles |
| `text-body` | 1rem / 1.6 / 400 | Body copy |
| `text-sm` | 0.875rem / 1.5 / 400 | Card descriptions, metadata |
| `text-xs` | 0.75rem / 1.4 / 500 | Chips, tags, badges, counts |
| `text-stat` | `clamp(2.25rem, 1rem + 4vw, 3.5rem)` / 1 / 500 | "10+ Million" style figures |
| `text-index` | 1.5rem / 1 / 400 | Service index "01 02 03" |

Font stack: `--font-sans: var(--font-brand), "DM Sans", ui-sans-serif, system-ui, sans-serif`. Use `font-variant-numeric: tabular-nums` on prices, stats, times and counts. Preload only the weights actually used, with `font-display: swap`.

### 3.3 Spacing, layout, radius, elevation, motion

Spacing uses Tailwind's 4px scale. Use these semantic roles:

| Role | Value | Notes |
| --- | --- | --- |
| Container | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` | One container for every route |
| Gap between section panels | `gap-4 md:gap-6` | A shows panels tightly stacked |
| Panel padding | `p-5 md:p-8 lg:p-12` | Inside `SectionPanel` |
| Card padding | `p-3` around an inset image, `p-4` for text-only | Listing and article cards inset the image inside the card |
| Grid gap | `gap-4 md:gap-6` | Card grids |
| Chip and inline gaps | `gap-2` chips, `gap-3` icon + text | — |

| Radius token | Value ≈ | Usage |
| --- | --- | --- |
| `--radius` | 0.75rem | Base. Inputs and small buttons |
| `rounded-sm` (base − 4px) | 0.5rem | Tag chips, badges |
| `rounded-lg` | 1rem | Cards, images inside cards |
| `--panel-radius` → `rounded-panel` | 1.5rem | Section panels (A) |
| `--btn-radius` → `rounded-button` | `var(--radius)` | Buttons. A uses pills, B–D use rounded rectangles |
| `rounded-full` | — | Avatars, circular carousel arrows, amenity strip, count pills |

| Elevation | Value ≈ | Usage |
| --- | --- | --- |
| `shadow-none` | — | Panels (A is flat) |
| `shadow-card` | `0 8px 24px -8px rgb(24 32 56 / .10)` | Cards on the surface canvas (B, C, D) |
| `shadow-raised` | `0 16px 40px -12px rgb(24 32 56 / .16)` | Card hover, overlapping article header |

Motion tokens: `--duration-fast` 150ms, `--duration-base` 250ms, `--duration-slow` 500ms, `--ease-brand` `cubic-bezier(0.22, 1, 0.36, 1)`. Mirror them as constants in `lib/motion.ts` for Motion code.

### 3.4 Token wiring

The template already ships the shadcn variable block. Edit its values, then **add** the new tokens below. Don't alias a variable to itself inside `@theme inline`; keep the raw value in `:root` under a different name.

```css
:root {
  --surface: #f4f5f7;        /* {{BRAND_SURFACE}} */
  --success: #2e9e6b;        /* {{BRAND_SUCCESS}} */
  --warning: #f5b301;        /* {{BRAND_WARNING}} */
  --btn-radius: var(--radius);
  --panel-radius: 1.5rem;
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 500ms;
}
.dark { --surface: #14161b; --success: #4cc38a; --warning: #f7c948; }

@theme inline {
  --color-surface: var(--surface);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --radius-button: var(--btn-radius);
  --radius-panel: var(--panel-radius);
  --ease-brand: cubic-bezier(0.22, 1, 0.36, 1);
}
```

## 4. Brand personalization (applies to every route)

### 4.1 Three layers, applied in this order

1. **Tokens.** One CSS file restyles the whole site. Fastest path: build the theme in tweakcn from the brand colours, radius and font, then paste its `:root` and `.dark` output into `global.css`.
2. **Config.** `src/config/brand.ts` holds name, tagline, logo paths, nav and footer links, socials, contact details, locale, currency, SEO defaults and feature flags (`comments`, `search`, `auth`). Components read from it; none hardcode brand strings.
3. **Content and assets.** Copy, imagery, logos, favicon, OG images, MDX posts, listings.

### 4.2 Brand intake checklist

| Item | Provide as | Lands in |
| --- | --- | --- |
| Logo: full and icon-only, light and dark variants | SVG with outlined text; min size; clear-space rule | `public/brand/`, Navbar, Footer, favicon, OG |
| Colours: primary, secondary, accent, neutrals, semantic set | HEX or OKLCH with names; dark palette if one exists | `global.css` `:root` / `.dark` |
| Typography: families, weights, fallback, web licence | WOFF2 files or Google Fonts name; scale rules | Font loading, `--font-sans` |
| Shape language: radius, pill vs rounded, shadow style | Values, or "derive from logo" | `--radius`, `--btn-radius`, `--panel-radius` |
| Imagery: photo direction, aspect ratios, treatments | Rules plus 5–10 approved samples | Every `image` prop, OG template |
| Iconography | Lucide or a custom SVG set, with stroke weight | `components/ui` |
| Voice and copy: tone, headline casing, CTA verbs, banned words | Guide | All copy, `brand.ts` |
| Locale: language, currency, date and number format, units | e.g. `en-GB`, `GBP` | `brand.ts` → `lib/format.ts` |
| Legal and contact: company name, address, socials, privacy and terms | Text and URLs | Footer, Contact, JSON-LD |
| Motion personality | "calm", "snappy", etc. | Duration tokens |

### 4.3 Decisions the designs leave open

| Decision | Default in this spec | Why |
| --- | --- | --- |
| Primary colour: black (A) or blue (B–D) | Single `--primary` set from brand | The references disagree, so the brand must decide |
| Button shape | Rounded rectangle via `--btn-radius` | One token flips every button to a pill |
| Headline casing | Sentence case | A uses Title Case on mock copy; brand voice overrides |
| Panel style | Rounded `surface` panels | Set `--panel-radius: 0` for a flat look |
| Featured service card ("01") | `bg-foreground text-background` | Use `bg-primary` only if it passes contrast with `primary-foreground` |
| Icon family | Lucide | Swap only if the brand ships its own set |

### 4.4 Acceptance checks for brand application

- Contrast passes in both themes: body text 4.5:1, large text and UI boundaries 3:1. Check `--muted-foreground` on `--card` and `--surface`, `--primary-foreground` on `--primary`, and `--ring` against `--background`.
- A search for `#[0-9a-fA-F]{3,8}` and `rgb(` in `src/components` returns nothing outside the token file.
- Toggle dark mode on every route: no white patches, no illegible text.
- The logo swaps with the theme, with no flash on first paint.
- Per route: unique `<title>`, description and OG image, none containing template placeholder text.

## 5. Component specification

Build order: shadcn primitives first, then patterns that compose them, then blocks. Install the primitives you don't have yet: `button card tabs carousel accordion avatar badge input textarea label checkbox toggle-group separator skeleton sonner tooltip form`.

### 5.1 Inventory

| Component | Ref | Built on | Hydration | Status |
| --- | --- | --- | --- | --- |
| Navbar, Footer, Hero, Logo marquee, Features, Resource allocation, Testimonials carousel, Pricing table, FAQ accordion | Template | shadcn | per Section 2.3 | Restyle through tokens and `brand.ts`. No structural change except where noted below |
| `SectionPanel` | A | none | none | New |
| `HeroSplit` | A | Button | none | Extends Hero |
| `AmenityStrip` | A | none | none | New |
| `ListingCard` | A | Card, Button | none | New |
| `ListingTabsCarousel` | A | Tabs, Carousel | visible | New |
| `StepsGuide` | A | none | none | New |
| `TestimonialFeature` | A | Avatar, Button, Carousel | visible | Extends Testimonials |
| `StatsBlock` | A | none | visible (count-up only) | New |
| `ServiceCards` | A | Card | none | New |
| `ArticleCard` (4 variants) | A, B | Card, Avatar | none | New |
| `CategoryNav` | B | none | none | New |
| `SearchBar` | B | Input, Button | idle | New |
| `TagChips` | B, C | Badge | none | New |
| `AuthorCard` | B | Avatar, Card | none | New |
| `ArticleHeader`, `PullQuote`, `ShareLink` | C | Input, Button, Tooltip | visible (ShareLink) | New |
| `NewsletterCard` | C | Input, Button | idle | New |
| `CommentForm`, `CommentItem` | C | Textarea, Avatar | idle | New, behind the `comments` flag |
| `TaskTabs`, `TaskFilterChips`, `TaskCard`, `AvatarStack` | D | Tabs, ToggleGroup, Checkbox, Avatar | only | New |

### 5.2 Landing blocks (reference A)

| Component | Props | Behaviour and notes |
| --- | --- | --- |
| `SectionPanel` | `as?: "section" \| "div"`, `tone?: "surface" \| "card" \| "inverted"`, `padding?: "md" \| "lg"`, `id?`, `labelledBy?` | Wrapper for every landing block. `rounded-panel`, background from `tone`. `inverted` = `bg-foreground text-background`. Sets `aria-labelledby` when `labelledBy` is given |
| `HeroSplit` | `eyebrow?`, `title`, `description`, `primaryCta`, `secondaryCta?` (`{label, href}`), `image: ImageMetadata`, `imageAlt`, `notch?: boolean` | Desktop: copy left, image right filling the panel height. Mobile: copy first, image below, CTAs stacked at full width (A mobile). The only `h1` on the route. Image is the LCP element: `loading="eager"`, `fetchpriority="high"`, widths 640/960/1280. `notch` cuts a bottom-right corner out of the image with inverted radii (CSS mask or SVG) so the next panel tucks in. Desktop only; mobile gets a plain rounded image |
| `AmenityStrip` | `items: {icon, title, description}[]` (3–4) | Desktop: single full-radius `surface` bar, items in a row, 40px circular icon left of two-line text. Mobile: stacked column, icon above centred text (A mobile). Beyond 4 items, wrap to 2 columns. Icons are decorative (`aria-hidden`) |
| `StepsGuide` | `title`, `steps: {title, description}[]` (3–6), `stepLabel: string` | Desktop: two columns. Title left with a ghost quote glyph behind it. Steps right as an `<ol>` with a 2px `foreground` rule on its left edge. Each step shows `stepLabel + number` in 600 weight, then text. Mobile: one column, title above. Build numbering from props, not CSS counters, so it translates |
| `TestimonialFeature` | `heading`, `items: {quote, name, location?, rating?: 1–5, avatar?, images?: [ImageMetadata, ImageMetadata]}[]`, `seeMoreHref?` | Desktop: left, two offset image tiles with the second overlapping and larger. Right, white card with avatar, name, location pin, stars, italic quote. Below the card, a full-width primary "See more" button with an arrow in a circle. One item renders static. Two or more render as a carousel with `CarouselControls`. Mobile: heading centred, images, card overlapping the images, button full width. Stars are `role="img"` with `aria-label="4 out of 5"` |
| `StatsBlock` | `stats: {value: number, suffix?, label, description?}[]` (3), `media: {src, alt}`, `title`, `body`, `countUp?: boolean` | Desktop: stats stacked left (large figure, small grey description), tall portrait image centre (`aspect-[3/4]`), title and body right. Mobile: stats, then image, then text. SSR renders the **final** number so there is no layout shift. `countUp` animates on first view only (Section 10) |
| `ServiceCards` | `services: {title, description, icon?}[]` (3), `featuredIndex?: number` (default 0) | Three equal cards. Index number (`01`) top right in `text-index`. Title bottom left. The featured card uses the `inverted` tone. Hover on a non-featured card raises it with `shadow-raised`. Whether hover should swap the inverted card is open (Section 13) |
| Blog carousel (Home) | `posts: ArticleCard props[]`, `heading`, `seeAllHref` | Reuses `ArticleCard` `vertical` inside the shared carousel. Desktop shows 4 slides with a partial fifth peeking at the edge. Tablet 2. Mobile 1.15 slides per view to hint at scrolling |

### 5.3 Listing components (reference A)

| Component | Props | Behaviour and notes |
| --- | --- | --- |
| `ListingCard` | `title`, `description`, `price: number`, `currency`, `image`, `imageAlt`, `href`, `meta?: {label, value}[]`, `badge?` | White `rounded-lg` card. Image inset with its own radius, `aspect-[3/2]`. Title `text-h4`, clamped to 2 lines. Description `text-sm muted`, clamped to 2 lines. Bottom row: price (`tabular-nums`, 600) left, "View" button (`size="sm"`, primary) right. **The card has one link**: the View button is the `<a>`, with `aria-label="View {title}"` and a stretched `::after` so the whole card is clickable. No nested links |
| `ListingTabsCarousel` | `groups: {id, label, items: ListingCardProps[]}[]`, `defaultGroup?`, `seeAllHref?` | Tabs in a pill container top left. Active tab is a raised white pill. Circular prev/next arrows top right (A shows prev muted, next solid). Dot indicators bottom centre: active dot elongated, others round. Every group renders its own carousel in the server HTML. Desktop 3 slides per view, tablet 2. **Mobile (<768px) is not a carousel**: Embla is deactivated via `breakpoints: {"(max-width: 767px)": {active: false}}`, the first 3 cards stack vertically, the rest are `hidden md:block`, and a "See all" link follows (A mobile). Selected tab syncs to `?type=` so it can be shared |
| `CarouselControls` | `api: CarouselApi`, `variant?: "circle" \| "ghost"`, `showDots?: boolean` | 48px circular buttons (visual 32–40px is fine if the hit area is 44px). Disabled at the ends with `aria-disabled` and 40% opacity. Dots built from `api.scrollSnapList()` and `api.selectedScrollSnap()`; each dot is a button labelled "Go to slide N" |

### 5.4 Blog components (references B and C)

| Component | Props | Behaviour and notes |
| --- | --- | --- |
| `ArticleCard` | `variant: "featured" \| "vertical" \| "compact" \| "media"`, `title`, `excerpt?`, `image`, `imageAlt`, `author: {name, avatar?}`, `date: Date`, `href`, `category?`, `views?: number`, `shareable?: boolean` | `featured`: horizontal, image left \~45%, title `text-h3` (3 lines max), excerpt 3 lines max, footer with avatar, name, date, optional share icon button. `vertical`: image top, title 3 lines max, author footer. `compact`: 96px thumbnail left, title 2 lines, meta below. `media`: compact plus a play icon overlay and an eye icon with the formatted view count. Title is the single link with a stretched `::after`. Date through `Intl.DateTimeFormat` |
| `CategoryNav` | `items: {label, href, icon}[]`, `activeHref?` | Vertical list inside a card. Each row has a 40px rounded tile with the icon, then the label. Active: tile `bg-primary text-primary-foreground`, label weight 500. `<nav aria-label="Categories">`, active link `aria-current="page"`. Below `lg` it becomes a horizontally scrolling chip row with scroll-snap |
| `SearchBar` | `placeholder`, `suggestions?: string[]`, `action?: string` | `<form role="search">`. Filled `secondary` input, radius-md, trailing square primary icon button (44px). Suggestions below as muted `#tag` links to `/blog?tag=`. Hide the whole component while the `search` flag is off |
| `TagChips` | `tags: string[]`, `selected?: string`, `href?: (tag) => string` | Chip: `rounded-sm`, `bg-secondary`, `text-xs`, muted text. Selected (B shows "2020"): 1px primary border, primary text, transparent fill. Wrap with `gap-2`. Render as links when `href` is set |
| `AuthorCard` | `name`, `role`, `avatar`, `bio?`, `links?: {label, href}[]`, `stats?: {label, value}[]` (≤3) | Portrait avatar left (\~40% of width, `rounded-lg`), details right. Stats sit in a `secondary` bar with 3 equal columns. B's "Chat" and "Follow" buttons are **not built** unless a backend exists; show social links instead |
| `ArticleHeader` | `category`, `title`, `author`, `date`, `updated?`, `lead`, `cover`, `coverAlt`, `shareHref?` | Cover image full width, `rounded-panel`, `aspect-[2/1]`. A white card overlaps the bottom of the cover by about 64px on desktop and 24px on mobile, with category badge, `h1`, byline row (avatar, name, date, share icon) and the lead paragraph in a `secondary` tinted box. Image has real alt text |
| `PullQuote` (MDX) | `author?`, `role?`, `avatar?` + children | `<figure><blockquote>…</blockquote><figcaption>…</figcaption></figure>`. A 32px primary rounded square with a white quote icon top left. A ghost quote glyph (`text-foreground/5`, `aria-hidden`) bottom right. `<strong>` inside the quote renders at 600 |
| `ShareLink` | `url?` (default `Astro.url.href`), `label`, `helper?` | Read-only input (select-all on focus, single line, ellipsis) plus a square primary icon button. Click: `navigator.clipboard.writeText`, icon changes to a check, `aria-live="polite"` region announces "Link copied", reverts after 2s. Clipboard needs a secure context, so fall back to selecting the text. On mobile, prefer `navigator.share` when available. Ship the helper text "opens in a new window" only if that is true |
| `NewsletterCard` | `title`, `description`, `image?`, `action` | Desktop: image tile left (\~120px, `rounded-lg`), title, one-line description, input with a square mail-icon button. Mobile: image becomes a banner above, or is hidden. Visible `<label>` (may be `sr-only`). Submits through an Astro Action |
| `CommentForm`, `CommentItem` | `onSubmit`, `count`, `comments[]` | Only when `brand.flags.comments` is true. Input with a send button, count heading ("87 comments"), item with avatar, name, date, body. Needs moderation, rate limiting and a spam strategy before it is enabled |

### 5.5 Task components (reference D)

Inferred states are marked *(inferred)*: the screen only shows completed tasks and the "All" filter.

| Component | Props | Behaviour and notes |
| --- | --- | --- |
| `TaskTabs` | `tabs: {id, label}[]`, `value`, `onValueChange` | Underline tabs, equal-width columns, hairline border below the row. Active: `foreground`, weight 600, 2px underline. Inactive: `muted-foreground`. Radix Tabs keyboard model. The underline slides between tabs via a shared `layoutId` |
| `TaskFilterChips` | `filters: {id, label, count}[]`, `value`, `onValueChange` | Single-select `ToggleGroup`. Each chip is a label plus a count pill. Active: label in primary 600, count pill `bg-primary text-primary-foreground`. Inactive: muted label, grey count pill. A vertical divider follows the first chip ("All"). Scrolls horizontally when narrow |
| `TaskCard` | `id`, `title`, `project`, `start: Date`, `end: Date`, `assignees: User[]`, `done: boolean`, `onToggle` | White `rounded-lg` card, `p-4`. Top row: title (`text-h4`) and status control, project name below in `text-sm muted`. Hairline. Bottom row: "Today" in `foreground`, time range in `muted`, `AvatarStack` right. Done: filled primary circle (40px) with a white check, title `line-through`. Open *(inferred)*: 1.5px outlined circle, same size. The status control is a real checkbox (`role="checkbox"`, `aria-checked`) whose accessible name is the task title. Done state also carries visually hidden text "Completed" so meaning does not rely on strikethrough alone. Times via `Intl.DateTimeFormat` with the user's `hour12` preference |
| `AvatarStack` | `users: {name, src?}[]`, `max = 3`, `size = 40` | 12px negative overlap, 2px ring in the card colour. Overflow chip "+N" with solid `bg-primary text-primary-foreground` (D's pale chip is low contrast). The group has `aria-label="Assigned to Ana, Bo and 4 others"`; individual avatars are `alt=""` |
| Task header | `date: Date`, `onNew` | Title "Today's task" with the formatted date below (`Intl`, `weekday: long, day: numeric, month: long`, so "Wednesday, 11 May" with no stray space). "+ New task" button: `bg-accent text-primary`, radius-lg, plus icon, 44px minimum height |

## 6. Routes

### 6.0 Shared layout (every route)

`BaseLayout.astro` provides, in order: skip link ("Skip to content") → Navbar → `<main id="main">` → Footer. It also sets `<html lang>` from `brand.ts`, the astro-themes provider (no flash of wrong theme), and the SEO head: title template `{page} · {brand}`, description, canonical, Open Graph, Twitter card, `theme-color` for light and dark, and the favicon set. It has a JSON-LD slot. Every route has exactly one `h1`.

### 6.1 Route map

| Route | File | Rendering | Indexed |
| --- | --- | --- | --- |
| `/` | `pages/index.astro` | Static | Yes |
| `/listings` | `pages/listings/index.astro` | Static, client-side filter | Yes |
| `/listings/[slug]` | `pages/listings/[slug].astro` | Static (`getStaticPaths`) | Yes |
| `/about` | `pages/about.astro` | Static | Yes |
| `/pricing` | `pages/pricing.astro` | Static | Yes |
| `/faq` | `pages/faq.astro` | Static | Yes |
| `/contact` | `pages/contact.astro` | Static page, Astro Action for submit | Yes |
| `/login`, `/signup` | `pages/login.astro`, `pages/signup.astro` | Static UI | No (`noindex`) |
| `/blog` | `pages/blog/index.astro` | Static | Yes |
| `/blog/page/[page]` | `pages/blog/page/[page].astro` | Static, paginated. `/blog/page/1` redirects to `/blog` | Yes |
| `/blog/category/[category]` | `pages/blog/category/[category].astro` | Static | Yes |
| `/blog/[slug]` | `pages/blog/[slug].astro` | Static (`getStaticPaths`) | Yes |
| `/app/tasks` | `pages/app/tasks.astro` | Server (`prerender = false`) | No |
| `/404` | `pages/404.astro` | Static | No |
| `/rss.xml`, `/sitemap-index.xml`, `/robots.txt` | endpoint, `@astrojs/sitemap`, static file | Generated | — |
| `/styleglide` | template | Dev only, excluded from the production build | No |

Exclude `noindex` routes from the sitemap.

### 6.2 Per-route spec and personalization

Each route lists its composition, data source, what to personalize, and its SEO requirements.

#### `/` Home

- **Composition (follows A):** Navbar → `HeroSplit` → `AmenityStrip` → `ListingTabsCarousel` → `StepsGuide` → `TestimonialFeature` → `StatsBlock` → blog carousel → `ServiceCards` → Footer. The template's Logo marquee, Features, Resource allocation, Pricing table and FAQ blocks stay available. Include only the ones the brand has real content for; an empty or filler block hurts more than a missing one.
- **Data:** listings and blog collections (`featured` first, newest after), copy from `brand.ts` or the page file.
- **Personalize:** H1 and CTA wording; hero photo (brand-approved, this is the LCP image); the three amenity items become your three strongest value propositions; client logos as SVG (monochrome via `currentColor` so they follow the theme); step copy; testimonials only with permission to publish; **stats must be real, sourced figures**; service names and descriptions.
- **SEO:** title ≤60 characters in the form `{Brand} — {value proposition}`, description ≤155. JSON-LD `Organization` and `WebSite`.

#### `/listings`

- **Composition:** page header (`h1`, result count) → type filter (same tabs as A, synced to `?type=`) → grid of `ListingCard` (1 column mobile, 2 tablet, 3 desktop) → empty state. No design exists for this page, so it is composed from A's parts.
- **Data:** `listings` collection. Up to about 48 items render in one page. Beyond that, add `/listings/page/[page]` (not `/listings/[page]`, which collides with the slug route).
- **Personalize:** rename the `type` enum and tab labels to your categories; page intro copy; currency and locale in `brand.ts`.
- **SEO:** unique title and description per `?type=` is not possible on a static page, so canonicalise filtered URLs to `/listings`.

#### `/listings/[slug]`

- **Composition (no design exists):** breadcrumb → `h1` and price → gallery (carousel with thumbnails, first image eager) → key facts list → MDX description → enquiry CTA to `/contact?ref={slug}` → 3 related listings of the same type.
- **Data:** one `listings` entry; `getStaticPaths` from the collection.
- **Personalize:** description voice, facts shown, CTA label, image treatment.
- **SEO:** JSON-LD `BreadcrumbList` plus an `Offer`-style block if you want one; OG image is the first gallery image.

#### `/about`

- **Composition:** Hero (compact) → story (MDX) → values via `AmenityStrip` or Features → team via `AuthorCard` grid → `StatsBlock` → Testimonials → CTA band.
- **Personalize:** company story, team names, roles and portraits (consistent crop and background), values, legal entity name and founding year.
- **SEO:** title, description, `Organization` JSON-LD with `sameAs` social URLs.

#### `/pricing`

- **Composition:** header → Pricing table (template) → comparison or notes → FAQ accordion → CTA.
- **Data:** plans defined in one typed array in `brand.ts` or a `pricing.ts` file, never in markup.
- **Personalize:** plan names, prices through `Intl.NumberFormat`, feature lists, billing-period toggle if used, CTA destinations, highlighted plan, currency, tax wording.
- **SEO:** FAQPage JSON-LD for the accordion on this page.

#### `/faq`

- **Composition:** header → grouped Accordion (single-open or multi-open, pick one) → contact CTA for unanswered questions.
- **Data:** one array of `{group, question, answer}` feeding both the UI and the JSON-LD.
- **Personalize:** real questions from support history, grouped by topic.
- **SEO:** Radix does not render closed answers into the server HTML by default. Emit `FAQPage` JSON-LD from the same array. If the answers should also count as page text, use `forceMount` with `hidden` styling when closed.

#### `/contact`

- **Composition:** header → two columns (form left, contact details right; stacked on mobile) → optional map link (no embedded map by default, for performance and privacy).
- **Form:** name, email, topic (select, optional), message, consent checkbox if your region requires it. Validate with Zod on the client and again in the Astro Action. Add a honeypot field and server-side rate limiting.
- **Personalize:** address, email, phone, opening hours, topic list, response-time promise (state only a time you can meet), privacy link.
- **SEO:** `ContactPage` or `Organization` JSON-LD with `contactPoint`.

#### `/login` and `/signup`

- **Composition:** centred card (or split layout with a brand panel ≥1024px), logo, fields, submit, link to the other route. Social sign-in buttons only for providers you configure.
- **States:** see Section 7. Password field has a show/hide toggle. After login, redirect to `?next=` or `/app/tasks`.
- **Personalize:** logo, short brand line in the side panel, legal links, field labels in brand voice.
- **Gap:** the template has no forgot-password, reset-password or email-verification routes. Add them before launch if accounts are real.

#### `/blog`

- **Composition (B):** header → 12-column grid. Main (8 columns): featured `ArticleCard`, then a grid of `vertical` cards. Aside (4 columns): `CategoryNav`, `SearchBar`, `TagChips`, `media` cards (only if media posts exist), `AuthorCard` (only if one author is being promoted), `NewsletterCard`. Pagination uses the circular prev/next controls from B plus page numbers. Mobile: `CategoryNav` becomes a chip row above the grid, and the aside content follows the list.
- **Tag filtering:** `/blog?tag=` is a client-side filter over the rendered list and canonicalises to `/blog`. Indexable filtering is by category.
- **Personalize:** category names and icons, featured selection rule, newsletter promise (frequency and topic), author spotlight.
- **SEO:** title and description; `Blog` JSON-LD; RSS autodiscovery `<link>`.

#### `/blog/category/[category]`

- Same layout as `/blog`, filtered. `h1` is the category name with a one-sentence description from `brand.ts`. Canonical to itself; paginate with the same scheme.

#### `/blog/[slug]`

- **Composition (C):** `ArticleHeader` → body in a `max-w-[68ch]` column → `PullQuote` and images inside MDX → `TagChips` → `AuthorCard` → `NewsletterCard` → comments (only with the flag) → 3 related posts. `ShareLink` sits in a sticky desktop aside and below the body on mobile.
- **MDX styling:** map `h2, h3, a, img, blockquote, code, pre, table, ul, ol` to token-styled components. Use the typography plugin if the template includes it; otherwise write one `.prose-brand` class. Code blocks scroll horizontally. Images get alt text and an aspect ratio.
- **Personalize:** author bios, cover image style, reading-time label, newsletter copy.
- **SEO:** JSON-LD `Article` (`headline`, `datePublished`, `dateModified`, `author`, `image`) and `BreadcrumbList`. OG image from the cover, or generated per post.

#### `/app/tasks`

- **Composition (D):** `AppLayout` (compact header with logo, theme toggle, user menu; no marketing nav or footer) → `TaskTabs` (Messages, Today's task, Last activity) → task header → `TaskFilterChips` → list of `TaskCard`. D is a mobile design. From 768px upward, centre it in a `max-w-2xl` card on the `surface` background. A two-pane desktop layout needs a design.
- **Gaps:** "Messages" and "Last activity" tabs have no design. Ship them as `EmptyState` placeholders or hide them. The "New task" flow has no design either.
- **Gate:** no session → redirect to `/login?next=/app/tasks`. `noindex`, excluded from the sitemap.
- **Personalize:** copy and terminology ("task" may be "job", "visit", "order"), project names, avatar fallbacks, status colours from semantic tokens only.

#### `/404`, feeds and utility routes

- **404 (no design):** `h1`, one line of copy in brand voice, search or the three most useful links, brand illustration slot. Returns status 404.
- **`/rss.xml`:** `@astrojs/rss` over non-draft posts, full URLs, site name from `brand.ts`.
- **`/robots.txt`:** allow all, disallow `/app/`, `/login`, `/signup`, point to the sitemap.

## 7. States and interactions

The references show mostly default states. Everything below default is specified here so nobody has to guess.

| Element | State | Behaviour |
| --- | --- | --- |
| Primary button | Hover | Background `primary` at 90%, 150ms |
|  | Active | Background 95%, `scale(0.98)` |
|  | Focus-visible | 2px `ring`, 2px offset, never removed |
|  | Disabled | 50% opacity, no pointer events, `aria-disabled` when it must stay focusable |
|  | Loading | Spinner replaces the icon, `aria-busy="true"`, width locked so the label doesn't shift, click ignored |
| Listing / article card | Hover (pointer devices only, `@media (hover: hover)`) | Lift 2px, `shadow-raised`, image scale 1.02 inside its clip, 200ms |
|  | Focus-visible | Ring drawn around the whole card (via `:has(a:focus-visible)` or `focus-within`) |
| Input, textarea | Focus | Border and ring in `primary` |
|  | Error | Border `destructive`, message with icon below, `aria-invalid="true"`, `aria-describedby` points at the message |
|  | Disabled / read-only | Muted fill; read-only text stays selectable |
| Tabs (listing, task) | Hover | Label to `foreground` |
|  | Active | Per component spec; keyboard arrows move focus and selection |
| Carousel | Arrow at either end | Disabled, 40% opacity, `aria-disabled` |
|  | Drag | `cursor: grab` / `grabbing`; vertical scroll still works on touch |
| Tag chip | Hover | Background steps one shade darker |
|  | Selected | Primary outline and text |
| Filter chip | Selected | Per `TaskFilterChips` spec |
|  | Count is 0 | Stays enabled; selecting it shows the empty state |
| Listing tab | Group has no items | Tab is not rendered |
| Contact / newsletter form | Submitting | Fields read-only, button loading |
|  | Success | Form is replaced by a success panel and focus moves to it. Newsletter says the same thing for a new or existing email (no account enumeration) |
|  | Validation error | Field-level messages plus a summary at the top; focus goes to the first invalid field |
|  | Server error | Inputs are kept, toast says what failed and what to do next |
| Login / signup | Wrong credentials | One generic message ("Email or password is incorrect"), never says which |
|  | Submitting | Same as button loading |
| `ShareLink` | Copied | Icon becomes a check for 2s, live region says "Link copied" |
|  | Copy failed | Text is selected and the toast says to press Ctrl/⌘ + C |
| `TaskCard` | Toggle | Optimistic update, 200ms check animation |
|  | Toggle fails | Revert, toast "Couldn't update the task. Try again" |
| `TaskCard` list | Loading | 3 skeleton cards matching card height |
|  | Empty (per filter) | Illustration slot, one line ("No closed tasks"), and a "New task" action when relevant |
| Mobile menu | Open | Sheet from the side, focus trapped, Esc and outside tap close, body scroll locked |
| `SearchBar` | Empty query | Submit disabled |
|  | Loading | Spinner while the index loads |
|  | No results | "No results for …" with suggested tags |
| Theme toggle | Change | System / light / dark, persisted, no transition on the swap to avoid a colour flash |

## 8. Responsive behaviour

Breakpoints use Tailwind 4 defaults: `md` 768px, `lg` 1024px, `xl` 1280px. Design mobile-first, and add rules upward.

| Breakpoint | Changes |
| --- | --- |
| Mobile (<768px) | Single column. Hero copy above image, full-width stacked CTAs. Amenity strip stacks vertically, centred. Listings are a vertical list of 3 plus "See all" (not a carousel). Steps, testimonial and stats stack. Blog carousel shows 1.15 slides. Blog aside content follows the list; `CategoryNav` is a scrolling chip row. Task screen fills the width |
| Tablet (768–1023px) | Carousels show 2 slides. Hero may stay stacked until 900px if the image needs more room. Blog stays one column plus a 2-column card grid. App route is a centred `max-w-2xl` card |
| Desktop (≥1024px) | Hero is two columns with the notch. Amenity strip is one row. Listings show 3 slides. Steps, stats and testimonial use their two- and three-column layouts. Blog uses the 8 + 4 column grid with a sticky aside. Article page shows the sticky share aside |
| Wide (≥1280px) | Container caps at `max-w-7xl`. Nothing else grows. Backgrounds may extend |

Why mobile stacks the listings instead of carousel-ing them: A's own mobile layout does it, and horizontal scrolling inside a vertical page is easy to miss and hard to use one-handed. Where the design is silent, prefer vertical flow on narrow screens.

Rules: never scroll the page sideways; wide tables and code blocks scroll inside their own `overflow-x-auto` container; touch targets are at least 44×44px; images keep their aspect ratio and never stretch.

## 9. Edge cases

### 9.1 Content limits

| Element | Limit | Overflow |
| --- | --- | --- |
| Hero H1 | \~60 characters | Wraps; never truncated |
| Listing title, description | 70 and 140 characters | `line-clamp-2`; full text on the detail page |
| Article title | 90 characters | `line-clamp-3` on cards, never clamped in the header |
| Excerpt | 160 characters | `line-clamp-3` |
| Task title | 80 characters | `line-clamp-2` |
| Price | up to 10 digits | `tabular-nums`; never wraps. Uses compact notation only if the brand asks |
| Tag | 24 characters, max 6 per post | Truncate with ellipsis and `title` |
| Avatar stack | 3 shown | "+N" for the rest |
| Stats | 3 | A fourth stat requires a new layout |

### 9.2 Missing, empty and loading data

- **No image:** neutral `surface` placeholder with the correct aspect ratio. Never a broken icon, never a collapsed card.
- **No avatar:** initials on a token background.
- **No price:** hide the price row, keep the View button aligned right.
- **Zero posts or listings:** empty state with a one-line explanation and a link home or to contact.
- **Loading:** skeletons matching the final dimensions so nothing shifts. Server-rendered routes show real content immediately and need no skeleton.
- **Error:** inline message close to the cause, with the next step; never a blank panel.

### 9.3 Language and layout

- **Longer text:** design for strings up to 40% longer than English. Buttons wrap to two lines or grow; they don't clip.
- **RTL:** use logical utilities (`ms-*`, `pe-*`, `start-*`), mirror directional icons and carousel direction. Not required at launch, but don't block it with `left`/`right` classes.
- **Numbers, dates, currency:** only through `lib/format.ts`.

### 9.4 Connectivity and JavaScript

- **Slow connection:** fixed aspect ratios plus a `surface` background so images load without shifting the page. Hero image is preloaded.
- **No JavaScript or failed hydration:** carousels fall back to horizontally scrolling lists with `snap-x`; tabs show the first panel; accordion answers are readable if `forceMount` is used; forms post normally where an Action supports it.

## 10. Animation and motion

Rules: animate only `opacity` and `transform`; never block interaction; play entrance animations once; keep every duration on the token scale. With `prefers-reduced-motion: reduce`, wrap Motion in `<MotionConfig reducedMotion="user">`, stop the marquee, skip count-up and parallax, and cut fades to 0–100ms.

| Element | Trigger | Animation | Duration | Easing |
| --- | --- | --- | --- | --- |
| Section content | First enters viewport (20% visible) | Fade in, move up 16px; children stagger 60ms | 500ms (`slow`) | `ease-brand` |
| Button, chip, link | Hover, press | Colour and `scale(0.98)` on press | 150ms (`fast`) | ease-out |
| Card | Hover (pointer only) | Lift 2px, shadow to `raised`, image scale 1.02 | 250ms (`base`) | ease-out |
| Carousel | Arrow, drag, dot | Embla default scroll physics (`duration: 25`) | ≈ 400ms | Embla |
| Tab underline | Tab change | Shared `layoutId` slide | Spring, stiffness 500, damping 40 | Spring |
| Accordion | Open, close | Height via Radix CSS variable, content fade | 200ms | ease-out |
| Logo marquee | Continuous | `translateX` loop, pauses on hover and focus | 30–40s per loop | linear |
| Stats count-up | First view, once | Number counts up to final | 1200ms | ease-out |
| Task check | Toggle | Circle scales 0.8 → 1, check draws, strikethrough grows from the left | 200ms | spring (stiffness 500, damping 30) |
| Task list | Filter change, item moves | Layout animation of items | 250ms | `ease-brand` |
| Copy button | Click | Icon swap with a short fade, reverts after 2s | 150ms | ease-out |
| Mobile menu | Open, close | Slide in from the edge, scrim fade | 250ms | ease-out |
| Toast | Appear, dismiss | Sonner defaults | — | — |
| Page transitions | — | None by default. If added, use Astro view transitions with the same tokens and reduced-motion respect | — | — |

## 11. Accessibility

Target: WCAG 2.2 AA on every route, in both themes.

### 11.1 Page level

- Landmarks: `header`, `nav` (labelled), `main`, `aside` (labelled), `footer`. Skip link is the first focusable element.
- One `h1`; headings never skip levels. Visual size is a class, not a reason to change the tag.
- Focus order follows reading order. In split layouts the DOM order is copy before image.
- A sticky header must not hide a focused element: set `scroll-padding-top` to the header height.
- Layout reflows at 320px width and 400% zoom without two-way scrolling.
- Colour is never the only signal: completed tasks also say "Completed", errors also have an icon and text, the active category also has `aria-current`.
- Images: informative images have specific alt text, decorative ones have `alt=""`. Never ship filename or lorem alt text.

### 11.2 Component behaviour

| Component | Role / ARIA | Keyboard | Screen reader |
| --- | --- | --- | --- |
| Carousel | `role="region"`, `aria-roledescription="carousel"`; slides `role="group"`, `aria-roledescription="slide"`, `aria-label="2 of 6"` | Tab to arrows; Enter / Space activate; Left / Right arrows move when the carousel has focus | "Carousel, Apartments"; slide position announced |
| Tabs | Radix `tablist` / `tab` / `tabpanel` | Left / Right (and Home / End) move; Tab enters the panel | "Today's task, tab, 2 of 3, selected" |
| Accordion | Button with `aria-expanded`, panel `role="region"` | Enter / Space toggle; Up / Down move between headers | State and heading announced |
| `TaskCard` toggle | `role="checkbox"`, `aria-checked`, name = task title | Space toggles | "Client review, checkbox, checked" plus "Completed" |
| `TaskFilterChips` | `ToggleGroup type="single"` | Arrow keys move, Space selects | "All, 35, selected" (count is part of the name) |
| `AvatarStack` | `role="group"` with `aria-label` | Not focusable | "Assigned to Ana, Bo and 4 others" |
| `CategoryNav` | `<nav aria-label>`, `aria-current="page"` | Tab through links | Current page announced |
| `SearchBar` | `role="search"`, visible or `sr-only` label | Enter submits | "Search articles, search" |
| `ShareLink` | Input with label, button name "Copy link", live region `polite` | Tab, Enter | "Link copied" |
| Forms | `<label for>`, `aria-describedby` for hints and errors, `autocomplete` values | Tab order = visual order | Errors announced via summary focus |
| Mobile menu | `dialog` semantics, focus trap, returns focus to the trigger | Esc closes | "Menu, dialog" |
| Star rating | `role="img"`, `aria-label="4 out of 5"` | Not focusable | "4 out of 5" |
| Marquee | Duplicate content `aria-hidden` | Pause control reachable | Read once only |

## 12. Performance and SEO

- **Targets (mobile, p75):** LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms. Set a JavaScript budget per route (suggested ≤ 150 KB gzipped on marketing routes) and fail CI above it.
- **Images:** `astro:assets` `<Image>` / `<Picture>`, AVIF and WebP, correct `sizes`, explicit width and height. Lazy-load everything except the LCP image. OG images are 1200×630.
- **Fonts:** self-hosted, subset, at most two families, preloaded for the weights used, `font-display: swap`.
- **Islands:** only interactive pieces hydrate, using the directives in Section 2.3. No React in static markup.
- **Third parties:** none by default. Load analytics deferred and respect consent rules for your region.
- **SEO:** one canonical per route, sitemap, `robots.txt`, RSS, `hreflang` if more than one locale. Validate structured data (Organization, WebSite, Article, BreadcrumbList, FAQPage) before launch. Title ≤ 60 and description ≤ 155 characters, unique per route.

## 13. Open questions and build order

### 13.1 Open questions

| # | Question | Default if unanswered | Blocks |
| --- | --- | --- | --- |
| 1 | Brand guidelines and Figma file: please share both | Reference values in Section 3 | Tokens, all copy |
| 2 | Primary colour: one colour for everything, or black (A) plus blue (B–D)? | One `--primary` | Tokens |
| 3 | Are "listings" real properties, or a generic catalogue (products, services, cases)? | Generic catalogue with renamable types | Collections, copy |
| 4 | Backend: form endpoint, auth provider, comments, task API | UI-only, mock data, comments off | Contact, newsletter, auth, `/app/tasks` |
| 5 | Does hovering a service card move the inverted state to it? | Static featured card | `ServiceCards` |
| 6 | Desktop layout for `/app/tasks` | Centred `max-w-2xl` card | App route |
| 7 | Dark palette: derive it, or does the brand supply one? | Derived | Tokens |
| 8 | Locale, currency, date format | One locale in `brand.ts` | Formatting |
| 9 | Blog search with Pagefind: yes or no? | Hidden until yes | `SearchBar` |
| 10 | Pages with no design: listing detail, 404, auth, about, pricing, FAQ, contact | Compose from template blocks and this spec | Those routes |

### 13.2 Build order

1. **Brand foundation:** intake (4.2), `global.css` tokens, font, `brand.ts`, logo and favicon, dark theme. Run the 4.4 checks.
2. **Primitives:** install shadcn components, build `CarouselControls`, `AvatarStack`, `TagChips`, `SectionPanel`. Register in Styleglide.
3. **Home:** landing blocks in the order of Section 6.2.
4. **Content and listings:** collections, `/listings`, `/listings/[slug]`.
5. **Blog:** card variants, `/blog`, category pages, article page, RSS.
6. **Forms:** contact, newsletter, login and signup UI, with Actions and the Section 7 states.
7. **App route:** `/app/tasks` with mock data and the session gate.
8. **Hardening:** dark-mode pass, accessibility audit (keyboard and screen reader on every route), Lighthouse against Section 12 targets, structured-data validation.

### 13.3 Definition of done (per route)

- Matches the reference at mobile, tablet and desktop, or the deviation is recorded here.
- Uses tokens only; no hardcoded colours, radii or font sizes.
- Every state in Section 7 exists and was exercised.
- Passes keyboard-only use and a screen-reader pass; contrast verified in both themes.
- No mock copy, no lorem, no placeholder alt text.
- Unique title, description, canonical and OG image; structured data valid.
- Performance targets met on a throttled mobile profile.
