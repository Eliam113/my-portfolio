'use client'

import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'

interface ImageSectionProps {
  src: StaticImageData
  alt: string
}

export default function ImageSection({ src, alt }: ImageSectionProps) {
  return (
    <motion.div
      className="absolute right-0 top-0 h-full md:w-1/2 w-full opacity-40 md:opacity-100 flex justify-center items-center"
    >
      <Image
        src={src}
        alt={alt}
        className="rounded-2xl max-w-[90%]"
      />
    </motion.div>
  )
}
