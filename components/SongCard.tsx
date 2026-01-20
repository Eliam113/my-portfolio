import { useRef, useState, useEffect } from "react";
import { Play, Pause, Loader } from "lucide-react";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Create audio once
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!audio || !audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onRequestNext();
    };

    const handleCanPlay = () => {
      setIsLoaded(true);
      setIsLoading(false);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("loadeddata", handleCanPlay);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("loadeddata", handleCanPlay);
    };
  }, [src, onRequestNext]);

  // Automatically play/pause based on `isActive`
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isActive && !isPlaying) {
      if (!isLoaded) {
        // if not loaded yet, load then play when ready
        loadTrack(true);
      } else {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => { 
    const audio = audioRef.current;
    if (!audio) return;

    if (!isLoaded) {
      // If not loaded yet, trigger load-and-play
      loadTrack(true);
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      onActivate(); // Notify parent that this song is now active
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const loadTrack = (andPlay = false) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isLoaded || isLoading) return;

    setIsLoading(true);
    // ensure browser will preload
    try {
      audio.preload = 'auto';
      audio.load();
    } catch (e) {
      // ignore
    }

    const onCanPlay = () => {
      setIsLoaded(true);
      setIsLoading(false);
      audio.removeEventListener('canplaythrough', onCanPlay);
      if (andPlay) {
        onActivate();
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    audio.addEventListener('canplaythrough', onCanPlay);
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
        preload="none"
        onTimeUpdate={updateProgress}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex flex-row justify-between items-center pt-3 ml-[25%]">
        <h3 className="text-purple-200 text-[14px] font-bold mr-5">{title} </h3>
      </div>

    <div className="flex flex-row w-full pb-[5%] items-center pl-[2%]">
      {/* Show Load button until the audio is ready, then show play/pause */}
      {!isLoaded ? (
        <motion.button
          onClick={() => loadTrack(true)}
          disabled={isLoading}
          className="text-purple-200 rounded-full p-2 h-10 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          {isLoading ? <Loader size={25} strokeWidth={3}/> : <Play size={25} strokeWidth={3}/>}
        </motion.button>
      ) : (
        <motion.button
          onClick={togglePlay}
          className="text-purple-200 rounded-full p-2 h-10 flex items-center justify-center"
          whileHover={{ scale: 1.2 }}
        >
          {isPlaying ? <Pause size={25} strokeWidth={3}/> : <Play size={25} strokeWidth={3}/>}
        </motion.button>
      )}

      <motion.div
        ref={progressRef}
        className="md:w-[85%] w-[78%] h-2 bg-gray-700 rounded-full cursor-pointer ml-2 items-center"
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



