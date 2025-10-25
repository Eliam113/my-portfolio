import { b, image } from "framer-motion/client"

/**
 * @type {import('next').NextConfig}
 */

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  basePath: isProduction ? '/my-portfolio' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
 publicRuntimeConfig: {
    basePath: isProduction ? '/my-portfolio' : '',
  },
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
}
 
module.exports = nextConfig
