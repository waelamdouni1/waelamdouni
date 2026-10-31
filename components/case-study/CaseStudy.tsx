import Image from "next/image";
import type { CaseStudy as CaseStudyData } from "@/lib/schema";
import styles from "./CaseStudy.module.css";

export function CaseStudy({ project }: { project: CaseStudyData }) {
  const { thumbnail } = project;
  return (
    <article className={styles.article}>
      <header className={styles.intro}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.lede}>{project.summary}</p>
      </header>

      <figure className={styles.hero}>
        <div className={styles.frame}>
          <Image
            src={thumbnail.src}
            alt={thumbnail.alt}
            width={thumbnail.width}
            height={thumbnail.height}
            sizes="(max-width: 1200px) 100vw, 1200px"
            preload
          />
        </div>
      </figure>

      <dl className={styles.context}>
        <div>
          <dt className="label">Role</dt>
          <dd>{project.role}</dd>
        </div>
        {project.team && (
          <div>
            <dt className="label">Team</dt>
            <dd>{project.team}</dd>
          </div>
        )}
        {project.timeline && (
          <div>
            <dt className="label">Timeline</dt>
            <dd>{project.timeline}</dd>
          </div>
        )}
        {project.tags.length > 0 && (
          <div>
            <dt className="label">Focus</dt>
            <dd>{project.tags.join(", ")}</dd>
          </div>
        )}
      </dl>

      <Prose id="overview" title="Overview" paragraphs={project.overview} />
      <Prose id="problem" title="Problem" paragraphs={project.problem} />
      {project.sections.map((s, i) => (
        <Prose key={s.title} id={`section-${i}`} title={s.title} paragraphs={s.body} />
      ))}

      <Prose id="approach" title="Approach" paragraphs={project.approach} />
      <Prose id="outcome" title="Outcome" paragraphs={project.outcome} />

      {project.highlights.length > 0 && (
        <section className={styles.section} aria-labelledby="highlights">
          <h2 id="highlights" className={styles.sectionTitle}>
            Highlights
          </h2>
          <ul className={styles.prose}>
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>
      )}

      <section className={styles.shots} aria-label="Screenshots">
        {project.screenshots.map((shot, i) => (
          <figure key={shot.src} className={styles.shot}>
            <div className={styles.frame}>
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes={i === 0 || i === 3 ? "(max-width: 1200px) 100vw, 1200px" : "(max-width: 899px) 100vw, 600px"}
              />
            </div>
            <figcaption className={styles.caption}>{shot.caption}</figcaption>
          </figure>
        ))}
      </section>

      {project.prototypeUrl && (
        <p className={styles.prototype}>
          <a className="btn btn-primary" href={project.prototypeUrl} target="_blank" rel="noreferrer">
            Open the prototype <span aria-hidden="true">↗</span>
          </a>
        </p>
      )}
    </article>
  );
}

function Prose({ id, title, paragraphs }: { id: string; title: string; paragraphs: string[] }) {
  if (paragraphs.length === 0) return null;
  return (
    <section className={styles.section} aria-labelledby={id}>
      <h2 id={id} className={styles.sectionTitle}>
        {title}
      </h2>
      <div className={styles.prose}>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
