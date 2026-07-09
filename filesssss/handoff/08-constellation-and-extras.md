# 08 · Constellation v2 and the Locked Extras

## Constellation v2 .. `/web` becomes the true map

Currently `/web` is six nodes and a beacon. With v3 the site has around twenty destinations, so the
constellation becomes the map of the whole world.

- **Clusters:** the six main nodes stay in their ring. Each main node that owns children (Arsenal → 7
  projects, Story → 4 chapters, Midnight → 3 cars, Dossier → its sections) gains small dim satellite nodes
  orbiting close to their parent.
- **Focus mode:** clicking a parent expands its satellites and dims the rest of the sky (the dim/blur pattern
  already exists in the CSS). Clicking a satellite navigates to its page. The constellation stops being a
  diagram and becomes an actual nav instrument.
- **Detail panel:** every node's panel gets an explicit `OPEN PAGE →` action.
- **Perf:** still pure SVG / DOM / Framer. Satellite breathing joins the existing staggered clock. Node count
  stays under ~25. No canvas, no physics.
- **Mobile:** the constellation collapses to a beautiful indexed list (it is desktop focused; mobile gets an
  honest list instead of a cramped map).

## The seven locked extras

All chosen by the owner. None of these break the "one signature per page" rule because they are global
utilities, off site, or hidden, not stacked per page effects.

1. **Live Pune clock.** The hero's `PUNE · 02:14 · RAIN` becomes real: actual local time, and the RAIN tag
   swaps by season or a tiny weather check. One `setInterval`, one optional fetch. If offline, falls back to
   02:14 forever, which is canon.
2. **Per page OG images.** Static pre made cards (void black, Cormorant title, bronze hairline, per page
   accent) so every link dropped in Discord unfurls beautifully. Marketing where the audience actually lives.
   Zero runtime cost. Highest bang for buck.
3. **Command palette (`Cmd/Ctrl + K` or `/`).** A terminal styled tactical jump menu to warp between rooms.
   The most game like feature, cheap, DOM only. Invisible until summoned.
4. **Returning visitor awareness.** The site remembers you via localStorage: full ignition cold start on the
   first visit, `WELCOME BACK · TRANSMISSION RESUMED` and a faster boot on return. Fires once, on boot.
5. **Weather true rain.** Rain intensity follows the real Pune weather via the live clock's optional fetch. If
   it is actually raining in Pune, the site rains harder. Modifies the rain that already exists, no new effect.
6. **The `midnight` easter egg.** Typing `midnight` anywhere makes the whole viewport do one slow headlight
   sweep. One keystroke listener, one CSS animation. Hidden. The kind of secret that gets screenshotted.
7. **The Transmission Log (`/log`).** A tiny changelog of the site itself (`v3.0 · doors added`). Builder
   credibility, its own small page, almost free. A quiet flex that the site is alive.

## Deferred / not chosen

`/now` (a single screen "current season" page) was offered and NOT taken, because a stale `/now` is worse
than none. Revisit only if the owner will maintain it.
