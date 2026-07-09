# 06 · The Arsenal (7 Projects)

The Arsenal is the proof of work wing. Each project has its own page at `/arsenal/[slug]`, generated from
`src/data/projects.ts`. Copy is first draft, grounded in real research, awaiting the owner's red-pen. Each
page carries one accent tint and (planned, not yet built) one signature micro interaction.

Shared page anatomy: cinematic header (eyebrow, huge title, italic descriptor, status stamp, one liner) →
"why it exists" prose → "how it was built" (told as story, not resume) → a pull quote → verdict → external
links (moved inside the detail page) → prev/next rail.

**Owner valuation order (context):** AetherMem, Notrik, MintedMile, Vibe Link, MEGADRESS, then ReachMonk (06)
and HackWay (07) added 2026-07-09. Final ordering is the owner's call and is an open question.

---

## 01 · AetherMem .. the memory fabric  (accent: synapse violet `#8E7FB8`)

**Status: In development. This is the active flagship. Owner is building it right now.**

Real facts (from the live GitHub repo, updated 2026-07-09):
- "A Self Evolving Memory Fabric for Intelligent AI Agents." Repo tagline: "This is not a website."
- Multi tier memory: episodic, semantic, goal/principle, and procedural tiers, with dynamic importance
  weighted retrieval and fusion.
- Diagnosis module: an LLM powered engine that reads outcomes and failures and traces root causes.
- Guarded evolution loop: a meta layer that proposes a change to itself, applies it, tests the impact, and
  auto reverts if performance regresses. (This is the "arbiter" the old plan imagined, now real.)
- Chronicle dashboard: narrates memory operations in human readable language.
- Stack: Next.js 16, TypeScript, Tailwind v4, Framer Motion (frontend); Python + FastAPI (backend); SQLite
  with lightweight embeddings; Gemini 2.5 Flash; Docker and Docker Compose. TS ~53%, Python ~42%. MIT license.
- Honest framing: "a research prototype and proof of concept, not a production ready enterprise system." Runs
  end to end today. Roadmap: self generated failure scenarios, self programming scoring logic, constitutional
  safety bounds with drift auditing.

Story angle: he kept watching models lose the thread in long conversations, so he built the model a memory
that curates itself. The flex is the guardrail (the loop that refuses to evolve in the wrong direction), not
the cleverness.

Links: repository https://github.com/shaurya-disciplined/aethermem . No live site (local / Docker).
Screenshots: none provided yet (ask owner, or the Chronicle dashboard would screenshot beautifully).
Planned signature: "memory decay" .. paragraphs rest slightly blurred and sharpen into focus as they enter
the viewport, so the page recalls itself as you read. Motif: recall threads (thin SVG lines linking sections).

---

## 02 · Notrik .. the flow sprint  (accent: white hot `#F4F4F6`)

**Status: Live.** https://notrik-ten.vercel.app/

Real facts (from the live site): Notrik is a shipped **AI study product for JEE / NEET / UPSC aspirants**. It
turns messy handwritten notes, PDFs, and whiteboard photos into structured study material: summarized notes
with LaTeX, AI flashcards (spaced repetition), practice tests with explanations, auto glossaries, comparison
tables, and an AI tutor chat. Vision AI OCR and formula recognition. Freemium, four tiers, ₹0 to ₹639/month.
Next.js / TypeScript. Tagline on site: "Turn Your Messy Handwritten JEE & NEET Notes into Perfect Flashcards,
Quizzes & Structured Interactive Notes in Seconds."

**Important reframe:** our old docs called Notrik "just a coding sprint." It is actually a real product, and
the best story is that **he is a JEE aspirant who built the study tool he wished he had for his own exam.**
That single thread ties the Story wing (his grind) to the Arsenal wing. The multi day flow sprint is still
the flavor (the "how it was built"), but the product is the headline. He also noted he is unsure making the
Notrik repo public was the right move, so prefer linking the live site over the repo.

