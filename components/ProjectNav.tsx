import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/schema";
import { TYPE_LABEL } from "@/lib/labels";
import styles from "./ProjectNav.module.css";

export function ProjectNav({ prev, next }: { prev: Project; next: Project }) {
  return (
    <nav className={styles.nav} aria-label="More projects">
      <NavCard project={prev} direction="Previous" />
      <NavCard project={next} direction="Next" />
    </nav>
  );
}

function NavCard({ project, direction }: { project: Project; direction: "Previous" | "Next" }) {
  return (
    <Link href={`/work/${project.slug}`} className={styles.card} data-direction={direction}>
      <span className={styles.thumb}>
        <Image src={project.thumbnail.src} alt="" width={project.thumbnail.width} height={project.thumbnail.height} sizes="96px" />
      </span>
      <span className={styles.text}>
        <span className="label">
          {direction} {TYPE_LABEL[project.type].toLowerCase()}
        </span>
        <span className={styles.title}>{project.title}</span>
      </span>
    </Link>
  );
}
