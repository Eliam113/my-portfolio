"use client";
import { motion } from "framer-motion";

export default function ConnectSection() {
  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-4"
      >
        Let’s Connect
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg max-w-xl opacity-80 mb-8"
      >
        I’d love to collaborate or hear your feedback!  
        Reach out for music production, software projects, or anything creative.
      </motion.p>

      <motion.a
        href="mailto:eliam.mputu113@gmail.com"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-purple-700 rounded-full font-semibold hover:bg-purple-600 transition"
      >
        Contact Me
      </motion.a>
    </section>
  );
}
