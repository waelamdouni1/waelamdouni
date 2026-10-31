"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import type { ViewerMedia } from "@/lib/schema";
import styles from "./ProjectMedia.module.css";

/** Large media for the quick viewer and standalone project pages. */
export function ProjectMedia({ media, poster, priority = false }: { media: ViewerMedia; poster: string; priority?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reduceMotion) setPlaying(false);
  }, [reduceMotion]);

  const style = { "--ratio": media.width / media.height } as React.CSSProperties;
  // The poster is already cached from the grid, so it fills the frame while the full image loads.
  const mediaStyle = { backgroundImage: `url(${poster})` } as React.CSSProperties;
  const sizes = "(max-width: 1023px) 100vw, 70vw";

  let content: React.ReactNode;
  if (media.kind === "embed") {
    content = <iframe className={styles.fill} src={media.src} title={media.alt} loading="lazy" allow="fullscreen" />;
  } else if (media.kind === "video") {
    content = (
      <video
        key={media.src}
        className={styles.fill}
        src={media.src}
        poster={poster}
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        controls={!!reduceMotion}
        aria-label={media.alt}
      />
    );
  } else if (media.animated && !playing) {
    content = (
      <>
        <Image className={styles.fill} src={poster} alt={media.alt} width={media.width} height={media.height} sizes={sizes} />
        <button type="button" className={`btn ${styles.play}`} onClick={() => setPlaying(true)}>
          Play animation
        </button>
      </>
    );
  } else {
    content = (
      <Image
        key={media.src}
        className={styles.fill}
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes={sizes}
        unoptimized={media.animated}
        preload={priority}
        loading={priority ? undefined : "eager"}
      />
    );
  }

  return (
    <div className={styles.frame} style={style}>
      <div className={styles.media} style={media.kind === "embed" ? undefined : mediaStyle}>
        {content}
      </div>
    </div>
  );
}
