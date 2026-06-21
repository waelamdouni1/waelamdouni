"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black" aria-hidden>
      {/* Ambient background glows - Cobalt Blue Orbs */}
      <motion.div
        className="absolute -top-40 -right-40 h-[450px] w-[450px] rounded-full bg-[#D22E28]/18 blur-[120px]"
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full bg-[#D22E28]/12 blur-[100px]"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-[#D22E28]/5 blur-[90px]"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Dark gradient mask overlays to create premium depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/20" />

      {/* Grain texture for the editorial feel */}
      <motion.div
        className="absolute inset-0 opacity-[0.3] mix-blend-overlay hero-grain sm:opacity-[0.22]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.4, delay: 0.2 }}
      />
    </div>
  );
}
