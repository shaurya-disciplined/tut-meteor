"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ShootingStars } from "@/components/ShootingStars";
import { BOOKS, coverFor } from "@/data/books";

/* ────────────────────────────────────────────────────────────────────────────
   Data: the whole site as a nested tree. Authored here, laid out by math.
   Voice rule: no hyphens or dashes in any visible copy. ".." or rephrase.
──────────────────────────────────────────────────────────────────────────── */

type TreeDef = {
  id: string;
  label: string;
  desc: string[];
  meta?: string;
  link?: string;
  image?: string;
  imagePos?: string;
  children?: TreeDef[];
};

const bookNode = (slug: string): TreeDef => {
  const b = BOOKS.find((x) => x.slug === slug);
  if (!b) return { id: `book-${slug}`, label: slug, desc: ["On the shelf."], link: "/library" };
  return {
    id: `book-${slug}`,
    label: b.title,
    desc: [b.blurb],
    meta: b.note ? `${b.author} · ${b.note}` : b.author,
    link: `/library/${slug}`,
    image: coverFor(slug),
    imagePos: "center 22%",
  };
};

const TREE: TreeDef = {
  id: "center",
  label: "Meteor",
  meta: "ROOT NODE · 7 WINGS",
  image: "/images/zonda-carbon.jpg",
  desc: [
    "The whole system in one frame. Every wing of this site branches out from here, and every branch ends somewhere real.",
    "Open a wing and follow it outward. The deeper you go, the more specific it gets. Nothing on this map is decoration.",
  ],
  children: [
    {
      id: "story",
      label: "Story",
      link: "/story",
      image: "/images/gotham-overlook.jpg",
      meta: "WING 01 · 4 CHAPTERS",
      desc: [
        "Four movements, told in order. A hostel at age ten, a pressure system built for a brutal exam, the first things that shipped, and a frame measured in decades.",
        "It reads less like a diary and more like a build log. Each chapter has its own room.",
      ],
      children: [
        {
          id: "iron-base",
          label: "The Iron Base",
          link: "/story/the-iron-base",
          image: "/story/ch1.jpg",
          meta: "CHAPTER 01",
          desc: [
            "Sent away to a hostel at ten years old, which sounds harsh until you see what it builds. Independence stopped being a word and became a default setting.",
            "The years at Jnana Prabodhini laid the base layer. Quiet discipline, no audience.",
          ],
        },
        {
          id: "pressure-chamber",
          label: "Pressure Chamber",
          link: "/story/the-pressure-chamber",
          image: "/story/ch2.jpg",
          meta: "CHAPTER 02",
          desc: [
            "The JEE years. A national filter that breaks most routines, met with systems instead of moods.",
            "This is where the personal architecture got designed. Schedules, inputs, recovery, all of it treated like engineering.",
          ],
        },
        {
          id: "proof-of-concept",
          label: "Proof of Concept",
          link: "/story/proof-of-concept",
          image: "/story/ch3.jpg",
          meta: "CHAPTER 03",
          desc: [
            "Ideas left the notebook and hit reality. Door to door sales, a clothing brand, and software that actually shipped.",
            "Proof that the engine works outside theory.",
          ],
        },
        {
          id: "long-horizon",
          label: "Long Horizon",
          link: "/story/the-long-horizon",
          image: "/story/ch4.jpg",
          meta: "CHAPTER 04",
          desc: [
            "The ten year frame. Playing it safe with one life is the actual gamble.",
            "The current chapter. Exam first, leverage building in the background, patience as strategy.",
          ],
        },
      ],
    },
    {
      id: "arsenal",
      label: "Arsenal",
      link: "/arsenal",
      image: "/images/ironman-blueprint.jpg",
      meta: "WING 02 · 7 PROJECTS",
      desc: [
        "Everything built and shipped so far. Software, a brand, a page that crossed ten thousand followers. Each node out here is a real project with its own page.",
        "Seven entries on record. Some live, some retired, all of them proof of work.",
      ],
      children: [
        {
          id: "aethermem",
          label: "AetherMem",
          link: "/arsenal/aethermem",
          image: "/images/black-hole.jpg",
          meta: "IN DEVELOPMENT · MEMORY FABRIC",
          desc: [
            "A self evolving memory fabric for AI models. Episodic, semantic, goal and procedural memory, fused by a retrieval layer and watched over by a diagnosis engine that traces every failure to a root cause.",
            "It may rewrite its own rules, but only if the rewrite survives the test. The most ambitious build on this map, and the one that keeps me up.",
          ],
        },
        {
          id: "notrik",
          label: "Notrik",
          link: "/arsenal/notrik",
          image: "/Notrik/1.png",
          meta: "LIVE · THE STUDY ENGINE",
          desc: [
            "A study engine that turns messy student input into clean output. Summarized notes with real formulas, flashcards built for recall, practice tests, key terms.",
            "Built in a deep multi day sprint and live on the web.",
          ],
        },
        {
          id: "hackway",
          label: "HackWay",
          link: "/arsenal/hackway",
          image: "/Hackway/1.png",
          meta: "LIVE IN BETA · THE COPILOT",
          desc: [
            "An AI hackathon copilot. It takes your skills, the theme and the clock, and forges scoped, pitch ready project ideas in minutes.",
            "Built for the worst hour of any hackathon.. the first one. The second real startup swing after Notrik.",
          ],
        },
        {
          id: "reachmonk",
          label: "ReachMonk",
          link: "/arsenal/reachmonk",
          image: "/Reachmonk/1.png",
          meta: "LIVE · THE PITCH",
          desc: [
            "A landing page engineered to do one thing.. take a cold stranger and move them to book a call. The front door of an ad agency for contractors.",
            "Building a page that sells is a separate weapon from building a product. This is where that got proved.",
          ],
        },
        {
          id: "vibe-link",
          label: "Vibe Link",
          link: "/arsenal/vibe-link",
          image: "/Vibe-link/1.png",
          meta: "SHIPPED IN UNDER 10 DAYS",
          desc: [
            "The first full AI chatbot, built from scratch. Next.js, TypeScript and a Groq backend with real time chat and history, wrapped in a dark glass shell.",
            "Live in under ten days. Built to prove speed.",
          ],
        },
        {
          id: "mintedmile",
          label: "MintedMile",
          link: "/arsenal/mintedmile",
          image: "/Mintedmile/1.png",
          meta: "RETIRED · PAST 10K",
          desc: [
            "An Instagram theme page grown past ten thousand followers. A live lesson in attention, hooks, and what actually spreads.",
            "Retired now. The page still stands as a record of the run.",
          ],
        },
        {
          id: "megadress",
          label: "Megadress",
          link: "/arsenal/megadress",
          image: "/Megadress/1.jpg",
          meta: "BRAND · FIRST VENTURE",
          desc: [
            "A solo clothing brand. Identity, creatives, website and marketing, all carried by one person.",
            "The first taste of taking an idea from nothing to a thing people could buy.",
          ],
        },
      ],
    },
    {
      id: "library",
      label: "Library",
      link: "/library",
      image: "/images/scholars-desk.jpg",
      meta: "WING 03 · 5 SHELVES",
      desc: [
        "The intellectual architecture. Around fifty titles, every one of them physically on the shelf, each with its own page and its own note.",
        "Five shelves. Open one and its flagship titles come out.",
      ],
      children: [
        {
          id: "shelf-focus",
          label: "Focus and Systems",
          link: "/library",
          image: coverFor("deep-work"),
          imagePos: "center 25%",
          meta: "SHELF · 6 TITLES",
          desc: [
            "The books that built the daily architecture. Deep focus, habits, and systems that run without needing motivation.",
          ],
          children: [bookNode("deep-work"), bookNode("atomic-habits"), bookNode("hyperfocus")],
        },
        {
          id: "shelf-stoic",
          label: "Stoicism and Mind",
          link: "/library",
          image: coverFor("meditations"),
          imagePos: "center 25%",
          meta: "SHELF · 10 TITLES",
          desc: [
            "Old answers to modern noise. Control what you can, discard the rest, and never outsource your peace.",
          ],
          children: [bookNode("meditations"), bookNode("letters-from-a-stoic"), bookNode("the-courage-to-be-disliked")],
        },
        {
          id: "shelf-business",
          label: "Business and Leverage",
          link: "/library",
          image: coverFor("the-almanack-of-naval-ravikant"),
          imagePos: "center 25%",
          meta: "SHELF · THE BIG ONE",
          desc: [
            "Asymmetric bets, scale, and the difference between earning time and owning it.",
          ],
          children: [
            bookNode("the-almanack-of-naval-ravikant"),
            bookNode("the-millionaire-fastlane"),
            bookNode("the-psychology-of-money"),
          ],
        },
        {
          id: "shelf-people",
          label: "People and Persuasion",
          link: "/library",
          image: coverFor("never-split-the-difference"),
          imagePos: "center 25%",
          meta: "SHELF · 7 TITLES",
          desc: [
            "Human behavior as a readable system. How trust forms, how influence moves, and how a no becomes a yes.",
          ],
          children: [bookNode("how-to-win-friends"), bookNode("never-split-the-difference"), bookNode("influence")],
        },
        {
          id: "shelf-tech",
          label: "Tech and AI",
          link: "/library",
          image: coverFor("co-intelligence"),
          imagePos: "center 25%",
          meta: "SHELF · THE FRONTIER",
          desc: [
            "The machines and where they are going. Read to build, not to spectate.",
          ],
          children: [bookNode("co-intelligence"), bookNode("the-master-algorithm"), bookNode("day-trading-attention")],
        },
      ],
    },
    {
      id: "dossier",
      label: "Dossier",
      link: "/dossier",
      image: "/dossier/hero-new.jpg",
      meta: "WING 04 · CLASSIFIED",
      desc: [
        "The declassified file. Physical records, active training, fixed coordinates and current frequencies.. the person underneath the projects.",
        "Some lines in it are redacted. That is not an accident.",
      ],
      children: [
        {
          id: "on-record",
          label: "On Record",
          link: "/dossier",
          image: "/dossier/hero.jpg",
          meta: "SECTION A · VERIFIED",
          desc: [
            "The verified record. Water, court, board, strings and doorsteps. Five files, each with its own page.",
            "Everything here actually happened. No vanity metrics.",
          ],
          children: [
            {
              id: "swimming",
              label: "Swimming",
              link: "/dossier/swimming",
              image: "/dossier/swimming.jpg",
              meta: "FILE M-0214-A",
              desc: [
                "In the water since class 3, competitive as a kid and genuinely quick. The pool is the last place on earth with no notifications.",
                "Still the clearest hour of any week. The closest thing to a hard reset.",
              ],
            },
            {
              id: "volleyball",
              label: "Volleyball",
              link: "/dossier/volleyball",
              image: "/dossier/volleyball.jpg",
              meta: "FILE M-0214-B",
              desc: [
                "Played competitively, in tournaments the school itself ran. We turned up to win them.",
                "The court is predictive logic.. reading shoulders, hands and trajectories before the ball ever crosses the net.",
              ],
            },
            {
              id: "chess-cards",
              label: "Chess and Cards",
              link: "/dossier/chess",
              image: "/dossier/chess.jpg",
              meta: "FILE M-0214-C",
              desc: [
                "Chess for the deterministic lines, cards for the hidden information. One trains calculation, the other trains nerve.",
                "Not competitive anymore, but the frameworks are permanent.",
              ],
            },
            {
              id: "guitar",
              label: "Guitar",
              link: "/dossier/guitar",
              image: "/dossier/guitar.jpg",
              meta: "FILE M-0214-D",
              desc: [
                "The one practice with no metric attached. Steel strings, analog resistance, played purely because it sounds good.",
                "A deliberate anomaly in an optimized life.",
              ],
            },
            {
              id: "field-sales",
              label: "Field Sales",
              link: "/dossier/sales",
              image: "/dossier/sales.jpg",
              meta: "FILE M-0214-E",
              desc: [
                "Door to door, one month straight, three Diwalis running from class 8 to 10. By the last one, the stall's marketing was mine to run.",
                "There is no better education in human psychology than a stranger's doorstep.",
              ],
            },
          ],
        },
        {
          id: "in-training",
          label: "In Training",
          link: "/dossier",
          image: "/dossier/gloves-new.jpg",
          meta: "SECTION B · THE QUEUE",
          desc: [
            "Skills scheduled, not wished for. Each one waits its turn behind the exam.",
            "The status tags are honest.. queued, scheduled, or inevitable.",
          ],
          children: [
            {
              id: "drift",
              label: "Drift a Car",
              link: "/dossier",
              image: "/dossier/drift-new.jpg",
              meta: "STATUS · INEVITABLE",
              desc: ["A car held sideways in the rain. Not a question of if."],
            },
            {
              id: "boxing",
              label: "Boxing and MMA",
              link: "/dossier",
              image: "/dossier/gloves.jpg",
              meta: "STATUS · QUEUED",
              desc: ["Enough to protect myself and the people I care about. Easing in.. the exam comes first."],
            },
            {
              id: "german",
              label: "Finish German",
              link: "/dossier",
              meta: "STATUS · QUEUED",
              desc: ["Elementary now. The plan is to take it all the way."],
            },
          ],
        },
        {
          id: "coordinates",
          label: "Coordinates",
          link: "/dossier",
          image: "/dossier/forts-new.jpg",
          meta: "SECTION C · POSITION FIXED",
          desc: [
            "Base is Pune. Favourite hour is 02:14. Rain over sun, always, and the monsoon up in the forts.",
            "Canon is Nolan's Batman, and it is not close. Pagani for the art, Bugatti for the menace.",
          ],
        },
        {
          id: "frequencies",
          label: "Frequencies",
          link: "/dossier",
          image: "/images/angel-statue.jpg",
          meta: "SECTION D · CURRENT TUNING",
          desc: [
            "What the mind is tuned to right now.. memory inside models, attention as a currency, the math of daily compounding, deterministic against probabilistic thinking.",
            "The obsessions rotate. The signal stays.",
          ],
        },
      ],
    },
    {
      id: "midnight",
      label: "Midnight",
      link: "/midnight",
      image: "/images/f40-museum.jpg",
      meta: "WING 05 · 3 MACHINES",
      desc: [
        "The unlisted hours. What happens after the world goes quiet.. empty roads, engine notes, and machines treated as art.",
        "Three cars live here, each with its own shrine.",
      ],
      children: [
        {
          id: "pagani-huayra",
          label: "Pagani Huayra",
          link: "/midnight/pagani-huayra",
          image: "/images/pagani-topdown.jpg",
          meta: "THE ART",
          desc: [
            "Named after a god of wind and built like jewellery that happens to do three hundred. Active aero, a twin turbo V12, and not a single lazy surface on it.",
          ],
        },
        {
          id: "bugatti-chiron",
          label: "Bugatti Chiron",
          link: "/midnight/bugatti-chiron",
          image: "/images/car-bugatti-dark.jpg",
          meta: "THE MENACE",
          desc: [
            "Sixteen cylinders and a stare. Quiet inside, absurd outside. The definition of controlled violence.",
          ],
        },
        {
          id: "pagani-zonda",
          label: "Pagani Zonda",
          link: "/midnight/pagani-zonda",
          image: "/images/zonda-studio.jpg",
          meta: "THE ORIGIN",
          desc: [
            "The one that started the obsession. Carbon, wings, and a naturally aspirated V12 scream that new cars are too polite to make.",
            "If the collection ever becomes real, this is the centerpiece.",
          ],
        },
      ],
    },
    {
      id: "codex",
      label: "Codex",
      link: "/codex",
      image: "/images/batman-shadow.jpg",
      meta: "WING 06 · ETHOS",
      desc: [
        "The operating rules, carved short. Play long. Talk little. Systems over moods.",
        "Most of it stays off the table.",
      ],
    },
    {
      id: "signal",
      label: "Signal",
      link: "/signal",
      image: "/images/lighthouse-storm.jpg",
      meta: "WING 07 · OPEN CHANNEL",
      desc: [
        "The channels that reach an actual human. Discord, mail, and the public profiles.",
        "If you came from the server, you already know the handle.",
      ],
    },
  ],
};

