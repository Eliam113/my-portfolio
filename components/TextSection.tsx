'use client'

import { motion } from 'framer-motion'

interface TextSectionProps {
  title: string
  descriptions: Array<string>
}

export default function TextSection({ title, descriptions }: TextSectionProps) {
  return (
    <motion.div
      className="absolute left-0 top-0 h-full w-full md:w-1/2 flex-col flex justify-center items-center p-[5%] text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="md:text-5xl text-3xl font-bold mb-10">{title}</h1>
      {descriptions.map((desc, index) => (
        <p key={index} className="md:text-lg text-base text-white-600 max-w-100 mb-5">{desc}</p>
      ))}

    </motion.div>
  )
}
