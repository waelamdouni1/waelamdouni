# Home display: decided from /proto/display

Date: 2026-10-28. Five displays compared at full size: Current (Bento), Salon, Eye line, Grid hang, Light table.

## Picked: Salon, with a repel hover

- A salon hang: one wall packed around a large anchor work (the first project, 2×2 cells, in the middle).
- The other works fill the cells around it:
  - tall works span two rows, wide works span two columns, the rest take one cell
  - each work keeps its own shape, never cropped, so the gaps vary like a real wall
  - the outer edge of the wall lines up
- Drag, scroll/trackpad or arrow keys to roam, with momentum, clamped to the wall's edges. The view starts centred on the anchor.
- Black box: the wall is dark and each work has a soft spotlight. The filter tabs turn the lights off on works outside the tab.
- Hover, from the user's reference: works near the cursor shrink and push away from it, opening a clearing.
  - Strength comes from the gap to the cursor, or to the hovered work when over one: radius 240px, up to 40% smaller, up to 70px of push.
  - The work under the cursor is exempt: it stays put, grows 3%, plays its preview loop and shows the frosted caption (title and summary, top left), the same caption as the old grid. That keeps it clickable instead of fleeing the cursor.
- Clicking opens the same project panel as before: fade and scale in, ← → to step, Esc to close, focus back on the work.

## Rejected

- **Current (Bento grid with growing hover).** Fast to scan, but the least like a gallery, and tiles crop the work.
- **Eye line** (one line at eye height, walked by scrolling). The most exhibition-like, but the slowest way to reach the last project, and the visitor's range isn't visible at a glance.
- **Grid hang** (equal cells, uncropped, numbered labels). The clearest, but also the calmest and least memorable.
- **Light table** (contact sheet with a magnifying loupe). The most novel interaction, but mouse-only and with very small frames.
