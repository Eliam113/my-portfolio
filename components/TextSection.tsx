'use client'

import { motion } from 'framer-motion'

interface TextSectionProps {
  title: string
  descriptions: Array<string>
}

export default function TextSection({ title, descriptions }: TextSectionProps) {
  return (
    <motion.div
      className="flex max-w-xl flex-col items-start justify-center text-white"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <h1 className="mb-6 text-4xl font-black md:text-6xl">{title}</h1>
      {descriptions.map((desc, index) => (
        <p key={index} className="mb-4 text-base leading-relaxed text-zinc-200 md:text-lg">
          {desc}
        </p>
      ))}
    </motion.div>
  )
}