Screenshots: `public/Notrik/` (9 shots). Use these to show the six study formats and the transform workflow.
Planned signature: one unbroken vertical SVG line drawing down the whole page (mirrors the unbroken sprint),
plus a mono "HOUR 00 → final hour" counter in the header. Monochrome page, brightness is its color.

---

## 03 · MintedMile .. the archived engine  (accent: minted gold `#C9A24B`)

**Status: Archived, peaked past 10k followers.** https://www.instagram.com/mintedmile/

Real facts: an Instagram theme page he grew past ten thousand followers on taste and consistency, no ads.
Now around 8.9k, discontinued deliberately (no longer posting). He stopped once he had learned what he came
for: how attention moves online, where it pools, how fast it drains.

The flex is the shutoff: walking away from a machine that still runs. Frame the decision as the point.
**OPEN QUESTION:** show "peaked 10k+" or the honest "~8.9k now"? Currently the copy says peaked.

Screenshots: `public/Mintedmile/` (4 shots). These feed the planned "contact sheet" motif.
Planned signature: a tight editorial grid of real post stills (grayscale until hover), plus a follower
odometer that rolls to 10,000+ and stops with a hard mechanical click as an ARCHIVED stamp slams over it.

---

## 04 · Vibe Link .. the storm channel  (accent: storm steel `#8FA3AE`)

**Status: Live.** https://vibe-link-delta.vercel.app

Real facts (GitHub + live site + his LinkedIn post):
- His first full stack AI application, "built from absolute zero." He had never coded before and vibe coded
  the whole thing. From idea to live app in **under 10 days**. His friends use it via Instagram stories. He
  calls it "version 1."
- Stack: Next.js 16, TypeScript, Tailwind, **Groq API** (fast LLM). Deployed on Vercel.
- Features: dark cyber **Batman themed** UI with a looping video background, glassmorphic chat bubbles, and
  electric thunder effects; personalized name onboarding; real time streaming chat; recent chats history in
  localStorage; fully responsive and mobile optimized.
- Its own UI speaks in "transmission", "encrypted node", "secure connection" (version tag 3.0.4), which
  rhymes with NOCTURNE's signal language.

Nice detail worth keeping (armored as a strength, not a confession): first time ever coding, shipped in ten
days. Screenshots: `public/Vibe-link/` (4 shots).
Planned signature: pull quotes styled as chat bubbles that stream in word by word on scroll; distant
lightning flicker on a low opacity overlay every 15 to 25 seconds.

---

## 05 · MEGADRESS .. the label  (accent: blood red `#9B2D30`)

**Status: First venture. Year: 2020** (the logo reads "since 2020"; correct the placeholder 2023 in code).

Real facts (LinkedIn): a solo clothing brand, conceived and executed end to end. He built the full brand
identity, a premium website header, sales and advertising creatives, marketing materials, product catalogs,
and the digital marketing strategy. His first taste of taking an idea from a thought all the way to something
a stranger could buy. Learned supply and demand by living it.

Logo: purple flower mark plus "MEGADRESS since 2020" wordmark (owner provided the logo image). Note the logo
is purple, but the page accent is deliberately blood red per the plan (the only red on the site); confirm
whether to honor the real purple brand color instead, given we now have the actual logo. **OPEN QUESTION.**
Screenshots / assets: owner provided the MEGADRESS logo. No dedicated `public/Megadress/` folder yet; ask for
any surviving creatives or catalog shots.
Planned signature: brutalist headline treatment, oversized section titles cropped by the viewport edge like a
lookbook spread; spec sheet styled as a woven care label.

---

## 06 · ReachMonk .. the pitch  (accent: ledger sage `#7E9B7A`)  [added 2026-07-09]

**Status: Landing page.** Repos: `reachmonk-v2` (TypeScript), `reachmonk-v4` (JavaScript). Rebuilt across
versions.

