import type { Project, ProjectType, ViewerProject } from "./schema";

export type Filter = "all" | Exclude<ProjectType, "project">;

// Content types keep their data names; visitors see these labels.
export const TYPE_LABEL: Record<ProjectType, string> = {
  "case-study": "Work",
  project: "Work",
  "website-hero": "Web design",
  experiment: "Experiment",
};

export const TABS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "case-study", label: "Work" },
  { value: "experiment", label: "Experiments" },
  { value: "website-hero", label: "Web design" },
];

/** The tab each type is listed under: plain projects sit with the case studies under Work. */
export const TAB_OF: Record<ProjectType, Exclude<Filter, "all">> = {
  "case-study": "case-study",
  project: "case-study",
  "website-hero": "website-hero",
  experiment: "experiment",
};

export function inTab(project: Project, filter: Filter) {
  return filter === "all" || TAB_OF[project.type] === filter;
}

export function parseFilter(value: unknown): Filter {
  return TABS.some((t) => t.value === value) ? (value as Filter) : "all";
}

export function opensInViewer(project: Project): project is ViewerProject {
  return project.type !== "case-study";
}
