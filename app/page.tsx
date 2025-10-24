"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image, { StaticImageData } from 'next/image'

import TextSection from "@/components/TextSection";
import ImageSection from "@/components/ImageSection";
import MusicComponent from "@/components/MusicComponent";
import ConnectSection from "@/components/ConnectSection";
import MusicGallery from "@/components/MusicGallery";
import HorizontalTrack from "@/components/HorizontalTrack";
import { BeamsBackground } from "@/components/ui/beams-background";

import ds from './ds.jpg';
import meImg from '../public/meImg.jpg';
import eliamStation from '../public/EliamStation.png';
import myLogo from '../public/Untitled design.png';

const descArray = [
  "I’m a software engineer and music producer passionate. I have programming experiences since 2017 where I started web development with HTML, CSS, and JavaScript in a coding workshop in Highschool for 5 years. I've also taken a 2 years Python class back then.",
  "Since then I have learned React, Node.js, Three.js, and more. Later on I learned Java, Tailwind.css and React Native. I programmed video games in the browser, as well as Unity and multiplayer games using websockets.",
  "In addition to coding, I produce music using Ableton Live combined with Native Instruments. I am very inspired by movie/video game -soundatracks. Check my music below!",]

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  

  return (
    <main className="relative overflow-x-hidden snap-y snap-mandatory h-screen overflow-scroll no-scrollbar bg-black" ref={containerRef}>
      <motion.div className="fixed flex w-[100px] max-h-[80%] items-center justified-center opacity-60 ml-[35%] mt-35" whileHover={{ scale: 1.5, opacity: 1 }}>
      <Image src={myLogo} alt="Eliam logo"/>
      </motion.div>
      
      <section className="snap-start h-screen w-full relative pointer-events-none">
        <motion.div
          className="fixed top-0 left-0 w-full h-screen z-10 transition-opacity duration-700"
        >
          <TextSection
            title="Hi, I’m Eliam"
            descriptions = {descArray}
          />
          <ImageSection src={eliamStation} alt="Eliam portrait" />
        </motion.div>
      </section>

      {/* Music Section */}
      <section className="snap-center h-screen relative z-20">
        <div className="absolute inset-0 z-15">
          <BeamsBackground/>
        </div>
        <MusicGallery />
      </section>


      {/* Let's Connect */}
      <section className="snap-start min-h-screen relative z-20">
      <ConnectSection/>
      </section>
    </main>
  )
}

