"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { Magnetic } from "@/components/Magnetic";
import { Footer } from "@/components/Footer";
import { GhostImage } from "@/components/GhostImage";

const EASE = [0.16, 1, 0.3, 1] as const;

const INDEX = [
  { href: "/story", n: "01", label: "The Story", desc: "where the signal comes from", img: "/images/gotham-overlook.jpg" },
  { href: "/arsenal", n: "02", label: "The Arsenal", desc: "things built after midnight", img: "/images/ironman-blueprint.jpg" },
  { href: "/library", n: "03", label: "The Library", desc: "what shaped the way I think", img: "/images/scholars-desk.jpg" },
  { href: "/web", n: "04", label: "The Constellation", desc: "everything, connected", img: "" },
  { href: "/midnight", n: "05", label: "Midnight", desc: "the other frequency", img: "/images/f40-museum.jpg" },
  { href: "/signal", n: "06", label: "The Signal", desc: "if the vibe hits, reach out", img: "/images/lighthouse-storm.jpg" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col">
      {/* ---------- HERO ---------- */}
      <section ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-center px-6 lg:px-12 py-24 overflow-hidden">
        
        {/* Subtle cinematic center glow to give depth without needing an image */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

        <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          
          <Reveal>
            <div className="eyebrow mb-8 flex items-center justify-center gap-4 text-signal/80">
              <span className="inline-block w-8 h-px bg-signal/40" />
              PUNE · 02:14 · RAIN
              <span className="inline-block w-8 h-px bg-signal/40" />
            </div>
          </Reveal>

          {/* Using direct motion for METEOR to ensure it renders flawlessly and heavily stylized */}
          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: EASE, delay: 0.1 }}
            className="font-display text-fluid-hero leading-[0.8] text-text mb-10 tracking-tighter"
          >
            METEOR
          </motion.h1>

          <Reveal delay={0.4} className="max-w-2xl mx-auto mb-14">
            <p className="text-fluid-subtitle text-muted font-light leading-relaxed">
              Architecting digital ecosystems in the quiet hours.
              <br className="hidden md:block" />
              <span className="text-text italic">Cars, code, and dark rainy nights.</span>
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Magnetic>
                <Link
                  href="/story"
                  data-cursor="enter"
                  className="inline-flex items-center gap-3 border border-line hover:border-signal/50 bg-surface/40 backdrop-blur-md rounded-full px-8 py-4 text-sm text-text hover:text-signal transition-all duration-500"
                >
                  Enter the signal
                  <span className="text-signal">→</span>
                </Link>
              </Magnetic>

              <Magnetic>
                <Link
                  href="/midnight"
                  data-cursor="open"
                  className="inline-flex items-center gap-3 border border-transparent hover:border-line rounded-full px-8 py-4 text-sm text-muted hover:text-text transition-all duration-500"
                >
                  The other frequency
                  <span className="text-muted opacity-50">/midnight</span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>

        </motion.div>

        {/* scroll cue */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="eyebrow">scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block w-px h-8 bg-gradient-to-b from-signal to-transparent"
          />
        </motion.div>
      </section>

      {/* ---------- STATEMENT ---------- */}
      <section className="relative overflow-hidden px-6 lg:px-12 py-32 md:py-48">
        <GhostImage src="/images/angel-statue.jpg" side="left" widthClass="w-[46vw]" opacity={0.09} parallax className="hidden md:block" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Reveal className="mb-10">
            <div className="eyebrow">01 · WHO</div>
          </Reveal>
          <p className="font-display text-fluid-display leading-[1.1] text-muted font-light">
            <span className="text-text">A lifetime spent in quiet execution.</span> Navigating
            structured academic frontiers by day, forging <span className="text-signal italic">tactical systems</span> and mechanical art after midnight.
          </p>
        </div>
      </section>

      {/* ---------- INDEX ---------- */}
      <section className="relative px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-4">
            <div className="eyebrow flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-signal" /> INDEX
            </div>
          </Reveal>

          <div className="relative flex flex-col" onMouseLeave={() => setHovered(null)}>
            {/* hover image reveal (desktop) */}
            <div className="hidden lg:block absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    key={hovered}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${hovered})`, filter: "grayscale(1) contrast(1.05)" }}
                  />
                )}
              </AnimatePresence>
              <div className="absolute inset-0 bg-void/72" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(8,8,10,0.55) 0%, rgba(8,8,10,0.15) 45%, rgba(8,8,10,0.85) 100%)",
                }}
              />
            </div>

            {INDEX.map((item, i) => (
              <Reveal key={item.href} delay={i * 0.05} y={16}>
                <Link
                  href={item.href}
                  data-cursor="open"
                  onMouseEnter={() => setHovered(item.img)}
                  className="group relative z-10 block border-t border-line"
                >
                  <div className="flex items-center justify-between py-7 md:py-9 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:px-4">
                    <div className="flex items-baseline gap-5 md:gap-8">
                      <span className="font-mono text-xs text-signal/70">{item.n}</span>
                      <span className="font-display text-4xl md:text-6xl lg:text-7xl text-muted group-hover:text-text transition-colors duration-500">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="hidden md:block font-mono text-xs text-muted/70 group-hover:text-text/80 transition-colors">
                        {item.desc}
                      </span>
                      <span className="text-signal text-2xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
            <div className="relative z-10 border-t border-line" />
          </div>
        </div>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <section className="relative py-24 md:py-40">
        <Marquee items={["CARS", "CODE", "RAIN", "DISCIPLINE", "LATE NIGHTS", "SIGNAL"]} />
      </section>

      <Footer />
    </div>
  );
}
