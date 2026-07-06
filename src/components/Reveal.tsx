"use client";

import React from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Scroll-triggered fade/slide/blur reveal. Replaces the old perpetual bobbing. */
export function Reveal({ children, className = "", delay = 0, y = 28, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * Kinetic headline: each word rises out of a clip mask with a stagger.
 * Used for the big display wordmarks.
 */
export function SplitText({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.08,
  once = true,
}: SplitTextProps) {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once, margin: "-40px" }}
            transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
