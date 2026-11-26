import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Product screenshots carry small UI text, so they are served at 90.
  images: { qualities: [75, 90] },
  // The App Store listings and older links point at the legacy static pages.
  async redirects() {
    return [
      { source: "/privacy.html", destination: "/privacidade", permanent: true },
      { source: "/support.html", destination: "/suporte", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
