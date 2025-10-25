import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "/my-portfolio",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "/my-portfolio",
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