/* ────────────────────────────────────────────────────────────────────────────
   Layout engine: radial tree. Angles and radii are computed, never hand placed.
──────────────────────────────────────────────────────────────────────────── */

type LaidNode = {
  def: TreeDef;
  depth: number; // 1 = wing, 2 = branch, 3 = leaf
  parentId: string;
  angle: number; // degrees
  x: number; // % of stage
  y: number;
  path: string[]; // ancestor ids from wing downward, including self
  hasChildren: boolean;
};

const RADII = [0, 25, 45, 63];
const Y_FLATTEN = 0.75;
const rad = (d: number) => (d * Math.PI) / 180;

function layoutTree(): { nodes: LaidNode[]; byId: Map<string, LaidNode> } {
  const nodes: LaidNode[] = [];
  const wings = TREE.children ?? [];
  const sector = 360 / wings.length;

  const place = (def: TreeDef, depth: number, parentId: string, angle: number, path: string[]) => {
    const r = RADII[Math.min(depth, RADII.length - 1)];
    const node: LaidNode = {
      def,
      depth,
      parentId,
      angle,
      x: 50 + r * Math.cos(rad(angle)),
      y: 50 + r * Math.sin(rad(angle)) * Y_FLATTEN,
      path,
      hasChildren: !!def.children?.length,
    };
    nodes.push(node);
    const kids = def.children ?? [];
    if (kids.length) {
      // Accordion frees angular space, so children may fan wider than the sector.
      const spread = depth === 1 ? Math.min(104, kids.length * 18) : Math.min(72, kids.length * 17);
      const step = kids.length > 1 ? spread / (kids.length - 1) : 0;
      kids.forEach((kid, j) => {
        const a = kids.length > 1 ? angle - spread / 2 + j * step : angle;
        place(kid, depth + 1, def.id, a, [...path, kid.id]);
      });
    }
  };

  wings.forEach((wing, i) => {
    // Half step offset so no wing points straight up into the header.
    const angle = -90 + (i + 0.5) * sector;
    place(wing, 1, "center", angle, [wing.id]);
  });

  return { nodes, byId: new Map(nodes.map((n) => [n.def.id, n])) };
}

