"use client";

import React from "react";
import { motion } from "framer-motion";

interface DriftItemProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yDrift?: number[];
  rotateDrift?: number[];
}

export function DriftItem({
  children,
  delay = 0,
  duration = 6,
  className = "",
  yDrift = [0, -10, 0],
  rotateDrift = [-1, 1, -1]
}: DriftItemProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: yDrift, rotate: rotateDrift }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    >
      {children}
    </motion.div>
  );
}
