"use client";

import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Project } from "@/lib/cms/types";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <section
      id="work"
      className="section-container pt-8 pb-16 md:pt-12 md:pb-20"
      aria-labelledby="work-heading"
    >
      <SectionHeading
        title="Products & platforms I've shaped"
        serif
        align="center"
        className="[&_h2]:text-[clamp(1.85rem,4vw,3rem)]"
      />

      <div className="relative flex flex-col gap-16 md:gap-24">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
