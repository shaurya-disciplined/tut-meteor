"use client";

import React from "react";
import { Reveal, SplitText } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { Footer } from "@/components/Footer";

type Project = {
  n: string;
  title: string;
  status: string;
  tags: string[];
  body: string;
  href?: string;
  cta?: string;
};

const PROJECTS: Project[] = [
  {
    n: "01",
    title: "AetherMem",
    status: "Prototype",
    tags: ["LLMs", "Memory fabric", "Self-evolving", "Systems"],
    body:
      "A self-evolving memory fabric for advanced language models. A second model sits above it as an arbiter, judging how memory and context get written, retrieved, and pruned, then steering those decisions in real time. That feedback loop is what lets the system reshape its own memory as it runs, instead of forgetting the way most models do. The kind of thing I build when no one asked me to.",
  },
  {
    n: "02",
    title: "Notrik",
    status: "Live",
    tags: ["Web", "Flow state", "Sprint"],
    body:
      "A website carved out in one deep sprint across several days. Long uninterrupted hours, zero burnout.. proof of what the engine does when it locks onto something worth building.",
    href: "https://notrik-ten.vercel.app/",
    cta: "Visit Notrik",
  },
  {
    n: "03",
    title: "MintedMile",
    status: "Archived · peaked 10k+",
    tags: ["Instagram", "Curation", "Growth", "Brand"],
    body:
      "A theme page I grew past ten thousand followers on pure taste and consistency. It still sits near nine thousand. I stepped away from it.. but it taught me how attention actually moves.",
    href: "https://www.instagram.com/mintedmile/",
    cta: "View the page",
  },
  {
    n: "04",
    title: "Vibe Link",
    status: "Live",
    tags: ["Next.js", "TypeScript", "Tailwind", "Groq API"],
    body:
      "My first full AI chatbot, built from zero with no prior coding experience. A dark cyber interface with looping video, glassmorphism, thunder effects, real-time chat and history, fully responsive. Idea to live product in under ten days.",
    href: "https://vibe-link-delta.vercel.app",
    cta: "Launch Vibe Link",
  },
  {
    n: "05",
    title: "MEGADRESS",
    status: "Solo build",
    tags: ["Brand identity", "Creatives", "Website", "Marketing"],
    body:
      "A clothing brand I built alone. From the vision down to the identity, the creatives, the site and the marketing. My first real lesson in taking something from head to execution.",
  },
];

export default function ArsenalPage() {
  return (
    <div className="w-full flex flex-col">
      <section className="px-6 lg:px-12 pt-40 md:pt-52 pb-16">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-6">
            <div className="eyebrow flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-signal" /> 02 · THE ARSENAL
            </div>
          </Reveal>
          <h1 className="font-display text-[16vw] md:text-[11vw] leading-[0.9] text-text">
            <SplitText text="Built" />
          </h1>
          <Reveal delay={0.4} className="mt-8 max-w-md">
            <p className="text-lg text-muted font-light">
              Things I&apos;ve made after midnight. Some shipped, some shelved.. all mine.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {PROJECTS.map((p) => (
            <div
              key={p.n}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 border-t border-line py-14 md:py-20"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-xs text-signal/70">{p.n}</span>
              </div>

              <div className="md:col-span-5">
                <Reveal>
                  <h2 className="font-display text-5xl md:text-6xl text-muted group-hover:text-text transition-colors duration-500">
                    {p.title}
                  </h2>
                  <div className="mt-4 eyebrow text-signal/80">{p.status}</div>
                </Reveal>
              </div>

              <div className="md:col-span-6 flex flex-col gap-6">
                <Reveal delay={0.1}>
                  <p className="text-lg md:text-xl text-muted font-light leading-relaxed">{p.body}</p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-widest text-muted border border-line rounded-full px-3 py-1.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>
                {p.href && (
                  <Reveal delay={0.2}>
                    <Magnetic>
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="visit"
                        className="inline-flex items-center gap-3 border border-line hover:border-signal/50 rounded-full px-6 py-3 text-sm text-text hover:text-signal transition-colors duration-500"
                      >
                        {p.cta}
                        <span className="text-signal">↗</span>
                      </a>
                    </Magnetic>
                  </Reveal>
                )}
              </div>
            </div>
          ))}
          <div className="border-t border-line" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
