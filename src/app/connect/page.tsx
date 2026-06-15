"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GlassCard } from "@/components/floating/GlassCard";

// Custom SVG Icons to avoid Lucide barrel-optimization and version issues
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

export default function ConnectPage() {
  const [copied, setCopied] = useState(false);

  const discordUsername = "tut.meteor";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(discordUsername);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative min-h-[100svh] w-full pt-32 pb-24 px-6 lg:px-24 flex flex-col items-center overflow-x-hidden">
      
      {/* Back Button */}
      <motion.div 
        className="absolute top-28 left-6 lg:left-12 z-40 pointer-events-auto"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a0a0f]/60 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Base
        </Link>
      </motion.div>

      {/* Title */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-16 text-center"
      >
        The <span className="text-accent drop-shadow-[0_0_15px_rgba(212,179,199,0.3)]">Signal Grid</span>
      </motion.h1>

      {/* Bento Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mx-auto">
        
        {/* Card 1: Welcome (Desktop spans 2 columns) */}
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <GlassCard glow className="h-full flex flex-col justify-between p-8 min-h-[200px]">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-3">SYSTEM CHANNELS</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
                Establish a direct connection.
              </h2>
            </div>
            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed max-w-md">
              Whether you want to discuss AI integration, web development, JEE strategies, cars, or join forces on custom builds, choose your coordinate below.
            </p>
          </GlassCard>
        </motion.div>

        {/* Card 2: Discord (Spans 1 column, height of 2 rows on desktop) */}
        <motion.div 
          className="md:row-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <div className="relative h-full rounded-3xl p-8 bg-gradient-to-br from-[#1a1b2e]/60 to-[#0c0d1b]/80 backdrop-blur-xl border border-white/10 flex flex-col justify-between min-h-[300px] hover:shadow-[0_0_35px_rgba(88,101,242,0.2)] hover:border-[#5865F2]/40 transition-all duration-300">
            {/* Custom Discord glowing SVG background */}
            <div className="absolute top-6 right-6 text-[#5865F2]/20 scale-150">
              <svg width="48" height="48" viewBox="0 0 127.14 96.36" fill="currentColor">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.4-5c.9-.66,1.8-1.34,2.66-2a75.58,75.58,0,0,0,72.46,0c.86.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.4,5,77.84,77.84,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129,54.65,122.64,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
              </svg>
            </div>

            <div>
              <span className="text-xs font-mono text-[#5865F2] uppercase tracking-widest block mb-4">PRIMARY DIRECT</span>
              <h3 className="text-2xl font-bold text-white mb-2">Discord Connection</h3>
              <p className="text-white/60 font-light text-xs leading-relaxed">
                Add my Discord handle to sync, share code, or run late-night builds.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="p-4 rounded-2xl bg-[#0a0a0f]/80 border border-white/5 flex flex-col gap-1">
                <span className="text-[10px] font-mono text-white/40 uppercase">Discord Handle</span>
                <span className="text-base font-bold text-white font-mono select-all tracking-wider">
                  {discordUsername}
                </span>
              </div>

              <motion.button 
                onClick={handleCopy}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-medium text-sm transition-all duration-300 ${
                  copied 
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                    : "bg-[#5865F2] text-white hover:bg-[#4752c4] border border-transparent shadow-[0_0_15px_rgba(88,101,242,0.3)] hover:shadow-[0_0_25px_rgba(88,101,242,0.5)]"
                }`}
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    Copied to Clipboard
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4" />
                    Copy Username
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Card 3: GitHub (Spans 1 column) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <a 
            href="https://github.com/shaurya-disciplined" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block h-full rounded-3xl p-8 bg-[#0a0a0f]/60 backdrop-blur-xl border border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-xl bg-white/5 text-white">
                <GithubIcon className="w-6 h-6" />
              </div>
              <ExternalLinkIcon className="w-4 h-4 text-white/40" />
            </div>
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-2">THE CODEBASE</span>
            <h3 className="text-xl font-bold text-white mb-2">GitHub Profile</h3>
            <p className="text-white/60 font-light text-xs leading-relaxed">
              Explore ongoing repositories, personal configurations, and open source commits.
            </p>
          </a>
        </motion.div>

        {/* Card 4: Email (Spans 1 column) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <a 
            href="mailto:shaurya.disciplined@gmail.com"
            className="block h-full rounded-3xl p-8 bg-[#0a0a0f]/60 backdrop-blur-xl border border-white/10 hover:shadow-[0_0_30px_rgba(212,179,199,0.1)] hover:border-accent/30 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <MailIcon className="w-6 h-6" />
              </div>
              <ExternalLinkIcon className="w-4 h-4 text-white/40" />
            </div>
            <span className="text-xs font-mono text-accent/60 uppercase tracking-widest block mb-2">DIRECT LINE</span>
            <h3 className="text-xl font-bold text-white mb-2">Email</h3>
            <p className="text-white/60 font-light text-xs leading-relaxed truncate">
              shaurya.disciplined@gmail.com
            </p>
          </a>
        </motion.div>

        {/* Card 5: Vibe Link chatbot feature (Desktop spans 2 columns) */}
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <div className="h-full rounded-3xl p-8 bg-[#0a0a0f]/60 backdrop-blur-xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-[0_0_30px_rgba(250,204,21,0.08)] hover:border-yellow-400/20 transition-all duration-300">
            <div className="flex-1">
              <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest block mb-2">FEATURED BUILD</span>
              <h3 className="text-xl font-bold text-white mb-2">Vibe Link Chatbot</h3>
              <p className="text-white/60 font-light text-xs md:text-sm leading-relaxed max-w-md">
                Interactive custom LLM agent featuring dynamic thunder layouts and chat history. Went live from concept to deployment in under 10 days.
              </p>
            </div>
            <a 
              href="https://vibe-link-delta.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 font-medium text-sm transition-all whitespace-nowrap border border-yellow-400/20 focus:outline-none"
            >
              Launch Chatbot
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Card 6: Status / Location Info (Spans 1 column) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <GlassCard className="h-full p-8 min-h-[180px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                  CURRENT COORDINATE
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Pune, India</h3>
              <p className="text-white/50 font-light text-xs leading-relaxed">
                Operating under quiet discipline. Focus is split between academics (JEE 2027) and late-night builds.
              </p>
            </div>
          </GlassCard>
        </motion.div>

      </div>
    </div>
  );
}
