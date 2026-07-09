"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { motion, useScroll } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { Footer } from "@/components/Footer";
import { getChapter, adjacent, type Chapter, type Movement } from "@/data/chapters";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function StoryChapterPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const chapter = slug ? getChapter(slug) : undefined;
  const { scrollYProgress } = useScroll();

  if (!chapter) return notFound();

  const nav = adjacent(chapter.slug)!;

  return (
    <div className="relative w-full flex flex-col overflow-hidden">
      {/* Reading progress rail (the story signal line) */}
      <div className="hidden lg:block fixed left-8 top-0 h-screen w-px bg-line z-[40] pointer-events-none">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute inset-0 origin-top bg-signal"
        />
      </div>

      {/* Breadcrumb */}
      <div className="px-6 lg:px-12 pt-28 md:pt-32">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Magnetic strength={10}>
              <Link
                href="/story"
                data-cursor="back"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted hover:text-text transition-colors"
              >
                <span className="text-signal">←</span> 01 · The Story
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>

      {/* Cinematic hero */}
      <section className="relative w-full mt-6">
        <div className="relative h-[52vh] md:h-[70vh] w-full overflow-hidden">
          <Image
            src={chapter.hero}
            alt={chapter.title}
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale contrast-[1.05] brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/50 via-void/50 to-void" />
          <div className="absolute inset-0 bg-signal/10 mix-blend-overlay" />
          {/* huge ghosted numeral */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-display text-[42vw] md:text-[30vw] leading-none text-text/[0.06] select-none">
              {chapter.numeral}
            </span>
          </div>
        </div>
      </section>

      {/* Title block */}
      <section className="px-6 lg:px-12 pt-12 md:pt-16">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-5">
            <div className="eyebrow flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-signal" />
              Chapter {chapter.numeral} · {chapter.years}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.9] text-text">{chapter.title}</h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 font-display italic text-2xl md:text-4xl leading-tight text-muted max-w-2xl">
              {chapter.thesis}
            </p>
          </Reveal>
          <div className="hairline mt-12" />
        </div>
      </section>

      {/* Movements */}
      <article className="px-6 lg:px-12 pb-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-16">
          {chapter.movements.map((m, i) => (
            <MovementBlock key={i} movement={m} />
          ))}
        </div>
      </article>

      {/* Closing line */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="hairline mb-12" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="font-display italic text-3xl md:text-5xl leading-tight text-text"
          >
            {chapter.closing}
          </motion.p>

          {chapter.links && chapter.links.length > 0 && (
            <div className="mt-12 flex flex-col gap-4">
              <div className="eyebrow text-muted/70">Threads</div>
              <div className="flex flex-wrap gap-3">
                {chapter.links.map((l) => (
                  <Magnetic key={l.href}>
                    <Link
                      href={l.href}
                      data-cursor="open"
                      className="inline-flex items-center gap-2 rounded-full border border-line hover:border-signal/60 px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-muted hover:text-signal transition-colors"
                    >
                      {l.label} <span className="text-signal">→</span>
                    </Link>
                  </Magnetic>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Prev / Next */}
      <section className="px-6 lg:px-12 pt-10 pb-24">
        <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4 md:gap-8 border-t border-line pt-10">
          <NavCard label="Previous chapter" chapter={nav.prev} align="left" />
          <NavCard label="Next chapter" chapter={nav.next} align="right" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function MovementBlock({ movement }: { movement: Movement }) {
  return (
    <div className="flex flex-col gap-6">
      {/* heading + marginalia */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div className="eyebrow flex items-center gap-3">
          <span className="inline-block w-6 h-px bg-signal" />
          {movement.heading}
        </div>
        {movement.note && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60">
            {movement.note}
          </span>
        )}
      </div>

      {/* prose with drop cap */}
      <p className="text-lg md:text-xl font-light leading-relaxed text-text/85 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.68] first-letter:text-signal">
        {movement.body}
      </p>

      {movement.pull && (
        <blockquote className="my-4 font-display italic text-3xl md:text-4xl leading-tight text-text max-w-2xl">
          <span className="text-signal">“</span>
          {movement.pull}
          <span className="text-signal">”</span>
        </blockquote>
      )}

      {movement.image && (
        <figure className="mt-4">
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden ring-1 ring-line">
            <Image
              src={movement.image}
              alt={movement.imageCaption ?? movement.heading}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover grayscale contrast-[1.05] brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
            <div className="absolute inset-0 bg-signal/10 mix-blend-overlay" />
          </div>
          {movement.imageCaption && (
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted/60">
              {movement.imageCaption}
            </figcaption>
          )}
        </figure>
      )}
    </div>
  );
}

function NavCard({
  label,
  chapter,
  align,
}: {
  label: string;
  chapter: Chapter;
  align: "left" | "right";
}) {
  const right = align === "right";
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.4, ease: EASE }}>
      <Link
        href={`/story/${chapter.slug}`}
        data-cursor="open"
        className={`group flex flex-col gap-1 ${right ? "items-end text-right" : "items-start text-left"}`}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60 group-hover:text-signal transition-colors">
          {label}
        </span>
        <span className="text-base md:text-lg text-text group-hover:text-signal transition-colors">
          <span className="font-mono text-xs mr-2 text-signal">{chapter.numeral}</span>
          {chapter.title}
        </span>
      </Link>
    </motion.div>
  );
}
