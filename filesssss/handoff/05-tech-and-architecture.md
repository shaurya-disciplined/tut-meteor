# 05 · Tech and Architecture

## Baseline stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion 12 · lucide-react · lenis (smooth scroll).

**WebGL stack:** `three` · `@react-three/fiber` · `@react-three/drei`. `@react-three/postprocessing` is
installed but NOT imported (the planned bloom / chromatic aberration pipeline was deliberately not built).
`@xyflow/react` is still in `package.json` but no longer imported (`/web` is now a custom constellation).
Rapier physics (once planned for rigid body typography) is NOT installed. Local fonts in `src/app/fonts/`.

## The WebGL smoke (the one sanctioned context)

`src/components/WebGLCanvas.tsx` runs the persistent background smoke on a **raw Three.js renderer with its
own requestAnimationFrame loop, entirely outside React**. Plain `<canvas>`, effect mounted once. This is the
canonical pattern for this site and it is not negotiable: the persistent background must stay raw. It was
rewritten into raw Three.js specifically to kill a long freeze bug where navigating to `/web` lost the WebGL
context. **Never wrap the smoke back into React Three Fiber.**

- It is a custom GLSL fragment shader: Perlin/simplex `fbm` domain warped smoke in a charcoal to bronze
  palette. Reacts to mouse (`uMouse`) and scroll velocity (`uVelocity`, a bronze pulse on fast scroll).
- Time aware: a `uWarm` uniform reads the visitor's local hour (cold blue black deep night, warm bronze
  pre dawn). Scroll velocity also offsets the noise field so scrolling parts the smoke.
- Mobile: shader octaves injected at context creation (`#define OCTAVES`, 5 desktop, 3 on coarse pointer or
  under 768px), pixel ratio capped at 1.
- Fallbacks: under `prefers-reduced-motion` it renders one settled still frame (`uTime = 40`) and never
  animates; if the Battery API reports under 15 percent and not charging, the loop settles to a still frame.

`WebGLImage.tsx` is a self contained per instance small transparent `<Canvas>` with a liquid ripple plus
mouse displacement plus chromatic aberration shader on hover. Desktop fine pointer only; plain `<img>` on
touch and reduced motion. Currently used on `/story`. The shared tunnel / global `View.Port` approach was
removed because it fought the z stack; do not reintroduce it behind an opaque layer.

## Components (`src/components/`)

`BackgroundLayer` (transparent now: vignette plus rain, so the smoke is the real backdrop) · `Cursor` ·
`Headlight` (screen blend light cone trailing the pointer) · `Grain` · `Rain` · `ShootingStars` · `Marquee` ·
`Navbar` · `Footer` · `PageTransition` (curtain wipe with lamp streaks) · `Preloader` (ignition / tachometer
needle) · `TripMeter` (mono odometer, bottom, desktop only) · `Reveal` (and `SplitText`) · `Magnetic` ·
`GhostImage` · `VideoBand` · `Cover` (typographic book cover fallback) · `SmoothScroll` · `WebGLCanvas` ·
`WebGLImage` · `floating/GlassCard`.

## Routes

`/` · `/story` · `/arsenal` · `/arsenal/[slug]` (NEW, v3) · `/library` · `/library/[slug]` · `/midnight` ·
`/signal` · `/codex` · `/web` · `not-found`. Planned v3 routes: `/story/[slug]`, `/midnight/[slug]`,
`/dossier`, `/log`.

Route order and numbering used across nav and eyebrows: `01 story · 02 arsenal · 03 library ·
04 web (Constellation) · 05 midnight · 06 signal`, plus `/codex` (footer only).

## The data driven page pattern (the v3 spine)

The proven model is `/library/[slug]`. Repeat it everywhere:

- **One data file per collection** in `src/data/` is the single source of truth. Existing: `books.ts`,
  `projects.ts` (Arsenal, added in v3). Planned: `chapters.ts` (Story), `cars.ts` (Midnight), `dossier.ts`.
- **The detail route is a client component** using `useParams` and `notFound()` (this matches the real
  `/library/[slug]`; note it does NOT use `generateStaticParams`, despite what the older v3 plan sketch said,
  because the working library route is client side). It renders from the data file.
- Each detail page gets: an eyebrow breadcrumb (`02 · ARSENAL / 01 · AETHERMEM`), a cinematic header, body
  sections, and a **prev/next rail** at the bottom using an `adjacent()` helper that wraps around the flat
  order. `eyebrow` and `hairline` are shared CSS classes. `Reveal` / `Magnetic` / `Footer` are shared
  components. `const EASE = [0.16, 1, 0.3, 1]`.

`src/data/projects.ts` type shape: `slug, index, title, subtitle, status, year, tags[], oneLiner, accent`,
plus a `sections[]` array of tagged blocks (`prose` with optional heading, `pull` quote, `specs` rows,
`verdict`), plus optional `links[]`.

## Dev server discipline (hard rule)

**Never run `npm run build` while `npm run dev` is running.** It corrupts `.next` and white screens the site.
Verify with the running dev server (routes 200, `/_next/static/*.js` chunks 200, assets 200) or with
`npx tsc --noEmit` (safe, does not touch `.next`).
