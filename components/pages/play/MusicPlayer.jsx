import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const MusicPlayer = ({ 
  songUrl, 
  title = 'Current Track',
  artist = 'Unknown Artist',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!isDragging) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (e) => {
    const bounds = progressBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    const time = percent * audioRef.current.duration;
    audioRef.current.currentTime = time;
    setProgress(percent * 100);
  };

  const handleProgressMouseDown = () => {
    setIsDragging(true);
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  const handleProgressMouseMove = (e) => {
    if (isDragging) {
      const bounds = progressBarRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - bounds.left) / bounds.width));
      const time = percent * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(percent * 100);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleProgressMouseMove);
    window.addEventListener('mouseup', handleProgressMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleProgressMouseMove);
      window.removeEventListener('mouseup', handleProgressMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.loop = true;

    // Reset player when URL changes
    setIsPlaying(false);
    setProgress(0);
    audioElement.pause();
    audioElement.currentTime = 0;

    return () => {
      audioElement.pause();
      setIsPlaying(false);
    };
  }, [songUrl]);

  return (
    <div className="bg-white dark:bg-jacarta-700 rounded-lg p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {title}
          </p>
          {/* <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {artist}
          </p> */}
        </div>
        
        <button 
          onClick={togglePlay}
          type='button'
          className="bg-accent text-white rounded-full p-2 hover:bg-accent-dark transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      <div 
        ref={progressBarRef}
        className="mt-2 h-1 bg-gray-200 dark:bg-jacarta-600 rounded-full cursor-pointer"
        onClick={handleProgressClick}
        onMouseDown={handleProgressMouseDown}
      >
        <div 
          className="h-1 bg-accent rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <audio 
        ref={audioRef} 
        src={songUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default MusicPlayer;