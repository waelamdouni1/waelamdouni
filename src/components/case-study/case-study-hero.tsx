"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import type { ProjectCaseStudy } from "@/lib/cms/types";

interface CaseStudyHeroProps {
  project: ProjectCaseStudy;
}

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <section className="section-container pb-12 pt-24 sm:pt-26 md:pb-16">
      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={heroItemVariants}
          className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground"
        >
          {project.category} · {project.year}
        </motion.p>
        <motion.h1
          variants={heroItemVariants}
          className="editorial-heading mt-4 max-w-4xl text-balance"
        >
          {project.title}
        </motion.h1>
        <motion.p
          variants={heroItemVariants}
          className="mt-6 max-w-2xl text-base opacity-80 sm:text-lg"
        >
          {project.description}
        </motion.p>
      </motion.div>

      <motion.div
        className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[2rem] bg-card shadow-premium-lg md:mt-16 md:rounded-[2.5rem] border border-border/20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.3, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full relative"
        >
          <Image
            src={project.heroImage}
            alt={project.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
