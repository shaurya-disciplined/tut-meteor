"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Twinkling starfield with occasional meteor streaks crossing left→right.
 * Extracted from the constellation page so the effect can be reused anywhere
 * (footer, /midnight, etc). Deterministic positions → no hydration mismatch.
 */
export function ShootingStars({
  starCount = 46,
  streaks = 2,
  className = "",
}: {
  starCount?: number;
  streaks?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, i) => ({
        x: (i * 97 + 13) % 100,
        y: (i * 57 + 7) % 100,
        s: 1 + (i % 3),
        delay: (i % 12) * 0.4,
        dur: 2.6 + (i % 5) * 0.6,
      })),
    [starCount]
  );

  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {stars.map((st, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s }}
          initial={{ opacity: 0.2 }}
          animate={reduced ? { opacity: 0.28 } : { opacity: [0.15, 0.7, 0.15] }}
          transition={reduced ? undefined : { duration: st.dur, repeat: Infinity, delay: st.delay, ease: "easeInOut" }}
        />
      ))}

      {!reduced &&
        Array.from({ length: streaks }).map((_, k) => (
          <div key={k} className="absolute left-0" style={{ top: `${16 + k * 34}%`, transform: "rotate(18deg)" }}>
            <motion.span
              className="block h-px w-28 bg-gradient-to-r from-transparent via-white/80 to-transparent"
              initial={{ x: "-15vw", opacity: 0 }}
              animate={{ x: "120vw", opacity: [0, 1, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 7 + k * 4, delay: 3 + k * 5, ease: "easeIn" }}
            />
          </div>
        ))}
    </div>
  );
}
