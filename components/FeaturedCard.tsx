"use client";

import Image from "next/image";
import type { SiteSettings } from "@/lib/schema";
import { track } from "@/lib/analytics";
import { Icon } from "./Icon";
import styles from "./FeaturedCard.module.css";

/**
 * Promo card hung on the wall next to the works. Links to the live site when
 * `featured.url` is set; otherwise opens the featured project inside the portfolio.
 */
export function FeaturedCard({
  featured,
  onOpenProject,
}: {
  featured: NonNullable<SiteSettings["featured"]>;
  onOpenProject: (slug: string) => void;
}) {
  const external = !!featured.url;
  const openInPortfolio = (e: React.MouseEvent) => {
    track("project_open", { slug: featured.project ?? featured.title, type: "featured" });
    if (external || !featured.project) return;
    e.preventDefault();
    onOpenProject(featured.project);
  };
  const href = featured.url ?? (featured.project ? `/?view=${featured.project}` : "#");
  const linkProps = external ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <aside className={styles.card} aria-label={`${featured.kicker}: ${featured.title}`}>
      <a
        className={styles.cover}
        href={href}
        onClick={openInPortfolio}
        tabIndex={-1}
        aria-hidden="true"
        draggable={false}
        {...linkProps}
      >
        {/* Same treatment as the works: the cover inset over a blurred copy of itself */}
        <span className={styles.backdrop}>
          <Image src={featured.cover.src} alt="" fill sizes="80px" className={styles.backdropImg} draggable={false} />
        </span>
        <span className={styles.shot}>
          <Image src={featured.cover.src} alt="" fill sizes="280px" className={styles.img} draggable={false} />
        </span>
      </a>
      <div className={styles.body}>
        <p className={styles.kicker}>{featured.kicker}</p>
        <h2 className={styles.title}>{featured.title}</h2>
        <p className={styles.text}>{featured.text}</p>
        <a className={styles.cta} href={href} onClick={openInPortfolio} draggable={false} {...linkProps}>
          {featured.cta}
          <Icon name={external ? "external" : "arrowRight"} />
        </a>
      </div>
    </aside>
  );
}
