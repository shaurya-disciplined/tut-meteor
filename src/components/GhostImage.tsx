"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * A ghosted image layer — grayscale, low opacity, sunk into the void.
 * The signature "image behind the text" treatment (like the Codex bust),
 * generalized so it can live behind any section. Absolutely positioned;
 * drop it inside a `relative` parent.
 */
export function GhostImage({
  src,
  side = "right",
  opacity = 0.1,
  fit = "contain",
  grayscale = true,
  parallax = false,
  className = "",
  widthClass = "",
}: {
  src: string;
  side?: "left" | "right" | "center";
  opacity?: number;
  fit?: "cover" | "contain";
  grayscale?: boolean;
  parallax?: boolean;
  className?: string;
  /** constrain the ghost to part of the width, e.g. "w-[55vw]" */
  widthClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], parallax && !reduced ? ["-6%", "6%"] : ["0%", "0%"]);

  const position =
    side === "left" ? "left center" : side === "right" ? "right center" : "center";
  const sideAnchor = side === "left" ? "left-0" : side === "right" ? "right-0" : "inset-x-0 mx-auto";

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 ${sideAnchor} ${widthClass || "inset-x-0"} overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          y,
          backgroundImage: `url(${src})`,
          backgroundSize: fit,
          backgroundPosition: position,
          backgroundRepeat: "no-repeat",
          opacity,
          filter: grayscale ? "grayscale(1) contrast(1.05)" : "contrast(1.05)",
        }}
      />
    </div>
  );
}
