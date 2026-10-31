import type { Project, ProjectType, ViewerProject } from "./schema";

export type Filter = "all" | ProjectType;

// Content types keep their data names; visitors see these labels.
export const TYPE_LABEL: Record<ProjectType, string> = {
  "case-study": "Work",
  "website-hero": "Web design",
  experiment: "Experiment",
};

export const TABS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "case-study", label: "Work" },
  { value: "experiment", label: "Experiments" },
  { value: "website-hero", label: "Web design" },
];

export function parseFilter(value: unknown): Filter {
  return TABS.some((t) => t.value === value) ? (value as Filter) : "all";
}

export function opensInViewer(project: Project): project is ViewerProject {
  return project.type !== "case-study";
}
