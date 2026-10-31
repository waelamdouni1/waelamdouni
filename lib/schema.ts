import { z } from "zod";

// The content model from the PRD. Local JSON is validated against it at build
// time; a CMS adapter only has to return data of the same shape.

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case");

const image = z.object({
  src: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
});

const previewMedia = z.object({
  src: z.string(),
  kind: z.enum(["video", "image"]),
  poster: z.string(),
});

const viewerMedia = z.object({
  src: z.string(),
  kind: z.enum(["image", "video", "embed"]),
  /** An animated GIF/WebP. Shown as the still poster when reduced motion is on. */
  animated: z.boolean().default(false),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
});

const base = {
  title: z.string().min(1),
  slug,
  summary: z.string().min(1).max(120),
  thumbnail: image,
  previewMedia,
  tags: z.array(z.string()).default([]),
  year: z.number().int(),
  featured: z.boolean().default(false),
  order: z.number().int(),
};

const caseStudy = z.object({
  ...base,
  type: z.literal("case-study"),
  role: z.string(),
  team: z.string().optional(),
  timeline: z.string().optional(),
  /** Short project overview, shown before the problem. */
  overview: z.array(z.string()).default([]),
  problem: z.array(z.string()).min(1),
  /** Extra titled sections between the problem and the approach, e.g. research or strategy. */
  sections: z.array(z.object({ title: z.string().min(1), body: z.array(z.string()).min(1) })).default([]),
  /** What was designed in answer to the problem. */
  approach: z.array(z.string()).default([]),
  outcome: z.array(z.string()).default([]),
  /** Short list of what the project shows, e.g. methods and decisions. */
  highlights: z.array(z.string()).default([]),
  screenshots: z.array(image.extend({ caption: z.string().min(1) })).min(1).max(8),
  prototypeUrl: z.url().optional(),
});

const websiteHero = z.object({
  ...base,
  type: z.literal("website-hero"),
  media: viewerMedia,
  caption: z.string(),
  externalUrl: z.url().optional(),
  /** More screens of the same work, shown under the main media when it opens. */
  gallery: z.array(image).default([]),
});

const experiment = z.object({
  ...base,
  type: z.literal("experiment"),
  media: viewerMedia,
  caption: z.string(),
  externalUrl: z.url().optional(),
  prototypeUrl: z.url().optional(),
  /** More screens of the same work, shown under the main media when it opens. */
  gallery: z.array(image).default([]),
});

export const projectSchema = z.discriminatedUnion("type", [caseStudy, websiteHero, experiment]);

export const siteSchema = z.object({
  name: z.string(),
  /** Shown in the dock next to the avatar. Defaults to the first word of `name`. */
  shortName: z.string().optional(),
  role: z.string(),
  /** One sentence, used for search and social previews. */
  bio: z.string(),
  /** About card paragraphs. Supports [label](url) links and line breaks. */
  about: z.array(z.string()).min(1),
  /** Path to a square portrait in /public; initials are shown when missing. */
  avatar: z.string().nullable().default(null),
  email: z.email(),
  /** Path to a PDF in /public (e.g. "/resume.pdf"); the download button shows once it's set. */
  resume: z.string().nullable().default(null),
  siteUrl: z.url(),
  /** Promo widget pinned to the top-right of the home page. */
  featured: z
    .object({
      kicker: z.string(),
      title: z.string(),
      text: z.string(),
      cta: z.string(),
      /** Live site; until it's set, the button opens `project` inside the portfolio. */
      url: z.url().optional(),
      project: z.string().optional(),
      cover: image,
    })
    .nullable()
    .default(null),
  socials: z
    .array(z.object({ label: z.string(), url: z.url(), icon: z.enum(["x", "linkedin", "framer"]).optional() }))
    .default([]),
});

export type Project = z.infer<typeof projectSchema>;
export type CaseStudy = z.infer<typeof caseStudy>;
export type ViewerProject = z.infer<typeof websiteHero> | z.infer<typeof experiment>;
export type ProjectType = Project["type"];
export type SiteSettings = z.infer<typeof siteSchema>;
export type ProjectImage = z.infer<typeof image>;
export type ViewerMedia = z.infer<typeof viewerMedia>;
