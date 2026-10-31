# Wael Amdouni — portfolio

A gallery-style portfolio built from the [PRD](./UX%20Portfolio%20—%20Initial%20PRD.md). Next.js 16, TypeScript, CSS Modules, Motion.

```bash
npm install
npm run dev -- -p 3001   # http://localhost:3001 (3000 is used by GadgetlyHome)
npm run build      # production build; fails if content/*.json is invalid
```

## Where things live

| What | Where |
| --- | --- |
| Projects | `content/projects.json` |
| Name, role, bio, email, socials | `content/site.json` |
| Images and loops | `public/media/<slug>/` |
| Content model (validation + types) | `lib/schema.ts` |
| Data access (the only file to change for a CMS) | `lib/content.ts` |
| Colors, type, spacing tokens | `app/globals.css` |
| Analytics hook (Plausible-ready, no-op for now) | `lib/analytics.ts` |

## Adding a project

For each project:

1. Put files in `public/media/<slug>/`: a thumbnail, a short preview loop (`.mp4`/`.webm` with `"kind": "video"`, or an animated `.webp`/`.gif` with `"kind": "image"`), and either 4 screenshots (case study) or one large media file (hero or experiment).
2. Edit the entry in `content/projects.json`. Keep `width`/`height` equal to the real image size: the wall hangs each work at that exact shape.
3. `order` controls wall position (`order: 1` is the large anchor in the middle). Web design and experiment projects can list more screens in `gallery` (same fields as `thumbnail`). `type` is `case-study`, `website-hero` or `experiment`.

**Videos:** `node scripts/import-videos.mjs "<folder>"` turns screen recordings into a poster, a short hover loop and a web-sized full video under `public/media/<slug>/` (add the file → slug mapping at the top of the script first).


## How it behaves

- **Wall:** a salon hang (`components/Salon.tsx`): one wall packed around the first project as a large anchor, each work at its own shape. Drag, scroll or use the arrow keys to roam. Hovering parts the works around the cursor; the one under it shows its caption. Works are packed by `lib/pack.ts` so the wall has no empty patches: spare cells go to the works right after the anchor, which hang larger. Tune the hover with the `REPEL_*` and `FOCUS_GROW` constants at the top of the file.
- **Thumbnails:** each work is a rounded card with a thin light border, the work inset over a blurred copy of itself. Phone recordings (anything at least 1.8 times taller than wide) skip the card and are clipped to the phone's own rounded frame (`PHONE_RADIUS` in `Salon.tsx`), so the recording's background around the phone never shows.
- **Dock:** a floating bar at the bottom (`components/Dock.tsx`) with your avatar, first name and title (the avatar opens the About card), the filter tabs and a "Copy my email" button. Tabs filter in place and write `?type=` to the URL.
- **Name and title:** `name`, `shortName` (shown in the dock) and `role` in `content/site.json`.
- **Featured card:** the GadgetlyHome card hangs on the wall right of the first project, styled like the works. Its content is `featured` in `content/site.json`. Add `"url"` there to send the button to the live site; without it, the button opens the project inside the portfolio.
- **Icons:** line icons from [Lucide](https://lucide.dev) and brand logos from [Simple Icons](https://simpleicons.org), all through `components/Icon.tsx`.
- **About card:** content lives in `content/site.json` (`about` paragraphs support `[label](url)` links; set `avatar` to a square photo in `public/`).
- **Opening work:** the work opens alone over the blurred wall (`components/ProjectPanel.tsx`, `?view=<slug>`), with its caption in the top-left corner. Extra screens listed in a project's `gallery` (web design and experiments) follow under it as you scroll. Esc, a click on the empty space, the back button and ← → all work. Case studies link to the full `/work/<slug>` page, and every project has its own `/work/<slug>` page for sharing and SEO.
- Why the salon wall and the dock, and what was rejected: `docs/decisions/`.
