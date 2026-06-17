export type {
  ContentCollection,
  Project,
  ProjectCaseStudy,
  SiteConfig,
} from "./types";

export { getAllProjects, getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
export { siteConfig } from "@/data/site";
