import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { on } from "events";
import { motion } from "framer-motion";

interface SongCardProps {
  title: string;
  artist: string;
  src: string;
  isActive: boolean;
  onActivate: () => void;
  onRequestNext: () => void;
}

const SongCard = ({ title, artist, src, isActive, onActivate, onRequestNext}: SongCardProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Create audio once
  useEffect(() => {
    audioRef.current = new Audio(src);
    const audio = audioRef.current;

    const updateProgress = () => {
      if (!audio || !audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onRequestNext();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [src, onRequestNext]);

  // Automatically play/pause based on `isActive`
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isActive && !isPlaying) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => { 
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      onActivate(); // Notify parent that this song is now active
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    if (!audio || isNaN(audio.duration)) return;
    const percent = (audio.currentTime / audio.duration) * 100;
    setProgress(percent);
  };

  const scrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    audio.currentTime = (clickX / width) * audio.duration;
  };

  return (
    <div className="bg-zinc-900 rounded-xl flex flex-col h-22">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={updateProgress}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex flex-row justify-between items-center pt-3 ml-[25%]">
        <h3 className="text-purple-200 text-[14px] font-bold mr-5">{title} </h3>
      </div>

    <div className="flex flex-row w-full pb-[5%] items-center pl-[2%]">
      <motion.button
        onClick={togglePlay}
        className="text-purple-200 rounded-full p-2 h-10 flex items-center justify-center"
        whileHover={{ scale: 1.2 }}
      >
        {isPlaying ? <Pause size={25} strokeWidth={3}/> : <Play size={25} strokeWidth={3}/>}
      </motion.button>

      <motion.div
        ref={progressRef}
        className="w-[85%] h-2 bg-gray-700 rounded-full cursor-pointer ml-4 items-center"
        onClick={scrub}
        whileHover={{ scaleY: 1.5 }}
      >
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full transition-[width]"
        />
      </motion.div>

    </div>
    </div>
  );
};

export default SongCard;



