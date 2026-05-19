import path from "path";
import type { NextConfig } from "next";

/** Evita que Next use C:\Users\...\ como raíz por otros package-lock.json */
const projectRoot = path.join(__dirname);

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb",
    },
    middlewareClientMaxBodySize: "12mb",
  },
};

export default nextConfig;
