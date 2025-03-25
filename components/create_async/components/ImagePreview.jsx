import { useEffect, useState } from "react";

const ImagePreview = ({ file, choosImageRef, savedPrevUrl, savedPrevType }) => {
  const [preview, setPreview] = useState(savedPrevUrl || "");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    else if (savedPrevUrl) {
      setPreview(savedPrevUrl); // Use saved preview URL if no file is selected
    }
    return () => setPreview("");
  }, [file, savedPrevType]);

  const isImage = (file && file.type.startsWith("image/")) || (savedPrevType && savedPrevType.startsWith("image/"));
  const isVideo = !isImage && ((file && file.type.startsWith("video/")) || (savedPrevType && savedPrevType.startsWith("video/")));
  
  return (
    <div>
      {preview||file ? (
        <div className="w-full h-[30rem]">
          {isImage && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full rounded-md object-cover scale-in-center"
            />
          )}
          {isVideo && (
            <video
              src={preview}
              controls
              className="w-full h-full rounded-md object-cover scale-in-center"
            />
          )}
        </div>
      ) : (
        <div
          onClick={() => choosImageRef.current.click()}
          className="group relative flex w-full h-[28rem] flex-col items-center justify-center rounded-lg border-2 border-dashed border-jacarta-100 bg-white py-20 px-5 text-center dark:border-jacarta-600 dark:bg-jacarta-700 z-1 cursor-pointer"
        >
          <div className="relative z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="mb-4 inline-block fill-jacarta-500 dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
            </svg>
            <p className="mx-auto max-w-xs text-xs dark:text-jacarta-300">
              JPG, PNG, GIF, SVG, WEBP, MP4, WEBM, OGG
            </p>
            <p className="mx-auto max-w-xs text dark:text-jacarta-300 mt-1">
              Max file size: 200MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
