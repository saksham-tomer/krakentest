import React, { useRef, useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

const AudioPlayer = ({ src, poster, title, artist }) => {
  const sortingOptions = [
    { text: "Sample track 1" },
    { text: "Sample track 2" },
    { text: "Sample track 3" },
  ];
  const [currentSorting, setCurrentSorting] = useState(sortingOptions[0]);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Volume from 0 to 1

  // Play/Pause the audio
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update current time
  const updateCurrentTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Update the progress bar on time update
  const handleProgressChange = (event) => {
    const newTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // Set up event listeners when the audio is loaded
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
      }
    };
  }, []);

  return (
    <div>
      {/* Title and Artist */}
      <div className="dropdown relative my-1 cursor-pointer">
        <div
          className="dropdown-toggle inline-flex w-full bg-black items-center justify-between rounded-lg   py-2 px-3 text-sm   dark:text-white"
          role="button"
          id="categoriesSort"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="font-display">{currentSorting.text}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="h-4 w-4 fill-jacarta-500 dark:fill-white"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
          </svg>
        </div>

        <div
          className="dropdown-menu z-10 hidden w-full whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
          aria-labelledby="categoriesSort"
        >
          {" "}
          {sortingOptions.map((elm, i) => (
            <button
              onClick={() => setCurrentSorting(elm)}
              key={i}
              className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm text-jacarta-700 transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
            >
              {elm.text}
              {currentSorting == elm && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-4 w-4 fill-accent"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Audio Controls */}
      <div className="controls flex flex-col bg-black rounded-lg py-4 px-3">
        <div className="text-white text-center mb-4">
          <h2 className="text-base font-bold">{title}</h2>
        </div>

        <div className="flex gap-3 items-center">
          {/* Play/Pause button */}

          <button
            onClick={togglePlayPause}
            className="text-accent w-8 h-8 flex items-center justify-center bg-jacarta-600 rounded-full"
          >
            <FaPlay />
          </button>
          <button
            onClick={togglePlayPause}
            className="text-accent w-8 h-8 flex items-center justify-center bg-jacarta-600 rounded-full"
          >
            <FaPause />
          </button>

          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleProgressChange}
            className="flex-1  range-slider"
          />
        </div>

        {/* Volume Control */}
        {/* <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={handleVolumeChange}
          className="w-24"
        /> */}
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Custom Slider Styles */}
      <style jsx>{`
        /* Custom Slider Style */
        .range-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 5px;
          transition: background-color 0.2s ease;
        }

        .range-slider::-webkit-slider-runnable-track {
          background: #363a5d; /* Dark gray track */
          border-radius: 5px;
        }

        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: #9e7cff; /* Green thumb */
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .range-slider::-webkit-slider-thumb:hover {
          background: #7444ff; /* Darker green on hover */
        }

        .range-slider::-webkit-slider-thumb:focus {
          background: #9e7cff; /* Focused thumb color */
        }

        .range-slider:focus {
          background: #b9a0ff; /* Focused track color */
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;
