import { useState, useRef } from "react";

const PreviewMedia = ({ musicUrl, mediaUrl, mediaType, alt, onLoad }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleImageLoad = () => {
    if (onLoad) {
      onLoad();
    }
  };

  const handleVideoLoad = () => {
    if (onLoad) {
      console.log("video is loaded");
      onLoad();
    }
  };

  return (
    <div
      className="relative rounded-[0.625rem] overflow-hidden bg-jacarta-100 dark:bg-jacarta-700"
      onDragStart={(e) => e.preventDefault()}
      draggable="false"
    >
      {mediaType?.startsWith("video/") ? (
        <>
          <video
            ref={videoRef}
            src={mediaUrl}
            muted={isMuted}
            autoPlay
            loop
            playsInline
            className="w-full h-full object-contain max-h-[600px]"
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            onLoadedData={handleVideoLoad}
            preload="metadata"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMute();
            }}
            className="z-100 absolute top-2 right-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded"
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M16.5 12l3.5-3.5V15.5L16.5 12z" />
                <path d="M5 9v6h4l5 5V4L9 9H5zm11.707-3.293l-1.414 1.414 1.586 1.586L16.5 12l1.379 1.379-1.586 1.586 1.414 1.414 1.586-1.586 1.586 1.586 1.414-1.414-1.586-1.586L22.5 12l-1.379-1.379 1.586-1.586-1.414-1.414-1.586 1.586-1.586-1.586z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M5 9v6h4l5 5V4L9 9H5z" />
                <path d="M14.828 12a4.978 4.978 0 0 0-1.414-3.536l1.414-1.414a6.978 6.978 0 0 1 0 9.9l-1.414-1.414A4.978 4.978 0 0 0 14.828 12zm2.122-6.364l1.414 1.414A8.968 8.968 0 0 1 20.828 12a8.968 8.968 0 0 1-2.464 6.364l-1.414-1.414A6.978 6.978 0 0 0 18.828 12a6.978 6.978 0 0 0-1.878-4.364z" />
              </svg>
            )}
          </button>
          {musicUrl && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMusic();
              }}
              className="z-100 absolute top-2 right-12 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded"
            >
              {isMusicPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <path d="M12 3v12.55A4 4 0 1 0 14 19V8h4V3h-6z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <path d="M12 3v10.55A4 4 0 1 0 14 19V8h4V3h-6z" />
                  <path d="M1.41 1.59L21 21l-1.41 1.41L17.17 20H14a4 4 0 0 1-4-4v-1.17l-6.59 6.59L1.41 20 9 12.41V12a4 4 0 0 1 1.17-2.83L2.83 2 1.41 1.59z" />
                </svg>
              )}
            </button>
          )}
        </>
      ) : (
        <img
          src={mediaUrl}
          alt={alt}
          className="w-full h-full object-contain rounded-[0.625rem] max-h-[600px]"
          loading="lazy"
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          onLoad={handleImageLoad}
        />
      )}
      {musicUrl && !mediaType?.startsWith("video/") && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMusic();
          }}
          className="z-100 absolute top-2 right-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded"
        >
          {isMusicPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="20"
              height="20"
            >
              <path d="M12 3v12.55A4 4 0 1 0 14 19V8h4V3h-6z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="20"
              height="20"
            >
              <path d="M12 3v10.55A4 4 0 1 0 14 19V8h4V3h-6z" />
              <path d="M1.41 1.59L21 21l-1.41 1.41L17.17 20H14a4 4 0 0 1-4-4v-1.17l-6.59 6.59L1.41 20 9 12.41V12a4 4 0 0 1 1.17-2.83L2.83 2 1.41 1.59z" />
            </svg>
          )}
        </button>
      )}
      {musicUrl && <audio ref={audioRef} src={musicUrl} />}
    </div>
  );
};

export default PreviewMedia;
