"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, SplitText } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { GhostImage } from "@/components/GhostImage";
import { VideoBand } from "@/components/VideoBand";

type Ghost = { src: string; side: "left" | "right" };

const CHAPTERS: {
  n: string;
  title: string;
  years: string;
  lines: string[];
  ghost?: Ghost;
}[] = [
  {
    n: "01",
    title: "Early Shadows",
    years: "2019 → 2025",
    lines: [
      "Six years at Jnana Prabodhini Prashala.",
      "It taught me to think for myself and move without waiting to be led.",
      "The base was set there.. the kind of discipline that holds when no one is watching.",
    ],
    ghost: { src: "/images/samurai-temple.jpg", side: "right" },
  },
  {
    n: "02",
    title: "The Forge",
    years: "The long hours",
    lines: [
      "Then the pressure arrived. A mission worth years, and a backlog to match.",
      "So I stopped relying on motivation and started building systems.",
      "Not just to study.. to stay sharp, and to come back when a day breaks.",
    ],
    ghost: { src: "/images/nishan-rider.jpg", side: "left" },
  },
  {
    n: "03",
    title: "The Awakening",
    years: "First ships",
    lines: [
      "Something shifted the day I started building.",
      "A clothing brand from nothing. Then a full AI product with no prior code, live in under ten days.",
      "That was the proof I needed: I can take an idea and make it real.",
    ],
    ghost: { src: "/images/bosphorus-window.jpg", side: "right" },
  },
  {
    n: "04",
    title: "The Signal Rises",
    years: "Now",
    lines: [
      "The mission still comes first. The building never stopped.. it just moved to the background.",
      "I'm playing for the long game, not a single result.",
      "The signal is only getting clearer.",
    ],
    ghost: { src: "/images/city-torii-night.jpg", side: "left" },
  },
];

export default function StoryPage() {
  return (
    <div className="w-full flex flex-col">
      <section className="px-6 lg:px-12 pt-40 md:pt-52 pb-16">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-6">
            <div className="eyebrow flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-signal" /> 01 · THE STORY
            </div>
          </Reveal>
          <h1 className="font-display text-[16vw] md:text-[11vw] leading-[0.9] text-text">
            <SplitText text="Origin" />
          </h1>
        </div>
      </section>

      <section className="relative px-6 lg:px-12">
        {/* animated signal rail down the left margin */}
        <svg
          className="absolute left-2 md:left-5 top-0 h-full w-px hidden md:block pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 1 100"
        >
          <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="#B0885A" strokeOpacity="0.14" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <motion.line
            x1="0.5" y1="0" x2="0.5" y2="100"
            stroke="#B0885A" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
            strokeDasharray="3 15"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [0, -36] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        <div className="max-w-6xl mx-auto">
          {CHAPTERS.map((ch) => (
            <div
              key={ch.n}
              className="relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-line py-16 md:py-28"
            >
              {ch.ghost && (
                <GhostImage
                  src={ch.ghost.src}
                  side={ch.ghost.side}
                  widthClass="w-[52vw]"
                  opacity={0.28}
                  parallax
                  className="hidden md:block"
                />
              )}

              {/* sticky marker */}
              <div className="relative z-10 md:col-span-4">
                <div className="md:sticky md:top-32">
                  <Reveal>
                    <div className="font-mono text-xs text-signal/70 mb-4">{ch.years}</div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-sm text-muted">{ch.n}</span>
                      <h2 className="font-display text-4xl md:text-5xl text-text">{ch.title}</h2>
                    </div>
                  </Reveal>
                </div>
              </div>

              {/* body */}
              <div className="relative z-10 md:col-span-8 flex flex-col gap-6">
                {ch.lines.map((line, i) => (
                  <Reveal key={i} delay={i * 0.08} y={20}>
                    <p
                      className={`leading-relaxed ${
                        i === 0
                          ? "text-2xl md:text-3xl text-text font-light"
                          : "text-lg md:text-xl text-muted font-light"
                      }`}
                    >
                      {line}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-line" />
        </div>
      </section>

      {/* moving establishing shot before the close */}
      <section className="px-6 lg:px-12 pt-20">
        <div className="max-w-6xl mx-auto">
          <VideoBand src="/videos/train-window.mp4" heightClass="h-[45vh] md:h-[62vh]" className="rounded-sm ring-1 ring-line" />
        </div>
      </section>

      {/* closing line */}
      <section className="px-6 lg:px-12 py-32 md:py-48">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic text-3xl md:text-5xl text-muted"
          >
            The rest, you&apos;ll have to find out in person.
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
