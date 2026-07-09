// Source of truth for the Story wing. Each chapter has its own page at /story/[slug].
// Long form editorial, drawn from the owner's own account, armored through the Table Rule:
// depth through scenes and systems, never confession. No private names. Logistics kept as atmosphere.
// Voice rule: no hyphens, no em dashes in any visible copy. Use ".." or rephrase.

export type Movement = {
  heading: string;
  body: string;
  /** small mono marginalia, the tactical HUD voice */
  note?: string;
  /** an enormous pull quote after this movement */
  pull?: string;
  /** a graded image band after this movement */
  image?: string;
  imageCaption?: string;
};

export type Chapter = {
  slug: string;
  numeral: string;
  title: string;
  years: string;
  thesis: string;
  hero: string;
  /** short teaser lines for the /story timeline card */
  cardLines: string[];
  movements: Movement[];
  closing: string;
  /** cross links into other wings */
  links?: { label: string; href: string }[];
};

export const CHAPTERS: Chapter[] = [
  {
    slug: "the-iron-base",
    numeral: "01",
    title: "The Iron Base",
    years: "The hostel years",
    thesis: "Sent out young, taught to stand before I could lean.",
    hero: "/story/ch1.jpg",
    cardLines: [
      "Sent out at ten, a hostel a few hours from home.",
      "You learn to stand before anyone asks you to.",
      "A base that still holds when everything shakes.",
    ],
    movements: [
      {
        heading: "Away, at ten",
        note: "home → the city",
        body:
          "I left home young. From a small town a few hours out to a school in the city, and a hostel bed at ten years old. There was no version of the day where I went to class and came back to my own kitchen. You make your own bed, keep your own time, and learn to be your own adult a good decade before the age asks you to. Nobody tells you that this is the lesson. You just look up one day and realise you have been running yourself for years.",
      },
      {
        heading: "The codes",
        note: "bells, timetables, no privacy",
        body:
          "A hostel runs on rules the way a machine runs on current. Bells, timetables, shared rooms, a schedule that was never mine to argue with. You learn the codes fast or you do not sleep. The place I was at did not believe intelligence was a fixed thing you were handed at birth. It believed you sharpen a person the way you sharpen a blade, on purpose, with friction, over years. I did not have the words for that then. I just felt the edge being put on me.",
        pull: "Discipline you are handed is a cage. Discipline you choose is a tool.",
      },
      {
        heading: "The first real decision",
        note: "class 9 · the pivot",
        body:
          "In ninth standard I made the first big call of my life on my own terms. I left the hostel and moved into the city to live with my mother, on paper to join a foundation class for the exam ahead. The real reason was quieter. The hostel gave me discipline but it could not give me time, and I had started to want time badly, to build the things that were beginning to live in my head. So I traded the walls for the freedom. It remains one of the best decisions I have ever made.",
      },
    ],
    closing: "The hostel taught me to stand. Leaving it taught me to choose.",
    links: [{ label: "Where the choosing led", href: "/story/proof-of-concept" }],
  },

  {
    slug: "the-pressure-chamber",
    numeral: "02",
    title: "The Pressure Chamber",
    years: "The foundation years",
    thesis: "Pressure you pick up on purpose weighs differently.",
    hero: "/story/ch2.jpg",
    cardLines: [
      "The grind I picked up on purpose.",
      "Systems over moods, every single time.",
      "Late nights in a city that had gone to sleep.",
    ],
    movements: [
      {
        heading: "The chosen weight",
        note: "JEE 2027",
        body:
          "I signed up for the pressure. A foundation class, then the long climb toward an exam that quietly eats years of your life. Nobody forced it on me. I chose it, because I wanted what sits on the other side of it, and because a weight you pick up on purpose sits differently on your back than one that gets dropped there. The grind stopped being something happening to me and became something I was doing.",
      },
      {
        heading: "Systems over moods",
        note: "0200 · the city asleep",
        body:
          "Somewhere in there I worked out that motivation is weather and systems are climate. Feelings come and go and lie to you constantly. A routine does not care how you feel at 2am, it just runs, and it carries you on the nights the mood refuses to show up. So I built the routine and stopped negotiating with myself about it. Late nights in Pune, the whole city gone quiet, one desk lamp still on. That hour became mine.",
        pull: "I stopped waiting to feel motivated and built the routine instead.",
      },
      {
        heading: "The mentors on the shelf",
        note: "see the library",
        body:
          "I could not afford to hire mentors, so I read them instead. There is a shelf in my room that is not decoration, every title on it is a physical copy I have actually held and worked through. A book is the cheapest mentorship on earth, a long private conversation with someone who already figured a piece of it out and wrote it down for whoever was serious enough to listen. I read like the letters were addressed to me, because in a way they were.",
      },
      {
        heading: "The release valve",
        note: "in the water since class 3",
        body:
          "You cannot run an engine that hot without a valve. Mine is water and stone. I have been swimming since I was small and I am genuinely quick in it, and there is a clarity in the water that a desk cannot give you. When the rains come I go up into the hills and the old forts, and I climb them in the middle of the monsoon on purpose. The body keeps the mind honest. Sharpen one and you sharpen the other.",
      },
    ],
    closing: "The exam is still ahead. The habits are already mine.",
    links: [{ label: "The shelf", href: "/library" }],
  },

  {
    slug: "proof-of-concept",
    numeral: "03",
    title: "Proof of Concept",
    years: "When the ideas left my head",
    thesis: "The year ideas stopped being theoretical.",
    hero: "/story/ch3.jpg",
    cardLines: [
      "Door to door in the cold, three Diwalis running.",
      "Pamphlets in lifts at midnight for my first brand.",
      "The year the ideas finally left my head.",
    ],
    movements: [
      {
        heading: "Selling in the cold",
        note: "class 8, 9, 10 · one month each Diwali",
        body:
          "Before any of it was digital, it was a stranger's front door. For one month straight, three Diwali seasons running, I sold diyas and lanterns for a school venture, going door to door until the season closed. By class ten I was running the marketing for our little stall, making the creatives, shooting the ads. You learn things on a doorstep that no classroom teaches. You learn that rejection is just weather, that you can walk up to anyone and ask for what you want, and that most people who freeze do so a full second before anything bad actually happens.",
      },
      {
        heading: "The pamphlets",
        note: "the lift · a captive audience",
        body:
          "My first ever advertising for my clothing brand was not a Meta campaign, it was glue. I designed the pamphlets myself and stayed up the entire night doing it. The next day a friend and I bunked the after school sports session, walked random housing societies across the city, and hunted specifically for the buildings with lifts inside them, because a person riding a lift is a captive audience with nowhere to look but your poster. We did not even know which glue to buy. We figured it out. We never once cared whether we had the right resources, we had ideas and the willingness to do whatever the idea needed, and that has never really changed.",
        pull: "We had ideas and the will. We refused to take an L before giving our best.",
        image: "/story/ch3b.jpg",
        imageCaption: "The habit that turned digital",
      },
      {
        heading: "The feed",
        note: "past 10k",
        body:
          "Then I learned attention in public. A page that wrote the things people feel but do not say, grown past ten thousand on nothing but words and timing, then switched off the moment it had taught me what I came for. It was a lab disguised as a hobby. Every headline I write now carries something I first learned there, one post at a time.",
      },
      {
        heading: "The machines",
        note: "idea → shipped",
        body:
          "After that the builds turned into software. I taught myself to code and shipped a full AI chat in ten days, then a study tool for the exam I was sitting myself, then more. The whole thing became a single religion with one commandment. An idea is worth almost nothing until it exists. Shipping is the entire game.",
      },
    ],
    closing: "Ideas are cheap. Shipping is everything.",
    links: [
      { label: "The label", href: "/arsenal/megadress" },
      { label: "The page", href: "/arsenal/mintedmile" },
      { label: "The whole arsenal", href: "/arsenal" },
    ],
  },

  {
    slug: "the-long-horizon",
    numeral: "04",
    title: "The Long Horizon",
    years: "Now, and the ten year frame",
    thesis: "The future stays mostly off the table. That is the point.",
    hero: "/story/ch4.jpg",
    cardLines: [
      "First the exam. Everything else waits.",
      "A ten year frame, not a good week.",
      "One life. Might as well be the crazy one.",
    ],
    movements: [
      {
        heading: "First, the exam",
        note: "~6 months out",
        body:
          "Right now almost everything is on hold for one thing. The exam is close, so the startups slow, the hackathons wait, the training eases off. That is not a lack of ambition, it is the opposite. Discipline is mostly knowing what to put down and for how long. The rest of the list is not cancelled. It is queued.",
      },
      {
        heading: "The long game",
        note: "compounding > motivation",
        body:
          "I am not chasing a good week. I am setting things up to still matter in ten years, which is a very different way to spend a day. The things I want to learn are a long list and I know exactly what is on it. How memory actually works, inside a mind and inside a model. Agentic systems. A stronger body, a second language taken all the way, a car held sideways in the rain. None of it is going anywhere. Compounding does the loud work quietly.",
        pull: "I am not chasing a good week. I am building for the version of me ten years out.",
      },
      {
        heading: "One life",
        note: "one shot",
        body:
          "Here is the only belief I will put on the record. You get one life and one shot at it, so why not be the crazy one, the one who runs at his dreams like they are the only real thing in the room, because they might be. Be obsessed. Be the person who is unreasonably serious about the things he loves. Anything less feels like leaving the shot on the table.",
      },
    ],
    closing: "The rest, you will have to find out in person.",
  },
];

export function getChapter(slug: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.slug === slug);
}

/** prev / next within the flat order, wrapping around */
export function adjacent(slug: string): { prev: Chapter; next: Chapter } | null {
  const i = CHAPTERS.findIndex((c) => c.slug === slug);
  if (i === -1) return null;
  const prev = CHAPTERS[(i - 1 + CHAPTERS.length) % CHAPTERS.length];
  const next = CHAPTERS[(i + 1) % CHAPTERS.length];
  return { prev, next };
}

export const TOTAL = CHAPTERS.length;
