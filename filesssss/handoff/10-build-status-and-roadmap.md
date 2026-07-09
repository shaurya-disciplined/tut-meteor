# 10 · Build Status and Roadmap

## Shipped: NOCTURNE v2 (all 5 phases, complete 2026-07-07)

1. **Voice and Type** .. copy rewritten to human, Cormorant Garamond display, fluid `clamp()` scale.
2. **Atmosphere** .. persistent raw Three.js smoke shader (time aware, scroll reactive), headlight cursor,
   rain.
3. **Machine Feel** .. ignition preloader, gear shift page wipes, mechanical trip meter odometer, magnetic
   METEOR wordmark.
4. **Deep End** .. breathing constellation on `/web`, carved stone codex, liquid `WebGLImage`s on `/story`.
   Glass refraction lens deliberately skipped (second render pass too costly, violates one signature rule).
5. **Restraint and Ship** .. reduced motion and low battery smoke fallbacks, custom 404, void theme color.

The old freeze bug (WebGL context lost on navigating to `/web`) is dead, killed by the raw Three.js rewrite.

## In progress: NOCTURNE v3 ("The Depth Update")

**Built so far (2026-07-09):** the **Arsenal wing spine plus first draft copy**.
- `src/data/projects.ts` .. source of truth for 6 projects (HackWay 07 still to be added). Type includes a
  tagged `sections[]` model and per project `accent`.
- `src/app/arsenal/[slug]/page.tsx` .. new data driven detail route (client component, `useParams`,
  `notFound`, accent tint wired via `--accent`, breadcrumb, section renderer, prev/next wrap around rail).
- `src/app/arsenal/page.tsx` .. rewritten to read from the data file; every card is now a clickable door,
  external "visit" links moved into the detail pages. Typecheck clean (`tsc --noEmit`), not yet browser
  verified (no dev server was running).

**NOT built yet:**
- HackWay (07) not yet in `projects.ts`. MEGADRESS year still 2023 in code (should be 2020).
- No per project signature interactions (memory decay, hour counter, contact sheet, chat bubbles, brutalist
  crop, ReachMonk funnel, HackWay idea deal). These are the polish layer, built after copy is approved.
- No project page visuals from the new screenshots yet.
- Story, Midnight, Dossier wings: not started. Constellation v2: not started. None of the seven extras built.

## Phase order (from the v3 plan)

- **A .. The Spine.** Data files + dynamic routes + prev/next + breadcrumbs, everything clickable.
  (Arsenal portion DONE. Repeat for Story, Midnight, Dossier.)
- **B .. The Arsenal Wing.** 7 project pages, tint system, signatures, screenshot visuals. (Copy drafted;
  visuals + signatures pending.)
- **C .. The Midnight Wing.** 3 car shrines. Draftable now from taste.
- **D .. The Story Wing.** 4 chapters. BLOCKED on the owner's raw writing.
- **E .. The Dossier.** BLOCKED on the owner's four raw lists.
- **F .. Constellation v2 + nav.** Satellites, focus mode, index/footer updates, OG cards.
- **G .. Mercy pass.** Device Mercy Rule test gate on every new page, reduced motion audit, image weight
  audit, copy audit against the Table Rule and the no hyphen law. Ship.

## What is blocked on the owner

- **Red-pen the Arsenal copy** (the load bearing lines and section prose in `src/data/projects.ts`).
- **Story wing:** raw memory dumps per chapter (Phase D). The big blocker.
- **Dossier:** the four raw lists plus Coordinates (Phase E).
- **Confirmations / placeholders:** project years, MintedMile number (peak vs current), MEGADRESS accent (real
  purple vs planned red), Vibe Link API (Groq confirmed), ReachMonk live URL, HackWay reveal level, boarding
  vs day school, final Arsenal ordering with HackWay in it.

## Immediate next steps (the visual execution pass, once the owner says go)

1. Add HackWay as Arsenal 07 in `projects.ts`; fix MEGADRESS year to 2020.
2. Open and caption the screenshot sets; pick a hero + supporting stills per project.
3. Build a gallery / visual section into the Arsenal detail template (screenshots as editorial stills, per
   the owner's brief to "represent everything each site does in a cool way").
4. Layer the per project signature interactions on the approved copy.
5. Then move to the Midnight wing (draftable now), holding Story and Dossier for owner content.