Real facts: a premium landing page for an SMMA (social media marketing agency), tagline "We Fill Your
Calendar. You Close the Jobs." Conversion focused: hero with CTA, value props, video sales letter section,
social proof, pricing, contact CTAs. Premium dark plus glassmorphic aesthetic, mobile first. Stack: Next.js
(App Router), TypeScript, Tailwind, Framer Motion, deployed on Vercel. Built to showcase frontend, UI/UX, and
branding skills.

Story angle: not every build is a product; some are pure persuasion. Range. Screenshots: `public/Reachmonk/`
(5 shots). No confirmed live URL yet (currently links the v2 repo; ask owner for the deployed URL).
Planned signature (new, proposed): glass panels that assemble on scroll and a single CTA that stays lit while
everything else dims, echoing a conversion funnel walking the eye to one action.

---

## 07 · HackWay .. the co-pilot  (accent: co-pilot indigo `#5B7CF0`)  [added 2026-07-09]

**Status: In development, private startup. Repo is PRIVATE (do not link a repo). Phase 2 shipped.**

Real facts: an AI hackathon co-pilot. It turns your skills, theme, and time into validated, well scoped,
pitch ready project ideas in minutes. Phase 1 (design system, landing, app shell) done; Phase 2 (Groq AI idea
engine, idea cards, detail modal, saving) done; Phase 3 (idea refiner, pitch assistant, exports, public
launch) planned. Runs idea generation server side through Groq (`llama-3.3-70b-versatile`).

Stack: Next.js 16 (App Router, RSC) + React 19, TypeScript strict, Tailwind v4 (CSS first `@theme` tokens),
Framer Motion, Zustand, lucide-react, a custom design system (no UI component libraries).

Design language: a light "vibrant mesh blobs" glassmorphism, near white base with slowly drifting
blue/violet/cyan glow blobs behind frosted glass panels; accent a blue to violet duo. (This is why the page
accent echoes indigo.) Screenshots: `public/Hackway/` (12 shots, the richest set we have).
Planned signature (new, proposed): idea cards that deal in and flip on scroll, or a "generating" shimmer that
types out a sample idea, echoing the product's own idea engine. A restrained nod to its mesh blob glass UI.

> Note: HackWay is a private startup. Confirm with the owner how much to reveal. Lean toward showing it as a
> shipped, in development tool (like Notrik) without exposing the private repo or unreleased Phase 3 detail.

---

### RAW SOURCE: HackWay README, verbatim (2026-07-09)

> HackWay .. AI that helps you forge hackathon-winning projects in minutes. HackWay is your AI hackathon
> co-pilot, it turns your skills, theme, and time into validated, well-scoped, pitch-ready project ideas.
> This repository now includes the working Phase 2 AI idea engine.
>
> Status: Phase 1 Foundation & Glassmorphism Shell (design system, landing page, app shell, reusable
> components) = Done. Phase 2 Core AI Engine (idea generation form + Groq AI, idea cards & detail modal,
> saving) = Done. Phase 3 Deep Tools & Launch (Idea Refiner, Pitch Assistant, exports, public launch) =
> Planned.
>
> AI setup: idea generation runs server-side through the Groq API using the llama-3.3-70b-versatile model.
> Key is read only on the server (the /api/generate route) and never exposed to the browser. Without a key,
> the app still runs and generation returns a friendly "AI service isn't configured" message.
>
> Tech stack: Next.js 16 (App Router, React Server Components) + React 19; TypeScript (strict mode); Tailwind
> CSS v4 (CSS-first @theme tokens); Framer Motion; Zustand; lucide-react; custom design system (no UI
> component libraries).
>
> Design system: a light "vibrant mesh blobs" glassmorphism aesthetic, a near-white base with slowly drifting
> blue/violet/cyan glow blobs behind frosted glass panels. Accent is a blue to violet duo. Reusable
> components: GlassCard, GlassPanel, AnimatedButton, InputField, TextArea, LoadingState (orbiting-dots
> loader) + Shimmer, EmptyState, IdeaCard, MeshBackground, Sidebar, TopBar, NavItem, PageTransition.
>
> Routes: / landing, /dashboard app home, /generate idea generator, /ideas saved ideas, /settings placeholder.
