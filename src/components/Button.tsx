"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 bg-accent text-background font-semibold rounded-md shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/40 transition-shadow duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
