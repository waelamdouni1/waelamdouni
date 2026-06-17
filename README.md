# Premium UI/UX Designer Portfolio

A bold, editorial portfolio built with Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Lenis smooth scrolling, and shadcn-style UI primitives.

## Stack

- **Next.js 15** — App Router
- **TypeScript** — strict types & CMS-ready interfaces
- **Tailwind CSS v4** — design tokens & dark/light themes
- **Framer Motion** — scroll reveals, page loader, magnetic buttons
- **Lenis** — smooth scrolling
- **next-themes** — light/dark mode
- **shadcn/ui** — Button component pattern

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/              # Layout, page, globals
├── components/
│   ├── effects/      # Cursor, grain, loader, Lenis
│   ├── layout/       # Navbar, providers
│   ├── projects/     # ProjectCard, ProjectsGrid
│   ├── sections/     # Hero, About, Process, etc.
│   ├── shared/       # SectionHeading, ThemeToggle
│   └── ui/           # shadcn Button
├── data/             # Static content (swap for CMS)
├── hooks/
└── lib/cms/          # Types & adapter exports
```

## Customization

- **Site info:** `src/data/site.ts`
- **Projects:** `src/data/projects.ts`
- **Colors:** `src/app/globals.css` (`:root` / `.dark`)
- **CMS:** Extend `src/lib/cms/` with your fetch layer

## Features

- Sticky blurred navbar
- Masonry-style project grid with staggered columns
- Scroll reveal & hover micro-interactions
- Custom cursor (desktop)
- Grain overlay
- Page load transition
- Dark/light theme toggle
- Fully responsive layout

## Build

```bash
npm run build
npm start
```
