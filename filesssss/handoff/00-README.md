# NOCTURNE Handoff Bible.. START HERE

This folder is the single source of truth for the `tut::meteor` website. If you are an AI model or a
person picking this project up cold, read the files in order and you will have the full context: who the
site is for, the creative direction, every decision made, all the real content and assets, where the build
stands today, and where it is going. You should not need to research anything from scratch.

## The project in one paragraph

`tut::meteor` is the personal "know me" site of **Shauryavardhan Mhetre**, alias **Meteor** (Discord
`tut.meteor`). He meets many strangers in a "Study Together" Discord server and is tired of reintroducing
himself, so this site is the one link he drops in his profile: click it, get his vibe, no reexplaining. The
design direction is **NOCTURNE**: automotive cinematic luxury, an empty city at night with the brights on,
rain, late night builds, Batman energy, rendered like a luxury car marque or an A24 title sequence. The
site's whole job is to **intrigue, not inform**. It is local only, never deployed, never commercial.

## Status snapshot (2026-07-09)

- **NOCTURNE v2 is fully shipped** (all 5 phases): the persistent WebGL smoke, atmosphere, machine feel,
  deep end, and restraint pass. See `10-build-status-and-roadmap.md`.
- **NOCTURNE v3 ("The Depth Update") is in execution.** Every surface section becomes a page you can walk
  into. The **Arsenal wing is built** (data driven detail pages, first draft copy). Everything else is
  drafted or planned. Story and Dossier wings wait on the owner's raw writing.
- **Workflow the owner chose:** "draft it all, then I red-pen," preceded by deep research of his real
  footprint (GitHub, live sites, LinkedIn).

## The five laws that govern everything

1. **No hyphens, no em dashes in any visible copy or title.** Use `..` or rewrite. This is a hard rule.
   (Structural hyphens are fine: URLs, route slugs, CSS classes, code, book slugs.)
2. **Restraint is premium. Imply, do not confess.** Reserved, mysterious, never an open book.
3. **The Table Rule** (the vulnerability filter): depth through scenes, craft, and systems, never through
   confession. Full six point checklist in `02-north-star-voice-and-laws.md`.
4. **The Device Mercy Rule** (the performance budget): exactly one WebGL context total, every new effect is
   CSS / SVG / Framer on transform and opacity only, image weight caps, tested on a throttled phone.
5. **One signature effect per page.** Never stack effects into a gimmick reel.

## How to read this folder

| File | What is in it |
| --- | --- |
| `00-README.md` | This index. |
| `01-purpose-and-audience.md` | Why the site exists, who visits, the hard constraints. |
| `02-north-star-voice-and-laws.md` | NOCTURNE direction, the voice rule, the Table Rule, the Device Mercy Rule. |
| `03-owner-profile.md` | Everything about Shaurya. His full LinkedIn dumped verbatim. |
| `04-design-system.md` | Fonts, color tokens, motion language, the per project accent map. |
| `05-tech-and-architecture.md` | Stack, components, routes, the data driven page pattern, the WebGL smoke. |
| `06-arsenal-projects.md` | The 7 projects, real facts, screenshots, links, planned signatures. The big one. |
| `07-story-midnight-dossier.md` | The three other wings and exactly what the owner still owes for each. |
| `08-constellation-and-extras.md` | Constellation v2 and the seven locked "extra" features. |
| `09-assets-and-screenshots.md` | Full asset inventory, the no repeat rule, where every screenshot lives. |
| `10-build-status-and-roadmap.md` | What is built, what is next, phase order, what is blocked. |
| `11-conversation-log-and-decisions.md` | The narrative of how we got here, locked decisions, open questions. |

## The older planning docs (still valid, this folder supersedes for status)

- `filesssss/NOCTURNE_DEPTH_v3.md` .. the active v3 plan (the "doors" update). Read for the full vision of
  every wing and the two governing laws.
- `filesssss/NOCTURNE_MASTERPLAN_v2.md` .. the v2 plan (voice, atmosphere, machine feel), all shipped.
- `filesssss/NOCTURNE_DEVELOPMENT_BIBLE.md` and `filesssss/masterpiece_roadmap.md` .. the original ambition
  (aspirational, much of it deliberately not built for performance and restraint reasons).
- `context-tut-meteor.md` (repo root) .. the long form running context log from the v2 build.
