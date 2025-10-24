'use client'

import { motion } from 'framer-motion'

interface TextSectionProps {
  title: string
  descriptions: Array<string>
}

export default function TextSection({ title, descriptions }: TextSectionProps) {
  return (
    <motion.div
      className="absolute left-0 top-0 h-full w-1/2 flex flex-col justify-center items-start p-[5%] text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl font-bold mb-10">{title}</h1>
      {descriptions.map((desc, index) => (
        <p key={index} className="text-lg text-white-600 max-w-md mb-5">{desc}</p>
      ))}

    </motion.div>
  )
}
