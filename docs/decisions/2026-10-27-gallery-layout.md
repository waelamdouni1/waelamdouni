# Home gallery layout: decided from /proto/gallery

Date: 2026-10-27. Five directions compared at full size behind a picker.

## Picked: Bento

- Uniform tiled grid, dense packing. 4 columns from 880px container width, 3 from 560px, 2 below.
- Row height: `clamp(120px, 10vw, 170px)` on 4 columns, 120px on 3, 96px on 2.
- Tile spans by thumbnail shape:
  - first project: 2 columns × 3 rows (featured)
  - wide (h/w ≤ 0.7): 2 × 2
  - tall (h/w ≥ 1.2): 1 × 3
  - otherwise: 1 × 2
- Tiles crop the work with `object-fit: cover`.
- Hover (pointer devices): image zooms to 1.04 over 500ms ease-out, a frosted caption slides in at the top left, and the preview loop plays.
- Open: every project, case studies included, opens the same way. The tile morphs into a centered panel (shared layout, spring 0.45s, bounce 0) over a blurred scrim (300ms, `cubic-bezier(0.32, 0.72, 0, 1)`). Details fade in 140ms after the morph starts.
- Panel width: `min(940px, 100vw − 48px, 62dvh × aspect)`, so tall work is never cropped.
- Close: Esc, the close button or a click on the scrim. The panel morphs back into its tile and focus returns to the tile.
- Case studies: the panel links to the full `/work/<slug>` page.

## Rejected

- **Current** (masonry + frosted overlay viewer). Strong for browsing, but case studies left the page while other work opened an overlay: two ways of opening work.
- **Sheet** (masonry + draggable bottom sheet). Good on phones but cramped for the work on desktop. Moved to its own job as a reusable component with a demo page; both were removed before launch (2026-10-31) since nothing used them.
- **Index** (text list, cursor-following preview, rows expand in place). Fast to scan, but hides the work until hover and brings back the titles and categories that were removed from the grid on purpose.
- **Stage** (one project at a time with a filmstrip). Gives each piece full attention, but makes the visitor's range hard to take in at a glance.

## Known costs of Bento

- Dense packing can place a later tile visually before an earlier one, so tab order may not match visual order in places.
- Tiles crop the thumbnail. Pick thumbnails whose subject survives a center crop.
