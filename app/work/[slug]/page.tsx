import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacent, getProject, getProjects, getSiteSettings } from "@/lib/content";
import { Header } from "@/components/Header";
import { AboutStrip } from "@/components/AboutStrip";
import { ProjectNav } from "@/components/ProjectNav";
import { ViewerBody } from "@/components/ViewerBody";
import { CaseStudy } from "@/components/case-study/CaseStudy";
import { TAB_OF, TABS } from "@/lib/labels";
import styles from "./page.module.css";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const image = { url: project.thumbnail.src, width: project.thumbnail.width, height: project.thumbnail.height, alt: project.thumbnail.alt };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, images: [image] },
    twitter: { title: project.title, description: project.summary, images: [image.url] },
  };
}

export default async function WorkPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const site = getSiteSettings();
  const adjacent = getAdjacent(slug);
  const backHref = `/?type=${TAB_OF[project.type]}`;

  return (
    <>
      <Header site={site} />
      <main id="main" className={styles.main}>
        <Link href={backHref} className={styles.back}>
          <span aria-hidden="true">←</span> All {TABS.find((t) => t.value === TAB_OF[project.type])?.label.toLowerCase()}
        </Link>
        {project.type === "case-study" ? (
          <CaseStudy project={project} />
        ) : (
          <div className={styles.viewer}>
            <ViewerBody project={project} headingLevel="h1" priority />
          </div>
        )}
        {adjacent && (
          <div className={styles.more}>
            <ProjectNav prev={adjacent.prev} next={adjacent.next} />
          </div>
        )}
      </main>
      <AboutStrip site={site} from={`work-${project.slug}`} />
    </>
  );
}
