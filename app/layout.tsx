import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { getSiteSettings } from "@/lib/content";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/Providers";
import "./globals.css";

const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-Semibold.otf", weight: "600", style: "normal" },
  ],
  variable: "--font-general",
  display: "swap",
  adjustFontFallback: "Arial",
});

const site = getSiteSettings();

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: { default: `${site.name}, ${site.role}`, template: `%s · ${site.name}` },
  description: site.bio,
  openGraph: { type: "website", siteName: site.name },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
  colorScheme: "dark",
};

/*
 * Development only. Some browser extensions (Bitdefender's adds `bis_skin_checked` to every
 * div) tag the page before React hydrates, and React reports each tag as a hydration error.
 * This strips those marker attributes as they appear, then stops once the page has loaded.
 * The cap keeps it from fighting an extension that re-adds them. Never ships to production.
 */
const STRIP_EXTENSION_ATTRIBUTES = `(() => {
  const marker = /^(bis_|__processed_)/;
  let removed = 0;
  const strip = (el) => {
    if (!el.attributes) return;
    for (const { name } of [...el.attributes]) if (marker.test(name)) { el.removeAttribute(name); removed++; }
  };
  const observer = new MutationObserver((records) => {
    for (const r of records) {
      if (r.type === "attributes") { if (marker.test(r.attributeName)) { r.target.removeAttribute(r.attributeName); removed++; } }
      else for (const n of r.addedNodes) if (n.nodeType === 1) { strip(n); n.querySelectorAll("*").forEach(strip); }
    }
    if (removed > 20000) observer.disconnect();
  });
  observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true });
  document.querySelectorAll("*").forEach(strip);
  addEventListener("load", () => setTimeout(() => observer.disconnect(), 3000));
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Browser extensions also write attributes onto <html>/<body> before React loads;
    // don't report those as hydration errors.
    <html lang="en" className={generalSans.variable} suppressHydrationWarning>
      {process.env.NODE_ENV === "development" && (
        <head>
          <script dangerouslySetInnerHTML={{ __html: STRIP_EXTENSION_ATTRIBUTES }} />
        </head>
      )}
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">
          Skip to work
        </a>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
