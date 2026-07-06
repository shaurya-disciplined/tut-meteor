"use client";

import React, { useState } from "react";
import { Reveal, SplitText } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { Footer } from "@/components/Footer";
import { GhostImage } from "@/components/GhostImage";

/* ---- minimal custom line/brand icons (no emoji, no icon lib) ---- */
const Icon = {
  discord: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 127.14 96.36" fill="currentColor" {...p}>
      <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.4-5c.9-.66,1.8-1.34,2.66-2a75.58,75.58,0,0,0,72.46,0c.86.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.4,5,77.84,77.84,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129,54.65,122.64,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
    </svg>
  ),
  mail: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  github: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  linkedin: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  instagram: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
};

type Channel = {
  key: keyof typeof Icon;
  label: string;
  handle: string;
  href: string;
  cta: string;
  span?: string;
};

const CHANNELS: Channel[] = [
  { key: "mail", label: "Email", handle: "tut.meteor@gmail.com", href: "mailto:tut.meteor@gmail.com", cta: "Write to me" },
  { key: "instagram", label: "Instagram", handle: "@shaurya_jpp", href: "https://www.instagram.com/shaurya_jpp", cta: "Follow" },
  { key: "github", label: "GitHub", handle: "shaurya-disciplined", href: "https://github.com/shaurya-disciplined", cta: "The codebase" },
  { key: "linkedin", label: "LinkedIn", handle: "Shauryavardhan Mhetre", href: "https://www.linkedin.com/in/shauryavardhan-mhetre-617a183a0", cta: "Connect" },
  { key: "instagram", label: "MintedMile", handle: "@mintedmile", href: "https://www.instagram.com/mintedmile/", cta: "The old page" },
];

export default function SignalPage() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("tut.meteor");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="w-full flex flex-col">
      <section className="relative overflow-hidden px-6 lg:px-12 pt-40 md:pt-52 pb-16">
        <GhostImage src="/images/streetlamp-rain.jpg" side="right" widthClass="w-[40vw]" opacity={0.13} parallax className="hidden md:block" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Reveal className="mb-6">
            <div className="eyebrow flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-signal" /> 06 · THE SIGNAL
            </div>
          </Reveal>
          <h1 className="font-display text-[16vw] md:text-[11vw] leading-[0.9] text-text">
            <SplitText text="Reach" />
          </h1>
          <Reveal delay={0.4} className="mt-8 max-w-md">
            <p className="text-lg text-muted font-light">
              If the vibe hits.. cars, code, or just a good late night conversation.. pick a
              frequency.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Discord — primary, copyable username (no expiring invite link) */}
          <Reveal className="md:col-span-1 md:row-span-2">
            <div className="h-full rounded-3xl border border-line hover:border-signal/40 transition-colors duration-500 p-8 flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="text-signal mb-6">
                  <Icon.discord className="w-9 h-9" />
                </div>
                <div className="eyebrow mb-2">Primary channel</div>
                <h3 className="font-display text-3xl text-text">Discord</h3>
                <p className="text-sm text-muted font-light mt-3">
                  Where I actually am, most nights. Add me directly.
                </p>
              </div>
              <div className="mt-8">
                <div className="rounded-2xl border border-line p-4 flex items-center justify-between gap-3">
                  <span className="font-mono text-text tracking-wide select-all">tut.meteor</span>
                  <button
                    onClick={copy}
                    data-cursor={copied ? "copied" : "copy"}
                    className="font-mono text-[10px] uppercase tracking-widest text-signal hover:text-text transition-colors"
                  >
                    {copied ? "copied ✓" : "copy"}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* the rest — link buttons */}
          {CHANNELS.map((c, i) => {
            const IconEl = Icon[c.key];
            return (
              <Reveal key={c.label} delay={i * 0.05}>
                <Magnetic strength={8}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    data-cursor="visit"
                    className="group block h-full rounded-3xl border border-line hover:border-signal/40 transition-colors duration-500 p-7"
                  >
                    <div className="flex items-start justify-between">
                      <div className="text-muted group-hover:text-signal transition-colors duration-500">
                        <IconEl className="w-7 h-7" />
                      </div>
                      <span className="text-signal opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        ↗
                      </span>
                    </div>
                    <div className="mt-8">
                      <div className="eyebrow mb-1">{c.cta}</div>
                      <h3 className="text-xl text-text">{c.label}</h3>
                      <p className="font-mono text-xs text-muted mt-1 truncate">{c.handle}</p>
                    </div>
                  </a>
                </Magnetic>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
