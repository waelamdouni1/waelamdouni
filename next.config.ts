import type { NextConfig } from "next";

// Project pages lived at /projects/<slug> on the previous site; keep shared links working.
const OLD_PROJECT_PAGES: Record<string, string> = {
  "transit-management-platform": "transit-management",
  "lrt-cloud": "lrt-cloud",
  "powerup-mobile-app": "powerup",
  "caria-car-rental": "caria",
  "pts-redesign": "pts-redesign",
};

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      ...Object.entries(OLD_PROJECT_PAGES).map(([from, to]) => ({
        source: `/projects/${from}`,
        destination: `/work/${to}`,
        permanent: true,
      })),
      { source: "/projects/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
