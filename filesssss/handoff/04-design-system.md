# 04 · Design System

## Typography (all via `next/font`, no external CDN, must work offline)

- **Display** (big wordmarks and headlines): **Cormorant Garamond** (Google, weights 300 to 700 plus italic).
  A high contrast couture serif. Used for screen filling words like METEOR.
- **Body and UI:** **Geist Sans**, vendored at `src/app/fonts/GeistVF.woff`.
- **Mono, eyebrow labels, coordinates, HUD:** **Geist Mono**, at `src/app/fonts/GeistMonoVF.woff`.

Fluid type scale lives in `globals.css` as CSS variables (`--text-hero`, `--text-display`, `--text-subtitle`,
`--text-body`, `--text-meta`) built on `clamp()` so text scales with the viewport with no breakpoints.

## Color tokens (near monochrome, one restrained metallic accent, no neon, no glow)

- `void` `#08080A` (background)
- `surface` `#101013` (cards)
- `line` `rgba(255,255,255,0.08)` (hairlines)
- `text` `#EAEAEC`
- `muted` `#7C7C85`
- `signal` `#B0885A` (matte bronze or ember, the single global accent, used sparingly, lives in nav and footer)
- `steel` `#8FA3AE` (cold rain highlight, a whisper)

No glow drop shadows. No `#facc15`, no mauve, no cyan from the old build.

## The per project accent map ("the tint")

Bronze (`signal`) stays global in nav and footer. Each Arsenal project owns exactly one accent for its page
body only. This is the v3 "vibe mixing" system: same NOCTURNE bones, one controlled tint per room.

| Project | Accent | Hex | Feel |
| --- | --- | --- | --- |
| 01 AetherMem | synapse violet | `#8E7FB8` | pale, cold, neural |
| 02 Notrik | white hot | `#F4F4F6` | monochrome, brightness as color |
| 03 MintedMile | minted gold | `#C9A24B` | an old coin, greener and colder than bronze |
| 04 Vibe Link | storm steel | `#8FA3AE` | the steel whisper at full voice |
| 05 MEGADRESS | blood red | `#9B2D30` | the only red anywhere on the site |
| 06 ReachMonk | ledger sage | `#7E9B7A` | cold, quiet, money without the shout |
| 07 HackWay | co-pilot indigo | `#5B7CF0` | electric blue to violet, echoes its own glass UI |

The accent is wired per page via a `--accent` CSS variable set on the page wrapper, consumed with Tailwind
arbitrary utilities (`text-[var(--accent)]`, `bg-[var(--accent)]`, `border-[var(--accent)]`).

## Motion language

- `lenis` smooth momentum scroll via a `<SmoothScroll>` provider.
- Easing: expo out `cubic-bezier(0.16, 1, 0.3, 1)` for reveals; `cubic-bezier(0.83, 0, 0.17, 1)` for wipes.
  Durations 0.8 to 1.2s, stagger 0.06 to 0.1s.
- No perpetual bobbing. Motion is triggered: scroll `whileInView`, `useScroll` and `useTransform` parallax.
- Custom cursor (dot plus lagging ring, grows on interactive hover, off on touch). Magnetic buttons and links.
  Kinetic split text headline reveals. Slow theme marquee.
- Cinematic once per session load (ignition preloader). Page transitions are curtain or fade blur wipes with
  lamp streaks (gear shift feel).
- Film grain: fixed SVG `feTurbulence` overlay around 3 to 4 percent, `mix-blend-overlay`.
- Respect `prefers-reduced-motion`: disable cursor lag, parallax, load sequence, all decorative motion.
