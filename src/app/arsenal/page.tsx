"use client";

import React from "react";
import Link from "next/link";
import { Reveal, SplitText } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { PROJECTS } from "@/data/projects";

export default function ArsenalPage() {
  return (
    <div className="w-full flex flex-col">
      <section className="relative px-6 lg:px-12 pt-40 md:pt-56 pb-24 border-b border-line/30 overflow-hidden">
        {/* Radar / Grid Background for Arsenal */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(176,136,90,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(176,136,90,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />
        
        {/* Tactical circular radar element on the right */}
        <div className="absolute top-1/2 right-0 md:right-12 -translate-y-1/2 w-64 h-64 border border-signal/10 rounded-full flex items-center justify-center pointer-events-none opacity-50 md:opacity-100">
           <div className="w-48 h-48 border border-signal/20 rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
           <div className="absolute w-full h-px bg-signal/10" />
           <div className="absolute h-full w-px bg-signal/10" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <Reveal className="mb-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal/80 flex items-center gap-3">
                <span className="w-10 h-px bg-signal" /> Secure Storage // 02
              </div>
            </Reveal>
            <h1 className="font-display text-[16vw] md:text-[11vw] leading-[0.8] text-text uppercase tracking-tight drop-shadow-[0_0_15px_rgba(176,136,90,0.15)]">
              <SplitText text="Arsenal" />
            </h1>
          </div>
          
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Reveal delay={0.3}>
               <div className="p-6 md:p-8 border border-line/50 bg-void/80 backdrop-blur-xl rounded relative hover:border-signal/50 transition-colors shadow-2xl">
                 {/* Tactical framing corners */}
                 <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-signal" />
                 <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-signal" />
                 
                 <div className="flex justify-between items-center mb-5 pb-5 border-b border-line/50 font-mono text-[9px] uppercase tracking-widest text-muted">
                    <span>System_Status</span>
                    <span className="text-signal flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-signal rounded-full animate-ping" />
                      Live
                    </span>
                 </div>
                 
                 <p className="font-mono text-xs leading-loose text-text/80 uppercase tracking-widest text-justify">
                   Deployed systems, experimental architectures, and things built entirely after midnight. The functional infrastructure behind the ambition.
                 </p>
               </div>
            </Reveal>
          </div>
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
