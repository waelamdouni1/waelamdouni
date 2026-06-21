"use client";

import { motion } from "framer-motion";
import { Mail, Download } from "lucide-react";

import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export function ClosingCta() {
  const cvLink = "https://drive.google.com/file/d/1l7qyR-rCjOegd-LwG6NSH6gpjrDU7nMQ/view?usp=drive_link";

  return (
    <section className="relative overflow-hidden border-t border-border/30 bg-[#070708] py-20 sm:py-28 md:py-36">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -bottom-32 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-[#D22E28]/10 blur-[100px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 hero-grain opacity-[0.15] mix-blend-overlay" />
      </div>

      <div className="section-container relative z-10">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl text-center">
            {/* Tagline */}
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-primary/95">
              Let&apos;s Connect
            </p>

            {/* Heading */}
            <h2 className="font-serif text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-foreground">
              Ready to design something <span className="italic text-primary">remarkable</span> together?
            </h2>

            {/* Paragraph */}
            <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
              Have a B2B SaaS platform, complex dashboard system, or a digital product concept in mind? Let&apos;s build an intuitive experience that users love.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
              <MagneticButton strength={0.15}>
                <Button size="lg" className="w-full sm:w-auto h-12 px-6 rounded-full flex items-center justify-center gap-2 group" asChild>
                  <a href={`mailto:${siteConfig.email}`} data-cursor="pointer">
                    <Mail className="size-4 opacity-80 group-hover:scale-105 transition-transform" />
                    <span>Get in Touch</span>
                  </a>
                </Button>
              </MagneticButton>

              <MagneticButton strength={0.15}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-6 rounded-full flex items-center justify-center gap-2 border-border/50 hover:bg-white/5 group" asChild>
                  <a
                    href={cvLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="pointer"
                  >
                    <Download className="size-4 opacity-80 group-hover:translate-y-0.5 transition-transform" />
                    <span>Download CV</span>
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
