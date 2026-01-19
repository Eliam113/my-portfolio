"use client";
import { motion } from "framer-motion";

export default function PrSection() {
  return (
    <section className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 text-center">
        <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg max-w-xl opacity-80 mb-8"
      >
        COMING SOON...
      </motion.p>
    </section>
  );
}