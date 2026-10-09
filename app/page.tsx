"use client";

import { motion } from "framer-motion";
import Image from 'next/image';

import TextSection from "@/components/TextSection";
import ImageSection from "@/components/ImageSection";
import ConnectSection from "@/components/ConnectSection";
import MusicGallery from "@/components/MusicGallery";
import PrSection from "@/components/PrSection";
import SocialProfileButtons from "@/components/socialMedia";
import { BeamsBackground } from "@/components/ui/beams-background";

import eliamStation from '../public/EliamStation.png';
import myLogo from '../public/Untitled design (1).png';

const descArray = [
  "I’m a software engineer and music producer passionate. I have programming experiences since 2017 where I started web development with HTML, CSS, and JavaScript in a coding workshop in Highschool for 5 years. I've also taken a 2 years Python class back then.",
  "Since then I have learned React, Node.js, Three.js, and more. Later on I learned Java, Tailwind.css and React Native. I programmed video games in the browser, as well as Unity and multiplayer games using websockets.",
  "In addition to coding, I produce music using Ableton Live combined with Native Instruments. I am very inspired by movie/video game -soundtracks. Check my music below!",
];

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden bg-black text-white">
      <motion.button
        className="fixed left-4 top-4 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/40 shadow-lg backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        aria-label="Go to top"
      >
        <Image src={myLogo} alt="Eliam logo" className="h-12 w-12 rounded-full object-cover" />
      </motion.button>

      <section id="home" className="relative min-h-screen scroll-mt-20">
        <div className="absolute inset-0 opacity-60">
          <BeamsBackground />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-8 px-6 py-20 md:flex-row md:gap-12">
          <div className="w-full md:w-1/2">
            <TextSection title="Eliam Mputu" descriptions={descArray} />

            <div className="mt-8 flex items-center justify-center md:justify-start">
              <SocialProfileButtons />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <ImageSection src={eliamStation} alt="Eliam portrait" />
          </div>
        </div>
      </section>

      <section id="music" className="relative min-h-screen scroll-mt-20">
        <MusicGallery />
      </section>

      <section id="programming" className="relative min-h-screen scroll-mt-20">
        <PrSection />
      </section>

      <section id="connect" className="relative min-h-screen scroll-mt-20">
        <ConnectSection />
      </section>
    </main>
  );
}

