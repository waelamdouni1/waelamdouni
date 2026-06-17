"use client";

import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { ImageReveal } from "@/components/effects/image-reveal";
import { ProjectGallery } from "@/components/projects/project-gallery";
import type { ProjectCaseStudy } from "@/lib/cms/types";

interface CaseStudyContentProps {
  project: ProjectCaseStudy;
}

function CaseStudyBlock({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <ScrollReveal>
      <section id={id} className="scroll-mt-32 pb-20 md:pb-28">
        <h3 className="font-serif text-2xl tracking-tight sm:text-3xl">{title}</h3>
        <div className="mt-5 max-w-3xl text-base leading-relaxed opacity-85 sm:text-lg">
          {children}
        </div>
      </section>
    </ScrollReveal>
  );
}

export function CaseStudyContent({ project }: CaseStudyContentProps) {
  return (
    <div className="min-w-0 flex-1">
      <section id="overview" className="scroll-mt-32 pb-20 md:pb-28">
        <ScrollReveal>
          <h3 className="font-serif text-2xl tracking-tight sm:text-3xl">
            Project Overview
          </h3>
          <p className="mt-5 max-w-3xl text-base leading-relaxed opacity-85 sm:text-lg">
            {project.overview}
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/40 bg-white/5 p-4">
              <dt className="text-xs uppercase tracking-wider opacity-60">Role</dt>
              <dd className="mt-1 text-sm font-medium">{project.role}</dd>
            </div>
            <div className="rounded-2xl border border-border/40 bg-white/5 p-4">
              <dt className="text-xs uppercase tracking-wider opacity-60">Timeline</dt>
              <dd className="mt-1 text-sm font-medium">{project.timeline}</dd>
            </div>
            <div className="rounded-2xl border border-border/40 bg-white/5 p-4">
              <dt className="text-xs uppercase tracking-wider opacity-60">Year</dt>
              <dd className="mt-1 text-sm font-medium">{project.year}</dd>
            </div>
          </dl>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.deliverables.map((d) => (
              <li
                key={d}
                className="rounded-full border border-border/50 px-3 py-1 text-xs opacity-80"
              >
                {d}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </section>

      <CaseStudyBlock id="problem" title="Problem Statement">
        <p>{project.problem}</p>
      </CaseStudyBlock>

      <CaseStudyBlock id="research" title="Research & Discovery">
        <p>{project.research}</p>
      </CaseStudyBlock>

      <CaseStudyBlock id="strategy" title="UX Strategy">
        <p>{project.uxStrategy}</p>
      </CaseStudyBlock>

      <section id="ui" className="scroll-mt-32 pb-20 md:pb-28">
        <ScrollReveal>
          <h3 className="font-serif text-2xl tracking-tight sm:text-3xl">UI Showcase</h3>
          <p className="mt-4 max-w-3xl text-base opacity-80">
            Final interface explorations and key product screens.
          </p>
        </ScrollReveal>
        <div className="mt-10 space-y-10 md:space-y-12">
          {project.uiShowcase.map((img, i) => (
            <ImageReveal
              key={img.src}
              src={img.src}
              alt={img.alt}
              aspectRatio="video"
              className="rounded-3xl shadow-premium-lg border border-border/20"
              priority={i === 0}
            />
          ))}
        </div>
      </section>

      <CaseStudyBlock id="system" title="Design System">
        <p>{project.designSystem}</p>
      </CaseStudyBlock>

      <section id="results" className="scroll-mt-32">
        <ScrollReveal>
          <h3 className="font-serif text-2xl tracking-tight sm:text-3xl">Final Results</h3>
          <p className="mt-5 max-w-3xl text-base leading-relaxed opacity-85 sm:text-lg">
            {project.results}
          </p>
        </ScrollReveal>
        <div className="mt-12">
          <ProjectGallery images={project.gallery} columns={2} />
        </div>
      </section>
    </div>
  );
}
