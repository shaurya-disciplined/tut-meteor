# NOCTURNE v3 — THE DEPTH UPDATE (planning document, nothing executed yet)

v1 dreamed it. v2 built the surface. v3 gives the surface **doors**. Every section that today ends
in a paragraph becomes a room you can walk into. The site stops being a poster and becomes a place.

**Status: PLAN ONLY. Approved copy and content come from the owner before any build begins.**

---

## 0. The two laws that govern everything below

### Law 1 — The Table Rule (the vulnerability filter)
More pages means more words, and more words means more chances to overshare. Every sentence written
for v3 passes this checklist before it ships:

1. **Does it name or expose a private person?** Cut it. Nobody else gets put on this site.
2. **Does it confess a fear, wound, or insecurity?** Cut it, or armor it: rewrite the feeling as the
   system that came out of it. Never "it broke me".. always "so I built this."
3. **Is it a brag without an artifact?** If there is no proof to show, soften it or cut it.
4. **Is it an opinion that invites a fight?** Politics, religion, drama, hot takes on people. Cut.
   Opinions on cars, books, code, and craft are fine.. that is personality, not exposure.
5. **Does it leak logistics?** Exact schedule, address, school routines that identify times and
   places. Generalize until it is atmosphere, not intel.
6. **The two-selves test:** would both the current him and the 40 year old version stand behind the
   line? If either would wince, it goes.

The site can go DEEP without going soft. Depth = more scenes, more craft, more specifics about
*things*. Never more confession. The closing energy of every page stays "there is more, and you
don't get it here."

### Law 2 — The Device Mercy Rule (the performance budget)
Beautiful means smooth on a mid-range phone, or it is not beautiful. Hard numbers:

- **WebGL contexts: exactly one** (the raw smoke). `WebGLImage` instances are desktop fine-pointer
  only, max 4 per page, plain `<img>` on touch. **No new full-screen shaders. Ever.**
- Every new per-page effect below is **CSS, SVG, or Framer Motion on transform/opacity only**. No
  layout-thrashing animations, no filters animating on large surfaces.
- Images: WebP/AVIF, hero ≤ 200KB, inline ≤ 80KB, everything `loading="lazy"` below the fold,
  real `sizes` attributes.
- Infinite animations only where already sanctioned (marquee, constellation breathing, beacon).
  Everything else fires once on scroll into view.
- All decorative motion off under reduced motion; battery guard already covers the smoke.
- Test gate before any v3 phase is called done: Chrome DevTools 4x CPU throttle + mid-tier Android
  view, target no dropped-frame jank on scroll.

---

## 1. Architecture — the data-driven spine

The `/library/[slug]` pattern already proves the model. Repeat it everywhere:

```
src/data/projects.ts    → /arsenal/[slug]     (5 pages)
src/data/chapters.ts    → /story/[slug]       (4 pages)
src/data/cars.ts        → /midnight/[slug]    (3 pages)
src/data/dossier.ts     → /dossier            (1 page, sectioned)
```

One TypeScript type per collection, one source of truth per file, pages generated from data.
Every detail page gets: `generateStaticParams`, its own metadata/OG title, a prev/next rail at the
bottom (small, mono, like the library), and an eyebrow breadcrumb (`02 · ARSENAL / 01 · AETHERMEM`).

Sketch of the project type (final shape decided at build time):

```ts
type Project = {
  slug: string; title: string; status: string; year: string;
  tags: string[]; oneLiner: string;
  accent: string;            // the page's single tint, hex
  sections: { kind: "prose" | "pull" | "specs" | "gallery" | "verdict"; ... }[];
  links?: { label: string; href: string }[];
};
```

---

## 2. THE ARSENAL WING — `/arsenal/[slug]` (5 project pages)

**The vibe-mixing system ("the tint"):** every project page is still unmistakably NOCTURNE..
void black, grain, the smoke, Cormorant headlines, the cursor. The project's own soul enters
through exactly **three controlled channels**:

1. **One accent color** used the way bronze is used globally (hairlines, eyebrows, one glow).
   Bronze never disappears; it stays in the nav and footer. The accent owns the page body only.
2. **One texture or motif** unique to that page.
3. **One signature micro-interaction** (cheap: CSS/SVG/Framer only).

Card sections on `/arsenal` become fully clickable (whole card = link, external "visit" buttons
move inside the detail pages). Page anatomy shared by all five: cinematic header (eyebrow, huge
title, status stamp, one-liner) → "Why it exists" prose → "How it was built" (stack + decisions,
told as story not resume) → signature section (per project, below) → verdict/status → prev/next.

