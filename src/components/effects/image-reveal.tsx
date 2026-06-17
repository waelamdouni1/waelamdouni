"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  aspectRatio?: "video" | "square" | "portrait" | "auto" | string;
  priority?: boolean;
}

export function ImageReveal({
  src,
  alt,
  className,
  imageClassName,
  aspectRatio = "video",
  priority = false,
}: ImageRevealProps) {
  const aspectClass = {
    video: "aspect-[16/9]",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    auto: "",
  }[aspectRatio] || aspectRatio;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("group relative overflow-hidden bg-card shadow-premium border border-border/10", aspectClass, className)}
    >
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full h-full relative"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1200px) 100vw, 1000px"
          className={cn("object-cover transition-transform duration-700 ease-out group-hover:scale-105", imageClassName)}
          priority={priority}
        />
      </motion.div>
    </motion.div>
  );
}
