// Source of truth for the Library. Each book has its own page at /library/[slug].
// Covers live in /public/books/{slug}.jpg (sourced from Open Library / Google Books).

export type Book = {
  slug: string;
  title: string;
  author: string;
  category: Category;
  note?: string;
  /** true when no real cover could be sourced; the page renders a typographic fallback */
  noCover?: boolean;
  /** short, reserved reason it's on the shelf */
  blurb: string;
};

export type Category =
  | "Focus & Systems"
  | "Stoicism & Mind"
  | "Business & Leverage"
  | "People & Persuasion"
  | "Tech & AI";

export const CATEGORIES: Category[] = [
  "Focus & Systems",
  "Stoicism & Mind",
  "Business & Leverage",
  "People & Persuasion",
  "Tech & AI",
];

export const BOOKS: Book[] = [
  // Focus & Systems
  {
    slug: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Focus & Systems",
    blurb:
      "The case for doing hard things with nothing else in the room. Half of my system started in this book.",
  },
  {
    slug: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Focus & Systems",
    note: "read many times",
    blurb:
      "The mechanics of becoming someone quietly, one repetition at a time. I keep coming back to it.",
  },
  {
    slug: "the-compound-effect",
    title: "The Compound Effect",
    author: "Darren Hardy",
    category: "Focus & Systems",
    note: "read",
    blurb: "Nothing dramatic. Just the math of small choices, run long enough.",
  },
  {
    slug: "hyperfocus",
    title: "Hyperfocus",
    author: "Chris Bailey",
    category: "Focus & Systems",
    note: "read",
    blurb:
      "Attention as the only currency that matters. I never finished it; the first half already did its job.",
  },
  {
    slug: "getting-things-done",
    title: "Getting Things Done",
    author: "David Allen",
    category: "Focus & Systems",
    note: "read",
    blurb: "Get it out of your head and into a system you trust. Old, dry, still works.",
  },
  {
    slug: "the-power-of-your-subconscious-mind",
    title: "The Power of Your Subconscious Mind",
    author: "Joseph Murphy",
    category: "Focus & Systems",
    note: "read young",
    blurb: "Read this too early to be skeptical of it. Some of it stuck anyway.",
  },

  // Stoicism & Mind
  {
    slug: "the-alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Stoicism & Mind",
    note: "read",
    blurb: "A fable about following your Personal Legend. Finished it many years ago, but the core idea of pursuing destiny never left.",
  },
  {
    slug: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    category: "Stoicism & Mind",
    blurb:
      "An emperor talking himself into doing the right thing. Nobody was meant to read it, which is why it's honest.",
  },
  {
    slug: "letters-from-a-stoic",
    title: "Letters from a Stoic",
    author: "Seneca",
    category: "Stoicism & Mind",
    blurb: "Seneca writing a friend about how to live. I read it like the letters were addressed to me.",
  },
  {
    slug: "the-daily-stoic",
    title: "The Daily Stoic",
    author: "Ryan Holiday",
    category: "Stoicism & Mind",
    blurb: "One page a morning. A quiet way to start the day before the noise does.",
  },
  {
    slug: "the-obstacle-is-the-way",
    title: "The Obstacle is the Way",
    author: "Ryan Holiday",
    category: "Stoicism & Mind",
    note: "read",
    blurb: "The thing in the way is the way. Simple, and I needed to hear it more than once.",
  },
  {
    slug: "the-courage-to-be-disliked",
    title: "The Courage to be Disliked",
    author: "Kishimi & Koga",
    category: "Stoicism & Mind",
    blurb: "A dialogue that argues you're freer than you think, if you can stand being disliked.",
  },
  {
    slug: "thus-spoke-zarathustra",
    title: "Thus Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    category: "Stoicism & Mind",
    blurb:
      "Dense, strange, part poetry. I don't claim to have understood all of it, and that's part of why I keep it.",
  },
  {
    slug: "the-subtle-art",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    category: "Stoicism & Mind",
    note: "read",
    blurb:
      "Not about caring less. It's about choosing what's worth caring about. The title oversells; the point lands.",
  },
  {
    slug: "the-rudest-book-ever",
    title: "The Rudest Book Ever",
    author: "Shwetabh Gangwar",
    category: "Stoicism & Mind",
    note: "read",
    blurb: "Blunter than most of the genre dares to be. Refreshing when you're tired of gentle.",
  },
  {
    slug: "your-erroneous-zones",
    title: "Your Erroneous Zones",
    author: "Wayne Dyer",
    category: "Stoicism & Mind",
    blurb: "Dated, but it names the mental habits that quietly run people.",
  },
  {
    slug: "kaizen",
    title: "Kaizen",
    author: "Sarah Harvey",
    category: "Stoicism & Mind",
    blurb: "Small, unglamorous, constant. A whole philosophy hiding inside one word.",
  },
  {
    slug: "the-mountain-is-you",
    title: "The Mountain Is You",
    author: "Brianna Wiest",
    category: "Stoicism & Mind",
    note: "not for me",
    blurb: "Everyone recommended it. It wasn't for me, but I finished it to be sure.",
  },

  // Business & Leverage
  {
    slug: "the-richest-man-in-babylon",
    title: "The Richest Man in Babylon",
    author: "George S. Clason",
    category: "Business & Leverage",
    note: "one sitting",
    blurb: "The oldest and simplest rules of wealth, told through parables. So engaging I finished it in one single sitting.",
  },
  {
    slug: "the-almanack-of-naval-ravikant",
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    category: "Business & Leverage",
    note: "currently reading",
    blurb: "Wealth and happiness treated as skills you can learn. The closest thing I have to a manual.",
  },
  {
    slug: "the-millionaire-fastlane",
    title: "The Millionaire Fastlane",
    author: "MJ DeMarco",
    category: "Business & Leverage",
    note: "read",
    blurb: "Loud and a little crude, and right about the gap between trading time and building leverage.",
  },
  {
    slug: "unscripted",
    title: "Unscripted",
    author: "MJ DeMarco",
    category: "Business & Leverage",
    blurb: "The sequel. More about who you become than about what you make.",
  },
  {
    slug: "the-psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Business & Leverage",
    note: "read",
    blurb: "Money is mostly behaviour, not math. The stories are the lesson.",
  },
  {
    slug: "100m-offers",
    title: "$100M Offers",
    author: "Alex Hormozi",
    category: "Business & Leverage",
    note: "read",
    blurb: "How to build an offer people feel stupid saying no to. Practical to the point of being a workbook.",
  },
  {
    slug: "100m-leads",
    title: "$100M Leads",
    author: "Alex Hormozi",
    category: "Business & Leverage",
    note: "read",
    blurb: "The other half: getting strangers to raise their hand. I read these two as a pair.",
  },
  {
    slug: "100m-money-models",
    title: "$100M Money Models",
    author: "Alex Hormozi",
    category: "Business & Leverage",
    blurb: "The newest of the three. Still working through it.",
  },
  {
    slug: "the-personal-mba",
    title: "The Personal MBA",
    author: "Josh Kaufman",
    category: "Business & Leverage",
    blurb: "A business education without the tuition. Breadth over depth, on purpose.",
  },
  {
    slug: "the-lean-startup",
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business & Leverage",
    blurb: "Build, measure, learn, all before you fall in love with your own idea.",
  },
  {
    slug: "the-100-startup",
    title: "The $100 Startup",
    author: "Chris Guillebeau",
    category: "Business & Leverage",
    blurb: "Proof you don't need permission or capital to begin. Just something worth paying for.",
  },
  {
    slug: "how-to-get-rich",
    title: "How to Get Rich",
    author: "Felix Dennis",
    category: "Business & Leverage",
    note: "read",
    blurb: "A poet who got rich telling you it may not be worth what you think. Honest in a way most of these aren't.",
  },
  {
    slug: "just-keep-buying",
    title: "Just Keep Buying",
    author: "Nick Maggiulli",
    category: "Business & Leverage",
    note: "read",
    blurb: "The boring, correct answer to money. Boring is the point.",
  },
  {
    slug: "inside-steves-brain",
    title: "Inside Steve's Brain",
    author: "Leander Kahney",
    category: "Business & Leverage",
    blurb: "Less a biography, more a study of obsession and taste.",
  },
  {
    slug: "build-dont-talk",
    title: "Build, Don't Talk",
    author: "Raj Shamani",
    category: "Business & Leverage",
    note: "read",
    blurb: "Light and direct, but the title alone is a decent operating principle.",
  },
  {
    slug: "the-intelligent-investor",
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    category: "Business & Leverage",
    note: "still untouched",
    blurb: "The value investing bible. Still on the shelf, spine uncracked. One day.",
  },

  // People & Persuasion
  {
    slug: "concise-laws-of-human-nature",
    title: "The Concise Laws of Human Nature",
    author: "Robert Greene",
    category: "People & Persuasion",
    blurb: "A framework for decoding the hidden motivations behind human behavior. You can't read others until you understand your own dark tendencies.",
  },
  {
    slug: "how-to-win-friends",
    title: "How to Win Friends & Influence People",
    author: "Dale Carnegie",
    category: "People & Persuasion",
    note: "read",
    blurb:
      "A century old and still the base layer for dealing with people. I keep going back to chapters instead of moving on.",
  },
  {
    slug: "never-split-the-difference",
    title: "Never Split the Difference",
    author: "Chris Voss",
    category: "People & Persuasion",
    blurb: "Negotiation from an FBI hostage lead. Really, it's about listening harder than the other person.",
  },
  {
    slug: "influence",
    title: "Influence",
    author: "Robert Cialdini",
    category: "People & Persuasion",
    blurb: "The levers behind why people say yes. Useful to know, and to notice being used on you.",
  },
  {
    slug: "secrets-of-closing-the-sale",
    title: "Secrets of Closing the Sale",
    author: "Zig Ziglar",
    category: "People & Persuasion",
    blurb: "Dated and salesy, and still full of things that work on human beings.",
  },
  {
    slug: "the-art-of-war",
    title: "The Art of War",
    author: "Sun Tzu",
    category: "People & Persuasion",
    note: "read",
    blurb: "Not really about war. About position, patience, and not fighting battles you don't need to.",
  },
  {
    slug: "show-your-work",
    title: "Show Your Work",
    author: "Austin Kleon",
    category: "People & Persuasion",
    blurb: "For someone who'd rather stay quiet, an argument for letting a little of the work be seen.",
  },

  // Tech & AI
  {
    slug: "co-intelligence",
    title: "Co Intelligence",
    author: "Ethan Mollick",
    category: "Tech & AI",
    note: "one sitting",
    blurb:
      "Read it in one sitting. The clearest thinking I've found on working with these models instead of against them.",
  },
  {
    slug: "the-master-algorithm",
    title: "The Master Algorithm",
    author: "Pedro Domingos",
    category: "Tech & AI",
    blurb: "The five tribes of machine learning, for people who want the map before the math.",
  },
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    author: "Melanie Mitchell",
    category: "Tech & AI",
    blurb: "A clear, honest tour of what these systems actually do, and what the hype gets wrong.",
  },
  {
    slug: "day-trading-attention",
    title: "Day Trading Attention",
    author: "Gary Vaynerchuk",
    category: "Tech & AI",
    noCover: true,
    blurb: "Attention is the market now. Loud delivery, but he isn't wrong about where things went.",
  },
];

export const coverFor = (slug: string) => `/books/${slug}.jpg`;

export function getBook(slug: string): Book | undefined {
  return BOOKS.find((b) => b.slug === slug);
}

export const SHELVES = CATEGORIES.map((category) => ({
  category,
  books: BOOKS.filter((b) => b.category === category),
}));

/** prev / next within the full flat order, wrapping around */
export function adjacent(slug: string): { prev: Book; next: Book } | null {
  const i = BOOKS.findIndex((b) => b.slug === slug);
  if (i === -1) return null;
  const prev = BOOKS[(i - 1 + BOOKS.length) % BOOKS.length];
  const next = BOOKS[(i + 1) % BOOKS.length];
  return { prev, next };
}

export const TOTAL = BOOKS.length;
