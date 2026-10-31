// Imports prototype videos into public/media/<slug>/:
//   thumb.webp   poster frame (also the wall thumbnail)
//   preview.mp4  short, light hover loop (no sound)
//   media.mp4    full video for the open panel (no sound, web-sized)
// Prints the size/duration of each so content/projects.json can be filled in.
//
//   node scripts/import-videos.mjs "<source folder>"

import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = process.argv[2];
if (!SOURCE) throw new Error("Pass the source folder as the first argument");

// file name → slug
const VIDEOS = {
  "Landingpage_gadgetly.mp4": "gadgetlyhome-landing",
  "landing_page.mp4": "landing-page",
  "Earth_Prototype.mp4": "earth",
  "cardgame.mp4": "card-game",
  "Notepaper.mp4": "notepaper",
  "circle.mp4": "circle",
  "Invitation.mp4": "invitation",
  "Delete.mp4": "delete",
};

function probe(file) {
  let out = "";
  try {
    execFileSync(ffmpeg, ["-hide_banner", "-i", file], { stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    out = String(e.stderr);
  }
  const dur = out.match(/Duration: (\d+):(\d+):([\d.]+)/);
  const size = out.match(/Video:.*?, (\d{2,5})x(\d{2,5})/);
  if (!dur || !size) throw new Error(`Could not read ${file}`);
  return {
    duration: +dur[1] * 3600 + +dur[2] * 60 + +dur[3],
    width: +size[1],
    height: +size[2],
  };
}

const run = (args) => execFileSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
const even = (n) => Math.round(n / 2) * 2;

const results = [];
for (const [file, slug] of Object.entries(VIDEOS)) {
  const src = path.join(SOURCE, file);
  const info = probe(src);
  const dir = path.join(ROOT, "public/media", slug);
  await fs.mkdir(dir, { recursive: true });

  // Poster: a frame a third of the way in, saved as WebP at up to 1600px wide.
  const posterPng = path.join(dir, "_poster.png");
  run(["-ss", String(Math.min(2, info.duration / 3)), "-i", src, "-frames:v", "1", posterPng]);
  const thumbW = Math.min(1600, info.width);
  const thumb = await sharp(posterPng).resize({ width: thumbW }).webp({ quality: 84 }).toFile(path.join(dir, "thumb.webp"));
  await fs.rm(posterPng);

  // Hover loop: first 8 seconds, 720px wide, no sound, small.
  const previewW = Math.min(720, even(info.width));
  run([
    "-i", src, "-t", "8", "-an",
    "-vf", `scale=${previewW}:-2,fps=30`,
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "30", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    path.join(dir, "preview.mp4"),
  ]);

  // Full video for the panel: up to 1600px wide, no sound.
  const mediaW = Math.min(1600, even(info.width));
  run([
    "-i", src, "-an",
    "-vf", `scale=${mediaW}:-2`,
    "-c:v", "libx264", "-preset", "medium", "-crf", "26", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    path.join(dir, "media.mp4"),
  ]);

  const sizes = {};
  for (const f of ["thumb.webp", "preview.mp4", "media.mp4"]) sizes[f] = Math.round((await fs.stat(path.join(dir, f))).size / 1024) + "KB";
  results.push({ file, slug, ...info, thumb: { width: thumb.width, height: thumb.height }, media: { width: mediaW, height: even((mediaW * info.height) / info.width) }, sizes });
  console.log(`✓ ${file} → ${slug}`);
}
console.log(JSON.stringify(results, null, 2));
