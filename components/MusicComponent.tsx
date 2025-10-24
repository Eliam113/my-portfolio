"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MusicComponent() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const songs = Array.from({ length: 10 }, (_, i) => ({
    title: `Track ${i + 1}`,
  }));

  return (
    <section ref={sectionRef} className="relative h-[120vh] w-full">
      {/* Fixed viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {songs.map((song, i) => {
          // Adjust scroll range dynamically based on index
          const start = i * 0.04;
          const end = start + 0.25;

          // Make top 4 appear immediately (no delay)
          const initialOpacity = i < 4 ? 1 : 0;

          const opacity = useTransform(
            scrollYProgress,
            [start, end],
            [initialOpacity, 1]
          );

          const scale = useTransform(scrollYProgress, [start, end], [0.8, 1]);
          const y = useTransform(scrollYProgress, [start, end], ["30vh", "-30vh"]);
          return (
            <motion.div
              key={i}
              style={{
                opacity,
                scale,
                y,
              }}
              className="absolute w-[50vw] max-w-[400px] h-[100px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white text-lg font-semibold"
            >
              🎵 {song.title}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
