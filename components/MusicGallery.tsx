"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import SongCard from "./SongCard";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const songs = [
  { title: "If only I could fly", artist: "Eliam", src: `${basePath}/If only I could fly-final3.mp3` },
  { title: "Sleeping Star", artist: "Eliam", src: `${basePath}/Sleeping star - Eliam Mputu.mp3` },
  { title: "Holy Beat", artist: "Eliam", src: `${basePath}/Eliam1beat20252.wav` },
  { title: "Summer Orchestra", artist: "Eliam", src: `${basePath}/OrchestreETE2_version02.wav` },
  { title: "Cinematic Drive", artist: "Eliam", src: `${basePath}/Cinematic1-Eliam1.wav` },
  { title: "The Goblin Dance", artist: "Eliam", src: `${basePath}/Goblin2-2.wav` },
  { title: "The PhilX Beat", artist: "Eliam", src: `${basePath}/ThePhilX-4.wav` },
  { title: "The 1st Samurai", artist: "Eliam", src: `${basePath}/U_Samurai_test1.mp3` },
];

export default function MusicGallery() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);

  const handleActivate = (index: number) => setCurrentIndex(index);

  const handleNext = (index: number) => {
    setCurrentIndex((index + 1) % songs.length);
  };

  const handlePrevious = (index: number) => {
    setCurrentIndex((index - 1 + songs.length) % songs.length);
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 text-white">
      <motion.div
        className="mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-3xl font-black text-transparent md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>My Music 🎧</h1>
      </motion.div>

      <div className="w-full max-w-4xl rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px] shadow-2xl shadow-fuchsia-500/20">
        <div className="max-h-[70vh] overflow-y-auto rounded-2xl bg-black/90 p-4 md:p-5">
          {songs.map((song, index) => (
            <motion.div key={song.title} whileHover={{ scale: 1.01 }}>
              <SongCard
                title={song.title}
                artist={song.artist}
                src={song.src}
                isActive={currentIndex === index}
                onActivate={() => handleActivate(index)}
                onRequestNext={() => handleNext(index)}
                onRequestPrevious={() => handlePrevious(index)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
