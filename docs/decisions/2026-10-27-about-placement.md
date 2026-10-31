# About card and filter tabs placement: decided from /proto/about

Date: 2026-10-27. Four placements compared at full size behind a picker, with an About as long as the reference example.

## Picked: Dock

- The work fills the page. The only chrome at the top is the name and role (the page's h1).
- A floating dock is fixed to the bottom centre, on frosted glass, with:
  - the avatar button
  - the filter tabs
  - a "Copy my email" button
- Avatar button: toggles the About card as a popover that grows from the dock (scale 0.96 → 1, 10px rise, 220ms, `cubic-bezier(0.23, 1, 0.32, 1)`; exit 140ms). It closes on Esc or a click outside, and focus moves into it and back to the avatar.
- CTA: copies the email address instead of opening a mail app. The label swaps to "Copied" for 1.6s without changing width, and it falls back to a selection copy if the Clipboard API is blocked. On phones it becomes an icon-only button so the tabs keep their room.
- The dock rises in once on page load (CSS animation, so it shows even before JavaScript runs) and is skipped with reduced motion.
- While a project panel is open, the dock sits under the blurred scrim and is inert.

## Rejected

- **Current** (sticky left column). It kept the email on screen but took a whole column from the work, and the user felt it was too fixed while scrolling.
- **Statement** (big-type bio opening the page, tabs docking at the top). The most memorable first screen, but visitors had to scroll past the intro before seeing any work, against the PRD's "About never above the grid".
- **Tile** (About as the first double-width grid tile). Reads as part of the gallery, but it's visible only at the top, and a longer About grows the tile.
