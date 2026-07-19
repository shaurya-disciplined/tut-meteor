"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { Footer } from "@/components/Footer";
import { getCar, adjacentCar, type Car } from "@/data/cars";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MidnightCarPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const car = slug ? getCar(slug) : undefined;

  if (!car) return notFound();

  const nav = adjacentCar(car.slug)!;

  return (
    <div className="relative w-full flex flex-col overflow-hidden bg-void">
      {/* Breadcrumb */}
      <div className="px-6 lg:px-12 pt-28 md:pt-32 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <Magnetic strength={10}>
              <Link
                href="/midnight"
                data-cursor="back"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted hover:text-text transition-colors"
              >
                <span className="text-signal">←</span> 05 · MIDNIGHT
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>

      {/* Hero */}
      <section className="relative w-full mt-6">
        <div className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden rounded-sm ring-1 ring-line">
          <motion.div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: `url(${car.src})`,
              backgroundPosition: car.pos,
              filter: "brightness(0.8) contrast(1.05)",
            }}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: EASE }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
        </div>
      </section>

      {/* Header */}
      <section className="px-6 lg:px-12 pt-12 md:pt-16 pb-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-5">
            <div className="eyebrow flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-signal" />
              {car.index} · MIDNIGHT
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.9] text-text">{car.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 font-display italic text-2xl md:text-3xl text-muted">{car.subtitle}</p>
          </Reveal>
        </div>
      </section>

      {/* Essay & Dashboard */}
      <section className="px-6 lg:px-12 pb-16 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
          
          {/* Essay (Left) */}
          <div className="flex-1 max-w-2xl">
            <Reveal>
              <div className="eyebrow flex items-center gap-3 mb-8">
                <span className="inline-block w-6 h-px bg-signal" />
                Why this one
              </div>
            </Reveal>
            <div className="flex flex-col gap-6">
              {car.essay.map((para, i) => (
                <Reveal key={i} delay={0.1 + i * 0.05}>
                  <p className="text-lg md:text-xl font-light leading-relaxed text-muted">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Zonda Signature: Carbon Fiber Band */}
            {car.slug === "pagani-zonda" && (
              <Reveal delay={0.3}>
                <div
                  className="mt-12 h-8 w-full rounded-sm opacity-50"
                  style={{
                    background: "repeating-linear-gradient(45deg, #111 0px, #111 4px, #222 4px, #222 8px)",
                  }}
                />
              </Reveal>
            )}
          </div>

          {/* Dashboard HUD (Right) */}
          <div className="w-full md:w-80 shrink-0 mt-8 md:mt-0">
            <Reveal delay={0.2}>
              <GaugeCluster car={car} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="px-6 lg:px-12 pt-14 pb-24 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-4 md:gap-8 border-t border-line pt-10">
          <NavCard label="Previous" car={nav.prev} align="left" />
          <NavCard label="Next" car={nav.next} align="right" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function GaugeCluster({ car }: { car: Car }) {
  return (
    <div className="bg-[#08080a] ring-1 ring-white/5 rounded-xl p-8 shadow-2xl shadow-black/80 flex flex-col gap-8 relative overflow-hidden">
      {/* Background HUD elements */}
      <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
        <div className="w-16 h-16 border-[0.5px] border-signal rounded-full border-dashed" />
      </div>

      <div className="font-mono text-[10px] uppercase tracking-widest text-signal/80 mb-2">
        Telemetry / {car.title}
      </div>

      <div className="flex flex-col gap-6">
        <SpecDial label="Engine" value={car.specs.engine} />
        <SpecDial label="Power" value={car.specs.power} carSlug={car.slug} isNumeric />
        <SpecDial label="Weight" value={car.specs.weight} carSlug={car.slug} isNumeric />
        <SpecDial label="Top Speed" value={car.specs.topSpeed} carSlug={car.slug} isSpeed />
        <SpecDial label="Units" value={car.specs.unitsBuilt} carSlug={car.slug} isNumeric />
      </div>
    </div>
  );
}

function SpecDial({ label, value, carSlug, isNumeric, isSpeed }: { label: string; value: string; carSlug?: string; isNumeric?: boolean; isSpeed?: boolean }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract number and unit if numeric
  const match = value.match(/^([\d,]+)\s*(.*)$/);
  const numStr = match ? match[1].replace(/,/g, "") : value;
  const unit = match ? match[2] : "";
  const numValue = parseInt(numStr, 10);

  // Huayra signature: Dials sweep up from zero
  const isHuayra = carSlug === "pagani-huayra" && isNumeric;
  const [count, setCount] = useState(isHuayra ? 0 : numValue);

  // Chiron signature: Numerals strip blurring past
  const isChironSpeed = carSlug === "bugatti-chiron" && isSpeed;
  const [chironCount, setChironCount] = useState(isChironSpeed ? 0 : numValue);

  useEffect(() => {
    if (isHuayra && isInView && !isNaN(numValue)) {
      const start = 0;
      const duration = 1500;
      const startTime = performance.now();
      
      const animateCount = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(start + (numValue - start) * ease);
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(numValue);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isInView, isHuayra, numValue]);

  useEffect(() => {
    if (isChironSpeed && isInView && !isNaN(numValue)) {
      // Slot machine effect to 420
      const start = 0;
      const duration = 1200; // Quick burst
      const startTime = performance.now();
      
      const animateCount = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentCount = Math.floor(start + (numValue - start) * ease);
        setChironCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setChironCount(numValue);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isInView, isChironSpeed, numValue]);

  return (
    <div ref={ref} className="flex flex-col gap-1 border-b border-line pb-4 last:border-0 last:pb-0">
      <div className="font-mono text-[9px] uppercase tracking-widest text-muted/60">{label}</div>
      <div className="font-mono text-xl md:text-2xl text-text relative overflow-hidden">
        {isChironSpeed && !isNaN(numValue) ? (
          <div className="flex items-baseline gap-1 relative">
            <motion.span
              initial={{ filter: "blur(12px)", scale: 1.1, opacity: 0.5 }}
              animate={isInView ? { filter: "blur(0px)", scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {chironCount}
            </motion.span>
            {unit && <span className="text-[11px] text-muted ml-1">{unit}</span>}
          </div>
        ) : isHuayra && !isNaN(numValue) ? (
          <div className="flex items-baseline gap-1">
            <span>{count.toLocaleString()}</span>
            {unit && <span className="text-[11px] text-muted ml-1">{unit}</span>}
          </div>
        ) : (
          <div>{value}</div>
        )}
      </div>
    </div>
  );
}

function NavCard({ label, car, align }: { label: string; car: Car; align: "left" | "right" }) {
  const right = align === "right";
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.4, ease: EASE }}>
      <Link
        href={`/midnight/${car.slug}`}
        data-cursor="open"
        className={`group flex flex-col gap-1 ${right ? "items-end text-right" : "items-start text-left"}`}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60 group-hover:text-signal transition-colors">
          {label}
        </span>
        <span className="text-base md:text-lg text-text group-hover:text-signal transition-colors">
          <span className="font-mono text-xs mr-2 text-signal">{car.index}</span>
          {car.title}
        </span>
      </Link>
    </motion.div>
  );
}
