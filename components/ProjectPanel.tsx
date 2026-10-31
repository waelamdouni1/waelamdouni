"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/schema";
import { TYPE_LABEL, opensInViewer } from "@/lib/labels";
import { track } from "@/lib/analytics";
import { lockScroll } from "@/lib/scroll-lock";
import { PreviewMedia } from "./PreviewMedia";
import { Icon } from "./Icon";
import styles from "./ProjectPanel.module.css";

const EASE = [0.23, 1, 0.32, 1] as const;
// The scrim and the work open and close together, as one surface.
const OPEN = { duration: 0.26, ease: EASE };
const CLOSE = { duration: 0.18, ease: EASE };

/** Esc, arrow keys and scroll lock while a project is open. */
export function useViewerKeys(isOpen: boolean, onClose: () => void, onStep: (direction: 1 | -1) => void) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        onStep(e.key === "ArrowRight" ? 1 : -1);
      }
    };
    document.addEventListener("keydown", onKey);
    const unlock = lockScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      unlock();
    };
  }, [isOpen, onClose, onStep]);
}

/** Phone recordings are clipped to the phone's own frame so the recording's corners go. */
function phoneRadius(width: number, height: number) {
  const ratio = width / height;
  return ratio <= 1 / 1.8 ? `17% / ${(17 * ratio).toFixed(2)}%` : undefined;
}

/**
 * The open project: the work alone over the blurred wall, any extra screens under it,
 * and a small caption in the top-left corner. Render inside <AnimatePresence>.
 */
export function ProjectPanel({
  project,
  position,
  total,
  onClose,
  onStep,
}: {
  project: Project;
  position: number;
  total: number;
  onClose: () => void;
  onStep: (direction: 1 | -1) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const viewer = opensInViewer(project);
  const video = "media" in project && project.media.kind === "video" ? project.media : null;
  // Extra screens under the main one: a gallery, or a case study's screenshots.
  const gallery = ("gallery" in project ? project.gallery : project.screenshots).filter((img) => img.src !== project.thumbnail.src);
  const { width, height } = project.thumbnail;

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  // Open from the card that was clicked, so the work reads as growing out of the wall.
  const openedFrom = useRef(project.slug);
  useLayoutEffect(() => {
    const stack = stackRef.current;
    const card = document.querySelector(`[data-work="${openedFrom.current}"]`);
    if (!stack || !card) return;
    const s = stack.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    stack.style.transformOrigin = `${c.left + c.width / 2 - s.left}px ${c.top + c.height / 2 - s.top}px`;
  }, []);

  // Stepping to another project starts it from the top.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    track("project_open", { slug: project.slug, type: project.type });
  }, [project.slug, project.type]);

  // Clicking the bare scrim around the work closes it.
  const closeOnBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: CLOSE }}
        transition={OPEN}
      />
      <div
        ref={scrollRef}
        className={styles.scroller}
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
        onClick={closeOnBackdrop}
      >
        {/* Animates on open only; stepping with the arrow keys swaps the text instantly */}
        <motion.div
          className={styles.caption}
          initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: 0.06, ...OPEN } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <h2 id="panel-title" className={styles.title}>
            {project.title}
          </h2>
          <p className={styles.text}>{viewer ? project.caption : project.summary}</p>
          <p className={styles.meta}>
            {TYPE_LABEL[project.type]} · {project.year}
            {!viewer && <> · {project.role}</>}
          </p>
          {viewer ? (
            project.externalUrl && (
              <a className={styles.action} href={project.externalUrl} target="_blank" rel="noreferrer">
                Visit site <Icon name="external" size={16} />
              </a>
            )
          ) : (
            <Link className={styles.action} href={`/work/${project.slug}`}>
              Read the case study <Icon name="arrowRight" size={16} />
            </Link>
          )}
        </motion.div>

        <motion.div
          ref={stackRef}
          className={styles.stack}
          onClick={closeOnBackdrop}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: CLOSE }}
          transition={OPEN}
        >
          <figure
            className={styles.media}
            style={
              {
                "--ratio": width / height,
                aspectRatio: `${width} / ${height}`,
                borderRadius: phoneRadius(width, height),
              } as React.CSSProperties
            }
          >
            {video ? (
              // Prototype videos play in full here; with reduced motion they wait for the play button.
              <video
                key={project.slug}
                className={styles.img}
                src={video.src}
                poster={project.thumbnail.src}
                autoPlay={!reduce}
                muted
                loop
                playsInline
                controls={!!reduce}
                aria-label={video.alt}
              />
            ) : (
              <>
                <Image
                  key={project.slug}
                  src={project.thumbnail.src}
                  alt={project.thumbnail.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 1100px"
                  className={styles.img}
                />
                {project.type === "experiment" && !reduce && <PreviewMedia key={`loop-${project.slug}`} media={project.previewMedia} />}
              </>
            )}
          </figure>
          {gallery.map((img) => (
            <figure
              key={img.src}
              className={styles.media}
              style={
                {
                  "--ratio": img.width / img.height,
                  aspectRatio: `${img.width} / ${img.height}`,
                  borderRadius: phoneRadius(img.width, img.height),
                } as React.CSSProperties
              }
            >
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 900px) 100vw, 1100px" className={styles.img} />
            </figure>
          ))}
        </motion.div>
      </div>

      {/* Controls live on the screen edges, outside the work */}
      <motion.div
        className={styles.controls}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.2 } }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <button ref={closeRef} type="button" className={`${styles.round} ${styles.close}`} onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>
        {total > 1 && (
          <>
            <button type="button" className={`${styles.round} ${styles.prev}`} onClick={() => onStep(-1)} aria-label="Previous project">
              <Icon name="arrowLeft" />
            </button>
            <button type="button" className={`${styles.round} ${styles.next}`} onClick={() => onStep(1)} aria-label="Next project">
              <Icon name="arrowRight" />
            </button>
            <span className={styles.count} aria-live="polite">
              {position} / {total}
            </span>
          </>
        )}
      </motion.div>
    </>
  );
}
