"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

import type { CaseStudySection } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

interface CaseStudySidebarProps {
  sections: CaseStudySection[];
  title: string;
  category: string;
}

export function CaseStudySidebar({
  sections,
  title,
  category,
}: CaseStudySidebarProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first section that is intersecting in the upper-middle of the screen
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0.05,
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <Link
        href="/#work"
        className="link-underline mb-8 inline-flex items-center gap-2 text-sm font-medium opacity-80 hover:opacity-100"
        data-cursor="pointer"
      >
        <ArrowLeft className="size-4" />
        Back to work
      </Link>

      <div className="mb-8">
        <p className="text-xs font-medium tracking-[0.2em] uppercase opacity-60">
          {category}
        </p>
        <h2 className="mt-2 font-serif text-2xl leading-tight tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>

      <nav aria-label="Case study sections">
        <ul className="relative space-y-1 border-l border-border/40 pl-4">
          {sections.map((section, i) => {
            const isActive = activeSection === section.id;
            return (
              <li key={section.id} className="relative">
                <a
                  href={`#${section.id}`}
                  className={cn(
                    "relative block py-2 text-sm transition-all duration-300 focus-visible:outline-none",
                    isActive
                      ? "font-medium text-foreground opacity-100"
                      : "text-muted-foreground opacity-65 hover:opacity-100"
                  )}
                  data-cursor="pointer"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSectionIndicator"
                      className="absolute -left-[17px] top-1 bottom-1 w-[2px] bg-foreground"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    {section.label}
                  </motion.span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
