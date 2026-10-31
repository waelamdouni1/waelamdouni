import Image from "next/image";
import type { SiteSettings } from "@/lib/schema";
import { CopyEmail } from "./CopyEmail";
import { Icon } from "./Icon";
import styles from "./AboutCard.module.css";

/** Renders [label](url) as links; everything else stays text (line breaks kept by CSS). */
function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const link = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(link)) {
    const [whole, label, href] = match;
    parts.push(text.slice(last, match.index));
    const external = /^https?:\/\//.test(href);
    parts.push(
      <a
        key={match.index}
        href={href}
        className="text-link"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </a>,
    );
    last = match.index + whole.length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

export function AboutCard({ site, headingLevel = "h1" }: { site: SiteSettings; headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  const initials = site.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <section className={styles.card} aria-labelledby="about-name">
      {site.avatar ? (
        <Image className={styles.avatar} src={site.avatar} alt={site.name} width={64} height={64} preload />
      ) : (
        <span className={`${styles.avatar} ${styles.initials}`} aria-hidden="true">
          {initials}
        </span>
      )}
      <Heading id="about-name" className={styles.name}>
        {site.name}
      </Heading>
      {/* The intro already opens with the job title, so it isn't repeated on its own line */}
      <div className={styles.about}>
        {site.about.map((paragraph, i) => (
          <p key={i}>
            <RichText text={paragraph} />
          </p>
        ))}
      </div>
      <div className={styles.links}>
        {site.socials.map((s) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className={s.icon ? styles.social : styles.pill}
            aria-label={s.icon ? s.label : undefined}
            title={s.icon ? s.label : undefined}
          >
            {s.icon ? <Icon name={s.icon} /> : s.label}
          </a>
        ))}
      </div>
      <div className={styles.actions}>
        <CopyEmail email={site.email} variant="card" from="about-card" label={site.email} />
        {site.resume && (
          <a className={styles.pill} href={site.resume} download>
            <Icon name="download" />
            Résumé
          </a>
        )}
      </div>
    </section>
  );
}
