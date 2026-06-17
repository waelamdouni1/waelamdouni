import { caseStudies } from "@/data/case-studies";
import type { Project, ProjectCaseStudy } from "@/lib/cms/types";

export function getAllProjects(): Project[] {
  return caseStudies;
}

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return caseStudies.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return caseStudies.map((p) => p.slug);
}
