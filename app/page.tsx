import { getProject, getProjects, getSiteSettings } from "@/lib/content";
import { parseFilter } from "@/lib/labels";
import { Gallery } from "@/components/Gallery";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const view = typeof params.view === "string" ? getProject(params.view) : undefined;

  return (
    <Gallery
      site={getSiteSettings()}
      projects={getProjects()}
      initialFilter={parseFilter(params.type)}
      initialView={view ? view.slug : null}
    />
  );
}
