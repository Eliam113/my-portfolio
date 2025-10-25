"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { useRef, useState, useEffect } from "react";

import SongCard from "./SongCard";

import { BeamsBackground } from "@/components/ui/beams-background";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

//import Eliam1 from "@/public/Eliam1beat20252.wav";
console.log("Base path is:", process.env.NEXT_PUBLIC_BASE_PATH);
const songs = [{
  title: `Holy Beat`,
  artist: "Eliam",
  src: `${basePath}/Eliam1beat20252.wav`,
}, {
  title: `Summer Orchestra`,
  artist: "Eliam",
  src: `${basePath}/OrchestreETE2_version02.wav`,
}, {
  title: `Sleeping Star`,
  artist: "Eliam",
  src: `${basePath}/SleepingStar-Eliam.wav`,
}
, {
  title: `Cinematic Drive`,
  artist: "Eliam",
  src: `${basePath}/Cinematic1-Eliam1.wav`,
}
, {
  title: `The Goblin Dance`,
  artist: "Eliam",
  src: `${basePath}/Goblin2-2.wav`,
},
{
  title: `The PhilX Beat`,
  artist: "Eliam",
  src: `${basePath}/ThePhilX-4.wav`,
},
{
  title: `The 1st Samurai`,
  artist: "Eliam",
  src: `${basePath}/U_Samurai_test1.mp3`,
}
];

export default function MusicGallery() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"],
    });

  //handle music automation
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const handleActivate = (index: number) => {
      setCurrentIndex(index);
    };

    const handleNext = (index: number) => {
      if (index + 1 < songs.length) {
        setCurrentIndex(index + 1);
      } else {
        setCurrentIndex(null); // reached end
      }
    };



  return (
  
    <motion.section
      ref={sectionRef}
      className="w-full h-screen flex z-20 relative transition-colors items-center justify-center flex-col"
    >
            <motion.div
              className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-12 overflow-visible pb-2"
              initial={{ y: 20, scale:0.85}}
              whileInView={{ y: 0, scale:1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
            <h1>My Music🎧</h1>
            </motion.div>

        <motion.div className="h-[500px] w-[900px] max-w-[90%] rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 items-center justify-center flex "
        initial={{ y: 50, scale:0.85}}
        whileInView={{ y: 0, scale:1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, duration: 0.7 }}
        >

      <motion.div
        className="
          w-[900px] max-w-[99.99%]
          h-[500px] max-h-[99.99%]
          bg-black/95
          rounded-2xl
          overflow-y-auto
          p-10 space-y-3
          border border-neutral-800
          no-scrollbar
        "
      >
        {songs.map((song, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, backgroundColor: "#111" }}
            // className="
            //   w-full h-[75px]
            //   bg-neutral-900
            //   rounded-xl
            //   flex items-center px-10
            //   text-white font-medium cursor-pointer
            //   border border-neutral-800
            //   transition-colors
            // "
          >
            <SongCard key={index} title={song.title} artist={song.artist} src={song.src}
            isActive={currentIndex === index}
            onActivate={() => handleActivate(index)}
            onRequestNext={() => handleNext(index)}/>
          </motion.div>
        ))}
      </motion.div>
      </motion.div>
    </motion.section>
  );
}
