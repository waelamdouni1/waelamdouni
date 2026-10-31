import "server-only";
import { z } from "zod";
import projectsJson from "@/content/projects.json";
import siteJson from "@/content/site.json";
import { projectSchema, siteSchema, type Project } from "./schema";

// The only module that knows content lives in local JSON.
// To connect a CMS, reimplement these functions against its API.

const projects: Project[] = z
  .array(projectSchema)
  .parse(projectsJson)
  .sort((a, b) => a.order - b.order);

const duplicate = projects.find((p, i) => projects.findIndex((q) => q.slug === p.slug) !== i);
if (duplicate) throw new Error(`Duplicate project slug: ${duplicate.slug}`);

const site = siteSchema.parse(siteJson);

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Previous and next project of the same type, wrapping around. */
export function getAdjacent(slug: string): { prev: Project; next: Project } | null {
  const current = getProject(slug);
  if (!current) return null;
  const siblings = projects.filter((p) => p.type === current.type);
  if (siblings.length < 2) return null;
  const i = siblings.indexOf(current);
  return {
    prev: siblings[(i - 1 + siblings.length) % siblings.length],
    next: siblings[(i + 1) % siblings.length],
  };
}

export function getSiteSettings() {
  return site;
}