const { nodes: ALL_NODES, byId: NODE_MAP } = layoutTree();

const getPoint = (id: string) => {
  if (id === "center") return { x: 50, y: 50 };
  const n = NODE_MAP.get(id);
  return n ? { x: n.x, y: n.y } : { x: 50, y: 50 };
};

const pathTo = (id: string): string[] => (id === "center" ? [] : NODE_MAP.get(id)?.path ?? []);

const EASE = [0.16, 1, 0.3, 1] as const;

/* ──────────────────────────────────────────────────────────────────────────── */

export default function ConstellationPage() {
  // openPath is the single expanded chain: e.g. ["arsenal"] or ["dossier","on-record"].
  const [openPath, setOpenPath] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ w: 1200, h: 700 });
  useEffect(() => {
    const measure = () => {
      const el = stageRef.current;
      if (el) setStage({ w: el.clientWidth, h: el.clientHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // A node is visible when every ancestor above it is part of the open chain.
  const visibleNodes = useMemo(
    () =>
      ALL_NODES.filter((n) => {
        if (n.depth === 1) return true;
        const ancestors = n.path.slice(0, -1);
        return ancestors.every((id, i) => openPath[i] === id);
      }),
    [openPath]
  );

  const activeWing = openPath[0] ?? (selected && selected !== "center" ? pathTo(selected)[0] : null);

  const inActiveBranch = (n: LaidNode) => !activeWing || n.path[0] === activeWing;

  // Camera: drift toward the frontier of the open chain so deep branches get room.
  const camX = useSpring(useMotionValue(0), { stiffness: 46, damping: 19 });
  const camY = useSpring(useMotionValue(0), { stiffness: 46, damping: 19 });
  const camS = useSpring(useMotionValue(1), { stiffness: 46, damping: 20 });
  useEffect(() => {
    let fx = 50;
    let fy = 50;
    if (openPath.length) {
      const tipId = openPath[openPath.length - 1];
      const tip = NODE_MAP.get(tipId);
      const frontier = ALL_NODES.filter((n) => n.parentId === tipId);
      const pts = [...(tip ? [tip, tip] : []), ...frontier]; // weight the tip itself
      if (pts.length) {
        fx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
        fy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
      }
    }
    const clampPan = (v: number, size: number) => Math.max(-0.34 * size, Math.min(0.34 * size, v));
    camX.set(clampPan(((50 - fx) / 100) * stage.w * 0.85, stage.w));
    camY.set(clampPan(((50 - fy) / 100) * stage.h * 0.85, stage.h));
    camS.set(1 + Math.min(openPath.length, 2) * 0.035);
  }, [openPath, stage, camX, camY, camS]);

  // gentle mouse parallax on the starfield only
  const sx = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const sy = useSpring(useMotionValue(0), { stiffness: 40, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    sx.set((e.clientX / window.innerWidth - 0.5) * -12);
    sy.set((e.clientY / window.innerHeight - 0.5) * -12);
  };

  const handleNodeClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (id === "center") {
      setOpenPath([]);
      setSelected("center");
      return;
    }
    const node = NODE_MAP.get(id);
    if (!node) return;
    const path = pathTo(id);
    const isOpen = openPath[path.length - 1] === id && openPath.length >= path.length;
    if (node.hasChildren && isOpen) {
      // fold this branch back up, keep the file open
      setOpenPath(path.slice(0, -1));
      setSelected(id);
    } else {
      setOpenPath(node.hasChildren ? path : path.slice(0, -1));
      setSelected(id);
    }
  };

  const selectedNode = selected === "center" ? null : selected ? NODE_MAP.get(selected) ?? null : null;
  const selectedDef = selected === "center" ? TREE : selectedNode?.def ?? null;
  const selectedIsExpanded = !!selected && openPath[pathTo(selected).length - 1] === selected;
  const panelOnLeft = selectedNode ? selectedNode.x > 50 : false;
  const breadcrumb = selected
    ? ["METEOR", ...pathTo(selected).map((id) => NODE_MAP.get(id)?.def.label.toUpperCase() ?? "")]
    : [];

  // label placement: always radially outward so labels never collide inward
  const labelSide = (n: LaidNode) => {
    const c = Math.cos(rad(n.angle));
    const s = Math.sin(rad(n.angle));
    if (Math.abs(c) > 0.55) return c > 0 ? "right" : "left";
    return s > 0 ? "bottom" : "top";
  };

  return (
    <div
      onMouseMove={onMove}
      onClick={() => setSelected(null)}
      className="relative w-full h-[100svh] overflow-hidden bg-void"
    >
      {/* base vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 30%, rgba(8,8,10,0.85) 100%)" }}
      />

      {/* starfield with soft parallax */}
      <motion.div style={{ x: sx, y: sy }} className="absolute inset-0 pointer-events-none">
        <ShootingStars starCount={46} streaks={2} />
      </motion.div>

      {/* header — the stage starts below this block, so the graph can never touch it */}
      <div className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none px-4 w-full max-w-2xl">
        <div className="eyebrow mb-3 text-signal">04 · THE CONSTELLATION</div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.9] text-text">
          Everything, connected
        </h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted mt-4">
          Open a wing · follow the branches · click empty space to close the file
        </p>
      </div>

      {/* stage */}
      <div ref={stageRef} className="absolute inset-x-0 top-[190px] md:top-[210px] bottom-0">
        <motion.div style={{ x: camX, y: camY, scale: camS }} className="absolute inset-0">
          {/* branches */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <AnimatePresence>
              {visibleNodes.map((n) => {
                const p1 = getPoint(n.parentId);
                const p2 = { x: n.x, y: n.y };
                const parent = NODE_MAP.get(n.parentId);
                // curve bows away from the trunk direction for an organic fan
                const dAng = parent ? n.angle - parent.angle : 0;
                const bow = Math.max(-4.5, Math.min(4.5, dAng * 0.12));
                const mx = (p1.x + p2.x) / 2;
                const my = (p1.y + p2.y) / 2;
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const len = Math.hypot(dx, dy) || 1;
                const cx = mx + (-dy / len) * bow;
                const cy = my + (dx / len) * bow;

                const isOpen = openPath.includes(n.def.id);
                const isSel = selected === n.def.id || selected === n.parentId;
                const isHov = hovered === n.def.id || hovered === n.parentId;
                const dimmed = !inActiveBranch(n);

                const width = isSel ? 2.8 : n.depth === 1 ? 2.2 : n.depth === 2 ? 1.5 : 1;
                const opacity = dimmed ? 0.07 : isSel ? 0.95 : isOpen ? 0.6 : isHov ? 0.45 : 0.2;

                return (
                  <motion.g
                    key={`line-${n.def.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <motion.path
                      d={`M ${p1.x} ${p1.y} Q ${cx} ${cy} ${p2.x} ${p2.y}`}
                      fill="none"
                      stroke="#B0885A"
                      strokeWidth={width}
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      filter={isSel || isOpen ? "url(#glow)" : undefined}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1, opacity }}
                      transition={{ duration: 0.8, ease: EASE }}
                    />
                    {!reducedMotion && !dimmed && (isOpen || isSel || isHov) && (
                      <motion.path
                        d={`M ${p1.x} ${p1.y} Q ${cx} ${cy} ${p2.x} ${p2.y}`}
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth={width * 1.3}
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                        strokeDasharray="1 26"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -27 }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                        opacity={0.75}
                        filter="url(#glow)"
                      />
                    )}
                  </motion.g>
                );
              })}
            </AnimatePresence>
          </svg>

          {/* root */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto cursor-pointer"
            onClick={(e) => handleNodeClick(e, "center")}
            data-cursor="open"
          >
            <span className="relative flex items-center justify-center">
              {!reducedMotion &&
                [0, 1, 2].map((k) => (
                  <motion.span
                    key={k}
                    className="absolute rounded-full border border-signal/50"
                    style={{ width: 64, height: 64 }}
                    animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeOut", delay: k * 1.5 }}
                  />
                ))}
              <span className="w-[76px] h-[76px] rounded-full bg-signal/15 border-2 border-signal shadow-[0_0_28px_rgba(176,136,90,0.5)] backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform duration-500">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white">METEOR</span>
              </span>
            </span>
          </div>

          {/* satellite nodes */}
          <AnimatePresence>
            {visibleNodes.map((n, i) => {
              const id = n.def.id;
              const isSel = selected === id;
              const isOpen = openPath.includes(id);
              const dimmed = !inActiveBranch(n);
              const side = labelSide(n);
              const core = n.depth === 1 ? "w-7 h-7" : n.depth === 2 ? "w-5 h-5" : "w-4 h-4";
              const coreActive = n.depth === 1 ? "w-10 h-10" : n.depth === 2 ? "w-8 h-8" : "w-7 h-7";

              return (
                <motion.button
                  key={id}
                  onClick={(e) => handleNodeClick(e, id)}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  data-cursor={n.hasChildren && isOpen ? "close" : "open"}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none pointer-events-auto flex items-center gap-2 ${
                    side === "left" ? "flex-row-reverse" : side === "right" ? "flex-row" : side === "top" ? "flex-col-reverse" : "flex-col"
                  }`}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  initial={{ opacity: 0, scale: 0, filter: "blur(8px)" }}
                  animate={{ opacity: dimmed ? 0.16 : 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.035 }}
                >
                  <span className="relative flex items-center justify-center h-10 w-10 shrink-0">
                    {!reducedMotion && !dimmed && n.hasChildren && !isOpen && (
                      <motion.span
                        className="absolute rounded-full border border-signal/50"
                        style={{ width: 30, height: 30 }}
                        animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      />
                    )}
                    <span
                      className={`absolute rounded-full border-2 transition-all duration-500 ${
                        isSel || isOpen
                          ? `${coreActive} border-signal bg-signal/10 shadow-[0_0_16px_rgba(176,136,90,0.5)]`
                          : `${core} border-signal/60 bg-void group-hover:border-signal group-hover:bg-signal/20`
                      }`}
                    />
                    <span
                      className={`rounded-full transition-all duration-500 z-10 ${
                        isSel || isOpen
                          ? "w-2.5 h-2.5 bg-white shadow-[0_0_10px_white]"
                          : "w-1.5 h-1.5 bg-signal group-hover:bg-white"
                      }`}
                    />
                  </span>

                  <span
                    className={`font-mono uppercase tracking-widest whitespace-nowrap transition-all duration-500 px-2 py-1 rounded backdrop-blur-sm ${
                      n.depth === 1 ? "text-[10px] md:text-[11px]" : "text-[9px] md:text-[10px]"
                    } ${
                      isSel || isOpen
                        ? "text-white border border-signal/50 bg-void/80 shadow-[0_0_10px_rgba(176,136,90,0.3)]"
                        : "text-muted/70 border border-transparent group-hover:text-white group-hover:border-line/20 group-hover:bg-void/60"
                    }`}
                  >
                    {n.def.label}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* the file — a large cinematic panel, opposite the node it describes */}
      <AnimatePresence>
        {selectedDef && (
          <motion.div
            key={selectedDef.id}
            initial={{ opacity: 0, x: panelOnLeft ? -44 : 44, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: panelOnLeft ? -44 : 44, filter: "blur(10px)" }}
            transition={{ duration: 0.55, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className={`fixed z-[60] inset-x-3 bottom-3 md:inset-x-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:w-[min(42vw,560px)] ${
              panelOnLeft ? "md:left-10" : "md:right-10"
            }`}
          >
            <div className="rounded-2xl border border-signal/40 bg-void/95 backdrop-blur-2xl shadow-[0_0_60px_rgba(176,136,90,0.18)] overflow-hidden flex flex-col max-h-[70vh] md:max-h-[82vh]">
              {/* image header — the top third of the file */}
              <div className="relative w-full h-44 md:h-64 shrink-0 overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-signal to-transparent z-10" />
                {selectedDef.image ? (
                  <div
                    className="absolute inset-0 bg-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${selectedDef.image})`,
                      backgroundPosition: selectedDef.imagePos ?? "center",
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(176,136,90,0.18),transparent_70%)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/45 to-transparent" />

                <div className="absolute bottom-4 left-6 right-6 z-10">
                  <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-signal/90 mb-2 flex items-center gap-2 flex-wrap">
                    <span className="w-1.5 h-1.5 bg-signal rounded-full animate-pulse shadow-[0_0_8px_rgba(176,136,90,0.8)]" />
                    {breadcrumb.length ? breadcrumb.join(" / ") : "ROOT ACCESS"}
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl text-text leading-none drop-shadow-md">
                    {selectedDef.label}
                  </h3>
                </div>
              </div>

              {/* body */}
              <div className="p-6 md:p-8 flex flex-col gap-5 overflow-y-auto">
                {selectedDef.meta && (
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted border border-line/40 rounded px-3 py-2 w-fit">
                    {selectedDef.meta}
                  </div>
                )}
                {selectedDef.desc.map((p, k) => (
                  <p key={k} className="text-sm md:text-[15px] text-text/80 font-light leading-relaxed">
                    {p}
                  </p>
                ))}

                <div className="flex flex-col gap-3 mt-1">
                  {selectedDef.link && (
                    <a
                      href={selectedDef.link}
                      data-cursor="visit"
                      className="flex items-center justify-center gap-2 rounded border border-signal bg-signal/10 hover:bg-signal hover:text-void text-signal text-xs font-mono uppercase tracking-widest py-3 transition-colors duration-300"
                    >
                      Enter {selectedDef.label} <span>↗</span>
                    </a>
                  )}
                  {!!selectedDef.children?.length && selectedDef.id !== "center" && !selectedIsExpanded && (
                    <button
                      onClick={(e) => handleNodeClick(e, selectedDef.id)}
                      className="flex items-center justify-center gap-2 rounded border border-line hover:border-signal/50 text-muted hover:text-signal text-xs font-mono uppercase tracking-widest py-3 transition-colors duration-300"
                    >
                      Unfold {selectedDef.children.length} branches ↓
                    </button>
                  )}
                  <button
                    onClick={() => setSelected(null)}
                    className="font-mono text-[10px] text-muted hover:text-text uppercase tracking-widest py-2 transition-colors text-center"
                  >
                    Close file
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
