"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Magnetic } from "./Magnetic";
import { ShootingStars } from "./ShootingStars";
import { GhostImage } from "./GhostImage";

const ROUTES = [
  { label: "Story", href: "/story" },
  { label: "Arsenal", href: "/arsenal" },
  { label: "Library", href: "/library" },
  { label: "Constellation", href: "/web" },
  { label: "Midnight", href: "/midnight" },
  { label: "Signal", href: "/signal" },
  { label: "Codex", href: "/codex" },
];

/** Quiet footer + full site index, so every page opens onto every other. */
export function Footer() {
  const pathname = usePathname();
  return (
    <footer className="relative z-20 w-full overflow-hidden border-t border-line mt-32 px-6 lg:px-12 py-16">
      {/* faint sky + a watchful eye in the void */}
      <ShootingStars starCount={22} streaks={1} className="opacity-70" />
      <GhostImage src="/images/eagle-dark.jpg" side="right" widthClass="w-[46vw]" opacity={0.08} className="hidden md:block" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-14">
        <div className="flex flex-col gap-10">
          <div>
            <div className="eyebrow mb-6">END OF TRANSMISSION</div>
            <Link href="/signal" data-cursor="reach out" className="group block">
              <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-text block">
                You&apos;ve seen the signal.
              </span>
              <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-signal/80 group-hover:text-signal transition-colors duration-500 block mt-1">
                Not the whole of it.
              </span>
            </Link>
          </div>
          <Magnetic>
            <Link
              href="/signal"
              className="inline-flex w-fit items-center gap-3 border border-line hover:border-signal/50 rounded-full px-7 py-3.5 text-sm text-text hover:text-signal transition-colors duration-500"
            >
              Open the signal
              <span className="text-signal">→</span>
            </Link>
          </Magnetic>
        </div>

        <div className="hairline" />

        {/* full index — every destination, from every page */}
        <div className="flex flex-col gap-6">
          <div className="eyebrow text-muted/70">Wander the rest</div>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {ROUTES.map((r) => {
              const active = pathname === r.href;
              return (
                <Link
                  key={r.href}
                  href={r.href}
                  data-cursor="open"
                  className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                    active ? "text-signal" : "text-muted hover:text-text"
                  }`}
                >
                  {r.label}
                </Link>
              );
            })}
          </div>
          <div className="eyebrow text-muted/50">
            tut.meteor · built after midnight · {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
