"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Project, SiteSettings } from "@/lib/schema";
import { inTab, parseFilter, type Filter } from "@/lib/labels";
import { track } from "@/lib/analytics";
import { PANEL_ID, tabId } from "./FilterTabs";
import { Salon } from "./Salon";
import { Dock } from "./Dock";
import { FeaturedCard } from "./FeaturedCard";
import styles from "./Gallery.module.css";

function setParam(key: string, value: string | null, mode: "push" | "replace") {
  const url = new URL(window.location.href);
  if (value === null) url.searchParams.delete(key);
  else url.searchParams.set(key, value);
  if (mode === "push") window.history.pushState(null, "", url);
  else window.history.replaceState(window.history.state, "", url);
}

export function Gallery({
  site,
  projects,
  initialFilter,
  initialView,
}: {
  site: SiteSettings;
  projects: Project[];
  initialFilter: Filter;
  initialView: string | null;
}) {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [viewSlug, setViewSlug] = useState<string | null>(initialView);
  // True when opening a project added a history entry, so closing can step back over it.
  const pushed = useRef(false);

  useEffect(() => {
    function onPop() {
      const params = new URLSearchParams(window.location.search);
      setFilter(parseFilter(params.get("type")));
      setViewSlug(params.get("view"));
      pushed.current = false;
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => inTab(p, filter))),
    [projects, filter],
  );

  const viewing = projects.find((p) => p.slug === viewSlug);
  // Step through what the visitor is looking at; fall back to everything when a shared
  // link opens a project outside the current tab.
  const stepList = viewing && !visible.includes(viewing) ? projects : visible;
  const index = viewing ? stepList.indexOf(viewing) : -1;

  function changeFilter(next: Filter) {
    if (next === filter) return;
    setFilter(next);
    setParam("type", next === "all" ? null : next, "replace");
    track("filter", { type: next });
  }

  const open = useCallback((slug: string) => {
    setViewSlug(slug);
    setParam("view", slug, "push");
    pushed.current = true;
  }, []);

  const close = useCallback(() => {
    setViewSlug(null);
    if (pushed.current) {
      pushed.current = false;
      window.history.back();
    } else {
      setParam("view", null, "replace");
    }
  }, []);

  const stepRef = useRef({ stepList, index });
  stepRef.current = { stepList, index };
  const step = useCallback((direction: 1 | -1) => {
    const { stepList: list, index: i } = stepRef.current;
    if (list.length < 2) return;
    const next = list[(i + direction + list.length) % list.length];
    setViewSlug(next.slug);
    setParam("view", next.slug, "replace");
  }, []);

  const isOpen = !!viewing;

  return (
    <div className={styles.layout}>
      {/* The visible name and title live in the dock; the page heading keeps the full name */}
      <h1 className="visually-hidden">
        {site.name}, {site.role}
      </h1>
      <main id="main" className={styles.main}>
        <div id={PANEL_ID} role="tabpanel" aria-labelledby={tabId(filter)}>
          <Salon
            projects={projects}
            filter={filter}
            open={viewing}
            position={index + 1}
            total={stepList.length}
            onOpen={open}
            onClose={close}
            onStep={step}
            aside={site.featured && <FeaturedCard featured={site.featured} onOpenProject={open} />}
          />
        </div>
      </main>
      <Dock site={site} filter={filter} onFilter={changeFilter} inert={isOpen} />
    </div>
  );
}
