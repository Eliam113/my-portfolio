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
      className="relative mx-auto flex max-w-lg items-center justify-center"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <Image
        src={src}
        alt={alt}
        className="rounded-[28px] border border-white/10 shadow-2xl shadow-purple-500/20"
        priority
      />
    </motion.div>
  )
}
