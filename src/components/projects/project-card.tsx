"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import type { Project } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll of this card relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scale down and fade slightly as the next card stacks on top of it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.55]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={containerRef}
      className="sticky top-20 md:top-24 w-full pb-12 md:pb-16"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.article
        style={{ scale, opacity }}
        className="group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-border/40 bg-card/65 backdrop-blur-md p-5 sm:p-6 md:p-8 shadow-premium transition-all duration-500 hover:shadow-premium-lg hover:border-border/60 hover:-translate-y-1.5"
      >
        <Link
          href={`/projects/${project.slug}`}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center cursor-none focus-visible:outline-none"
          data-cursor="pointer"
          aria-label={`View case study: ${project.title}`}
        >
          {/* Visual Block */}
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl md:rounded-[1.75rem] bg-card aspect-[4/3] sm:aspect-[16/10] md:col-span-7 w-full shadow-premium",
              !isEven && "md:order-last"
            )}
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {/* Content Block */}
          <div className="flex flex-col h-full md:col-span-5 px-1 md:py-2 justify-between">
            <div>
              {/* Category & Year */}
              <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase text-muted-foreground/80">
                <span>{project.category}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-border/80" />
                <span>{project.year}</span>
              </div>

              {/* Title */}
              <h3 className="mt-3.5 font-serif text-2xl sm:text-3xl md:text-3xl lg:text-4xl tracking-tight leading-tight transition-colors duration-300 group-hover:text-primary">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-base leading-relaxed opacity-75 line-clamp-3 md:line-clamp-none">
                {project.description}
              </p>
            </div>

            {/* Tags & Action CTA */}
            <div className="mt-6">
              <ul className="flex flex-wrap gap-2" aria-label="Project tags">
                {project.tags.slice(0, 3).map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-white/5 border border-border/50 px-2.5 py-0.5 text-xs opacity-80 transition-colors duration-300 group-hover:border-foreground/20"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors text-muted-foreground group-hover:text-primary">
                  View Case Study
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    </div>
  );
}
