// Source of truth for the Dossier (/dossier). A declassified file: factual, stamped, partly redacted.
// Drawn from the owner's own account. Voice rule: no hyphens, no em dashes. Use ".." or rephrase.

export type OnRecordItem = { label: string; body: string; href?: string };
export type TrainingItem = { label: string; tag: "QUEUED" | "SCHEDULED" | "INEVITABLE"; body: string };
export type WontItem = { body: string; redacted?: string };
export type Coordinate = { key: string; value: string };

export const ON_RECORD: OnRecordItem[] = [
  {
    label: "Swimming",
    body: "Competitive as a kid, genuinely quick in the water, in it since class 3. Still the clearest hour I get.",
  },
  {
    label: "Volleyball",
    body: "Played competitively on court. The school ran the tournaments and we turned up to win them.",
  },
  {
    label: "Chess and cards",
    body: "I play chess properly and think in lines. Not competitively, just for the game. Cards too.",
  },
  {
    label: "Guitar",
    body: "I play, and I love it. One of the few things I do purely because it sounds good.",
  },
  {
    label: "Field sales",
    body: "Door to door, one month straight, three Diwalis running from class 8 to 10. Ran the stall's marketing by the last one.",
  },
  {
    label: "The shelf",
    body: "A real library, a physical copy of every title on it. The cheapest mentorship on earth.",
    href: "/library",
  },
  {
    label: "Shipped",
    body: "Content, a brand, and software. From a page past ten thousand to a stack of live builds.",
    href: "/arsenal",
  },
];

export const IN_TRAINING: TrainingItem[] = [
  { label: "Drift a car", tag: "INEVITABLE", body: "A car held sideways in the rain. Not a question of if." },
  { label: "Get properly strong", tag: "SCHEDULED", body: "Real physical discipline. The body keeps the mind honest." },
  { label: "Boxing and MMA", tag: "QUEUED", body: "Enough to protect myself and the people I care about. Easing in, the exam comes first." },
  { label: "Finish German", tag: "QUEUED", body: "Elementary now. The plan is to take it all the way." },
  { label: "Back to the arena", tag: "QUEUED", body: "More hackathons, on hold until the exam clears." },
];

export const FREQUENCIES: string[] = [
  "systems",
  "agentic AI",
  "how memory works, in minds and models",
  "neuroplasticity",
  "context inside an LLM",
  "cars",
  "books",
  "brand",
  "attention",
  "critical thinking",
  "objective vs subjective",
  "compounding",
  "financial literacy",
  "Batman",
  "why most advice is noise",
  "dreams and perception",
];

export const WONT_DISCUSS: WontItem[] = [
  { body: "Private people. Nobody else gets put on this file." },
  { body: "Politics, religion, and whose side you are on." },
  { body: "Numbers I cannot prove." },
  { body: "Drama, and", redacted: "the exact reasons I keep clear of it" },
  { body: "", redacted: "this line sits above your clearance" },
];

export const COORDINATES: Coordinate[] = [
  { key: "Favourite hour", value: "02:14" },
  { key: "Weather", value: "rain over sun, always" },
  { key: "Season", value: "the monsoon, up in the forts" },
  { key: "Canon", value: "Nolan's Batman, and it is not close" },
  { key: "Reading", value: "slow, out loud in my head" },
  { key: "Current obsession", value: "how memory works inside a model" },
  { key: "Languages", value: "English, Hindi, Marathi, some German" },
  { key: "Engine", value: "Pagani for the art, Bugatti for the menace" },
  { key: "Base", value: "Pune, 02:14, rain" },
  { key: "Stance", value: "one life, so be the crazy one" },
];
