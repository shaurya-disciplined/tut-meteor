# 02 · North Star, Voice, and the Governing Laws

## The North Star: NOCTURNE

Automotive cinematic luxury plus heavy, tasteful, scroll driven motion. The feeling is driving an empty city
at night with the brights on. Reference tier: godly.website, recent.design, Awwwards Site of the Month
winners. The loves it is built around: fast cars, dark rainy nights, late night builds, Batman energy,
rendered like a luxury car marque or an A24 title sequence.

The site should feel like a place, not a poster. v3's whole thesis is that every section that used to end in
a paragraph becomes a room you can walk into.

## The Voice Rule (applies to every visible word)

It has to sound like a person wrote it at 2am, not like a brochure and not like a language model. Short.
Reserved. A little withholding. It should imply more than it says.

- **No hyphens and no em or en dashes in any copy or title.** When a line wants one, use two dots like this..
  or rewrite the sentence so it never needs one. This is the owner's hardest rule; he reads dashes and the
  polished connective AI cadence as a dead giveaway of machine written text.
- Avoid hyphenated compound adjectives. Say "end to end", "top to bottom", "self evolving", "full stack".
- Drop AI tells: no "not just X but Y", no buzzword stacks ("cognitive arbiter", "orchestration engine"), no
  corporate abstractions.
- Structural hyphens are fine and should be left alone: route slugs (`/library`), CSS classes, URLs, code
  identifiers, book slugs, and decorative `·` separators.

## The one rule above all: restraint is premium

**Imply, do not confess.** The owner is an extrovert in real life but deliberately never plays all his cards
on the table. The site must feel reserved and a little mysterious, never an open book. Depth is allowed and
wanted, but depth comes from more scenes and more craft and more specifics about things, never from more
confession.

## The Table Rule (the vulnerability filter)

Every sentence written for the site passes this checklist before it ships:

1. **Does it name or expose a private person?** Cut it. Nobody else gets put on this site.
2. **Does it confess a fear, wound, or insecurity?** Cut it, or armor it: rewrite the feeling as the system
   that came out of it. Never "it broke me", always "so I built this."
3. **Is it a brag without an artifact?** If there is no proof to show, soften it or cut it.
4. **Is it an opinion that invites a fight?** Politics, religion, drama, hot takes on people. Cut. Opinions
   on cars, books, code, and craft are fine, that is personality, not exposure.
5. **Does it leak logistics?** Exact schedule, address, school routines that identify times and places.
   Generalize until it is atmosphere, not intel. (This is why the school's name stays off the site even
   though we know it: use the ethos as atmosphere, not the identifier.)
6. **The two selves test:** would both the current him and the 40 year old version stand behind the line? If
   either would wince, it goes.

## The Device Mercy Rule (the performance budget)

Beautiful means smooth on a mid range phone, or it is not beautiful.

- **WebGL contexts: exactly one** (the raw smoke). No new full screen shaders, ever. `WebGLImage` instances
  are desktop fine pointer only, max 4 per page, plain `<img>` on touch.
- Every new per page effect is CSS, SVG, or Framer Motion on transform and opacity only. No layout thrashing,
  no filters animating on large surfaces.
- Images: WebP or AVIF, hero under ~200KB, inline under ~80KB, everything `loading="lazy"` below the fold,
  real `sizes` attributes.
- Infinite animations only where already sanctioned (marquee, constellation breathing, beacon). Everything
  else fires once on scroll into view.
- All decorative motion off under reduced motion. Battery guard already covers the smoke.
- Test gate: Chrome DevTools 4x CPU throttle plus a mid tier Android view, target no dropped frame jank.

## One signature per page

Each page gets exactly one signature move. Never stack effects. Restraint is the whole brand. The v3 "extras"
(clock, command palette, etc.) are exempt because they are global utilities, off site, or hidden, not stacked
per page visual effects.
