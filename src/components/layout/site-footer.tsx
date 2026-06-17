import Link from "next/link";

import { siteConfig } from "@/data/site";

const socialIcons = {
  linkedin: "LinkedIn",
  twitter: "X",
} as const;

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="section-container border-t border-border/30 py-12 md:py-16 text-center"
      aria-label="Site footer"
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center">
          <p className="font-serif text-xl sm:text-2xl">{siteConfig.name}</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="link-underline mt-2 inline-block text-sm opacity-80 hover:opacity-100"
          >
            {siteConfig.email}
          </a>
        </div>

        <nav aria-label="Social links" className="w-full flex justify-center">
          <ul className="flex flex-wrap justify-center gap-6">
            {siteConfig.social.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm font-medium opacity-80 hover:opacity-100"
                >
                  {socialIcons[item.icon]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="mt-10 text-xs opacity-50">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
    </footer>
  );
}
