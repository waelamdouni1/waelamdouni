import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyContent } from "@/components/case-study/case-study-content";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySidebar } from "@/components/case-study/case-study-sidebar";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/data/site";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — ${siteConfig.name}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.heroImage }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main>
      <Navbar />
      <CaseStudyHero project={project} />
      <div className="section-container pb-24 md:pb-32">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 xl:gap-24">
          <div className="lg:w-[240px] lg:shrink-0 xl:w-[280px]">
            <CaseStudySidebar
              sections={project.sidebarSections}
              title={project.title}
              category={project.category}
            />
          </div>
          <CaseStudyContent project={project} />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