### 01 · AetherMem — *the memory fabric*
- **Accent:** synapse violet, pale and cold (`#8E7FB8` territory).
- **Motif:** recall threads.. thin SVG lines that connect section to section down the page,
  like memories linking. (One static SVG path per section, drawn on scroll into view.)
- **Signature interaction: "memory decay."** Paragraphs rest at a slightly blurred, faded state
  and **sharpen into focus** as they enter the viewport.. the page literally *recalls* itself as
  you read. Pure CSS transitions on opacity/filter, fires once per element, cheap and thematic.
- **Content beats:** what context decay is (one paragraph, plain words), the arbiter idea, what
  the demos proved, what it taught him about how memory should work. Ends reserved: built out of
  curiosity, shelved with intent.

### 02 · Notrik — *the flow sprint*
- **Accent:** white hot. No new hue.. this page is the monochrome one, brightness as its color.
- **Motif:** **one unbroken line.** A single vertical SVG line draws continuously down the entire
  page as you scroll, never lifting, mirroring the multi-day unbroken sprint. (Same scroll-linked
  line pattern as the story rail, already proven cheap.)
- **Signature interaction:** a mono "hour counter" in the header that rolls from HOUR 00 to the
  final sprint hour as the page loads. Numbers only, no claims.
- **Content beats:** what a flow sprint actually feels like (scene, not feelings), the rules he
  set (no meetings with himself, food ready, phone dead), what survived contact with exhaustion.
  Ends with the live link, styled as a boarding pass.

### 03 · MintedMile — *the archived engine*
- **Accent:** minted gold.. one step greener and colder than the site bronze, like an old coin.
- **Motif:** **the contact sheet.** A tight editorial grid of small stills (real posts from the
  page, owner supplies 6 to 9), grayscale until hover.
- **Signature interaction:** a follower odometer that rolls up to 10,000+ and then **stops with a
  hard mechanical click** and an ARCHIVED stamp slamming over it (one-shot animation). The whole
  page is about a machine that was deliberately switched off.
- **Content beats:** the growth mechanics he learned (attention pools, timing, consistency), why
  he stopped when he had what he came for. That decision IS the flex.. frame it that way.

### 04 · Vibe Link — *the storm channel*
- **Accent:** storm steel.. `#8FA3AE` already exists as a whisper token. This is the one page
  where steel gets to speak at full voice.
- **Motif:** distant lightning.. every 15 to 25 seconds the page's ghost layer flickers twice,
  like a storm past the horizon. (One CSS keyframe animation on a low-opacity overlay, trivial.)
- **Signature interaction:** pull quotes styled as **chat bubbles that stream in** word by word
  when scrolled into view, echoing the product itself.
- **Content beats:** zero to shipped in under ten days while learning the stack, what broke at
  3am, the launch. Ends with the launch button styled as a send button.

### 05 · MEGADRESS — *the label*
- **Accent:** one restrained blood red. The only red anywhere on the site, and only here.
- **Motif:** **the garment tag.** The spec sheet is styled as a woven care label (mono type,
  stitched border): FABRIC / SEASON / UNITS / CARE: BUILT ALONE. WASH COLD. PLAY LONG.
- **Signature interaction:** brutalist headline treatment.. the section titles are oversized,
  cropped by the viewport edge like a lookbook spread, revealed by scroll.
- **Content beats:** owning every layer at once (identity, creatives, site, marketing), what a
  17 year old learns about supply and demand by living it. First taste of idea to execution.

---

## 3. THE STORY WING — `/story/[slug]` (4 chapter pages)

The four timeline sections on `/story` become clickable, each opening a **long-form editorial
chapter**.. this is where the "write a lot about everything" wish lives, governed hard by the
Table Rule. Depth through scenes and systems, never confession.

**Shared chapter anatomy** (magazine, not blog):
- Cinematic header: chapter numeral huge and ghosted, title, years, one-line thesis.
- **Prose in movements**, not one wall: 3 to 5 titled movements per chapter, drop caps on the
  first letter of each movement (pure CSS, editorial as hell).
- **Marginalia:** small mono side notes in the margins on desktop (dates, coordinates, dry
  one-liners).. the tactical HUD voice commenting on the cinematic voice.
- **One pull quote per movement**, set enormous in Cormorant italic.
- **Artifact slots:** optional image bands (owner supplies or approves each; no-repeat rule holds).
- Chapter close: a single reserved line, then prev/next chapter rail.

