// Source of truth for the Arsenal. Each project has its own page at /arsenal/[slug].
// Copy is grounded in real research: live sites, GitHub repos, the owner's own screenshots and LinkedIn.
// Voice rule: no hyphens, no em dashes in any visible copy. Use ".." or rephrase.

export type ProjectSection =
  | { kind: "prose"; heading?: string; body: string }
  | { kind: "pull"; quote: string }
  | { kind: "image"; src: string; caption?: string; url?: string }
  | { kind: "gallery"; heading?: string; caption?: string; images: string[]; fit?: "cover" | "contain"; aspect?: string }
  | { kind: "features"; heading?: string; items: { title: string; body: string }[] }
  | { kind: "specs"; heading?: string; rows: { label: string; value: string }[] }
  | { kind: "verdict"; body: string };

export type Project = {
  slug: string;
  index: string; // "01"
  title: string;
  subtitle: string; // the italic descriptor
  status: string;
  year: string;
  tags: string[];
  oneLiner: string;
  accent: string; // the page's single tint, hex
  hero?: string; // full bleed hero image path
  heroUrl?: string; // the domain shown on the browser frame
  sections: ProjectSection[];
  links?: { label: string; href: string }[];
};

export const PROJECTS: Project[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "aethermem",
    index: "01",
    title: "AetherMem",
    subtitle: "the memory fabric",
    status: "In development",
    year: "2026",
    tags: ["LLMs", "Agent memory", "Self evolving", "FastAPI", "Gemini"],
    accent: "#8E7FB8",
    oneLiner:
      "Most models forget the plot halfway through the conversation. AetherMem gives an agent a memory that curates itself, and decides for itself what is worth holding on to.",
    sections: [
      {
        kind: "prose",
        heading: "Why it exists",
        body:
          "Every model I leaned on had the same quiet failure. Somewhere in a long enough conversation it lost the thread, and no amount of reminding brought it back clean. It would contradict a decision it made an hour ago, forget a constraint I set at the start, chase the last thing I said instead of the thing that mattered. I got tired of babysitting the context window. So I stopped patching the prompt and started building the model a memory that looks after itself. Not a bigger window. A smarter one.",
      },
      {
        kind: "features",
        heading: "Four kinds of memory",
        items: [
          { title: "Episodic", body: "What happened. The raw log of events and turns, the story so far." },
          { title: "Semantic", body: "What it means. Facts and concepts distilled out of the noise." },
          { title: "Goal and principle", body: "What we are trying to do, and the rules that must hold while we do it." },
          { title: "Procedural", body: "How to do things. The moves that worked before, ready to run again." },
        ],
      },
      {
        kind: "prose",
        body:
          "A retrieval layer weighs all four by importance and fuses them on the way out, so the model recalls what matters instead of the last thing it read. On top of that sits a diagnosis engine, an LLM that reads the model's own outcomes and failures and traces each one back to a root cause. It does not just notice that something went wrong. It works out why.",
      },
      {
        kind: "pull",
        quote: "It is allowed to rewrite its own rules. Only if the rewrite survives the test.",
      },
      {
        kind: "prose",
        heading: "The guardrail",
        body:
          "The part I am proudest of is the loop that keeps it honest. It proposes a change to itself, applies it, measures whether it actually improved, and reverts the moment it did not. A memory that can evolve is easy. A memory that refuses to evolve in the wrong direction is the hard part. Everything it does is narrated in plain language in a Chronicle dashboard, so the black box has a paper trail. You can read exactly what it chose to remember, what it chose to forget, and why.",
      },
      {
        kind: "specs",
        heading: "Under the hood",
        rows: [
          { label: "Frontend", value: "Next.js 16 · Tailwind v4" },
          { label: "Backend", value: "Python · FastAPI" },
          { label: "Model", value: "Gemini 2.5 Flash" },
          { label: "Store", value: "SQLite · embeddings" },
          { label: "Runtime", value: "Docker Compose" },
          { label: "State", value: "Prototype, runs end to end" },
        ],
      },
      {
        kind: "verdict",
        body:
          "It runs end to end today, and I call it what it is.. a research prototype, not a product wearing a finished mask. I am still building it. The next wave teaches it to write its own failure tests and to reason about its own scoring. This is the one I am inside of right now, the one that keeps me up.",
      },
    ],
    links: [{ label: "The repository", href: "https://github.com/shaurya-disciplined/aethermem" }],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "notrik",
    index: "02",
    title: "Notrik",
    subtitle: "the study engine",
    status: "Live",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Vision AI", "EdTech"],
    accent: "#3E74F0",
    hero: "/Notrik/1.png",
    heroUrl: "notrik-ten.vercel.app",
    oneLiner:
      "The study tool I wished existed for my own exam. Point it at a photo of your worst handwriting and it hands back clean flashcards, quizzes, and a tutor that has actually read your notes.",
    sections: [
      {
        kind: "prose",
        heading: "Why it exists",
        body:
          "I am sitting the same exam its users are. Every night I watched good notes rot into a mess I could not revise from.. margins full of half thoughts, diagrams I could not read a week later, a whole chapter scattered across three notebooks. Revision became archaeology. So I built the thing I kept wishing existed, aimed squarely at JEE and NEET aspirants chasing IITs, AIIMS and top ranks. You give it the chaos. It gives you back something you can actually study from, in about thirty seconds.",
      },
      {
        kind: "features",
        heading: "What it does",
        items: [
          { title: "Summarized notes", body: "Distilled markdown with real LaTeX formulas, not a blurry photo." },
          { title: "AI flashcards", body: "Spaced repetition cards built for active recall, generated from your own notes." },
          { title: "Practice tests", body: "Mock exams with MCQs and worked explanations, not just answers." },
          { title: "Key terms", body: "Auto generated glossaries so nothing important hides in the margins." },
          { title: "Structured tables", body: "Comparison matrices that turn a wall of text into something scannable." },
          { title: "AI tutor chat", body: "A context aware assistant that answers against your material, not the internet's." },
        ],
      },
      {
        kind: "prose",
        heading: "From chaos to clarity",
        body:
          "Under it all is a vision model that reads handwriting, whiteboard photos, and hundred page PDFs, recognises the formulas, and rebuilds them as clean structured material. The demo on the site says it plainly.. before, unstructured chaos, and after, actionable clarity. That gap is the whole product.",
      },
      {
        kind: "gallery",
        heading: "Inside Notrik",
        caption: "The live product: notrik-ten.vercel.app",
        images: ["/Notrik/2.png", "/Notrik/3.png", "/Notrik/4.png", "/Notrik/5.png", "/Notrik/6.png", "/Notrik/7.png", "/Notrik/8.png", "/Notrik/9.png"],
      },
      {
        kind: "prose",
        heading: "The sprint",
        body:
          "It came out of one long unbroken stretch with the world switched off. Food ready, phone dead, no meetings with myself. Several days of pure flow to see how far focus goes before it snaps. Whatever survived the exhaustion is what shipped. Building a study tool while studying for the same exam is a strange loop, and it taught me more about both than either would have alone.",
      },
      {
        kind: "pull",
        quote: "Point it at your worst handwriting. It hands back something you can revise from.",
      },
      {
        kind: "specs",
        heading: "The shape of it",
        rows: [
          { label: "Stack", value: "Next.js · TypeScript" },
          { label: "Engine", value: "Vision AI OCR + LaTeX" },
          { label: "Built for", value: "JEE · NEET · UPSC" },
          { label: "Model", value: "Freemium, four tiers" },
          { label: "State", value: "Live" },
        ],
      },
      {
        kind: "verdict",
        body:
          "It is live, and people study on it. The build taught me I can hold a line of focus far longer than I thought, and that the sharpest products come from scratching your own itch at 2am. The best proof a tool works is that its maker refuses to study without it.",
      },
    ],
    links: [{ label: "Visit Notrik", href: "https://notrik-ten.vercel.app/" }],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "mintedmile",
    index: "03",
    title: "MintedMile",
    subtitle: "the archive",
    status: "Archived",
    year: "2023",
    tags: ["Instagram", "Writing", "Growth", "Attention"],
    accent: "#C9A24B",
    hero: "/Mintedmile/1.png",
    heroUrl: "instagram.com/mintedmile",
    oneLiner:
      "A page that wrote the things people feel but do not say. It crossed ten thousand on nothing but words and timing, then I switched it off on purpose.",
    sections: [
      {
        kind: "prose",
        heading: "Why it exists",
        body:
          "The bio said it best.. I write what you feel, but don't say. It was a page for the quiet things, the ones that land at 2am and go unspoken by morning. New drops daily, reels and thoughts and the occasional hard truth. I did not run it to be seen. I ran it to learn exactly how attention moves online.. where it pools, how it compounds, how fast it drains the second you stop feeding it.",
      },
      {
        kind: "specs",
        heading: "The numbers",
        rows: [
          { label: "Posts", value: "761" },
          { label: "Followers", value: "past 10k at peak, ~8.9k held" },
          { label: "Following", value: "2" },
          { label: "Cadence", value: "new drops, daily" },
          { label: "State", value: "Archived" },
        ],
      },
      {
        kind: "prose",
        heading: "What it taught",
        body:
          "Timing. Consistency. The shape of a feed that makes a stranger stay a second longer. That a line lands harder when you cut it in half. I learned it in public, one post at a time, seven hundred times over, and it rewired how I think about everything I put out since. Every product page and every headline I write now carries something I first learned writing captions nobody knew were a lab.",
      },
      {
        kind: "gallery",
        heading: "From the feed",
        images: ["/Mintedmile/2.png", "/Mintedmile/3.png", "/Mintedmile/4.png"],
      },
      {
        kind: "pull",
        quote: "I stopped because it worked, not because it broke.",
      },
      {
        kind: "verdict",
        body:
          "Archived on purpose. The number was never the point, the lesson was. Walking away from a machine that still runs, while it is still running, is its own kind of discipline. I got what I came for and closed the door quietly.",
      },
    ],
    links: [{ label: "View the page", href: "https://www.instagram.com/mintedmile/" }],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "vibe-link",
    index: "04",
    title: "Vibe Link",
    subtitle: "the transmission",
    status: "Live · v3.0.4",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Groq", "Batman"],
    accent: "#E23B4A",
    hero: "/Vibe-link/1.png",
    heroUrl: "vibe-link-delta.vercel.app",
    oneLiner:
      "My first full stack AI app, built from absolute zero. I had never written a line of code. Ten days later it was live, and my friends were opening it from my Instagram stories.",
    sections: [
      {
        kind: "prose",
        heading: "Why it exists",
        body:
          "It started as a hobby, a toy for me and my friends. I had never coded before, not really, so I vibe coded the entire thing, learning the stack in the same hours I was building on it. I did not want another tutorial clone. I wanted a real thing with a real feel, something I would actually want to open. A dark, cinematic, Batman lit corner of the internet that talked back.",
      },
      {
        kind: "features",
        heading: "What is inside",
        items: [
          { title: "The look", body: "A dark cyber Batman theme with a looping video background, glassmorphic chat bubbles, and electric thunder." },
          { title: "Onboarding", body: "It learns your name first, then greets you like it has been waiting." },
          { title: "Real time chat", body: "Replies stream in the second you hit send, powered by a fast Groq LLM." },
          { title: "Memory", body: "Recent transmissions saved to localStorage, so your history is there when you come back." },
          { title: "Everywhere", body: "Fully responsive and mobile optimized, deployed live on Vercel." },
        ],
      },
      {
        kind: "prose",
        heading: "The language it speaks",
        body:
          "The whole interface talks in transmissions and encrypted nodes and secure connections, a secure archive humming at v3.0.4. That happens to be the exact language I already think in, which is probably why it came out feeling like mine and not like a template. Ten days, from a blank Create Next App tab to something my friends use for real.",
      },
      {
        kind: "gallery",
        heading: "The channel",
        images: ["/Vibe-link/2.png", "/Vibe-link/3.png", "/Vibe-link/4.png"],
      },
      {
        kind: "pull",
        quote: "The one that turned 'maybe I can build' into 'I build'.",
      },
      {
        kind: "specs",
        heading: "The shape of it",
        rows: [
          { label: "Stack", value: "Next.js 16 · TypeScript · Tailwind" },
          { label: "Model", value: "Groq LLM" },
          { label: "Build time", value: "under 10 days" },
          { label: "Prior code written", value: "none" },
          { label: "State", value: "Live · v3.0.4" },
        ],
      },
      {
        kind: "verdict",
        body:
          "Live, and this is only version one. It is the proof I needed that shipping was a thing I did, not a thing I read about. Everything in this arsenal after it exists because this one worked. Planning to take it much further.",
      },
    ],
    links: [{ label: "Launch Vibe Link", href: "https://vibe-link-delta.vercel.app" }],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "megadress",
    index: "05",
    title: "MEGADRESS",
    subtitle: "the label",
    status: "Archived · since 2020",
    year: "2020",
    tags: ["Brand", "E commerce", "Creatives", "Marketing"],
    accent: "#B06CC0",
    oneLiner:
      "A women's fashion label I ran alone, top to bottom. The name, the logo, the store, the sales, the ad creatives.. every layer of it mine. My first taste of taking an idea all the way to a stranger's cart.",
    sections: [
      {
        kind: "prose",
        heading: "Why it exists",
        body:
          "I wanted to own an idea from the thought in my head all the way to something a stranger could hold. No team to hide behind, no layer that was not mine. MEGADRESS was that idea made real.. a women's fashion brand, fashion and ethnic wear, live on the internet at megadress.shop, tagline stitched right into the logo. Where fashion meets affordability, since 2020.",
      },
      {
        kind: "gallery",
        heading: "The creatives",
        caption: "Real campaign art from the store",
        images: ["/Megadress/1.jpg", "/Megadress/2.jpg", "/Megadress/3.jpg"],
        fit: "contain",
        aspect: "aspect-[4/5]",
      },
      {
        kind: "features",
        heading: "What I ran",
        items: [
          { title: "The storefront", body: "A real online store at megadress.shop, catalogs, product pages, the whole shop." },
          { title: "The campaigns", body: "Seasonal sale creatives, a Republic Day drop at up to seventy percent off, coupon codes and all." },
          { title: "Fulfilment", body: "Cash on delivery and free delivery, the unglamorous plumbing that makes a sale real." },
          { title: "The brand", body: "The flower mark, the wordmark, the voice. Everything a customer saw, I made." },
        ],
      },
      {
        kind: "pull",
        quote: "The first time an idea of mine became a transaction.",
      },
      {
        kind: "prose",
        heading: "What it taught",
        body:
          "You learn supply and demand differently when it is your own money and your own name on the label. Margins stop being a chapter in a book and start being the difference between a good week and a dead one. Every layer at once.. identity, creatives, site, marketing, fulfilment.. taught me more about how a business actually breathes than any course could.",
      },
      {
        kind: "verdict",
        body:
          "Archived now, but it was the first. Everything I have built since is a better run version of what I taught myself here, at seventeen, learning the whole stack of a business by living inside it.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "reachmonk",
    index: "06",
    title: "ReachMonk",
    subtitle: "the pitch",
    status: "Live",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Conversion"],
    accent: "#2FBAA6",
    hero: "/Reachmonk/1.png",
    heroUrl: "reachmonk.com",
    oneLiner:
      "Not every build is a product. Some are pure persuasion. ReachMonk is a landing page engineered to do one thing.. take a cold stranger and move them to book a call.",
    sections: [
      {
        kind: "prose",
        heading: "Why it exists",
        body:
          "I wanted to prove I could build a page that does more than look good, one that actually sells. ReachMonk is the front door of an ad agency for contractors in the UK and North America.. run your ads, get booked calls, you don't touch a thing. Every pixel is pointed at a single action. It is a masterclass I set myself in conversion, dressed as a real business.",
      },
      {
        kind: "prose",
        heading: "How it was built",
        body:
          "Premium dark, teal light bending across the whole hero like a signal cutting through static, motion that walks the eye straight down to one button. Hero, then proof, then the offer, then the close. I built it, tore it down, and built it again across versions to get the pacing right, because a page that sells lives or dies on rhythm, not decoration.",
      },
      {
        kind: "features",
        heading: "The offer, engineered",
        items: [
          { title: "The promise", body: "Facebook, Instagram and Google campaigns that fill a contractor's calendar with homeowners ready to spend." },
          { title: "The risk reversal", body: "No setup fees, no retainers until results, no long term contracts. Every objection answered on the page." },
          { title: "The one action", body: "Book a free strategy call. Everything else on the page exists to make that button obvious." },
        ],
      },
      {
        kind: "gallery",
        heading: "The funnel",
        caption: "Live at reachmonk.com",
        images: ["/Reachmonk/2.png", "/Reachmonk/3.png", "/Reachmonk/4.png", "/Reachmonk/5.png"],
      },
      {
        kind: "pull",
        quote: "We run your ads. You get booked calls.",
      },
      {
        kind: "specs",
        heading: "The shape of it",
        rows: [
          { label: "Stack", value: "Next.js · TypeScript · Tailwind" },
          { label: "Motion", value: "Framer Motion" },
          { label: "Market", value: "UK & North America contractors" },
          { label: "State", value: "Live · reachmonk.com" },
        ],
      },
      {
        kind: "verdict",
        body:
          "Range. Knowing how to build a page that sells is its own weapon, separate from knowing how to build a product. Most builders can do one. I wanted both, and this is where I proved the second.",
      },
    ],
    links: [{ label: "Visit ReachMonk", href: "https://reachmonk.com" }],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "hackway",
    index: "07",
    title: "HackWay",
    subtitle: "the copilot",
    status: "Live · in beta",
    year: "2026",
    tags: ["Next.js 16", "React 19", "Groq", "Zustand"],
    accent: "#6D6CF5",
    hero: "/Hackway/1.png",
    heroUrl: "hackway.vercel.app",
    oneLiner:
      "An AI hackathon copilot. Give it your skills, a theme, and how much time you have, and it forges validated, well scoped, pitch ready project ideas in minutes.. so you stop staring at a blank page and start building something judges remember.",
    sections: [
      {
        kind: "prose",
        heading: "Why it exists",
        body:
          "The worst hour of any hackathon is the first one, the blank page, the team arguing over what to even build while the clock runs. HackWay is the copilot for exactly that hour. It turns three inputs.. what you can do, what the theme is, how long you have.. into ideas that are already scoped to fit the time and shaped to win. Built for the arenas I care about: Devpost, MLH, SIH. No sign up required to explore.",
      },
      {
        kind: "features",
        heading: "How it helps",
        items: [
          { title: "1 · Generate", body: "Get seven well scoped hackathon ideas instantly, each sized to your time and skills." },
          { title: "2 · Refine", body: "Expand one idea into a full, buildable blueprint.. MVP scope, user flows, architecture, tech stack." },
          { title: "3 · Pitch", body: "Turn it into a winning three minute demo script and slides, with the wow factor and judging criteria mapped out." },
        ],
      },
      {
        kind: "prose",
        heading: "How it was built",
        body:
          "It ships in phases. The foundation and the glassmorphism shell came first, then the core AI engine that actually generates and saves ideas, with the deep tools and public launch still ahead. Generation runs server side through Groq on the llama 3.3 70b model, so the key never touches the browser, and if there is no key the app still runs and tells you so kindly. The design is a light world of drifting blue and violet mesh blobs behind frosted glass, every component hand built, no UI library borrowed.",
      },
      {
        kind: "gallery",
        heading: "Inside HackWay",
        caption: "Live at hackway.vercel.app",
        images: ["/Hackway/2.png", "/Hackway/3.png", "/Hackway/4.png", "/Hackway/5.png", "/Hackway/6.png", "/Hackway/7.png", "/Hackway/8.png", "/Hackway/9.png", "/Hackway/10.png", "/Hackway/11.png", "/Hackway/12.png"],
      },
      {
        kind: "pull",
        quote: "Stop staring at a blank page. Start building something judges remember.",
      },
      {
        kind: "specs",
        heading: "Under the hood",
        rows: [
          { label: "Stack", value: "Next.js 16 · React 19 · TypeScript" },
          { label: "Styling", value: "Tailwind v4 · custom system" },
          { label: "State", value: "Zustand" },
          { label: "Model", value: "Groq · llama 3.3 70b" },
          { label: "Built for", value: "Devpost · MLH · SIH" },
          { label: "Stage", value: "Idea engine live, deep tools next" },
        ],
      },
      {
        kind: "verdict",
        body:
          "Live and growing, my second real startup swing after Notrik. The idea engine works today, the pitch and refine tools are next. This is the one I am building for the version of me that used to lose the first hour of every hackathon.",
      },
    ],
    links: [{ label: "Launch HackWay", href: "https://hackway.vercel.app" }],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** prev / next within the flat order, wrapping around */
export function adjacent(slug: string): { prev: Project; next: Project } | null {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  return { prev, next };
}

export const TOTAL = PROJECTS.length;
