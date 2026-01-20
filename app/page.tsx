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
import PrSection from "@/components/PrSection";
import SocialProfileButtons from "@/components/socialMedia";
import { BeamsBackground } from "@/components/ui/beams-background";

import ds from './ds.jpg';
import meImg from '../public/meImg.jpg';
import eliamStation from '../public/EliamStation.png';
import myLogo from '../public/Untitled design (1).png';

const descArray = [
  "I’m a software engineer and music producer passionate. I have programming experiences since 2017 where I started web development with HTML, CSS, and JavaScript in a coding workshop in Highschool for 5 years. I've also taken a 2 years Python class back then.",
  "Since then I have learned React, Node.js, Three.js, and more. Later on I learned Java, Tailwind.css and React Native. I programmed video games in the browser, as well as Unity and multiplayer games using websockets.",
  "In addition to coding, I produce music using Ableton Live combined with Native Instruments. I am very inspired by movie/video game -soundtracks. Check my music below!",]

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  

  // Scroll helper: detect the currently visible section (by visible area) and go to the next one (cycles to first)
  const scrollToNextSection = () => {
    // Prefer the main snapping container if available
    const container = (containerRef.current as HTMLElement | null) || document.scrollingElement || document.documentElement

    // Collect only sections that have an id (so we respect explicit order/targets)
    const sections: HTMLElement[] = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[]

    if (sections.length === 0) return

    // Determine which section has the largest visible area in the viewport
    let currentIndex = 0
    let maxVisible = -1

    sections.forEach((s, i) => {
      const rect = s.getBoundingClientRect()
      // visible height within viewport
      const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0))
      if (visibleHeight > maxVisible) {
        maxVisible = visibleHeight
        currentIndex = i
      }
    })

    // If nothing is visibly positive (edge-case), fall back to closest-to-top strategy
    if (maxVisible === 0) {
      let minDist = Infinity
      sections.forEach((s, i) => {
        const rect = s.getBoundingClientRect()
        const dist = Math.abs(rect.top)
        if (dist < minDist) {
          minDist = dist
          currentIndex = i
        }
      })
    }

    const nextIndex = (currentIndex + 1) % sections.length
    // Scroll the target into view. If the nearest scrollable ancestor is the snapping main,
    // scrollIntoView will use it; otherwise it scrolls the document.
    sections[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="relative overflow-x-hidden snap-y snap-mandatory h-screen overflow-scroll no-scrollbar bg-black" ref={containerRef}>
      <motion.button onClick={scrollToNextSection} className="fixed flex md:w-[120px] w-[80px] max-h-[80%] items-center justify-center opacity-80 ml-[4%] mt-[4%] z-25 bg-transparent border-0" whileHover={{ scale: 1.05, opacity: 1 }} aria-label="Go to next section">
        <Image src={myLogo} alt="Eliam logo"/>
      </motion.button>
      <div className="fixed flex items-center justify-center opacity-80 ml-[4%] mt-[84vh] mb-10 z-15 bg-transparent border-0" >
      <SocialProfileButtons />
      </div>
      
      <section id="main-section" className="snap-start h-screen w-full relative pointer-events-none">
        <motion.div
          className="fixed top-0 left-0 w-full h-screen z-10 transition-opacity duration-700"
        >
          <ImageSection src={eliamStation} alt="Eliam portrait" />

          <TextSection
            title="Eliam Mputu"
            descriptions = {descArray}
          />
        </motion.div>
      </section>

      {/* Music Section */}
      <section id="music-section" className="snap-center h-screen relative z-20">
        <div className="absolute inset-0 z-15">
          <BeamsBackground/>
        </div>
        <MusicGallery />
      </section>

      {/* Programming Section */}
      <section id="programming-section" className="snap-center min-h-screen relative z-20">
        <PrSection/>
      </section>

      {/* Let's Connect */}
      <section id="connect-section" className="snap-start min-h-screen relative z-20">
        <ConnectSection/>
      </section>
    </main>
  )
}

