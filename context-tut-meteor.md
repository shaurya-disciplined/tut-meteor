# context-tut-meteor.md
### Source-of-truth context for the tut::meteor website — "NOCTURNE" build

> Load this file first before working on this project. It captures who the site is for, the
> creative direction, every decision made, the real content, and the build plan. Mirrors the
> way the owner uses `tut-os-Context.md` in his Obsidian vault.

---

## 1. What this is & who it's for

`tut::meteor` is the personal "know me" site of **Shauryavardhan Mhetre** — alias **Meteor**, Discord
handle **`tut.meteor`**. He studies daily in a large "Study Together" Discord server and meets many new
people. Re-introducing himself every time is tedious, so this site is the **one link he drops in his
Discord profile**: click it, get his vibe, no re-explaining.

**Critical constraints / permissions**
- **Local only. Never deployed, never published, never commercial.** Any image/video from anywhere on
  the internet (or AI-generated) may be used freely — no licensing concerns for this project.
- The visitor is usually a stranger from Discord. The site should **intrigue, not inform**.

## 2. The North Star — "NOCTURNE"

Automotive-cinematic **luxury** + heavy, tasteful, scroll-driven **motion**. Reference tier:
godly.website / recent.design / Awwwards winners. His loves — **fast cars, dark rainy nights, late-night
builds, Batman energy** — rendered like a luxury car marque or an A24 title sequence.

**The one rule: restraint is premium. Imply, don't confess.** The previous version was too simple,
too "childish" (everything bobbing forever, emojis, neon glow, generic font) and **too revealing**
(motivational declarations, personal stats, "documenting my journey"). We invert all of that.

**Owner's personality note:** extrovert in real life, but deliberately **never plays all his cards on the
table**. The site must feel reserved and a little mysterious — not an open book.

## 3. Locked decisions

