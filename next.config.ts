import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: isProduction ? "/my-portfolio" : "",
  output: "export",
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProduction ? "/my-portfolio" : "",
  },
};

module.exports = nextConfig;
