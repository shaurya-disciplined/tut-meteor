# 09 · Assets and Screenshots

## The hard rule

**No image or video repeats anywhere on the site.** Every asset is referenced exactly once. Descriptive
filenames so the owner can refer to them in prompts.

## Freedom to source

Because the site is local and personal, any image or video from the internet or AI generated may be used
freely. Source or generate whatever serves a page. The owner explicitly wants the best visuals and is happy
for the AI to source or generate additional imagery beyond what he provides.

## NEW: owner supplied project screenshots (2026-07-09)

Real screenshots the owner captured, staged in `public/`. These are the genuinely his artifacts that can not
be sourced elsewhere. Use them to build the Arsenal page visuals. (They have not yet been opened and captioned
one by one; selecting the hero shot and the supporting stills for each page is the first step of the visual
execution pass.)

| Folder | Count | For | Notes |
| --- | --- | --- | --- |
| `public/Notrik/` | 9 | Arsenal 02 | Show the six study formats + the transform workflow. |
| `public/Vibe-link/` | 4 | Arsenal 04 | Dark cyber Batman UI, thunder, chat bubbles. |
| `public/Hackway/` | 12 | Arsenal 07 | Richest set. Mesh blob glass UI, idea engine, cards, dashboard. |
| `public/Reachmonk/` | 5 | Arsenal 06 | Premium dark glassmorphic SMMA landing page. |
| `public/Mintedmile/` | 4 | Arsenal 03 | Real posts, feed for the contact sheet motif. |

Also provided: the **MEGADRESS logo** (purple flower mark + "MEGADRESS since 2020" wordmark) and a LinkedIn
profile screenshot. No `public/Megadress/` folder yet; ask the owner for surviving creatives or catalog shots.
AetherMem: no screenshots yet; the Chronicle dashboard would screenshot well, ask the owner.

## Existing v2 image and video manifest (each referenced exactly once)

From the v2 enrichment pass. Reusable layers: `GhostImage.tsx` (grayscale low opacity ghost + parallax),
`ShootingStars.tsx`, `VideoBand.tsx` (graded full bleed video band, reduced motion → poster).

- `images/zonda-carbon.jpg` .. home hero corner. `images/angel-statue.jpg` .. home statement ghost.
- Home INDEX hover reveals: `gotham-overlook.jpg`, `ironman-blueprint.jpg`, `scholars-desk.jpg`,
  `f40-museum.jpg`, `lighthouse-storm.jpg`. `images/eagle-dark.jpg` .. footer ghost.
- Story chapter ghosts (opacity 0.28): `samurai-temple.jpg`, `nishan-rider.jpg`, `bosphorus-window.jpg`,
  `city-torii-night.jpg`. `videos/train-window.mp4` .. story closing band.
- `images/streetlamp-rain.jpg` .. signal header ghost. Codex: `codex-ghost.jpg` + `images/batman-shadow.jpg`.
- `images/black-hole.jpg` .. `/web` backdrop (opacity 0.1).
- Midnight: `videos/night-race.mp4`, `images/pagani-topdown.jpg` (Huayra), `car-bugatti-dark.jpg` (Chiron),
  `jdm-night.jpg`, `videos/rain-window.mp4`. `transitions/midnight.jpg` .. midnight curtain.
- Transition curtains in `public/transitions/`: `home.jpg`, `story.jpg`, `arsenal.jpg`, `library.jpg`,
  `signal.jpg`, `codex.jpg`, `web.jpg`, `midnight.jpg`.
- Book covers: `public/books/{slug}.jpg` (41 of 42 sourced; `day-trading-attention` uses a typographic
  fallback via `Cover.tsx`).
- Staged reserves (not yet placed): `images/car-bugatti-headlights.jpg`, `images/zonda-studio.jpg`,
  `images/rolls-fleet.jpg`, `videos/powerlines-dusk.mp4`, `videos/mountain-road.mp4`. Candidate pools in
  `_candidates/`.

## Image handling notes

Some dump images needed 90 degree CCW rotation (PowerShell `System.Drawing` `Rotate270FlipNone`). Keep hero
images under ~200KB, inline under ~80KB, prefer WebP or AVIF, lazy load below the fold, real `sizes`.
