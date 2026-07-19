"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { Footer } from "@/components/Footer";
import {
  ON_RECORD,
  IN_TRAINING,
  FREQUENCIES,
  WONT_DISCUSS,
  COORDINATES,
} from "@/data/dossier";

export default function DossierPage() {
  return (
    <div className="relative w-full flex flex-col overflow-hidden">
      {/* Classification bar */}
      <div className="px-6 lg:px-12 pt-28 md:pt-32">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 border-y border-line py-3 font-mono text-[10px] uppercase tracking-widest text-muted">
          <span className="text-signal">{"// Classified"}</span>
          <span>Subject file</span>
          <span className="hidden sm:inline">Clearance · need to know</span>
          <span>File No. M-0214</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative w-full mt-6">
        <div className="relative h-[46vh] md:h-[62vh] w-full overflow-hidden">
          <Image
            src="/dossier/hero.jpg"
            alt="Subject file"
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale contrast-[1.05] brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-void/40 to-void" />
          <div className="absolute inset-0 bg-signal/10 mix-blend-overlay" />

          <div className="absolute inset-0 flex flex-col justify-end px-6 lg:px-12 pb-10">
            <div className="max-w-5xl mx-auto w-full">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <div className="eyebrow mb-4 text-signal">07 · The Dossier</div>
                  <h1 className="font-display text-6xl md:text-8xl leading-[0.9] text-text">Dossier</h1>
                  <div className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted flex flex-wrap gap-x-6 gap-y-1">
                    <span>Subject · Meteor</span>
                    <span>Status · Active</span>
                    <span>Handle · tut.meteor</span>
                  </div>
                </div>
                <Stamp className="hidden md:flex mb-2">Cleared for release</Stamp>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 lg:px-12 pt-12">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="font-display italic text-2xl md:text-4xl leading-tight text-muted max-w-2xl">
              Everything in this file is true. Some of it is redacted. That is the point.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 01 ON RECORD */}
      <FileSection number="01" name="On record" caption="Things done, stated flat.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line rounded-lg overflow-hidden">
          {ON_RECORD.map((it) => (
            <div key={it.label} className="bg-void p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-signal font-mono text-xs">✓</span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-text">{it.label}</span>
              </div>
              <p className="text-base text-muted font-light leading-relaxed">{it.body}</p>
              {it.href && (
                <Link
                  href={it.href}
                  data-cursor="open"
                  className="mt-1 w-fit font-mono text-[10px] uppercase tracking-widest text-signal/80 hover:text-signal transition-colors"
                >
                  open the file →
                </Link>
              )}
            </div>
          ))}
        </div>
        <Attachment src="/dossier/forts.jpg" id="A-1" caption="Subject, recurring sighting: forts, Sahyadris, monsoon." />
      </FileSection>

      {/* 02 IN TRAINING */}
      <FileSection number="02" name="In training" caption="The horizon. Fully intended.">
        <div className="flex flex-col divide-y divide-line border-y border-line">
          {IN_TRAINING.map((it) => (
            <div key={it.label} className="py-6 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
              <div className="sm:w-56 shrink-0 flex items-center gap-3">
                <span className="font-mono text-[9px] uppercase tracking-widest border border-signal/50 text-signal rounded px-2 py-1">
                  {it.tag}
                </span>
                <span className="font-display text-2xl text-text">{it.label}</span>
              </div>
              <p className="text-base md:text-lg text-muted font-light leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
        <Attachment src="/dossier/gloves.jpg" id="A-2" caption="Training log, ongoing: keep the people I care about safe." />
      </FileSection>

      {/* 03 FREQUENCIES */}
      <FileSection number="03" name="Frequencies" caption="What I will happily talk about at 2am.">
        <div className="flex flex-wrap gap-2.5">
          {FREQUENCIES.map((f) => (
            <span
              key={f}
              className="font-mono text-[11px] lowercase tracking-wide text-muted border border-line rounded-full px-4 py-2 hover:border-signal/60 hover:text-signal transition-colors"
            >
              {f}
            </span>
          ))}
        </div>
      </FileSection>

      {/* 04 STATIC */}
      <FileSection number="04" name="Static" caption="What I will not.">
        <ul className="flex flex-col gap-4 max-w-2xl">
          {WONT_DISCUSS.map((w, i) => (
            <li key={i} className="flex gap-3 items-baseline text-lg md:text-xl font-light text-text/85">
              <span className="text-signal/50 font-mono text-xs mt-1.5">—</span>
              <span className="leading-relaxed">
                {w.body && <span>{w.body} </span>}
                {w.redacted && <Redacted text={w.redacted} />}
              </span>
            </li>
          ))}
        </ul>
      </FileSection>

      {/* 05 COORDINATES */}
      <FileSection number="05" name="Coordinates" caption="Taste, rapid fire." last>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
          {COORDINATES.map((c) => (
            <div key={c.key} className="flex items-baseline justify-between gap-6 border-b border-line/60 py-3.5">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted shrink-0">{c.key}</dt>
              <dd className="text-right text-text font-light">{c.value}</dd>
            </div>
          ))}
        </dl>
        <Attachment src="/dossier/drift.jpg" id="A-3" caption="Vehicle of interest, any make: it is raining, and it is 2am." />
      </FileSection>

      {/* Close */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-5xl mx-auto flex flex-col items-start gap-8 border-t border-line pt-12">
          <Stamp>End of file · nothing further</Stamp>
          <p className="font-display italic text-3xl md:text-5xl leading-tight text-text max-w-2xl">
            The rest stays above your clearance.
          </p>
          <Magnetic>
            <Link
              href="/signal"
              data-cursor="reach out"
              className="inline-flex items-center gap-3 rounded-full border border-signal/60 px-7 py-3.5 text-sm text-signal hover:bg-signal hover:text-void transition-colors duration-300"
            >
              Request contact <span aria-hidden>→</span>
            </Link>
          </Magnetic>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FileSection({
  number,
  name,
  caption,
  children,
  last,
}: {
  number: string;
  name: string;
  caption?: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section className={`px-6 lg:px-12 pt-16 ${last ? "pb-4" : "pb-4"}`}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 mb-10">
          <div>
            <div className="eyebrow flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-signal" />
              {number} · {name}
            </div>
            {caption && (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted/60">{caption}</p>
            )}
          </div>
          <Stamp>Reviewed · cleared</Stamp>
        </div>
        {children}
      </div>
    </section>
  );
}

function Stamp({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 1.6, rotate: -22 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -7 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 220, damping: 13 }}
      className={`inline-flex items-center gap-2 rounded border-2 border-signal/60 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-signal/90 ${className}`}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal/70" />
      {children}
    </motion.span>
  );
}

function Redacted({ text }: { text: string }) {
  return (
    <span className="group relative inline-block align-middle">
      <span
        className="select-none rounded-[2px] bg-[#17171b] px-1.5 text-transparent ring-1 ring-white/10 shadow-inner"
        aria-label="redacted"
      >
        {text}
      </span>
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap rounded border border-line bg-void px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-muted opacity-0 group-hover:opacity-100 transition-opacity">
        clearance insufficient
      </span>
    </span>
  );
}

function Attachment({ src, id, caption }: { src: string; id: string; caption: string }) {
  return (
    <Reveal className="mt-10">
      <figure>
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden ring-1 ring-line">
          <Image
            src={src}
            alt={caption}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover grayscale contrast-[1.05] brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-signal/10 mix-blend-overlay" />
          <span className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-widest text-text/70 bg-void/60 px-2 py-1 rounded">
            Attachment · {id}
          </span>
        </div>
        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted/60">
          {caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}
