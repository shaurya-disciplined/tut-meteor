"use client";

import React from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { Footer } from "@/components/Footer";
import { Cover } from "@/components/Cover";
import { getBook, adjacent, coverFor, BOOKS } from "@/data/books";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BookPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const book = slug ? getBook(slug) : undefined;

  if (!book) return notFound();

  const nav = adjacent(book.slug)!;
  const index = BOOKS.findIndex((b) => b.slug === book.slug) + 1;

  return (
    <div className="relative w-full flex flex-col overflow-hidden">
      {/* Ambient wash of the cover itself */}
      {!book.noCover && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] -z-[1] overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.14] blur-3xl scale-125"
            style={{ backgroundImage: `url(${coverFor(book.slug)})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-void/80 to-void" />
        </div>
      )}

      <section className="px-6 lg:px-12 pt-36 md:pt-44 pb-20">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <Magnetic strength={10}>
              <Link
                href="/library"
                data-cursor="back"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted hover:text-signal transition-colors"
              >
                <span className="text-signal">←</span> The Library
              </Link>
            </Magnetic>
          </Reveal>

          <div className="grid md:grid-cols-[300px_1fr] gap-10 md:gap-16 items-start">
            {/* Cover */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              whileHover={{ y: -6, rotate: -0.6 }}
              className="mx-auto md:mx-0 w-[220px] md:w-full"
            >
              <Cover
                book={book}
                priority
                className="w-full aspect-[2/3] rounded-sm shadow-2xl shadow-black/70 ring-1 ring-line"
              />
            </motion.div>

            {/* Details */}
            <div className="flex flex-col">
              <Reveal>
                <div className="eyebrow flex items-center gap-3 mb-6">
                  <span className="inline-block w-6 h-px bg-signal" />
                  {book.category}
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-text">
                  {book.title}
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-5 text-lg text-muted font-light">{book.author}</p>
              </Reveal>

              {book.note && (
                <Reveal delay={0.22}>
                  <span className="inline-flex mt-6 w-fit items-center gap-2 rounded-full border border-signal/40 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-signal">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
                    {book.note}
                  </span>
                </Reveal>
              )}

              <div className="hairline my-10 max-w-md" />

              <Reveal delay={0.28}>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-text/90 max-w-xl">
                  {book.blurb}
                </p>
              </Reveal>

              <Reveal delay={0.36}>
                <div className="mt-12 font-mono text-[11px] uppercase tracking-widest text-muted/60">
                  No. {String(index).padStart(2, "0")} / {BOOKS.length} on the shelf
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-4 md:gap-8 border-t border-line pt-10">
          <NavCard label="Previous" book={nav.prev} align="left" />
          <NavCard label="Next" book={nav.next} align="right" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function NavCard({
  label,
  book,
  align,
}: {
  label: string;
  book: ReturnType<typeof getBook> & object;
  align: "left" | "right";
}) {
  const right = align === "right";
  return (
    <Link
      href={`/library/${book.slug}`}
      data-cursor="open"
      className={`group flex items-center gap-4 ${right ? "flex-row-reverse text-right" : "text-left"}`}
    >
      <Cover
        book={book}
        className="hidden sm:block w-11 aspect-[2/3] rounded-sm ring-1 ring-line shrink-0"
      />
      <div className={`min-w-0 ${right ? "items-end" : "items-start"} flex flex-col`}>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60 group-hover:text-signal transition-colors">
          {label}
        </span>
        <span className="mt-1 truncate max-w-full text-sm md:text-base text-text group-hover:text-signal transition-colors">
          {book.title}
        </span>
      </div>
    </Link>
  );
}
