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
      className="absolute right-0 top-0 h-full w-1/2 flex justify-center items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.05}}
    >
      <Image
        src={src}
        alt={alt}
        className="rounded-2xl shadow-lg object-cover max-w-[80%]"
      />
    </motion.div>
  )
}
