"use client";

import type { ViewerProject } from "@/lib/schema";
import { ProjectMedia } from "./ProjectMedia";
import styles from "./ViewerBody.module.css";

/** Media plus placard for a website hero or experiment. Used by the overlay and by /work/[slug]. */
export function ViewerBody({
  project,
  headingId,
  headingLevel = "h2",
  nav,
  priority,
}: {
  project: ViewerProject;
  headingId?: string;
  headingLevel?: "h1" | "h2";
  nav?: React.ReactNode;
  priority?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <div className={styles.body}>
      <div className={styles.stage} data-dismiss="">
        <ProjectMedia media={project.media} poster={project.previewMedia.poster} priority={priority} />
      </div>
      <div className={styles.info}>
        <Heading id={headingId} className={styles.title}>
          {project.title}
        </Heading>
        <p className={styles.caption}>{project.caption}</p>
        {project.externalUrl && (
          <div className={styles.actions}>
            <a className="btn btn-primary" href={project.externalUrl} target="_blank" rel="noreferrer">
              Visit site <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
        {nav && <div className={styles.nav}>{nav}</div>}
      </div>
    </div>
  );
}
