"use client";

import type { GalleryImage } from "@/lib/cms/types";
import { cn } from "@/lib/utils";
import { ImageReveal } from "@/components/effects/image-reveal";

interface ProjectGalleryProps {
  images: GalleryImage[];
  columns?: 1 | 2 | 3;
  className?: string;
}

export function ProjectGallery({
  images,
  columns = 2,
  className,
}: ProjectGalleryProps) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <div className={cn("grid gap-6 md:gap-8", gridClass, className)}>
      {images.map((img, i) => (
        <figure key={img.src + i} className="group flex flex-col h-full">
          <ImageReveal
            src={img.src}
            alt={img.alt}
            aspectRatio="aspect-[16/10]"
            className="rounded-3xl shadow-premium border border-border/10 flex-1"
          />
          {img.caption && (
            <figcaption className="px-5 py-4 text-sm text-card-foreground/70">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
