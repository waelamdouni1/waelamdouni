"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  serif?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
  serif = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14 md:mb-20",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <motion.span
          className="mb-4 block text-xs font-medium tracking-[0.2em] uppercase opacity-70"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        className={cn(
          serif
            ? "editorial-heading text-balance font-serif"
            : "font-serif text-3xl tracking-tight sm:text-4xl md:text-5xl"
        )}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed opacity-80 sm:text-lg",
            align === "center" && "mx-auto"
          )}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
