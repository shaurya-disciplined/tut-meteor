"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SplitText } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { Cover } from "@/components/Cover";
import { SHELVES, CATEGORIES, TOTAL } from "@/data/books";

export default function LibraryPage() {
  const [active, setActive] = useState<string>("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const tabs = ["All", ...CATEGORIES];
  const visible = active === "All" ? SHELVES : SHELVES.filter((s) => s.category === active);

  return (
    <div className="w-full flex flex-col">
      <section className="px-6 lg:px-12 pt-40 md:pt-52 pb-12">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-6">
            <div className="eyebrow flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-signal" /> 03 · THE LIBRARY
            </div>
          </Reveal>
          <h1 className="font-display text-[16vw] md:text-[11vw] leading-[0.9] text-text">
            <SplitText text="Read" />
          </h1>
          <Reveal delay={0.4} className="mt-8 max-w-lg">
            <p className="text-lg text-muted font-light">
              I don&apos;t chase books for entertainment. I keep the ones that promise a sharper way
              to think. {TOTAL} of them, read and unread. You can tell a lot about someone by their
              shelf.
            </p>
          </Reveal>
          <Reveal delay={0.55} className="mt-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted/70">
              Every title opens. Pick one.
            </p>
          </Reveal>
        </div>
      </section>

      {/* filter */}
      <section className="px-6 lg:px-12 sticky top-16 md:top-20 z-30 bg-void/70 backdrop-blur-md py-4 border-y border-line">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
          {tabs.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`font-mono text-[10px] md:text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-colors duration-300 ${
                active === c
                  ? "border-signal/60 text-signal"
                  : "border-line text-muted hover:text-text"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-24"
            >
              {visible.map((shelf) => {
                // alternate the preview side per category, stable regardless of filter
                const previewRight = CATEGORIES.indexOf(shelf.category) % 2 === 0;
                const shelfHovered = shelf.books.find((b) => b.slug === hovered);
                const preview = shelfHovered ?? shelf.books[0];

                return (
                  <div
                    key={shelf.category}
                    className={`lg:flex lg:gap-12 lg:items-start ${
                      previewRight ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* book list */}
                    <div className="flex-1 min-w-0">
                      <div className="eyebrow text-signal/80 mb-8">{shelf.category}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        {shelf.books.map((b, i) => (
                          <motion.div
                            key={b.slug}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 8) * 0.04 }}
                          >
                            <Link
                              href={`/library/${b.slug}`}
                              data-cursor="open"
                              onMouseEnter={() => setHovered(b.slug)}
                              onMouseLeave={() => setHovered((h) => (h === b.slug ? null : h))}
                              className="group flex items-center justify-between gap-4 py-4 border-b border-line"
                            >
                              <div className="flex items-baseline gap-4 min-w-0">
                                <span className="text-base md:text-lg text-text truncate group-hover:text-signal transition-colors duration-300">
                                  {b.title}
                                </span>
                                <span className="font-light text-sm text-muted whitespace-nowrap hidden sm:block">
                                  {b.author}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 shrink-0">
                                {b.note && (
                                  <span className="font-mono text-[10px] uppercase tracking-widest text-signal/70 whitespace-nowrap">
                                    {b.note}
                                  </span>
                                )}
                                <span className="font-mono text-muted/50 group-hover:text-signal group-hover:translate-x-1 transition-all duration-300">
                                  →
                                </span>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* per-shelf sticky cover preview (desktop) */}
                    <div className="hidden lg:block w-[190px] shrink-0">
                      <div className="sticky top-36">
                        <AnimatePresence mode="popLayout">
                          <motion.div
                            key={preview.slug}
                            initial={{ opacity: 0, scale: 0.94, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.97, y: -8 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <Cover
                              book={preview}
                              className="w-full aspect-[2/3] rounded-sm shadow-2xl shadow-black/60 ring-1 ring-line"
                            />
                            <div className="mt-3 text-center">
                              <div className="text-xs text-text/90 truncate">{preview.title}</div>
                              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                                {preview.author}
                              </div>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Closing note — marginalia */}
      <section className="px-6 lg:px-12 pt-8 pb-24">
        <div className="max-w-3xl mx-auto border-t border-line pt-14">
          <Reveal>
            <div className="eyebrow text-signal/80 mb-8">In the margins</div>
          </Reveal>
          <div className="flex flex-col gap-6 text-lg md:text-xl font-light leading-relaxed text-muted">
            <Reveal delay={0.05}>
              <p>
                Not all of these have been read. Some I finished twice over. Some I opened once and set
                back down. A few are still sealed, waiting for a version of me that&apos;s ready for
                them.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>
                A shelf isn&apos;t a scoreboard. It&apos;s a map of what pulls at you.. what you keep
                meaning to become. The reaching says more than the finishing ever could.
              </p>
            </Reveal>
            <Reveal delay={0.19}>
              <p className="text-text">
                So take this as intent, not a trophy case. What I actually did with any of it stays
                mostly off the page.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