**The chapters and their long-form scope** (owner writes raw material, we distill):
1. **The Iron Base** — the six school years. Scope: what that kind of school does to a kid,
  the independence, the drills, the quiet codes of it. Scenes: dorm mornings, the first time
  silence felt like an ally. NOT: names, incidents involving others, anything raw.
2. **The Pressure Chamber** — the grind years. Scope: what pressure actually is when it is
  chosen, building the first personal systems, Pune at 2am. NOT: rank anxiety, family details.
3. **Proof of Concept** — the awakening. Scope: the full arc of first builds.. MEGADRESS then
  Vibe Link, the moment ideas stopped being theoretical. Cross-links INTO the arsenal pages
  (the wings connect). NOT: numbers he cannot prove, drama.
4. **The Long Horizon** — now and forward. Scope: how the day is actually structured, the
  ten year frame, what compounding means to him. Deliberately the shortest chapter.. the future
  stays mostly off the table, which IS the chapter's point.

**Signature effect for the whole wing (one, shared):** the story rail (the animated signal line)
continues onto chapter pages and **tracks reading progress** down the margin.. the line literally
draws as you read. Scroll-linked SVG, transform only, already half-built.

---

## 4. THE MIDNIGHT WING — `/midnight/[slug]` (3 car pages)

The three car cards become clickable. Each opens a **shrine page**: part love letter, part spec
sheet, answering the owner's exact brief.. *why this car specifically*.

**Shared anatomy:** full-bleed hero image (the existing card image, re-used legitimately as the
hero of its own page.. counts as the same placement upgraded, no-repeat rule intact) → "Why this
one" essay (the heart of the page, 4 to 6 paragraphs of pure taste and conviction.. opinions on
cars are personality, not vulnerability, so this is where the voice gets to be loud) → **the
gauge cluster**: specs rendered as a dashboard HUD (mono type, dial-styled numbers: engine,
power, weight, top speed, units built) → one closing line → prev/next car.

- **Pagani Huayra** — *art you can hear coming.* Essay angle: theatricality and craft, active
  aero as choreography, why obsession over details is the whole point. Signature micro-effect:
  the spec dials **sweep up from zero** when scrolled into view (one-shot, Framer).
- **Bugatti Chiron** — *quiet menace.* Essay angle: overwhelming force kept perfectly calm,
  the W16 as an engineering dare, restraint as intimidation.. the most NOCTURNE car philosophy.
  Signature: a numerals strip (0 → 400) that blurs past once, like a speedo losing patience.
- **Pagani Zonda** — *the masterpiece.* Essay angle: the imperfect analog legend, why the last
  of a kind outranks the newest thing, carbon weave as poetry. Signature: a carbon-fiber weave
  texture band (CSS repeating gradient, zero images) under the essay.

---

## 5. THE DOSSIER — `/dossier` (the interests page)

The "everything about what I like and want" page, built so it reads like a **declassified file**
instead of a dating profile. The dossier aesthetic solves the vulnerability problem structurally:
files are factual, stamped, and partially redacted by nature. Mystery is baked into the format.

**Format:** a single long page of stamped file sections, mono headers, paper-thin hairlines.
Some entries carry literal **redaction bars** (solid rectangles over text that never reveal
anything.. hovering just gets you a tooltip: `clearance insufficient`). Two or three redactions,
placed for wit, never explained. That is the whole joke and the whole brand.

**Sections:**
- **ON RECORD** *(things already done, provable, stated flat)* — chess (plays properly, thinks in
  lines), swimming (fast, genuinely fast), volleyball (competent and competitive), the 10k page,
  the shipped builds (cross-links to arsenal). Facts with no adjectives doing heavy lifting.
- **IN TRAINING** *(the horizon.. things he fully intends to learn)* — drift a car (top of the
  list, obviously), and whatever else the owner supplies: each entry gets a status tag like
  `QUEUED` / `SCHEDULED` / `INEVITABLE`. The tags carry the confidence so the prose doesn't have to.
- **FREQUENCIES** *(what he will happily talk about at 2am)* — systems, cars, AI, books, brand,
  how attention works, why most advice is noise. Rendered as a tag cloud of mono chips.
