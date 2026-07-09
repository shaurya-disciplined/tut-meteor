"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { Footer } from "@/components/Footer";
import { getProject, adjacent, type Project, type ProjectSection } from "@/data/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ArsenalProjectPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const project = slug ? getProject(slug) : undefined;

  if (!project) return notFound();

  const nav = adjacent(project.slug)!;

  return (
    <div
      className="relative w-full flex flex-col overflow-hidden"
      style={{ "--accent": project.accent } as React.CSSProperties}
    >
      {/* Breadcrumb */}
      <div className="px-6 lg:px-12 pt-28 md:pt-32">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <Magnetic strength={10}>
              <Link
                href="/arsenal"
                data-cursor="back"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted hover:text-text transition-colors"
              >
                <span className="text-[var(--accent)]">←</span> 02 · The Arsenal
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>

      {/* Hero */}
      {project.hero ? (
        <section className="relative w-full mt-6">
          <div className="relative h-[48vh] md:h-[64vh] w-full overflow-hidden">
            <Image
              src={project.hero}
              alt={`${project.title} interface`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
            {/* void fade + accent glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-void/20 via-void/30 to-void" />
            <div
              className="absolute inset-x-0 top-0 h-32 opacity-40 mix-blend-screen pointer-events-none"
              style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
            />
            <div className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--accent)", opacity: 0.5 }} />
            {project.heroUrl && (
              <span className="absolute bottom-4 left-6 lg:left-12 font-mono text-[10px] uppercase tracking-widest text-text/70">
                <span className="text-[var(--accent)]">●</span> {project.heroUrl}
              </span>
            )}
          </div>
        </section>
      ) : (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] -z-[1] overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.12] blur-3xl"
            style={{ background: "radial-gradient(60% 60% at 50% 0%, var(--accent), transparent 70%)" }}
          />
        </div>
      )}

      {/* Header */}
      <section className="px-6 lg:px-12 pt-12 md:pt-16 pb-4">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-5">
            <div className="eyebrow flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[var(--accent)]" />
              {project.index} · {project.title.toUpperCase()}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.9] text-text">{project.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 font-display italic text-2xl md:text-3xl text-muted">{project.subtitle}</p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest">
              <span className="inline-flex items-center gap-2 text-[var(--accent)]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                {project.status}
              </span>
              {project.year && <span className="text-muted/60">/ {project.year}</span>}
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-8 text-2xl md:text-3xl font-light leading-snug text-text/90 max-w-3xl">
              {project.oneLiner}
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] uppercase tracking-widest text-muted border border-line rounded-full px-3 py-1.5"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="hairline mt-12 max-w-md" />
        </div>
      </section>

      {/* Body */}
      <section className="px-6 lg:px-12 pb-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-16">
          {project.sections.map((s, i) => (
            <SectionBlock key={i} section={s} />
          ))}
        </div>
      </section>

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <section className="px-6 lg:px-12 pb-4">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="flex flex-wrap gap-4">
                {project.links.map((l) => (
                  <Magnetic key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="visit"
                      className="inline-flex items-center gap-3 rounded-full border border-[var(--accent)] px-7 py-3.5 text-sm text-[var(--accent)] hover:bg-[var(--accent)] hover:text-void transition-colors duration-300"
                    >
                      {l.label}
                      <span>↗</span>
                    </a>
                  </Magnetic>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <section className="px-6 lg:px-12 pt-14 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-4 md:gap-8 border-t border-line pt-10">
          <NavCard label="Previous" project={nav.prev} align="left" />
          <NavCard label="Next" project={nav.next} align="right" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SectionBlock({ section }: { section: ProjectSection }) {
  if (section.kind === "pull") {
    return (
      <Reveal>
        <blockquote className="font-display italic text-3xl md:text-5xl leading-tight text-text max-w-3xl py-2">
          <span className="text-[var(--accent)]">“</span>
          {section.quote}
          <span className="text-[var(--accent)]">”</span>
        </blockquote>
      </Reveal>
    );
  }

  if (section.kind === "features") {
    return (
      <Reveal>
        {section.heading && <SectionHeading>{section.heading}</SectionHeading>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line rounded-lg overflow-hidden border border-line">
          {section.items.map((it) => (
            <div key={it.title} className="bg-void p-6 flex flex-col gap-2">
              <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent)]">{it.title}</div>
              <p className="text-base text-muted font-light leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    );
  }

  if (section.kind === "specs") {
    return (
      <Reveal>
        {section.heading && <SectionHeading>{section.heading}</SectionHeading>}
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-1 max-w-3xl">
          {section.rows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">{r.label}</dt>
              <dd className="font-mono text-sm text-text text-right">{r.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    );
  }

  if (section.kind === "image") {
    return (
      <Reveal>
        <Frame src={section.src} alt={section.caption ?? "screenshot"} url={section.url} />
        {section.caption && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted/60">{section.caption}</p>
        )}
      </Reveal>
    );
  }

  if (section.kind === "gallery") {
    const fit = section.fit ?? "cover";
    const aspect = section.aspect ?? "aspect-[16/9]";
    const cols = fit === "contain" ? "sm:grid-cols-3" : "sm:grid-cols-2";
    return (
      <Reveal>
        {section.heading && <SectionHeading>{section.heading}</SectionHeading>}
        {section.caption && (
          <p className="-mt-3 mb-5 font-mono text-[10px] uppercase tracking-widest text-muted/60">{section.caption}</p>
        )}
        <div className={`grid grid-cols-1 ${cols} gap-4`}>
          {section.images.map((src) => (
            <Frame key={src} src={src} alt="screenshot" aspect={aspect} fit={fit} />
          ))}
        </div>
      </Reveal>
    );
  }

  // prose or verdict
  const isVerdict = section.kind === "verdict";
  const heading = isVerdict ? "Verdict" : section.heading;

  return (
    <Reveal>
      {heading && <SectionHeading>{heading}</SectionHeading>}
      <p
        className={`text-lg md:text-xl font-light leading-relaxed max-w-3xl ${
          isVerdict ? "text-text/80" : "text-muted"
        }`}
      >
        {section.body}
      </p>
    </Reveal>
  );
}

function Frame({
  src,
  alt,
  url,
  aspect = "aspect-[16/9]",
  fit = "cover",
}: {
  src: string;
  alt: string;
  url?: string;
  aspect?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <div className="group/frame relative rounded-xl overflow-hidden ring-1 ring-line bg-[#0b0b0e] shadow-2xl shadow-black/50">
      <div className={`relative w-full ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className={fit === "contain" ? "object-contain" : "object-cover object-top"}
        />
      </div>
      {url && (
        <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-widest text-text/60 bg-void/60 px-2 py-1 rounded">
          {url}
        </span>
      )}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-xl pointer-events-none" />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow flex items-center gap-3 mb-6">
      <span className="inline-block w-6 h-px bg-[var(--accent)]" />
      {children}
    </div>
  );
}

function NavCard({
  label,
  project,
  align,
}: {
  label: string;
  project: Project;
  align: "left" | "right";
}) {
  const right = align === "right";
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.4, ease: EASE }}>
      <Link
        href={`/arsenal/${project.slug}`}
        data-cursor="open"
        style={{ "--accent": project.accent } as React.CSSProperties}
        className={`group flex flex-col gap-1 ${right ? "items-end text-right" : "items-start text-left"}`}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60 group-hover:text-[var(--accent)] transition-colors">
          {label}
        </span>
        <span className="text-base md:text-lg text-text group-hover:text-[var(--accent)] transition-colors">
          <span className="font-mono text-xs mr-2 text-[var(--accent)]">{project.index}</span>
          {project.title}
        </span>
      </Link>
    </motion.div>
  );
}
