import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { getAllProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProjectsGrid projects={projects} />
      <AboutSection />
      <ProcessSection />
      <ClosingCta />
      <SiteFooter />
    </main>
  );
}
