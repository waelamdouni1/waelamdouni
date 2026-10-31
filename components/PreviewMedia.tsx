"use client";

import { useState } from "react";
import type { Project } from "@/lib/schema";
import styles from "./PreviewMedia.module.css";

/**
 * The hover loop, layered over the still thumbnail. It is only mounted while the
 * card is active, so loops never download or play for cards nobody is looking at.
 */
export function PreviewMedia({ media }: { media: Project["previewMedia"] }) {
  const [ready, setReady] = useState(false);
  const className = `${styles.preview} ${ready ? styles.ready : ""}`;

  if (media.kind === "video") {
    return (
      <video
        className={className}
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        onPlaying={() => setReady(true)}
      />
    );
  }
  return <img className={className} src={media.src} alt="" aria-hidden="true" onLoad={() => setReady(true)} />;
}
