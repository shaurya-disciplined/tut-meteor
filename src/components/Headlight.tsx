"use client";

import React, { useEffect, useRef } from "react";

/**
 * A soft cone of light that trails the cursor and lifts detail out of the smoke,
 * like driving an empty road with the brights on. Screen blend so it only ever
 * brightens. Off on touch and on reduced motion.
 */
export function Headlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const el = ref.current;
    if (!el) return;
    el.style.opacity = "1";

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[80] pointer-events-none overflow-hidden" aria-hidden>
      <div
        ref={ref}
        className="absolute -left-[320px] -top-[320px] w-[640px] h-[640px] opacity-0 transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(circle, rgba(232,224,208,0.10) 0%, rgba(176,136,90,0.055) 32%, transparent 66%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
