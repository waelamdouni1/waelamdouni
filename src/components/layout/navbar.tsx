"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, type ReactNode } from "react";

import { MagneticButton } from "@/components/effects/magnetic-button";
import { CopyEmailButton } from "@/components/shared/copy-email-button";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const socialIcons: Record<string, ReactNode> = {
  twitter: (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const backdropOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      className={cn(
        "fixed top-0 right-0 left-0 z-40 transition-colors duration-300",
        scrolled && "border-b border-border/50"
      )}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <motion.div
        className="absolute inset-0 bg-background/75 backdrop-blur-xl"
        style={{ opacity: backdropOpacity }}
      />
      <nav
        className="section-container relative flex h-14 items-center justify-between gap-3 sm:h-16 md:h-20"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 font-medium"
          data-cursor="pointer"
        >
          {siteConfig.avatar && !avatarError && (
            <div className="relative size-8 shrink-0 overflow-hidden rounded-full border border-border/30 bg-white/10 shadow-premium transition-transform duration-300 group-hover:scale-105">
              <Image
                src={siteConfig.avatar}
                alt={siteConfig.name}
                width={32}
                height={32}
                className="size-full object-cover"
                unoptimized
                onError={() => {
                  setAvatarError(true);
                }}
              />
            </div>
          )}
          <span className="truncate text-sm sm:text-base link-underline">
            {siteConfig.name.split(" ")[0]}
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {siteConfig.social.map((item) => (
            <MagneticButton key={item.label} strength={0.2}>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full border border-transparent hover:border-border/40 hover:bg-white/10 sm:size-10"
                asChild
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  data-cursor="pointer"
                >
                  {socialIcons[item.icon]}
                </a>
              </Button>
            </MagneticButton>
          ))}

          <MagneticButton strength={0.2}>
            <a
              href="https://drive.google.com/file/d/1j8Fc0lIFQwAdkAuajPeSKb_s5s4jxWag/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-9 sm:h-10 items-center gap-1.5 rounded-full border border-border/50 bg-white/10 px-3 sm:px-4 text-xs sm:text-sm font-medium backdrop-blur-sm transition-all duration-300",
                "hover:bg-white/20 hover:shadow-md active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              )}
              data-cursor="pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-3.5 opacity-80"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <span className="hidden sm:inline">Download CV</span>
              <span className="sm:hidden">CV</span>
            </a>
          </MagneticButton>

          <CopyEmailButton className="ml-0.5 h-9 sm:h-10" />
        </div>
      </nav>
    </motion.header>
  );
}
