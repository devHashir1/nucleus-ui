import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack rooted at this project (a stray parent lockfile confuses root detection)
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
