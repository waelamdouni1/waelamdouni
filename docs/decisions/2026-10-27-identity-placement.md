# Name and job title placement: decided from /proto/identity

Date: 2026-10-27. Goal: win back the top row of the home page without hiding the name and title.

## Picked: In dock

- The name and title sit inside the dock, right after the avatar, as two short lines: "Wael" (13px, 600) over "UI/UX Designer" (12px, muted).
- The dock shows only the first name (`shortName` in `content/site.json`). The full name stays in the page title, metadata, the About card and a visually hidden h1.
- The top row is gone, so the grid starts at the top gutter.
- The title changed from "Product Designer" to "UI/UX Designer" everywhere.

## Rejected

- **Current** (row at the top). Costs about 50px and scrolls out of view.
- **Chip** (frosted name tag pinned top-left). Always visible, but it covers a corner of the first tile and whatever scrolls under it.
- **Rail** (vertical spine on the left edge). Distinctive and never covers the work, but costs 34–44px of width and sideways text is slower to read.
- The full name inside the dock was cut off on phones ("Wael…"). Showing only the first name keeps it fully visible.
