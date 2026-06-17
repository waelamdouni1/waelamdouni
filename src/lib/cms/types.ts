/** CMS-ready content contracts */

export type ProjectCategory =
  | "B2B SaaS"
  | "Dashboard Design"
  | "Mobile Apps"
  | "EV Charging"
  | "UX Strategy"
  | "Design Systems";

export type SocialIcon = "twitter" | "linkedin";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  featured: boolean;
  size: "tall" | "medium" | "short";
  year: number;
}

export interface CaseStudySection {
  id: string;
  label: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectCaseStudy extends Project {
  overview: string;
  role: string;
  timeline: string;
  deliverables: string[];
  problem: string;
  research: string;
  uxStrategy: string;
  designSystem: string;
  results: string;
  heroImage: string;
  gallery: GalleryImage[];
  uiShowcase: GalleryImage[];
  sidebarSections: CaseStudySection[];
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface Metric {
  id: string;
  value: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  email: string;
  avatar: string;
  social: {
    label: string;
    href: string;
    icon: SocialIcon;
  }[];
  seo: {
    title: string;
    description: string;
  };
}

export interface ContentCollection<T> {
  items: T[];
  source?: string;
}
