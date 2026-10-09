import { motion } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward, Loader } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";

interface SongCardProps {
  title: string;
  artist: string;
  src: string;
  isActive: boolean;
  onActivate: () => void;
  onRequestNext: () => void;
  onRequestPrevious: () => void;
}

const SongCard = ({
  title,
  artist,
  src,
  isActive,
  onActivate,
  onRequestNext,
  onRequestPrevious,
}: SongCardProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!audio.duration) return;
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isActive) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (!isLoaded) {
      loadTrack(true);
      return;
    }

    audio.play().then(() => setIsPlaying(true)).catch(() => {
      setIsPlaying(false);
    });
  }, [isActive, isLoaded]);

  const loadTrack = (andPlay = false) => {
    const audio = audioRef.current;
    if (!audio || isLoading || isLoaded) return;

    setIsLoading(true);
    audio.preload = "auto";
    audio.load();

    const onCanPlay = () => {
      setIsLoaded(true);
      setIsLoading(false);
      audio.removeEventListener("canplaythrough", onCanPlay);

      if (andPlay) {
        onActivate();
        audio.play().then(() => setIsPlaying(true)).catch(() => {
          setIsPlaying(false);
        });
      }
    };

    audio.addEventListener("canplaythrough", onCanPlay);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isActive) {
      onActivate();
    }

    if (!isLoaded) {
      loadTrack(true);
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.play().then(() => setIsPlaying(true)).catch(() => {
      setIsPlaying(false);
    });
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    if (!audio || Number.isNaN(audio.duration)) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const scrub = (event: MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    audio.currentTime = (clickX / width) * audio.duration;
  };

  return (
    <div className={`mb-3 rounded-2xl border p-3 transition-all ${isActive ? "border-purple-500 bg-zinc-900 shadow-lg shadow-purple-500/10" : "border-zinc-800 bg-zinc-950/90"}`}>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onTimeUpdate={updateProgress}
        onPause={() => setIsPlaying(false)}
      />

      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">{artist}</p>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        {isActive && (
          <span className="rounded-full border border-purple-500/40 bg-purple-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-200">
            Now Playing
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Previous track"
          onClick={() => onRequestPrevious()}
          className="rounded-full border border-zinc-700 p-2 text-zinc-200 transition hover:border-purple-400 hover:text-purple-200"
        >
          <SkipBack size={16} />
        </button>

        {!isLoaded ? (
          <button
            type="button"
            aria-label={isLoading ? "Loading track" : "Load and play track"}
            onClick={() => loadTrack(true)}
            disabled={isLoading}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white transition hover:bg-purple-500 disabled:cursor-wait disabled:opacity-70"
          >
            {isLoading ? <Loader size={18} className="animate-spin" /> : <Play size={18} className="ml-0.5" />}
          </button>
        ) : (
          <button
            type="button"
            aria-label={isPlaying ? "Pause track" : "Play track"}
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-purple-500/30 transition hover:scale-105"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>
        )}

        <button
          type="button"
          aria-label="Next track"
          onClick={() => onRequestNext()}
          className="rounded-full border border-zinc-700 p-2 text-zinc-200 transition hover:border-purple-400 hover:text-purple-200"
        >
          <SkipForward size={16} />
        </button>

        <div
          ref={progressRef}
          className="relative h-2 flex-1 cursor-pointer overflow-hidden rounded-full bg-zinc-700"
          onClick={scrub}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-[width]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SongCard;

