"use client";

import React from "react";
import Link from "next/link";
import { Reveal, SplitText } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { PROJECTS } from "@/data/projects";

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
              Things I made after midnight. Some shipped, some shelved.. all mine.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/arsenal/${p.slug}`}
              data-cursor="open"
              style={{ "--accent": p.accent } as React.CSSProperties}
              className="group block border-t border-line"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-14 md:py-20">
                <div className="md:col-span-1">
                  <span className="font-mono text-xs text-[var(--accent)]">{p.index}</span>
                </div>

                <div className="md:col-span-5">
                  <Reveal>
                    <h2 className="font-display text-5xl md:text-6xl text-muted group-hover:text-text transition-colors duration-500">
                      {p.title}
                    </h2>
                    <div className="mt-2 font-display italic text-lg text-muted/70">{p.subtitle}</div>
                    <div className="mt-4 eyebrow text-[var(--accent)]">{p.status}</div>
                  </Reveal>
                </div>

                <div className="md:col-span-6 flex flex-col gap-6">
                  <Reveal delay={0.1}>
                    <p className="text-lg md:text-xl text-muted font-light leading-relaxed">{p.oneLiner}</p>
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
                  <Reveal delay={0.2}>
                    <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[var(--accent)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-void transition-colors duration-300">
                      Open the file <span aria-hidden>→</span>
                    </span>
                  </Reveal>
                </div>
              </div>
            </Link>
          ))}
          <div className="border-t border-line" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
