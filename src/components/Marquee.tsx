"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Slow, infinite horizontal marquee of theme words separated by a bronze mark. */
export function Marquee({ items, className = "" }: MarqueeProps) {
  const sequence = [...items, ...items];
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {sequence.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display text-4xl md:text-6xl lg:text-7xl text-text/90 px-6 md:px-10">
              {item}
            </span>
            <span className="text-signal text-2xl md:text-4xl">✦</span>
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-void to-transparent" />
    </div>
  );
}
