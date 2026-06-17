"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AnimatedHeadingProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function AnimatedHeading({
  id,
  className,
  children,
}: AnimatedHeadingProps) {
  return (
    <h1 id={id} className={cn("editorial-heading text-balance font-serif", className)}>
      {children}
    </h1>
  );
}

interface AnimatedLineProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedLine({ children, delay = 0, className }: AnimatedLineProps) {
  return (
    <span className={cn("block overflow-hidden", className)}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface HighlightTextProps {
  children: ReactNode;
  delay?: number;
}

export function HighlightText({ children, delay = 0.5 }: HighlightTextProps) {
  return (
    <span className="relative inline-block whitespace-nowrap px-2.5 ml-2">
      <motion.span
        className="absolute -inset-x-4 -inset-y-2.5 z-0 rounded-2xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-[12px] saturate-[180%]"
        style={{
          borderColor: "rgba(164, 219, 255, 0.35)", // subtle cool-toned ice-blue edge
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
          boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.25), 0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute bottom-0 left-0 z-0 h-[3px] w-full rounded-full bg-gradient-to-r from-transparent via-white to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left center" }}
      />
      <motion.span
        className="relative z-10 bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text font-semibold italic text-transparent"
        animate={{
          filter: [
            "drop-shadow(0 0 0px rgba(255,255,255,0))",
            "drop-shadow(0 0 16px rgba(255,255,255,0.5))",
            "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
          ],
        }}
        transition={{ duration: 3, delay: delay + 0.2, repeat: Infinity, repeatType: "reverse" }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute -inset-x-1 -inset-y-1 -z-10 rounded-lg opacity-0 blur-md"
        animate={{ opacity: [0, 0.4, 0.2] }}
        transition={{ duration: 3, delay: delay + 0.3, repeat: Infinity, repeatType: "reverse" }}
        style={{ background: "rgba(255,255,255,0.15)" }}
        aria-hidden
      />
    </span>
  );
}
