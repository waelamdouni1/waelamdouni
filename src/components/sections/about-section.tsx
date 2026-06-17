"use client";

import { motion } from "framer-motion";

import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { AnimatedHeading } from "@/components/shared/animated-heading";
import { aboutBio, aboutMetrics } from "@/data/about";

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-container section-spacing border-t border-border/30"
      aria-labelledby="about-heading"
    >
      <ScrollReveal>
        <p className="mb-4 text-xs font-medium tracking-[0.2em] uppercase opacity-70">
          About Me
        </p>
        <AnimatedHeading id="about-heading" className="max-w-4xl !text-[clamp(1.75rem,4vw,3.25rem)]">
          <span className="block font-serif leading-[1.1]">{aboutBio}</span>
        </AnimatedHeading>
      </ScrollReveal>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-6 lg:grid-cols-4">
        {aboutMetrics.map((metric, i) => (
          <motion.div
            key={metric.id}
            className="flex flex-col justify-center rounded-2xl bg-card p-6 text-card-foreground shadow-premium transition-transform duration-300 hover:-translate-y-1 sm:rounded-3xl sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.08,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4 }}
          >
            {metric.value ? (
              <>
                <span className="font-serif text-3xl tracking-tight sm:text-4xl">
                  {metric.value}
                </span>
                <span className="mt-2 text-sm font-medium leading-snug opacity-75">
                  {metric.label}
                </span>
              </>
            ) : (
              <span className="font-serif text-xl leading-tight tracking-tight sm:text-2xl">
                {metric.label}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
