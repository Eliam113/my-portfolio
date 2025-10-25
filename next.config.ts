import { b, image } from "framer-motion/client"

/**
 * @type {import('next').NextConfig}
 */

const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProduction ? "/my-portfolio" : "",
  output: "export",
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProduction ? "/my-portfolio" : "",
  },
};

module.exports = nextConfig;
