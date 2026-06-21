"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import {
  AnimatedHeading,
  AnimatedLine,
} from "@/components/shared/animated-heading";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { HeroBackground } from "@/components/sections/hero-background";
import { ChatWidget } from "@/components/sections/chat-widget";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[35vh] lg:min-h-[40vh] items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <HeroBackground />

      <motion.div
        className="section-container relative z-10 w-full pt-20 pb-4 md:pt-24 md:pb-6 lg:pt-24 lg:pb-8 flex flex-col justify-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <AnimatedHeading id="hero-heading" className="hero-editorial-heading text-[clamp(2.25rem,5.5vw,4.5rem)] text-left">
              <AnimatedLine delay={0.2}>Designing Websites/apps</AnimatedLine>
              <AnimatedLine delay={0.35}>
                for companies like <span className="italic">IOT Squared</span>
              </AnimatedLine>
            </AnimatedHeading>

            <motion.p
              className="mt-6 max-w-xl text-base opacity-75 sm:text-lg md:text-xl font-medium leading-relaxed text-foreground"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {siteConfig.role}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 justify-start w-full sm:w-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticButton>
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="#work" data-cursor="pointer">
                    View Projects
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <a
                    href={`mailto:${siteConfig.email}`}
                    data-cursor="pointer"
                  >
                    <span className="link-underline">Contact Me</span>
                  </a>
                </Button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Chat/Messenger conversation simulator */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end w-full"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ChatWidget />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
