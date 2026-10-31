"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/schema";
import { TYPE_LABEL, type Filter } from "@/lib/labels";
import { packInto, type Fixed, type Placed } from "@/lib/pack";
import { lockScroll } from "@/lib/scroll-lock";
import { PreviewMedia } from "./PreviewMedia";
import { ProjectPanel, useViewerKeys } from "./ProjectPanel";
import styles from "./Salon.module.css";

/*
 * A salon hang: one wall packed around a large anchor work, roamed by drag, scroll or
 * arrow keys. Hovering parts the works around the cursor (they shrink and push away);
 * over a work, that work holds still, grows a touch and shows its caption while its
 * neighbours part around it.
 * See docs/decisions/2026-10-28-display-salon.md.
 */

const COLS = 6;
const REPEL_RADIUS = 240; // px of gap (to the cursor, or to the hovered work) the effect reaches
const REPEL_SHRINK = 0.4; // nearest neighbours shrink by up to 40%
const REPEL_PUSH = 70; // ...and move up to 70px away from the cursor
const FOCUS_GROW = 0.03; // the work under the cursor grows 3%
const ASIDE = "__aside";
const PHONE_RADIUS = 0.17; // corner of the phone frame in the recordings, as a share of its width

function span(p: Project) {
  const ratio = p.thumbnail.height / p.thumbnail.width;
  if (ratio >= 1.2) return { c: 1, r: 2 };
  if (ratio <= 0.7) return { c: 2, r: 1 };
  return { c: 1, r: 1 };
}

/**
 * Where every work hangs. The anchor sits in the middle and the promo card in the top-right
 * corner; the rest are packed around them. Spare cells go to the next works after the anchor,
 * hung larger (2×2), so the wall has no empty patches.
 */
function layoutWall(projects: Project[], hasAside: boolean) {
  const [anchor, ...rest] = projects;
  const fixed: Fixed[] = [];
  if (anchor) fixed.push({ key: anchor.slug, col: COLS / 2, row: 2, c: 2, r: 2 });
  if (hasAside) fixed.push({ key: ASIDE, col: COLS, row: 1, c: 1, r: 2 });
  const base = rest.map((p) => ({ key: p.slug, span: span(p) }));
  const area = [...fixed, ...base.map((b) => b.span)].reduce((n, s) => n + s.c * s.r, 0);
  for (let rows = Math.max(3, Math.ceil(area / COLS)); ; rows++) {
    for (let grow = Math.floor((rows * COLS - area) / 2); grow >= 0; grow--) {
      let left = grow;
      const items = base.map((b) => (left > 0 && b.span.c === 2 && b.span.r === 1 ? (left--, { ...b, span: { c: 2, r: 2 } }) : b));
      const placed = packInto(COLS, rows, items, fixed);
      if (placed) return placed;
    }
  }
}

