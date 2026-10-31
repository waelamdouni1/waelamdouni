"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { TABS, type Filter } from "@/lib/labels";
import styles from "./FilterTabs.module.css";

export const PANEL_ID = "gallery-panel";
export const tabId = (value: Filter) => `tab-${value}`;

export function FilterTabs({
  value,
  onChange,
  flat = false,
}: {
  value: Filter;
  onChange: (value: Filter) => void;
  /** No glass of its own, for when the tabs sit inside another surface (the dock). */
  flat?: boolean;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // When the tabs don't fit (narrow phones), fade the clipped edge so the hidden tabs read as there.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      el.toggleAttribute("data-more-start", el.scrollLeft > 1);
      el.toggleAttribute("data-more-end", el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const last = TABS.length - 1;
    const next =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    refs.current[next]?.focus();
    onChange(TABS[next].value);
  }

  return (
    <div ref={scrollerRef} className={styles.scroller} data-flat={flat || undefined}>
      <div role="tablist" aria-label="Filter work by type" className={styles.list}>
        {TABS.map((tab, i) => {
          const selected = tab.value === value;
          return (
            <button
              key={tab.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={tabId(tab.value)}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={PANEL_ID}
              tabIndex={selected ? 0 : -1}
              className={styles.tab}
              onClick={(e) => {
                e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
                onChange(tab.value);
              }}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {selected && (
                <motion.span
                  layoutId="tab-indicator"
                  className={styles.indicator}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                />
              )}
              <span className={styles.text}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
