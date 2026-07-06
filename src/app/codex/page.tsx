"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { GhostImage } from "@/components/GhostImage";

const CREED = [
  { line: "Play long.", tail: "Talk little." },
  { line: "Systems", tail: "over moods." },
  { line: "Build in the dark.", tail: "Show the light." },
  { line: "Most of it", tail: "stays off the table." },
];

export default function CodexPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col bg-void">
      <section className="px-6 lg:px-12 pt-40 md:pt-52 pb-24">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="eyebrow flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-signal" /> THE CODEX
            </div>
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <p className="text-fluid-subtitle text-muted font-light max-w-md">
              A set of constraints I operate within. They require no explanation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 lg:px-12">
        {/* ghosted busts behind the creed — Caesar on the right, the dark figure on the left */}
        <GhostImage
          src="/codex-ghost.jpg"
          side="right"
          widthClass="w-[55vw]"
          opacity={0.1}
          parallax
          className="hidden md:block"
        />
        <GhostImage
          src="/images/batman-shadow.jpg"
          side="left"
          widthClass="w-[42vw]"
          opacity={0.14}
          parallax
          className="hidden md:block"
        />
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col">
          {CREED.map((c, i) => (
            <div key={i} className="border-t border-line py-16 md:py-28">
              <motion.h2
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-fluid-display md:text-[6.5rem] leading-[0.95]"
                style={{
                  // carved-in-stone emboss: a hard dark undercut above, a faint
                  // catch of light on the lower edge, and a soft settled shadow
                  textShadow:
                    "0 -1px 0 rgba(0,0,0,0.9), 0 1px 0 rgba(234,234,236,0.07), 0 4px 12px rgba(0,0,0,0.55)",
                }}
              >
                <span className="text-text">{c.line} </span>
                <span className="text-muted italic">{c.tail}</span>
              </motion.h2>
            </div>
          ))}
          <div className="border-t border-line" />
        </div>
      </section>
 
      <section className="px-6 lg:px-12 py-32 md:py-48">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic text-fluid-subtitle text-muted"
          >
            Everything here is true. None of it is the whole story.
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
