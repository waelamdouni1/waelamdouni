"use client";

import { motion } from "framer-motion";

import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { processSteps } from "@/data/process";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="section-container section-spacing"
      aria-labelledby="process-heading"
    >
      <SectionHeading
        label="Process"
        title="How I partner with product teams"
        description="A structured loop from discovery to delivery — built for SaaS velocity and stakeholder alignment."
        serif
      />

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {processSteps.map((step, i) => (
          <ScrollReveal key={step.id} delay={i * 0.08}>
            <motion.div
              className="group h-full rounded-2xl border border-border/40 p-6 transition-all duration-300 hover:border-foreground/30 hover:bg-white/5 hover:shadow-premium sm:rounded-3xl sm:p-8 dark:hover:bg-white/5"
              whileHover={{ y: -4 }}
            >
              <span className="font-serif text-3xl opacity-40">{step.number}</span>
              <h3 className="mt-4 text-lg font-semibold sm:text-xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-75">{step.description}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
