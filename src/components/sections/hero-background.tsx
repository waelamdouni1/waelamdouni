"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export const HERO_IMAGE = "/images/hero-workspace.png";

export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.16]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Background image — cover / center / no-repeat via next/image */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: imageY, scale: imageScale }}
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1.08 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-bg-image"
        />
      </motion.div>

      {/* Dark cinematic base */}
      <motion.div
        className="absolute inset-0 bg-black/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.15 }}
      />

      {/* Red portfolio tint — stronger on mobile for readability */}
      <motion.div
        className="absolute inset-0 bg-[#ff2d2d]/50 mix-blend-multiply"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.25 }}
      />

      {/* Left-heavy gradient for typography */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#ff2d2d]/95 via-[#ff2d2d]/78 to-[#ff2d2d]/25 sm:from-[#ff2d2d]/92 sm:via-[#ff2d2d]/65 sm:to-[#ff2d2d]/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.35 }}
      />

      {/* Vertical depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#ff2d2d]/30 via-transparent to-[#ff2d2d]/85"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.45 }}
      />

      {/* Soft blur vignette on right edge */}
      <div className="absolute inset-y-0 right-0 hidden w-1/3 backdrop-blur-[2px] sm:block" />

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-[#ff2d2d]/40 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-black/30 blur-[80px]"
        animate={{ x: [0, -20, 0], y: [0, 15, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grain texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.35] mix-blend-overlay hero-grain sm:opacity-[0.28]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.4, delay: 0.55 }}
      />
    </div>
  );
}
