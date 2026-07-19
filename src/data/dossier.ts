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
    href: "/dossier/swimming",
  },
  {
    label: "Volleyball",
    body: "Played competitively on court. The school ran the tournaments and we turned up to win them.",
    href: "/dossier/volleyball",
  },
  {
    label: "Chess and cards",
    body: "I play chess properly and think in lines. Not competitively, just for the game. Cards too.",
    href: "/dossier/chess",
  },
  {
    label: "Guitar",
    body: "I play, and I love it. One of the few things I do purely because it sounds good.",
    href: "/dossier/guitar",
  },
  {
    label: "Field sales",
    body: "Door to door, one month straight, three Diwalis running from class 8 to 10. Ran the stall's marketing by the last one.",
    href: "/dossier/sales",
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
  "LLM context & memory management",
  "self-evolving memory fabrics (Aethermem)",
  "B2C SaaS scaling (Notrik)",
  "asymmetric leverage",
  "attention as a currency",
  "deterministic vs probabilistic thinking",
  "psychological triggers & persuasion",
  "the math of daily compounding",
  "stoic isolationism",
  "boxing & physical conditioning",
  "trading & market psychology",
];

export const BEHAVIORAL_ANALYSIS = [
  { trait: "Systems over Goals", observation: "Library density in atomic routines (Clear, Newport, Allen) suggests a reliance on deterministic inputs. Does not rely on motivation; relies on architecture and deep work." },
  { trait: "Asymmetric Leverage", observation: "Heavy indexing on Naval, Hormozi, and DeMarco. Indicates a fundamental rejection of linear time-for-money trades. Bias towards software (SaaS) and media as vehicles for infinite scale." },
  { trait: "Decoding Human Nature", observation: "Study of Greene, Cialdini, and Voss. Treats social interaction as a readable system. Understands the hidden levers of persuasion and prefers quiet observation over loud participation." },
  { trait: "Stoic Isolationism", observation: "Marcus Aurelius paired with 'The Courage to be Disliked'. Shows an unusually high tolerance for social friction and a preference for internal validation over external consensus." },
  { trait: "Technological Pragmatism", observation: "Interest in AI architecture paired with attention day-trading. Views technology not as magic, but as the ultimate lever for capturing attention and building capital." }
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

export const DOSSIER_FILES = [
  {
    slug: "swimming",
    title: "Swimming",
    classification: "M-0214-A",
    body: "I have been in the water since class 3. What began as a mandatory childhood activity quickly evolved into a study in sensory deprivation and mechanical efficiency.\\n\\nThe pool is one of the very few environments left on earth where absolute isolation is still possible. You cannot bring a phone underwater. You cannot hear notifications. The friction of the water forces you into a state of rhythmic breathing and biological feedback. It is entirely deterministic. The harder you pull, the faster you move. No algorithms, no market conditions, no subjective opinions. Just fluid dynamics and lung capacity.\\n\\nI swam competitively, which taught me early on that winning is not about bursts of erratic effort, but about unbroken, systematic consistency. Even today, it remains the most reliable method I have to clear the buffer of my mind. It is the closest thing to a hard reset.",
    image: "/dossier/swimming.jpg",
  },
  {
    slug: "volleyball",
    title: "Volleyball",
    classification: "M-0214-B",
    body: "Volleyball is fundamentally an exercise in predictive logic and spatial awareness. You are not just reacting to the ball; you are reading the kinetic chain of the opponent. The angle of their shoulders, the placement of the setter's hands, the trajectory of the toss, all of it is data.\\n\\nWe did not just play; we ran the school tournaments. We turned up to win. That required understanding team dynamics, identifying the weak link in a defense, and ruthlessly exploiting it. It is an asymmetric game. A single, perfectly timed block can demoralize a team more than a dozen normal points. \\n\\nThe court taught me how to move within a system of other people, how to cover blind spots, and how to anticipate where the game is going before the ball even crosses the net.",
    image: "/dossier/volleyball.jpg",
  },
  {
    slug: "chess",
    title: "Chess and Cards",
    classification: "M-0214-C",
    body: "I play chess properly, which means I do not look at the board; I look at the lines. It is a strictly deterministic environment. If I execute A, the opponent must respond with B or C. It forces you into a state of deep, branching computation.\\n\\nCards, on the other hand, are probabilistic. You never have perfect information. You do not know the exact outcome, but if you understand math and psychology, you know the odds. You learn when to fold a bad hand and when to aggressively leverage a good one.\\n\\nI do not play either competitively anymore, but the mental frameworks are permanent. Whether I am architecting a new AI memory fabric like Aethermem or analyzing market psychology, I am essentially just toggling between the deterministic logic of chess and the probabilistic risk assessment of cards.",
    image: "/dossier/chess.jpg",
  },
  {
    slug: "guitar",
    title: "Guitar",
    classification: "M-0214-D",
    body: "In a life heavily indexed on optimization, scale, and asymmetric leverage, playing the guitar is a deliberate anomaly. It is one of the only things I do that is not measured by ROI.\\n\\nThere is something profoundly grounding about the tactile resistance of steel strings. It is an analog mechanism. When you spend the majority of your time dealing in the abstract, writing code, structuring SaaS architectures, studying LLM context management, you need an anchor. \\n\\nI play purely because it sounds good. The mechanical act of fretting a chord and forcing it to ring out perfectly is a necessary counterbalance to the hyper analytical speed of everything else.",
    image: "/dossier/guitar.jpg",
  },
  {
    slug: "sales",
    title: "Field Sales",
    classification: "M-0214-E",
    body: "Three Diwalis in a row. Class 8 to 10. Door to door. There is absolutely no better education in human psychology than standing on a stranger's doorstep trying to hold their attention before they close the door in your face.\\n\\nYou learn within the first 3 seconds how to read micro expressions. You learn how to modulate your tone, how to bypass the automatic no, and how to frame an offer so it feels stupid to refuse. It strips away your ego entirely. You build an unbreakable shell against rejection, treating it merely as a data point rather than a personal failure.\\n\\nBy the last year, I was not just selling; I was running the stall's entire marketing strategy. Understanding how to sell, how to truly influence human behavior, is the base layer for everything else. Code builds the product, but persuasion builds the empire.",
    image: "/dossier/sales.jpg",
  }
];
