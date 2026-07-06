# NOCTURNE — Masterplan v2 (the active plan)

This builds on `masterpiece_roadmap.md` and `NOCTURNE_DEVELOPMENT_BIBLE.md`. Those two still hold
the original ambition. This file is the one we actually work from now. It keeps the same north star,
the automotive nocturne, cars and code and rain and quiet, and pushes it somewhere more alive.

**Voice rule (applies to every word on the site):** it has to sound like a person wrote it at 2am,
not like a brochure and not like a language model. Short. Reserved. A little withholding. It should
imply more than it says. No hyphens and no em dashes in any copy or title. When a line wants one,
either use two dots like this.. or just rewrite the sentence so it never needs one.

---

## The idea in one line
Not a portfolio. A place that feels like driving an empty city at night with the brights on. You
don't get told who he is. You get a mood, and enough detail to be curious.

---

## What already exists (so we build on it, not over it)
- The persistent smoke background (a hand written GLSL fluid shader) that reacts to the mouse and to
  scroll speed. It lives once at the root and survives page changes.
- A liquid image shader (`WebGLImage`) with ripple, mouse drag and a faint color split on hover.
  Currently only on the midnight cars page.
- Custom cursor, film grain, smooth scroll, curtain page transitions, the constellation on `/web`.

---

## The creative layer (what makes v2 different)

Keep one signature move per page. Never stack effects. Restraint is the whole brand.

**Atmosphere**
- **Time aware nocturne.** The smoke reads the visitor's real local hour. Deep night runs cold and
  blue black. Closer to dawn a faint bronze warms the low edge of the screen. Barely there. You feel
  it more than you notice it.
- **Headlight cursor.** In the darkest sections the cursor carries a soft cone of light that lifts
  detail out of the smoke as it passes, like driving with the brights on an empty road.
- **Rain that reads speed.** The rain already falls. Now it leans harder and streaks longer the
  faster you scroll, with a whisper of windshield blur on the grain.

**The machine feel**
- **Trip meter HUD.** A tiny mono readout in a corner that counts scroll distance like an odometer.
  It gives the car dashboard feeling the bible wanted, with none of the heavy 3D.
- **Ignition load.** The intro reads like a cold start instead of a plain fade. A single needle
  sweep, a flicker, then the wordmark catches and holds.
- **Gear shift transitions.** Page wipes feel like a shift. A quick pull of light streaks across, the
  way motorway lamps pass over a windshield, then it settles.
- **A wordmark with weight.** METEOR drifts a hair toward the cursor and settles back. A hint of the
  physics idea without the full engine.

**Signature rooms**
- **Midnight becomes a shrine.** The cars page gets the full liquid image treatment now that the
  shader layering is fixed, slow parallax, and a closing line that lingers a beat too long.
- **Codex reads like carved stone.** The creed lines get a faint chiselled emboss so they feel
  engraved, not typed.
- **The constellation breathes.** Nodes pulse on a slow clock and the lines brighten as you approach.

**Guardrails (so it never turns into a gimmick reel)**
- Everything heavy switches off on touch, on reduced motion, and on low battery.
- Sound, if it ever ships, never autoplays. One small control, off by default, easy to miss.
- If the frame rate drops, the shaders fall back to quiet CSS gradients and the site still feels right.

---

## Phases

**Phase 1 — The Voice and The Type.** Kill every line that sounds like a machine wrote it. Rewrite the
home hero, the arsenal descriptions, the weaker story lines and the signal intro into plain human
language. Lock the type scale and hierarchy. No hyphens, no em dashes anywhere in the copy. This is
the foundation. Nothing else matters if the words read like a template.

**Phase 2 — The Atmosphere.** Headlight cursor, time aware smoke palette, rain that reads scroll speed.

**Phase 3 — The Machine Feel.** Trip meter HUD, ignition load, gear shift transitions, the magnetic
wordmark.

**Phase 4 — The Deep End.** Liquid images beyond midnight, the glass refraction lens, the breathing
constellation, the carved codex.

**Phase 5 — Restraint and Ship.** One signature per page, cut anything that fights the mood, mobile and
reduced motion and battery fallbacks, performance, final pass.

---

*Phase 1 is being executed now. Progress and any known issues are tracked in `context-tut-meteor.md`.*