- **STATIC** *(what he won't)* — three or four entries, at least one fully redacted. Short.
  This section is doing PR work disguised as personality.
- **COORDINATES** *(taste, rapid fire)* — favorite hour (02:14 obviously), rain over sun,
  Batman canon opinions, reading pace, current obsession. One-liners only, comma-free confidence.

**Signature interaction:** each file section "declassifies" on scroll.. a stamp animation
(`REVIEWED · CLEARED FOR RELEASE`) fires once as it enters view. One-shot, transform/opacity.

Nav placement: joins the main index as 07, footer index updated, constellation gets its node.

---

## 6. THE CONSTELLATION v2 — `/web` becomes the true map

Currently six nodes and a beacon. With v3 the site has ~20 destinations, and the constellation
becomes what it always wanted to be: **the map of the whole world.**

- **Clusters:** the six main nodes stay in their ring. Each main node that owns children
  (Arsenal → 5 projects, Story → 4 chapters, Midnight → 3 cars, Dossier → its sections) gains
  **satellite nodes**, small and dim, orbiting close to their parent.
- **Focus mode:** clicking a parent expands its satellites and dims the rest of the sky (the
  dim/blur pattern already exists in the CSS). Clicking a satellite **navigates to its page**..
  the constellation stops being a diagram and becomes an actual nav instrument.
- **Detail panel upgrade:** every node's panel gets an explicit `OPEN PAGE →` action.
- **Perf:** still pure SVG/DOM/Framer. Satellite breathing joins the existing staggered clock.
  Node count stays under ~25; no canvas, no physics.
- **Mobile:** the constellation collapses to a beautiful indexed list (it is already desktop
  focused; mobile gets honesty instead of a cramped map).

---

## 7. Unknown unknowns — proposed extras (owner picks, none assumed)

1. **The Transmission Log** (`/log`) — a tiny changelog of the site itself: `v3.0 · doors added`.
   Builder credibility, zero vulnerability, almost free to build. Quiet flex that the site is alive.
2. **Live Pune clock** — the hero's `PUNE · 02:14 · RAIN` becomes real: actual local time, and
   the RAIN tag swaps by season or by a tiny weather check. The site feels *awake*. (One
   `setInterval`, one optional fetch. If offline, falls back to 02:14 forever, which is canon.)
3. **The headlight flash easter egg** — typing `midnight` anywhere on the site makes the whole
   viewport do one slow headlight sweep. Costs a keystroke listener and one CSS animation. The
   kind of secret that gets screenshotted and shared on Discord, which is literally the site's job.
4. **Per-page OG images** — static pre-made cards (void black, Cormorant title, bronze hairline)
   so every link dropped in Discord unfurls beautifully. This is marketing where the audience
   actually lives. High value, zero runtime cost.
5. **`/now`** — a single-screen "current season" page: what is being built, what is being read,
   one line each, dated. Updated by editing one data file. (Only if the owner will actually
   maintain it.. a stale /now is worse than none.)

---

## 8. Build order (when execution is approved)

- **Phase A — The Spine.** Data files + dynamic routes + prev/next rails + breadcrumbs for all
  three wings, with placeholder copy. Everything clickable end to end, nothing pretty yet.
- **Phase B — The Arsenal Wing.** Five project pages, tint system, signatures. (Most valuable
  first: these are the proof-of-work pages.)
- **Phase C — The Midnight Wing.** Three car shrines. (Small, high joy, exercises the template.)
- **Phase D — The Story Wing.** Four chapters. **Blocked on owner's raw writing**.. owner dumps
  memories per chapter (voice notes fine), we distill through the Table Rule together.
- **Phase E — The Dossier.** Owner supplies the raw lists (done / horizon / talk / won't);
  build the declassified file around them.
- **Phase F — Constellation v2 + nav.** Satellites, focus mode, index/footer updates, OG cards.
- **Phase G — Mercy pass.** The Device Mercy Rule test gate on every new page, reduced motion
  audit, image weight audit, copy audit against the Table Rule and the no-hyphen law. Ship.

**Copy law reminder for every phase: no hyphens, no em dashes, in any visible text. `..` or rephrase.**

---

## 9. What is needed from the owner before each phase

- **Phase B:** 6 to 9 MintedMile stills, any Vibe Link / Notrik screenshots worth showing,
  MEGADRESS creatives if any survive. Plus 10 minutes of raw voice notes per project: why it
  exists, the hardest night, what it taught.
- **Phase C:** nothing. The car essays can be drafted from the owner's known taste and tuned.
- **Phase D:** the big one. Raw memory dumps per chapter, any length, unfiltered (the filter is
  applied later, together). School years especially: scenes, textures, routines.
- **Phase E:** the four raw lists, plus anything for COORDINATES (favorites, quirks).
- **Anytime:** verdicts on the five extras in section 7.
