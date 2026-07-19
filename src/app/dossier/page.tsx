"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { Footer } from "@/components/Footer";
import ScrambleText from "@/components/ScrambleText";
import AnimatedCounter from "@/components/AnimatedCounter";
import {
  ON_RECORD,
  IN_TRAINING,
  FREQUENCIES,
  COORDINATES,
  BEHAVIORAL_ANALYSIS,
} from "@/data/dossier";

export default function DossierPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative w-full flex flex-col bg-void min-h-screen">
      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 pt-28 md:pt-32 pb-20">
        
        {/* Top HUD Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 mb-8 font-mono text-[10px] uppercase tracking-widest text-muted">
          <div className="flex gap-6">
            <span className="text-signal animate-pulse">
              <ScrambleText text="[ SYSTEM_ONLINE ]" delay={0.1} />
            </span>
            <span className="hidden sm:inline">Subject File · M-0214</span>
          </div>
          <span className="text-signal bg-signal/10 px-2 py-1 rounded">
            <ScrambleText text="Clearance: NEED TO KNOW" delay={0.5} />
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-start">
          
          {/* LEFT SIDEBAR: Sticky Terminal HUD */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-6">
            <div className="relative aspect-[2.39/1] lg:aspect-square w-full rounded-lg overflow-hidden border border-line bg-surface/30">
              <Image
                src="/dossier/hero.jpg"
                alt="Subject file"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover grayscale contrast-125 brightness-[0.4]"
              />
              <div className="absolute inset-0 bg-signal/10 mix-blend-overlay" />
              <div className="absolute inset-0 flex flex-col justify-between p-5">
                <div className="flex justify-between">
                  <div className="w-2 h-2 bg-signal rounded-full animate-ping" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-text/50">Rec_01</span>
                </div>
                <div>
                  <h1 className="font-display text-4xl text-text leading-none mb-2">
                    <ScrambleText text="Meteor" delay={0.8} />
                  </h1>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
                    Status: <ScrambleText text="ACTIVE_BUILDER" delay={1.2} speed={0.5} />
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-line rounded-lg p-5 bg-surface/20 backdrop-blur-sm">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-void border border-line/30 rounded p-4 flex flex-col justify-between">
                  <span className="font-mono text-[9px] text-muted tracking-widest uppercase">Age</span>
                  <span className="font-display text-4xl text-text mt-2"><AnimatedCounter value={17} /></span>
                </div>
                <div className="flex-1 bg-void border border-line/30 rounded p-4 flex flex-col justify-between">
                  <span className="font-mono text-[9px] text-muted tracking-widest uppercase">Books Processed</span>
                  <span className="font-display text-4xl text-text mt-2"><AnimatedCounter value={37} /></span>
                </div>
              </div>
              <div className="font-mono text-[11px] text-muted space-y-3">
                <div className="flex justify-between pt-1">
                  <span>Location</span>
                  <span className="text-text">Pune [02:14]</span>
                </div>
              </div>
            </div>

            <Reveal>
              <p className="font-mono text-xs leading-relaxed text-muted/80 border-l-2 border-signal/50 pl-4 mt-2">
                {mounted && <ScrambleText text="> Everything in this file is true. Some of it is redacted. That is the point." speed={0.8} delay={1.5} />}
              </p>
            </Reveal>

            {/* Added to make the sidebar taller and cooler */}
            <div className="hidden lg:flex flex-col mt-4 font-mono text-[9px] uppercase tracking-widest text-muted/40 gap-1 border-t border-line/30 pt-6">
               <p>{mounted && <ScrambleText text="> INITIATING HANDSHAKE..." delay={2} />}</p>
               <p>{mounted && <ScrambleText text="> BYPASSING MAINFRAME PROTOCOLS..." delay={2.5} />}</p>
               <p className="text-signal/50">{mounted && <ScrambleText text="> ACCESS GRANTED." delay={3} />}</p>
            </div>
          </aside>

          {/* RIGHT COLUMN: Scrolling Bento Cards */}
          <main className="lg:col-span-8 flex flex-col gap-8 pb-32">
            
            {/* Bento 1: On Record */}
            <BentoCard number="01" title="ON RECORD" caption="Things done, stated flat.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ON_RECORD.map((it, i) => {
                  const content = (
                    <div className="bg-void border border-line/50 p-5 rounded hover:border-signal/40 transition-colors h-full flex flex-col justify-between group">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-signal font-mono text-[10px]">[{i + 1}]</span>
                          <h3 className="font-mono text-[11px] uppercase tracking-widest text-text">{it.label}</h3>
                        </div>
                        <p className="text-sm text-muted font-sans font-light leading-relaxed">{it.body}</p>
                      </div>
                      {it.href && (
                        <span className="mt-6 block font-mono text-[10px] text-signal opacity-50 group-hover:opacity-100 transition-opacity">
                          ACCESS FILE →
                        </span>
                      )}
                    </div>
                  );
                  return it.href ? (
                    <Link key={i} href={it.href} className="block">
                      {content}
                    </Link>
                  ) : (
                    <div key={i}>{content}</div>
                  );
                })}
              </div>
              <Attachment src="/dossier/forts-new.jpg" fallback="/dossier/forts.jpg" id="LOG-A1" caption="Sighting: Sahyadris, Monsoon." />
            </BentoCard>

            {/* Bento 2: In Training */}
            <BentoCard number="02" title="IN TRAINING" caption="The horizon. Fully intended.">
              <div className="flex flex-col gap-1">
                {IN_TRAINING.map((it, i) => (
                  <div key={i} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 p-4 border-b border-line/30 hover:bg-surface/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[9px] uppercase tracking-widest border border-signal/40 text-signal bg-signal/5 rounded px-2 py-1 w-20 text-center">
                        {it.tag}
                      </span>
                      <span className="font-display text-xl sm:text-2xl text-text group-hover:text-white transition-colors">{it.label}</span>
                    </div>
                    <p className="text-sm text-muted font-sans font-light sm:text-right max-w-xs">{it.body}</p>
                  </div>
                ))}
              </div>
              <Attachment src="/dossier/gloves-new.jpg" fallback="/dossier/gloves.jpg" id="LOG-A2" caption="Physical conditioning protocol active." />
            </BentoCard>

            {/* Bento 3: HUD (Coordinates + Frequencies) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BentoCard number="03" title="COORDINATES" caption="Taste, rapid fire.">
                <div className="flex flex-col gap-3 font-mono text-[10px] uppercase tracking-widest">
                  {COORDINATES.map((c, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-line/30 pb-2">
                      <span className="text-muted/60">{c.key}</span>
                      <span className="text-text text-right max-w-[60%]">{c.value}</span>
                    </div>
                  ))}
                </div>
              </BentoCard>

              <BentoCard number="04" title="FREQUENCIES" caption="2am bandwidth.">
                <div className="flex flex-wrap gap-2">
                  {FREQUENCIES.map((f, i) => (
                    <span key={i} className="font-mono text-[9px] uppercase tracking-widest text-muted border border-line/60 bg-void rounded px-3 py-1.5 hover:border-signal/60 hover:text-signal transition-colors">
                      {f}
                    </span>
                  ))}
                </div>
              </BentoCard>
            </div>

            {/* Bento 5: Behavioral Profiling */}
            <BentoCard number="05" title="BEHAVIORAL PROFILING" caption="Inferred from reading patterns & inputs.">
               <div className="flex flex-col gap-6">
                {BEHAVIORAL_ANALYSIS.map((item, i) => (
                  <div key={i} className="flex flex-col gap-2 border-l-2 border-line/30 pl-4 hover:border-signal/50 transition-colors">
                    <span className="text-signal font-mono text-[10px] uppercase tracking-widest">
                      {">"} TRAIT_DETECTED: {item.trait}
                    </span>
                    <p className="text-sm font-sans font-light text-muted leading-relaxed">
                      {item.observation}
                    </p>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* End Marker */}
            <div className="mt-12 pt-8 border-t border-line flex flex-col items-start gap-8">
              <div className="font-mono text-[10px] text-signal uppercase tracking-widest px-3 py-1 border border-signal/40 rounded">
                <ScrambleText text="[ END OF FILE ]" delay={0.5} />
              </div>
              
              <Magnetic>
                <Link
                  href="/signal"
                  data-cursor="transmit"
                  className="group relative inline-flex items-center gap-4 border border-signal/40 bg-signal/5 hover:bg-signal/10 px-8 py-4 overflow-hidden rounded transition-all duration-300"
                >
                  {/* Subtle scanline effect on hover */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(176,136,90,0.1)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-2 h-2 bg-signal rounded-full shadow-[0_0_8px_rgba(176,136,90,0.8)] animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-text group-hover:text-signal transition-colors">
                      Establish Comms
                    </span>
                  </div>
                </Link>
              </Magnetic>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Subcomponents

function BentoCard({ number, title, caption, children }: { number: string, title: string, caption: string, children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="bg-surface/20 border border-line rounded-xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        {/* Subtle top glare */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <header className="mb-8 border-b border-line/50 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-signal font-mono text-xs">[{number}]</span>
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-text">
              <ScrambleText text={title} delay={0.2} speed={0.4} />
            </h2>
          </div>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-muted/60 ml-8">{caption}</p>
        </header>
        
        <div className="relative z-10">
          {children}
        </div>
      </section>
    </Reveal>
  );
}



function Attachment({ src, fallback, id, caption }: { src: string; fallback: string, id: string; caption: string }) {
  // Using fallback so if the new downloaded image 404s, we have a backup.
  return (
    <div className="mt-8 relative aspect-[2.39/1] w-full rounded border border-line overflow-hidden group">
      <Image
        src={src}
        alt={caption}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover grayscale contrast-125 brightness-[0.5] group-hover:scale-105 group-hover:brightness-[0.7] transition-all duration-700 ease-out"
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallback;
        }}
      />
      <div className="absolute inset-0 bg-signal/10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-widest text-text bg-void/80 px-2 py-1 rounded backdrop-blur border border-line/50">
        {id}
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-void to-transparent">
        <p className="font-mono text-[9px] uppercase tracking-widest text-muted">{caption}</p>
      </div>
    </div>
  );
}
