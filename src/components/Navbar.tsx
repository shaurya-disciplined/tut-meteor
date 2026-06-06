"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCinematic } from "./CinematicOverlay";

const NAV_LINKS = [
  { label: "The Story", href: "/story", yDrift: [-5, 5, -5], delay: 0 },
  { label: "The Arsenal", href: "/arsenal", yDrift: [5, -5, 5], delay: 1 },
  { label: "The Signal", href: "/web", yDrift: [-3, 6, -3], delay: 0.5 },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { triggerSignal } = useCinematic();

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* --- Desktop Floating Header Elements --- */}
      
      {/* 1. Floating Logo (Top Left) */}
      <motion.div 
        className="fixed top-8 left-6 lg:left-12 z-50 drop-shadow-lg pointer-events-auto"
        animate={{ y: [0, -6, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Link 
          href="/"
          onClick={() => handleLinkClick()}
          className="text-white/90 hover:text-white transition-colors uppercase tracking-[4px] text-sm font-medium focus:outline-none"
        >
          tut.meteor
        </Link>
      </motion.div>

      {/* 2. Floating Nav Links (Top Center) */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-12 pointer-events-none">
        {NAV_LINKS.map((link) => (
          <motion.div
            key={link.label}
            className="group relative pointer-events-auto drop-shadow-md"
            animate={{ y: link.yDrift }}
            transition={{ duration: 6 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: link.delay }}
          >
            <Link
              href={link.href}
              onClick={() => handleLinkClick()}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors py-2 block"
            >
              {link.label}
            </Link>
            <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-white/50 transition-all duration-300 group-hover:w-full" />
          </motion.div>
        ))}
      </div>

      {/* 3. Floating Discord Button (Top Right) */}
      <motion.button
        onClick={() => triggerSignal()}
        className="fixed top-6 right-6 lg:right-12 z-50 hidden md:block px-5 py-2 rounded-xl text-sm font-medium text-white/90 border border-white/20 hover:border-white/40 hover:text-white transition-all duration-300 focus:outline-none bg-[#050505]/20 backdrop-blur-md drop-shadow-lg pointer-events-auto"
        animate={{ y: [0, 6, 0], rotate: [0, -1, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        Message on Discord
      </motion.button>

      {/* --- Mobile Floating Toggle (Top Right) --- */}
      <motion.button
        className="fixed top-6 right-6 z-50 md:hidden text-white/90 hover:text-white p-3 rounded-full bg-[#050505]/20 backdrop-blur-md border border-white/10 shadow-lg"
        onClick={() => setMobileMenuOpen(true)}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Menu size={20} strokeWidth={2} />
      </motion.button>

      {/* --- Mobile Floating Glass Menu Overlay --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 z-[60] bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Mobile Header */}
            <div className="p-6 flex items-center justify-between">
              <span className="text-white/70 uppercase tracking-[4px] text-xs font-medium">
                Navigation
              </span>
              <button
                className="text-white/90 hover:text-white p-2 rounded-full bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-10 p-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => handleLinkClick()}
                    className="text-2xl font-medium text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.button
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerSignal();
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-6 px-8 py-4 rounded-2xl text-lg font-medium text-white/90 border border-white/20 bg-white/5 hover:bg-white/10 transition-all w-full max-w-xs"
              >
                Message on Discord
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
