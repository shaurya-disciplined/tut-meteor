"use client";

import React, { useState } from "react";
import { coverFor, type Book } from "@/data/books";

/**
 * Book cover with a typographic fallback. If the image file is missing
 * (or fails to load), we render the title on a surface panel so nothing
 * ever looks broken.
 */
export function Cover({
  book,
  className = "",
  sizes,
  priority = false,
}: {
  book: Pick<Book, "slug" | "title" | "author" | "noCover">;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showFallback = book.noCover || failed;

  if (showFallback) {
    return (
      <div
        className={`flex flex-col items-center justify-center text-center bg-surface border border-line px-4 ${className}`}
        aria-label={`${book.title}, cover unavailable`}
      >
        <span className="font-display text-lg md:text-xl leading-tight text-text/90">
          {book.title}
        </span>
        <span className="mt-3 font-mono text-[9px] uppercase tracking-widest text-muted">
          {book.author}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={coverFor(book.slug)}
      alt={`${book.title} by ${book.author}`}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
      onError={() => setFailed(true)}
      className={`object-cover bg-surface ${className}`}
    />
  );
}