| Fork | Decision |
| --- | --- |
| Visual direction | **Nocturne** — automotive-cinematic + high scroll animation |
| Identity reveal | **Alias-forward.** Public face = "Meteor / tut.meteor". Real name only in `<head>` metadata. **Drop age (17) and height (6'2").** |
| Voice | **Crisp, premium headlines.** Retire the "deepp / meee / vibee.." doubled-letter + trailing-dot tics, except a few tiny intimate moments. |
| `/web` node-map | **Keep but refine** into an elegant, emoji-free "Constellation". |
| Corny copy | **Removed** — e.g. "becoming dangerous with my skills, my discipline and my vision" and "documenting my journey publicly". |

## 4. Design system

**Typography** (all via `next/font`, no external CDN — must work offline):
- **Display** (big wordmarks/headlines): **Bodoni Moda** (Google, variable) — high-contrast Didone, couture-luxury drama.
- **Body / UI**: **Geist Sans** — already vendored at `src/app/fonts/GeistVF.woff` (replaces generic Inter).
- **Mono / eyebrow labels / coordinates**: **Geist Mono** — already at `src/app/fonts/GeistMonoVF.woff`.

**Color tokens** (near-monochrome, ONE restrained metallic accent, **no neon, no glow**):
- `void` `#08080A` (bg) · `surface` `#101013` (cards) · `line` `rgba(255,255,255,0.08)`
- `text` `#EAEAEC` · `muted` `#7C7C85`
- `signal` `#B0885A` (matte bronze/ember — the single accent, used sparingly)
- `steel` `#8FA3AE` (cold rain highlight, whisper only)
- Remove all glow drop-shadows and the old `#facc15` / mauve / cyan.

**Motion language**:
- `lenis` smooth scroll (via `<SmoothScroll>` provider).
- Easing: expo-out `cubic-bezier(0.16,1,0.3,1)` for reveals; `cubic-bezier(0.83,0,0.17,1)` for wipes. 0.8–1.2s, stagger 0.06–0.1s.
- **No perpetual bobbing.** Motion is *triggered* — scroll `whileInView`, `useScroll`/`useTransform` parallax.
- Custom cursor (dot + lagging ring, grows on interactive hover; off on touch).
- Magnetic buttons/links. Kinetic split-text headline reveals. Slow theme marquee.
- Cinematic once-per-session load sequence (wordmark reveal + curtain wipe).
- Page transitions = curtain / fade-blur wipe (retire the old red-beam typewriter).
- Film grain: fixed SVG `feTurbulence` overlay ~3–4%, `mix-blend-overlay`.
- Respect `prefers-reduced-motion` (disable cursor lag, parallax, load sequence).

## 5. Information architecture

Nav (emoji-free): **Story · Arsenal · Library · Signal** + logo → home.
- **Codex** — subtle "ethos" link from home/footer (not a nav headliner).
- **Constellation** (refined `/web`) — entered from the hero; desktop-focused signature.
- `/echoes` → **repurposed into `/library`**.
- `/connect` → **renamed `/signal`**.

Final routes: `/` · `/story` · `/arsenal` · `/library` · `/signal` · `/codex` · `/web`.

## 6. Real content (source of truth)

### Contacts (Signal page) — links become buttons, usernames stay plain text
| Channel | Treatment | Value |
| --- | --- | --- |
| Discord | plain text (no invite link — Discord invites expire in ~2 weeks) | `tut.meteor` |
| Email | button | `tut.meteor@gmail.com` *(replaces old `shaurya.disciplined@gmail.com`)* |
| GitHub | button | https://github.com/shaurya-disciplined |
| LinkedIn | button | https://www.linkedin.com/in/shauryavardhan-mhetre-617a183a0 |
| Instagram | button | https://www.instagram.com/shaurya_jpp |
| MintedMile | button | https://www.instagram.com/mintedmile/ |

### Projects (Arsenal) — 5
1. **Vibe Link** — first full AI chatbot, from scratch. Next.js / TypeScript / Tailwind + Groq API. Dark cyber theme, glassmorphism, thunder effects, real-time chat + history, mobile. Live in under 10 days. → https://vibe-link-delta.vercel.app
2. **MintedMile** — Instagram theme page. Grew past 10k followers; ~8.9k now; **discontinued** (no longer posting). → https://www.instagram.com/mintedmile/
3. **MEGADRESS** — solo clothing brand: brand identity, creatives, website, marketing. First taste of idea → execution.
4. **Notrik** — intensive vibe-coded website build; deep multi-day flow-state sprint.
5. **AetherMem** — self-evolving AI "memory fabric" prototype for AI models; worked across demo scenarios.

### Library (~50 books, grouped; keep the owner's own annotations)
- **Focus / Systems**: Deep Work (Newport), Hyper Focus (Bailey · *~60 pages*), Atomic Habits (Clear · *read multiple times*), The Compound Effect (Hardy), Getting Things Done (Allen), The Power of Your Subconscious Mind (Murphy · *9th grade*).
- **Stoicism / Mindset**: Meditations (Aurelius), Letters from a Stoic (Seneca), The Daily Stoic + The Obstacle is the Way (Holiday · *read*), The Courage to be Disliked (Kishimi/Koga), Thus Spoke Zarathustra (Nietzsche), The Rudest Book Ever (Gangwar), The Subtle Art… (Manson), The Mountain Is You (Wiest · *disliked*), Your Erroneous Zones (Dyer), Kaizen (Harvey).
- **Business / Wealth / Leverage**: Almanack of Naval Ravikant (Jorgenson), The Millionaire Fastlane + Unscripted (DeMarco), The $100 Startup (Guillebeau), The Personal MBA (Kaufman), 12-Week MBA (Billhardt), The Lean Startup (Ries), How to Get Rich (Dennis), $100M Offers / Leads / Money Models (Hormozi), The Psychology of Money (Housel), The Intelligent Investor (Graham · *untouched*), Just Keep Buying (Maggiulli), Make Epic Money + Get Epic Shit Done (Warikoo · *disliked*), Inside Steve's Brain (Kahney), Build Don't Talk (Shamani).
- **Psychology / Negotiation / Social**: How to Win Friends… (Carnegie · *almost finished*), Never Split the Difference (Voss), Influence (Cialdini), Secrets of Closing the Sale (Ziglar), The Art of War (Sun Tzu), Show Your Work (Kleon).
- **Tech / AI**: Artificial Intelligence (Mitchell), The Master Algorithm (Domingos), Co-Intelligence (Mollick · *finished in one sitting*), Day Trading Attention (Vaynerchuk).
- Source file: `E:\Apps\Obsidian\All Vaults\V1\Secondary Shit\Bookss\All-the-books-i-have.md`.
- **Per-book pages (added):** every title on `/library` links to its own page at `/library/[slug]`
  (cover image + author + annotation tag + a short reserved blurb + prev/next). Data lives in
  `src/data/books.ts` (single source of truth: slug, category, note, blurb, `noCover`). Covers are
  real images downloaded into `public/books/{slug}.jpg` (41/42 sourced from Open Library / Google
  Books). **`day-trading-attention` has no cover** — it renders a typographic fallback via
  `src/components/Cover.tsx`; drop a real cover at `public/books/day-trading-attention.jpg` to fix.
  `/library` also has a hover cover-preview (desktop) and a closing "In the margins" note before the footer.

### Story — 4 chapters (rewrite crisp & reserved; imply, don't narrate recovery)
`Early Shadows` (Jnana Prabodhini Prashala, 2019–2025 — independence, quiet discipline) →
`The Forge` (JEE 2027 prep — pressure, building personal systems) →
`The Awakening` (started building: MEGADRESS, then Vibe Link — proof he can ship) →
`The Signal Rises` (now: JEE mission + building in the background; long-term leverage).

### Codex — rewritten mysterious ethos (no motivational-poster energy)
Sparse, cryptic, confident fragments. Direction (final wording tuned in build):
"Play long. Talk little." · "Systems over moods." · "Most of it stays off the table." · one restrained
closing line about the long game.

## 7. Build order
1. **This context file** ✅ → 2. Deps (`lenis`) + tokens + fonts → 3. Global shell (SmoothScroll, Cursor,
Grain, Navbar, PageTransition, BackgroundLayer) → 4. Home → 5. Story → 6. Arsenal → 7. Library →
8. Codex → 9. Signal → 10. Constellation → 11. Metadata/README → 12. Polish (reduced-motion, mobile, perf).

## 8. Assets
Hot-swappable strategy: reuse existing `public/bg-desktop-1.mp4` / `bg-mobile-1.mp4`; attempt free
cinematic loops/stills (Pexels/Coverr/Unsplash) into `public/`; procedural grain/gradient fallbacks
ready. **Best quality:** owner generates bespoke AI hero video + section stills from a prompt pack and
drops them in `public/` to swap in. All asset references kept in easily-swappable constants.

## 9. Verification
`npm run lint` + `npm run build` clean; `npm run dev` and drive the app — load sequence, smooth scroll,
cursor, per-page reveals/parallax, magnetic buttons, contact buttons open correct URLs, Arsenal shows no
literal `\n\n`, no broken/orphaned links, mobile layout, reduced-motion path.

## 10. Tech baseline
Next.js 14 (app router) · TypeScript · Tailwind · Framer Motion 12 · lucide-react · lenis (smooth scroll). `@xyflow/react` is still in `package.json` but no longer imported (was node-map; `/web` now a **custom** constellation). Local fonts
in `src/app/fonts/`.

## 11. Image & video manifest (added — enrichment phase)
**Hard rule: no image/video repeats anywhere.** Reusable layers: `GhostImage.tsx` (grayscale low-opacity
ghost + scroll parallax), `ShootingStars.tsx` (twinkle + meteor streaks, from `/web`), `VideoBand.tsx`
(graded full-bleed video band, reduced-motion → poster). Descriptive filenames so the owner can refer to
them in prompts. Some dump images needed 90° CCW rotation (PowerShell System.Drawing `Rotate270FlipNone`).

Displayed assets (each referenced exactly once):
| Asset | Where |
| --- | --- |
| `images/zonda-carbon.jpg` | Home hero, bottom-right corner (Pagani Zonda, black-on-black, scroll parallax) |
| `images/angel-statue.jpg` | Home statement ghost (left) |
| `images/gotham-overlook.jpg` · `ironman-blueprint.jpg` · `scholars-desk.jpg` · `f40-museum.jpg` · `lighthouse-storm.jpg` | Home INDEX hover-reveals (Story/Arsenal/Library/Midnight/Signal; Constellation row has none) |
| `images/eagle-dark.jpg` | Footer ghost (+ ShootingStars) |
| `images/samurai-temple.jpg` · `nishan-rider.jpg` · `bosphorus-window.jpg` · `city-torii-night.jpg` | Story chapters 1–4 ghosts, alt sides, **opacity 0.28** |
| `videos/train-window.mp4` | Story closing VideoBand |
| `images/streetlamp-rain.jpg` | Signal header ghost |
| `codex-ghost.jpg` (=t12 Caesar) + `images/batman-shadow.jpg` | Codex two ghosts (kept t12 exception) |
| `images/black-hole.jpg` | `/web` backdrop behind the beacon, **opacity 0.1** |
| `videos/night-race.mp4` · `images/pagani-topdown.jpg` (Huayra) · `car-bugatti-dark.jpg` (Chiron) · `jdm-night.jpg` (Midnight runs) · `videos/rain-window.mp4` | `/midnight` hero/3 dream cars/closer |
| `transitions/midnight.jpg` | `/midnight` curtain (PageTransition) |

Transition curtains (located in `public/transitions/`): `home.jpg`, `story.jpg`, `arsenal.jpg`, `library.jpg`, `signal.jpg`, `codex.jpg`, `web.jpg`, `midnight.jpg`. Codex ghost is `codex-ghost.jpg` (deliberate exception).

Reserves in `public/` (staged, **not referenced** — free to place later): `images/car-bugatti-headlights.jpg`
(source of midnight curtain), `images/zonda-studio.jpg`, `images/rolls-fleet.jpg`, `videos/powerlines-dusk.mp4`,
`videos/mountain-road.mp4`. Full candidate pools remain in `_candidates/`.

**Routes + order (Signal is last):** `01 story · 02 arsenal · 03 library · 04 web(Constellation) ·
05 midnight · 06 signal` + `/codex` (footer only). Nav renumbered to match; page eyebrows updated.
**Discoverability:** home INDEX lists all 6 destinations; the Footer carries a full "Wander the rest"
index (every route) on every page. **Arsenal order (owner's valuation):** AetherMem, Notrik, MintedMile,
Vibe Link, MEGADRESS. Notrik link = https://notrik-ten.vercel.app/. AetherMem copy rewritten as a
self-evolving memory fabric governed by an arbiter LLM.

**Dev-server discipline (see memory `tut-meteor-build-gotcha`):** never `npm run build` while `npm run dev`
runs — it corrupts `.next` and white-screens the site. Verify via the running dev server (routes 200,
`/_next/static/*.js` chunks 200, assets 200).
