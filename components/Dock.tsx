"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { SiteSettings } from "@/lib/schema";
import type { Filter } from "@/lib/labels";
import { AboutCard } from "./AboutCard";
import { FilterTabs } from "./FilterTabs";
import { CopyEmail } from "./CopyEmail";
import styles from "./Dock.module.css";

/**
 * Floating dock at the bottom of the home page: avatar, first name and title
 * (together they open the About card), filter tabs, and a copy-email button.
 */
export function Dock({
  site,
  filter,
  onFilter,
  inert = false,
}: {
  site: SiteSettings;
  filter: Filter;
  onFilter: (f: Filter) => void;
  inert?: boolean;
}) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const meRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  // The card grows out of the avatar: its bottom edge, at the avatar's x (the card is centred).
  const [popOrigin, setPopOrigin] = useState("50% 100%");
  function toggleAbout() {
    const me = meRef.current?.getBoundingClientRect();
    if (me) {
      const width = Math.min(400, window.innerWidth - 24);
      setPopOrigin(`${me.left + me.width / 2 - (window.innerWidth - width) / 2}px 100%`);
    }
    setAboutOpen((o) => !o);
  }

  useEffect(() => {
    if (!aboutOpen) return;
    popRef.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setAboutOpen(false);
      meRef.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!popRef.current?.contains(t) && !meRef.current?.contains(t)) setAboutOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [aboutOpen]);

  // Opening a project covers the dock; don't leave the About card floating over it.
  useEffect(() => {
    if (inert) setAboutOpen(false);
  }, [inert]);

  return (
    <>
      <AnimatePresence>
        {aboutOpen && (
          <motion.div
            ref={popRef}
            id="about-card"
            className={styles.pop}
            role="dialog"
            aria-label={`About ${site.name}`}
            style={{ transformOrigin: popOrigin }}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6, transition: { duration: 0.14 } }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <AboutCard site={site} headingLevel="h2" />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={styles.dock} aria-label="Site" inert={inert}>
        <button
          ref={meRef}
          type="button"
          className={styles.me}
          aria-expanded={aboutOpen}
          aria-controls="about-card"
          aria-label={aboutOpen ? "Hide about" : `About ${site.name}`}
          data-open={aboutOpen || undefined}
          onClick={toggleAbout}
        >
          <Avatar site={site} />
        </button>
        <span className={styles.ident}>
          <span className={styles.name}>{site.shortName ?? site.name.split(/\s+/)[0]}</span>
          <span className={styles.role}>{site.role}</span>
        </span>
        <span className={styles.divider} aria-hidden="true" />
        <div className={styles.tabs}>
          <FilterTabs value={filter} onChange={onFilter} flat />
        </div>
        <span className={styles.divider} aria-hidden="true" />
        <CopyEmail email={site.email} variant="dock" from="dock-copy" />
      </nav>
    </>
  );
}

function Avatar({ site }: { site: SiteSettings }) {
  if (site.avatar) return <Image className={styles.avatarImg} src={site.avatar} alt="" width={40} height={40} />;
  const initials = site.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return <span aria-hidden="true">{initials}</span>;
}
