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
    tags: ["LLMs", "Memory fabric", "Self evolving", "Systems"],
    body:
      "A dynamic, self evolving memory fabric for large language models. Utilizes an orchestration engine that acts as a cognitive arbiter.. evaluating, index pruning, and restructuring recall vectors in real time. This feedback loop resolves context decay and prevents catastrophic forgetting. Engineered purely out of curiosity.",
  },
  {
    n: "02",
    title: "Notrik",
    status: "Live",
    tags: ["Web", "Flow state", "Sprint"],
    body:
      "A high performance digital environment structured during a continuous multi day sprint. An exercise in hyper focus and rapid system compilation, verifying the throughput of the development engine under pressure.",
    href: "https://notrik-ten.vercel.app/",
    cta: "Visit Notrik",
  },
  {
    n: "03",
    title: "MintedMile",
    status: "Archived · peaked 10k+",
    tags: ["Instagram", "Curation", "Growth", "Brand"],
    body:
      "An experiment in algorithmic attention and curation. Built and scaled a digital audience past 10,000 users solely on targeted aesthetics and visual consistency. Designed to study how digital attention moves, pools, and converts.",
    href: "https://www.instagram.com/mintedmile/",
    cta: "View the page",
  },
  {
    n: "04",
    title: "Vibe Link",
    status: "Live",
    tags: ["Next.js", "TypeScript", "Tailwind", "Groq API"],
    body:
      "An immersive conversational client powered by Groq. Built from zero to deployment within a ten day sprint. Styled with reactive glassmorphism, weather driven particle dynamics, and absolute real time stream processing.",
    href: "https://vibe-link-delta.vercel.app",
    cta: "Launch Vibe Link",
  },
  {
    n: "05",
    title: "MEGADRESS",
    status: "Solo build",
    tags: ["Brand identity", "Creatives", "Website", "Marketing"],
    body:
      "A streetwear label built single handedly. Owned the entire pipeline: from initial brand positioning and collection identity to digital commerce deployment and algorithmic target marketing.",
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
          <h1 className="font-display text-fluid-display leading-[0.9] text-text">
            <SplitText text="Built" />
          </h1>
          <Reveal delay={0.4} className="mt-8 max-w-md">
            <p className="text-fluid-subtitle text-muted font-light">
              Digital assets forged in the quiet hours. Some shipped, some shelved.. all built.
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
