"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: a small solid dot that tracks the pointer 1:1, and a larger
 * ring that lags behind with spring physics. The ring grows and the label
 * appears when hovering interactive elements (anything with [data-cursor]).
 * Disabled on touch / coarse pointers and under reduced-motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hidden, setHidden] = useState(true);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 600, damping: 30, mass: 0.2 });
  const ringY = useSpring(dotY, { stiffness: 600, damping: 30, mass: 0.2 });

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (hidden) setHidden(false);

      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea, [role='button']"
      );
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor"));
      } else {
        setHovering(false);
        setLabel(null);
      }
    };

    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [dotX, dotY, hidden]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120]"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.3s ease" }}
    >
      {/* Lagging ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute top-0 left-0"
      >
        <motion.div
          animate={{
            width: hovering ? 64 : 34,
            height: hovering ? 64 : 34,
            borderColor: hovering ? "rgba(176,136,90,0.9)" : "rgba(255,255,255,0.35)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center backdrop-blur-[1px]"
        >
          {label && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-signal whitespace-nowrap">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Precise dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="absolute top-0 left-0"
      >
        <motion.div
          animate={{ scale: hovering ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="-translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-signal"
        />
      </motion.div>
    </div>
  );
}