export function Salon({
  projects,
  filter,
  open,
  position,
  total,
  onOpen,
  onClose,
  onStep,
  aside,
}: {
  /** Every project; works outside `filter` stay hung but dimmed. */
  projects: Project[];
  filter: Filter;
  open: Project | undefined;
  position: number;
  total: number;
  onOpen: (slug: string) => void;
  onClose: () => void;
  onStep: (direction: 1 | -1) => void;
  /** Hung on the wall right of the anchor, like a work (the featured promo card). */
  aside?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const [cell, setCell] = useState(230);
  const [hovered, setHovered] = useState<string | null>(null);
  const gap = Math.round(cell * 0.12);
  // Little room above the wall, a bit at the sides, and enough below to clear the dock.
  const margin = `${cell < 200 ? 16 : 32}px ${Math.round(cell * 0.3)}px 112px`;

  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);
  const cam = useRef({ x: 0, y: 0 });
  const frameId = useRef(0);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const works = useRef(new Map<string, { button: HTMLElement; inner: HTMLElement; dim: boolean }>());
  const repelQueued = useRef(false);
  const lastShown = useRef<string | null>(null);
  if (open) lastShown.current = open.slug;

  // ---- Repel hover -------------------------------------------------------

  const repel = useCallback(() => {
    repelQueued.current = false;
    const p = pointer.current;
    // Buttons never move, so their rects are the works' resting places.
    const entries = [...works.current].map(([slug, w]) => ({ slug, w, r: w.button.getBoundingClientRect() }));
    const under = p
      ? entries.find(({ w, r }) => !w.dim && p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom)
      : undefined;
    // Neighbours part around the hovered work; over bare wall, around the cursor itself.
    const src = under
      ? under.r
      : p
        ? ({ left: p.x, right: p.x, top: p.y, bottom: p.y } as Pick<DOMRect, "left" | "right" | "top" | "bottom">)
        : null;
    for (const { slug, w, r } of entries) {
      let s = 1;
      let dx = 0;
      let dy = 0;
      if (under && slug === under.slug) {
        s = 1 + FOCUS_GROW;
      } else if (src && !w.dim) {
        // Strength from the gap between the two edges; direction from centre to centre.
        const gap = Math.hypot(
          Math.max(r.left - src.right, src.left - r.right, 0),
          Math.max(r.top - src.bottom, src.top - r.bottom, 0),
        );
        const k = Math.max(0, 1 - gap / REPEL_RADIUS);
        const e = k * k;
        const vx = r.left + r.width / 2 - (src.left + src.right) / 2;
        const vy = r.top + r.height / 2 - (src.top + src.bottom) / 2;
        const len = Math.hypot(vx, vy) || 1;
        s = 1 - REPEL_SHRINK * e;
        dx = (vx / len) * REPEL_PUSH * e;
        dy = (vy / len) * REPEL_PUSH * e;
      }
      w.inner.style.setProperty("--s", s.toFixed(4));
      w.inner.style.setProperty("--dx", `${dx.toFixed(1)}px`);
      w.inner.style.setProperty("--dy", `${dy.toFixed(1)}px`);
      w.button.style.zIndex = under && slug === under.slug ? "2" : "";
    }
    const next = under?.slug ?? null;
    setHovered((h) => (h === next ? h : next));
  }, []);

  const queueRepel = useCallback(() => {
    if (repelQueued.current) return;
    repelQueued.current = true;
    requestAnimationFrame(repel);
  }, [repel]);

  const register = useCallback((slug: string, button: HTMLElement | null, inner: HTMLElement | null, dim: boolean) => {
    if (button && inner) works.current.set(slug, { button, inner, dim });
    else works.current.delete(slug);
  }, []);

  // ---- Camera ------------------------------------------------------------

  const apply = useCallback(() => {
    const world = worldRef.current;
    const stage = stageRef.current;
    if (!world || !stage) return;
    // Centred when the wall is smaller than the screen, clamped to its edges otherwise.
    const ex = world.offsetWidth - stage.clientWidth;
    const ey = world.offsetHeight - stage.clientHeight;
    cam.current.x = ex < 0 ? ex / 2 : Math.min(ex, Math.max(0, cam.current.x));
    cam.current.y = ey < 0 ? ey / 2 : Math.min(ey, Math.max(0, cam.current.y));
    world.style.transform = `translate3d(${-cam.current.x}px, ${-cam.current.y}px, 0)`;
    if (pointer.current) queueRepel();
  }, [queueRepel]);

  const glideTo = useCallback(
    (x: number, y: number, duration = 320) => {
      cancelAnimationFrame(frameId.current);
      if (reduce) {
        cam.current = { x, y };
        apply();
        return;
      }
      const from = { ...cam.current };
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const k = 1 - Math.pow(1 - t, 3);
        cam.current = { x: from.x + (x - from.x) * k, y: from.y + (y - from.y) * k };
        apply();
        if (t < 1) frameId.current = requestAnimationFrame(tick);
      };
      frameId.current = requestAnimationFrame(tick);
    },
    [apply, reduce],
  );

  /** Bring a work fully into view (keyboard focus). */
  const reveal = useCallback(
    (el: HTMLElement) => {
      const stage = stageRef.current;
      if (!stage) return;
      const r = el.getBoundingClientRect();
      const pad = 80;
      let { x, y } = cam.current;
      if (r.left < pad) x -= pad - r.left;
      else if (r.right > stage.clientWidth - pad) x += r.right - (stage.clientWidth - pad);
      if (r.top < pad) y -= pad - r.top;
      else if (r.bottom > stage.clientHeight - pad * 1.6) y += r.bottom - (stage.clientHeight - pad * 1.6);
      if (x !== cam.current.x || y !== cam.current.y) glideTo(x, y);
    },
    [glideTo],
  );

  // Cell size follows the screen.
  useLayoutEffect(() => {
    const fit = () => setCell(window.innerWidth < 640 ? 150 : window.innerWidth < 1100 ? 190 : 230);
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // Start centred on the anchor; with a promo card on a wide screen, start with that card in
  // the top-right corner of the view instead. Re-clamp on resize.
  useLayoutEffect(() => {
    const world = worldRef.current;
    const stage = stageRef.current;
    if (!world || !stage) return;
    cam.current = { x: (world.offsetWidth - stage.clientWidth) / 2, y: (world.offsetHeight - stage.clientHeight) / 2 - cell * 0.2 };
    const card = asideRef.current?.firstElementChild as HTMLElement | null;
    if (card && stage.clientWidth >= 900) {
      const pad = 24;
      const worldRect = world.getBoundingClientRect();
      const r = card.getBoundingClientRect();
      cam.current = { x: r.right - worldRect.left + pad - stage.clientWidth, y: r.top - worldRect.top - pad };
    }
    apply();
    const onResize = () => apply();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [apply, cell]);

  // The wall replaces page scrolling; wheel and trackpad pan it.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      e.preventDefault();
      cancelAnimationFrame(frameId.current);
      const unit = e.deltaMode === 1 ? 16 : 1;
      cam.current = { x: cam.current.x + e.deltaX * unit, y: cam.current.y + e.deltaY * unit };
      apply();
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    const unlock = lockScroll();
    return () => {
      stage.removeEventListener("wheel", onWheel);
      unlock();
      cancelAnimationFrame(frameId.current);
    };
  }, [apply]);

  // ---- Drag with momentum ------------------------------------------------

  const drag = useRef({ active: false, moved: false, id: -1, x: 0, y: 0, t: 0, vx: 0, vy: 0 });
  const suppressClick = useRef(false);

  function onPointerDown(e: React.PointerEvent) {
    if (e.button !== 0) return;
    cancelAnimationFrame(frameId.current);
    drag.current = { active: true, moved: false, id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), vx: 0, vy: 0 };
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    const dragging = d.active && d.moved;
    // Parting the works only makes sense for a mouse that isn't dragging the wall.
    pointer.current = e.pointerType === "mouse" && !dragging && !reduce ? { x: e.clientX, y: e.clientY } : null;
    queueRepel();
    if (!d.active || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < 4) return;
    if (!d.moved) {
      d.moved = true;
      // Capture only once it's a drag, so a plain click still reaches the work under it.
      stageRef.current?.setPointerCapture(e.pointerId);
      stageRef.current?.setAttribute("data-dragging", "");
      pointer.current = null;
      queueRepel();
    }
    const now = performance.now();
    const dt = Math.max(1, now - d.t);
    d.vx = d.vx * 0.6 + (dx / dt) * 0.4;
    d.vy = d.vy * 0.6 + (dy / dt) * 0.4;
    d.x = e.clientX;
    d.y = e.clientY;
    d.t = now;
    cam.current = { x: cam.current.x - dx, y: cam.current.y - dy };
    apply();
  }

  function onPointerUp(e: React.PointerEvent) {
    const d = drag.current;
    if (!d.active || e.pointerId !== d.id) return;
    d.active = false;
    stageRef.current?.removeAttribute("data-dragging");
    if (!d.moved) return;
    suppressClick.current = true;
    requestAnimationFrame(() => (suppressClick.current = false));
    if (reduce) return;
    let { vx, vy } = d;
    let last = performance.now();
    const coast = (now: number) => {
      const dt = now - last;
      last = now;
      cam.current = { x: cam.current.x - vx * dt, y: cam.current.y - vy * dt };
      apply();
      const f = Math.pow(0.94, dt / 16);
      vx *= f;
      vy *= f;
      if (Math.hypot(vx, vy) > 0.01) frameId.current = requestAnimationFrame(coast);
    };
    frameId.current = requestAnimationFrame(coast);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.target !== e.currentTarget) return;
    const step = cell;
    const moves: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    glideTo(cam.current.x + m[0], cam.current.y + m[1], 240);
  }

  useViewerKeys(!!open, onClose, onStep);

  // Closing a project hands focus back to the work it showed.
  const wasOpen = useRef(!!open);
  useEffect(() => {
    if (wasOpen.current && !open) {
      const t = window.setTimeout(() => {
        document.querySelector<HTMLElement>(`[data-work="${lastShown.current}"]`)?.focus({ preventScroll: true });
      }, 220);
      wasOpen.current = false;
      return () => window.clearTimeout(t);
    }
    wasOpen.current = !!open;
  }, [open]);

  // ---- Render ------------------------------------------------------------

  const fit = (p: Project, c: number, r: number) => {
    const boxW = c * cell + (c - 1) * gap;
    const boxH = r * cell + (r - 1) * gap;
    return Math.min(boxW, boxH / (p.thumbnail.height / p.thumbnail.width));
  };

  const [anchor, ...rest] = projects;
  const layout = useMemo(() => layoutWall(projects, !!aside), [projects, aside]);
  const at = (key: string): React.CSSProperties => {
    const p = layout.get(key) as Placed;
    return { gridColumn: `${p.col} / span ${p.c}`, gridRow: `${p.row} / span ${p.r}` };
  };
  const visit = (slug: string) => {
    if (!suppressClick.current) onOpen(slug);
  };

  return (
    <>
      <div
        ref={stageRef}
        className={styles.stage}
        role="region"
        aria-roledescription="salon wall"
        aria-label="Wall of work. Drag, scroll or use the arrow keys to roam."
        tabIndex={0}
        inert={!!open}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={() => {
          pointer.current = null;
          queueRepel();
        }}
        onKeyDown={onKeyDown}
      >
        <div ref={worldRef} className={styles.world} style={{ padding: margin }}>
          <div className={styles.wall} style={{ gridTemplateColumns: `repeat(${COLS}, ${cell}px)`, gridAutoRows: `${cell}px`, gap }}>
            {anchor && (
              <div className={styles.cell} style={at(anchor.slug)}>
                <Work
                  project={anchor}
                  width={fit(anchor, 2, 2)}
                  dim={filter !== "all" && anchor.type !== filter}
                  hovered={hovered === anchor.slug}
                  register={register}
                  onVisit={visit}
                  onReveal={reveal}
                  priority
                />
              </div>
            )}
            {aside && (
              <div
                ref={asideRef}
                className={styles.cell}
                // Top-right corner of the wall, pinned to the corner of its slot.
                style={{ ...at(ASIDE), placeItems: "start end" }}
                // A drag that starts on the card roams the wall instead of following its links.
                onClickCapture={(e) => {
                  if (!suppressClick.current) return;
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {aside}
              </div>
            )}
            {rest.map((p) => {
              const { c, r } = layout.get(p.slug) as Placed;
              return (
                <div key={p.slug} className={styles.cell} style={at(p.slug)}>
                  <Work
                    project={p}
                    width={fit(p, c, r)}
                    dim={filter !== "all" && p.type !== filter}
                    hovered={hovered === p.slug}
                    register={register}
                    onVisit={visit}
                    onReveal={reveal}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <p className={styles.hint} aria-hidden="true">
          Drag or scroll to roam the wall
        </p>
      </div>

      <AnimatePresence initial={false}>
        {open && <ProjectPanel key="panel" project={open} position={position} total={total} onClose={onClose} onStep={onStep} />}
      </AnimatePresence>
    </>
  );
}

function Work({
  project,
  width,
  dim,
  hovered,
  register,
  onVisit,
  onReveal,
  priority = false,
}: {
  project: Project;
  width: number;
  dim: boolean;
  hovered: boolean;
  register: (slug: string, button: HTMLElement | null, inner: HTMLElement | null, dim: boolean) => void;
  onVisit: (slug: string) => void;
  onReveal: (el: HTMLElement) => void;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const [focused, setFocused] = useState(false);
  const { thumbnail } = project;

  useLayoutEffect(() => {
    register(project.slug, buttonRef.current, innerRef.current, dim);
    return () => register(project.slug, null, null, dim);
  }, [project.slug, dim, register]);

  const active = (hovered || focused) && !dim;
  // Phone recordings float as the phone itself, clipped to its rounded frame, with no card behind.
  const phone = thumbnail.height / thumbnail.width >= 1.8;

  return (
    <button
      ref={buttonRef}
      type="button"
      className={styles.work}
      style={
        {
          width,
          aspectRatio: `${thumbnail.width} / ${thumbnail.height}`,
          "--phone-r": `${Math.round(width * PHONE_RADIUS)}px`,
        } as React.CSSProperties
      }
      data-work={project.slug}
      data-phone={phone || undefined}
      data-dim={dim || undefined}
      data-active={active || undefined}
      tabIndex={dim ? -1 : 0}
      aria-haspopup="dialog"
      aria-label={`${project.title}. ${TYPE_LABEL[project.type]}, ${project.year}`}
      onClick={() => onVisit(project.slug)}
      onFocus={(e) => {
        if (!e.currentTarget.matches(":focus-visible")) return;
        setFocused(true);
        onReveal(e.currentTarget);
      }}
      onBlur={() => setFocused(false)}
    >
      <span ref={innerRef} className={styles.inner}>
        <span className={styles.art}>
          {/* Blurred copy of the work fills the card behind it */}
          {!phone && (
            <span className={styles.backdrop} aria-hidden="true">
              <Image src={thumbnail.src} alt="" fill sizes="80px" className={styles.backdropImg} draggable={false} />
            </span>
          )}
          <span className={styles.shot}>
            <Image
              src={thumbnail.src}
              alt=""
              fill
              sizes="(max-width: 640px) 60vw, 480px"
              preload={priority}
              className={styles.img}
              draggable={false}
            />
            {active && !reduce && <PreviewMedia media={project.previewMedia} />}
          </span>
        </span>
        <span className={styles.caption} aria-hidden="true">
          <span className={styles.captionTitle}>{project.title}</span>
          <span className={styles.captionText}>{project.summary}</span>
        </span>
      </span>
    </button>
  );
}
