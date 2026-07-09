"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SplitText } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { VideoBand } from "@/components/VideoBand";
import { WebGLImage } from "@/components/WebGLImage";
import { CHAPTERS } from "@/data/chapters";

function ParallaxWatermark({ text, side }: { text: string; side: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "-left-12 md:-left-32" : "-right-12 md:-right-32"
      } -z-10 pointer-events-none opacity-[0.03] select-none`}
    >
      <span className="font-display text-[40vw] md:text-[30vw] leading-none tracking-tighter text-text">
        {text}
      </span>
    </motion.div>
  );
}

export default function StoryPage() {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      {/* ---------- HERO DOSSIER ---------- */}
      <section className="relative px-6 lg:px-12 pt-40 md:pt-64 pb-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-12">
          <div className="flex-1">
            <Reveal className="mb-8">
              <div className="font-mono text-xs uppercase tracking-[0.4em] text-signal/80 flex items-center gap-4">
                <span className="w-12 h-px bg-signal/50" /> Dossier File // 01
              </div>
            </Reveal>
            <h1 className="font-display text-[15vw] md:text-[10vw] leading-[0.8] text-text uppercase tracking-tight">
              <SplitText text="Origin" />
            </h1>
          </div>
          <div className="w-full md:w-1/3 pb-2">
            <Reveal delay={0.3}>
              <p className="font-mono text-sm leading-loose text-muted uppercase tracking-widest text-justify">
                A chronologic map of the pressure points, systems, and structures that built the engine. Four chapters. Walk into any of them.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- THE CINEMATIC TIMELINE ---------- */}
      <section className="relative px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {CHAPTERS.map((ch, i) => {
            const isEven = i % 2 === 0;
            return (
              <Link
                key={ch.slug}
                href={`/story/${ch.slug}`}
                data-cursor="open"
                className="relative block py-32 md:py-48 border-t border-line/30 group"
              >
                {/* Massive Parallax Number */}
                <ParallaxWatermark text={ch.numeral} side={isEven ? "right" : "left"} />

                <div
                  className={`flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-12 md:gap-24`}
                >
                  {/* Visual WebGL Block */}
                  <div className="w-full md:w-[45%] relative">
                    <Reveal>
                      <div className="relative p-3 md:p-5 border border-line/20 rounded-sm bg-void/50 backdrop-blur-sm">
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-signal/70 transition-colors group-hover:border-signal" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-signal/70 transition-colors group-hover:border-signal" />

                        <WebGLImage
                          src={ch.hero}
                          alt={ch.title}
                          containerClassName={`w-full ${
                            isEven ? "aspect-[4/5]" : "aspect-[5/4]"
                          } rounded-sm overflow-hidden`}
                          className="w-full h-full grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 ease-out"
                        />

                        <div className="absolute bottom-6 left-6 mix-blend-difference pointer-events-none">
                          <div className="font-mono text-[9px] text-text/80 tracking-[0.3em] uppercase">
                            SEQ_{ch.numeral} / LAT.{((i * 23.517 + 18.5204) % 90).toFixed(4)}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </div>

                  {/* Narrative Block */}
                  <div className="w-full md:w-[55%] flex flex-col justify-center relative z-10">
                    <Reveal>
                      <div className="font-mono text-xs uppercase tracking-[0.3em] text-signal mb-8 flex items-center gap-4">
                        {ch.numeral} <span className="w-8 h-px bg-line" /> {ch.years}
                      </div>
                      <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-muted group-hover:text-text transition-colors duration-500 leading-[0.9] mb-12 tracking-tight">
                        {ch.title}
                      </h2>
                      <div className="flex flex-col gap-8 max-w-xl">
                        {ch.cardLines.map((line, j) => (
                          <div key={j} className="flex gap-4 items-start">
                            <span className="font-mono text-[10px] text-signal/40 mt-2.5">0{j + 1}</span>
                            <p
                              className={`leading-relaxed font-light ${
                                j === 0 ? "text-2xl md:text-3xl text-text" : "text-lg md:text-xl text-muted"
                              }`}
                            >
                              {line}
                            </p>
                          </div>
                        ))}
                      </div>
                      <span className="mt-12 inline-flex w-fit items-center gap-2.5 rounded-full border border-signal/50 px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-signal group-hover:bg-signal group-hover:text-void transition-colors duration-300">
                        Read the chapter <span aria-hidden>→</span>
                      </span>
                    </Reveal>
                  </div>
                </div>
              </Link>
            );
          })}
          <div className="border-t border-line/30" />
        </div>
      </section>

      {/* ---------- THE EXIT SHOT ---------- */}
      <section className="px-6 lg:px-12 pt-32">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="relative p-2 border border-line/20 rounded-sm">
              <VideoBand
                src="/videos/train-window.mp4"
                heightClass="h-[50vh] md:h-[70vh]"
                className="rounded-sm"
                grade="grayscale(0.8) brightness(0.6) contrast(1.1)"
              />
              <div className="absolute top-8 right-8 font-mono text-xs text-signal/50 tracking-widest uppercase">
                End of Transmission
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- CLOSING STATEMENT ---------- */}
      <section className="px-6 lg:px-12 py-32 md:py-48">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic text-4xl md:text-6xl text-muted"
          >
            The rest, you&apos;ll have to find out in person.
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
