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
        note: "home to the city",
        body:
          "I left home when I was ten years old. Most kids at that age are just figuring out how their neighborhood works, learning the safe routes to their friends houses, and coming back to a warm kitchen. I was packed up and sent from a quiet town to a strict school in the city, dropped onto a hard hostel bed, and told to figure it out entirely on my own. There was no version of the day where I went to class and came back to complain to my parents about a bad grade or a tough teacher. You make your own bed the second you wake up. You keep your own precise time. You wash your own clothes in cold water. You learn to be your own adult a full decade before the world actually asks you to step up. Nobody sits you down and tells you that this is the real curriculum, that the math and science are secondary to the survival. You just look up one day, standing in a quiet corridor, and realize you have been running yourself, managing your own schedule, your own logistics, and your own mind, for years.",
      },
      {
        heading: "The codes",
        note: "bells, timetables, no privacy",
        body:
          "A hostel runs on rigid rules the exact same way a machine runs on electrical current. It does not care if you are tired. It does not care if you are homesick. Bells dictate when you eat, strict timetables dictate when you sleep, shared rooms mean absolute zero privacy, and the schedule is never yours to argue with. You learn the social codes extremely fast, reading the hierarchy of the older students in seconds, or you simply do not survive the ecosystem. The place I was at did not believe intelligence was a fixed trait you were just handed at birth like a gift. It believed you sharpen a person the exact same way you sharpen a heavy steel blade. You do it on purpose, with immense friction, striking it against stone over years of relentless repetition. I did not have the vocabulary for that specific kind of conditioning when I was twelve years old. I just felt the heavy edge being put on me day after day, stripping away everything soft and replacing it with something unbreakable.",
        pull: "Discipline you are handed is a cage. Discipline you choose is a tool.",
      },
      {
        heading: "The first real decision",
        note: "class 9 the pivot",
        body:
          "In the ninth standard I made the first massive, completely independent call of my life, entirely on my own terms and against the heavy momentum of the system. I left the hostel and moved deep into the city to live with my mother, ostensibly to join a rigorous foundation class for the brutal entrance exams ahead. But the real reason was much quieter and far more strategic. The hostel gave me incredible, unbreakable discipline, but it absolutely could not give me time, and I had started to want time badly. I needed empty, unstructured hours in the middle of the night to build the complex software and business ideas that were beginning to live vividly in my head. So I deliberately traded the structured walls and the forced schedule for absolute, terrifying freedom. It remains one of the single best decisions I have ever made in my entire life, because it proved to me that I could steer my own ship, take a massive calculated risk, and actually handle the heavy consequences of my own autonomy.",
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
          "I willingly signed up for the crushing pressure. I enrolled in a severe foundation class, stepping directly onto the long, exhausting climb toward an exam that quietly eats the best years of your youth. The Joint Entrance Exam is not just a test of physics or mathematics, it is a brutal filter designed to break you mentally before you even reach the testing center. Millions of incredibly smart students fight for a fraction of a percent of the available seats. Nobody forced this path on me. I chose it entirely because I wanted what sits on the exact other side of it, and because a heavy weight you pick up on purpose sits very differently on your back than a weight that gets dropped there against your will. When you choose the pain, the grind completely stops being something happening to you and becomes a tactical operation you are actively executing. You learn to stare at a single complex mechanics problem for three straight hours without moving, building a stamina that most people will never understand.",
      },
      {
        heading: "Systems over moods",
        note: "0200 the city asleep",
        body:
          "Somewhere inside that intense pressure cooker I worked out the most important psychological truth of my life. Motivation is just weather, but systems are climate. Feelings come and go, they fluctuate with your energy levels, and they lie to you constantly. A structured routine does not care how you feel at two in the morning when your eyes are burning and your brain is screaming at you to go to sleep. The system just runs, and it carries you through the dark nights when the mood completely refuses to show up. So I built the routine and aggressively stopped negotiating with myself about doing the work. The debate was over. Late nights in Pune, the whole city gone dead quiet outside my window, the air completely still, and one single desk lamp still burning in the dark. I owned that hour. I built a machine inside my own head that executes commands regardless of emotional state.",
        pull: "I stopped waiting to feel motivated and built the routine instead.",
      },
      {
        heading: "The mentors on the shelf",
        note: "see the library",
        body:
          "I could not afford to hire world class mentors to sit in my room and guide me, so I decided to read them instead. There is a heavy wooden shelf in my room that is absolutely not for decoration. Every single title on it is a physical copy I have actually held, highlighted heavily, and aggressively worked through until the spine cracked. A book is the cheapest and most potent mentorship on earth. It is a long, highly private conversation with someone who already figured a massive piece of the puzzle out, distilled their entire life into three hundred pages, and wrote it down for whoever was serious enough to sit quietly and listen. I read Marcus Aurelius for stoic emotional control. I read Naval Ravikant for understanding absolute leverage. I read Alex Hormozi to build mental models of compounding value. I treated these authors as my personal board of directors, reading their words like they were letters addressed directly to me. Because in a very real, tactical way, they were.",
      },
      {
        heading: "The release valve",
        note: "in the water since class 3",
        body:
          "You absolutely cannot run a cognitive engine that hot without a massive physical valve to release the pressure, otherwise the whole system burns out. Mine has always been water and stone. I have been swimming since I was very young, and I am genuinely fast in the pool. There is a total sensory clarity in the water that sitting at a wooden desk simply cannot give you. You cannot check your phone underwater. You just hear the rhythmic crashing of the water, the burning in your lungs, and the mechanics of your own stroke. When the heavy rains come and the city floods, I go up into the Sahyadri hills and the ancient stone forts, and I climb them in the absolute middle of the monsoon on purpose. The risk of slipping on wet stone and the raw physical exhaustion completely clears the mental fog. The body keeps the mind entirely honest. If you sharpen the physical frame, you inevitably sharpen the cognitive edge.",
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
        note: "class 8 to 10 one month each Diwali",
        body:
          "Before any of my work became digital, the foundation of my psychology was entirely built on a strangers front doorstep. For one grueling month straight, three consecutive Diwali seasons running, I sold diyas and decorative lanterns for a local venture, going door to door relentlessly until the season officially closed. By class ten I was running the marketing for our entire stall, making the creatives and shooting the advertisements. But the real lesson was always the physical doorstep. You walk up to a massive wooden door, ring the bell, wait with your heart pounding, and pitch your product to a completely confused adult who just wanted to eat their dinner. You get the door slammed in your face repeatedly. You learn things on that doorstep that absolutely no traditional classroom teaches. You learn that rejection is just temporary weather, that you can walk up to literally anyone on earth and ask for what you want, and that most people who freeze in life do so a full second before anything bad actually happens. It strips your delicate ego down to absolute zero and replaces it with pure, mechanical execution.",
      },
      {
        heading: "The pamphlets",
        note: "the lift a captive audience",
        body:
          "My first ever advertising strategy for my early clothing brand was not a polished Meta campaign with targeted demographics. It was literally sticky glue and cheap paper. I designed the promotional pamphlets myself and stayed up the entire night perfectly formatting them. The next day a friend and I deliberately skipped our mandatory after school sports session, walked directly into random premium housing societies across the city, and hunted specifically for the tall buildings with elevators inside them. Why elevators? Because a person riding an elevator is a totally captive audience. They have nowhere else to look but your poster on the wall. We did not even know which glue to buy from the hardware store. We just figured it out on the fly. We never once cared whether we had the right resources, the correct permissions, or the proper funding. We had ideas and the absolute, burning willingness to do whatever the idea needed to survive in the real world. That raw operating principle has never really changed, even as the scale has grown.",
        pull: "We had ideas and the will. We refused to fail before giving our absolute best.",
        image: "/story/ch3b.jpg",
        imageCaption: "The habit that turned digital",
      },
      {
        heading: "The feed",
        note: "past 10k followers",
        body:
          "Then I learned how to systematically manipulate attention in public. I built an Instagram theme page from absolute scratch that wrote the exact things people feel deeply but never actually have the courage to say out loud. I grew it past ten thousand followers on absolutely nothing but raw words and extremely precise timing, analyzing the exact hour to post and the exact cadence of the sentences. And then I simply switched the entire page off the moment it had taught me what I came for. It was never meant to be a permanent business. It was a massive psychological laboratory disguised as a social media hobby. I realized that human attention is just a complex algorithm you can reverse engineer if you pay enough attention. Every single headline I write now, every interface I design, and every product I launch carries something fundamental I first learned there, testing the waters one viral post at a time.",
      },
      {
        heading: "The machines",
        note: "idea to shipped product",
        body:
          "After the media experiments, the builds turned into hard, unforgiving software. I locked myself in my room, taught myself to write complex code, and shipped a fully functional AI application in exactly ten days. I did not stop there. I built a complete software startup called Notrik that extracts messy, disorganized student notes and compiles them automatically into pristine Obsidian markdown files and structured PDFs. The late nights debugging, the frustration of broken deployments, and the eventual rush of seeing the code compile perfectly became an absolute addiction. The whole process became a single religion with one unbreakable commandment. An idea in your head is worth absolutely nothing until it exists in the real physical or digital world. Thinking is nice, planning is comfortable, but shipping the actual product into the hands of users is the entire game. The shift from physical effort to digital architecture gave me infinite leverage.",
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
        note: "six months out",
        body:
          "Right now almost everything is on a deliberate, heavily calculated hold for one massive objective. The entrance exam is terrifyingly close, so the software startups slow down, the midnight hackathons wait, and the intense physical training eases off slightly to preserve cognitive bandwidth. That is absolutely not a lack of ambition or a sign of burnout. It is the exact opposite. Real, mature discipline is mostly knowing exactly what you need to put down, and knowing exactly how long you need to leave it there. I am watching other developers ship code and watching friends go out, and I am deliberately sitting perfectly still in my room, studying. I am saying absolutely nothing to anyone right now. The rest of the grand list is not cancelled. It is simply queued up, storing immense potential energy, waiting for the exact moment I clear this academic hurdle and finally unleash all that compressed force into the market.",
      },
      {
        heading: "The long game",
        note: "compounding over motivation",
        body:
          "I am absolutely not chasing a good week, a quick viral moment, or a sudden spike in revenue. I am setting structural things up to still matter in ten years, which is a very different and much quieter way to spend a tuesday afternoon. The things I want to deeply learn make up a massive list, and I know exactly what is written on it. I am deeply studying how memory actually works, both the biological pathways inside a human mind and the technical context windows of large language models. I am actively designing Aethermem, a self evolving memory fabric for super advanced AI systems that can literally dream, reflect, and persist state exactly like humans do. I want a significantly stronger physical body, a second language taken all the way to absolute fluency, and a car held entirely sideways in the heavy rain. None of it is going anywhere. Compounding value does the heaviest, loudest work completely quietly, out of sight.",
        pull: "I am not chasing a good week. I am building for the version of me ten years out.",
      },
      {
        heading: "One life",
        note: "one shot",
        body:
          "Here is the only unshakeable, fundamental belief I will put on the public record. The absolute finality of death is the greatest motivator that exists. You get exactly one life and exactly one shot at it, so why on earth would you not choose to be the crazy one? Why not be the one who runs at his massive dreams like they are the only real thing in the entire room? Because honestly, when you strip away the noise, they might be the only real things you have. Be utterly, unapologetically obsessed. Be the person who is unreasonably serious about the things he loves to do. Read the heavy books, build the complex software, close the impossible sales, and swim until your lungs physically burn. Playing it completely safe when the entire game ends anyway is deeply irrational. Anything less than absolute obsession feels like leaving the only precious shot you have just sitting on the table.",
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
