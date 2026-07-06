"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Magnetic } from "./Magnetic";

const NAV_LINKS = [
  { label: "Story", href: "/story", index: "01" },
  { label: "Arsenal", href: "/arsenal", index: "02" },
  { label: "Library", href: "/library", index: "03" },
  { label: "Constellation", href: "/web", index: "04" },
  { label: "Midnight", href: "/midnight", index: "05" },
  { label: "Signal", href: "/signal", index: "06" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 w-full z-[80] transition-colors duration-500 ${
          scrolled ? "bg-void/60 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="flex items-center justify-between px-6 lg:px-12 h-16 md:h-20">
          {/* Wordmark */}
          <Magnetic strength={10}>
            <Link
              href="/"
              data-cursor="home"
              className="font-mono text-xs uppercase tracking-[0.35em] text-text hover:text-signal transition-colors"
            >
              tut.meteor
            </Link>
          </Magnetic>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-7">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Magnetic key={link.href} strength={8}>
                  <Link
                    href={link.href}
                    className="group relative flex items-center gap-1.5 py-2"
                  >
                    <span className="font-mono text-[9px] text-signal/70">{link.index}</span>
                    <span
                      className={`text-sm tracking-wide transition-colors ${
                        active ? "text-text" : "text-muted group-hover:text-text"
                      }`}
                    >
                      {link.label}
                    </span>
                    <span
                      className={`absolute left-0 -bottom-0.5 h-px bg-signal transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </Magnetic>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              className="block w-6 h-px bg-text"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="block w-6 h-px bg-text"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              className="block w-6 h-px bg-text"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[79] bg-void/95 backdrop-blur-xl md:hidden flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="flex items-baseline gap-3 py-3 border-b border-line"
                  >
                    <span className="font-mono text-xs text-signal/70">{link.index}</span>
                    <span className="font-display text-4xl text-text">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
