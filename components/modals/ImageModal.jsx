/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import { FaImage, FaYoutube } from "react-icons/fa"; // Import icons
import Image from "next/image";
import Link from "next/link";

import ImagePreview from "../create/components/ImagePreview";
import MultipleImagePreview from "../create/components/MultipleImagePreview";

export default function ImageModal({
  selectedElement,
  handleLocationImageChange,
  handleNPCImageChange,
  selectedData,
  isAdding,
  isOpen,
  setIsOpen,
}) {
  const choosImageRef = useRef();
  const [imageData, setImageData] = useState({
    title: "",
    description: "", 
    file: "",
    youtubeUrl: "",
    type: "image" // 'image' or 'youtube'
  });
  const [error, setError] = useState({ title: "", file: "", youtubeUrl: "" });

  const validateYoutubeUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return regex.test(url);
  };

  const handleAdd = () => {
    let hasError = false;
    const newErrors = { title: "", file: "", youtubeUrl: "" };

    if (!imageData.title) {
      newErrors.title = "You need to put the title";
      hasError = true;
    }

    if (imageData.type === 'image' && !imageData.file) {
      newErrors.file = "You need to upload the image";
      hasError = true;
    }

    if (imageData.type === 'youtube' && !validateYoutubeUrl(imageData.youtubeUrl)) {
      newErrors.youtubeUrl = "Please enter a valid YouTube URL";
      hasError = true;
    }

    setError(newErrors);

    if (hasError) {
      return;
    }

    if (selectedElement === "location") {
      handleLocationImageChange(imageData);
    } else {
      handleNPCImageChange(imageData);
    }
    setIsOpen(false);
    document.querySelector('[data-bs-dismiss="modal"]').click();
  };

  useEffect(() => {
    if (!isAdding && selectedData) {
      
      // Handle saved images (has url property)
      if (selectedData.url) {
        setImageData({
          title: selectedData.name || "",
          description: selectedData.description || "",
          file: "",
          youtubeUrl: selectedData.url.includes('youtu') ? selectedData.url : "",
          type: selectedData.url.includes('youtu') ? "youtube" : "image"
        });
      }
      // Handle new images (has title, file properties)
      else {
        setImageData({
          title: selectedData.title || "",
          description: selectedData.description || "",
          file: selectedData.file || "",
          youtubeUrl: selectedData.youtubeUrl || "",
          type: selectedData.type || "image"
        });
      }
    } else {
      setImageData({ title: "", description: "", file: "", youtubeUrl: "", type: "image" });
    }
  }, [isAdding, selectedData, isOpen]);

  useEffect(()=>{
  },[selectedData])

  return (
    <div
      className="modal fade"
      id="imageModal"
      tabIndex="-1"
      aria-labelledby="imageModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-xl font-bold" id="imageModalLabel">
              {isAdding ? "Add New Content" : "Update Content"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-6 w-6 fill-jacarta-700 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="modal-body p-6">
            <div className="p-4 mb-4 mt-2 rounded-md flex flex-col">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Content Type</label>
                <div className="flex gap-4">
                  <button
                    className={`flex-1 py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                      imageData.type === 'image' 
                        ? 'bg-accent text-white shadow-lg' 
                        : 'bg-white dark:bg-jacarta-600 hover:bg-accent hover:text-white border border-jacarta-100'
                    }`}
                    onClick={() => setImageData({...imageData, type: 'image'})}
                  >
                    <FaImage className="text-xl" />
                    <span>Image</span>
                  </button>
                  <button 
                    className={`flex-1 py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                      imageData.type === 'youtube'
                        ? 'bg-accent text-white shadow-lg'
                        : 'bg-white dark:bg-jacarta-600 hover:bg-accent hover:text-white border border-jacarta-100'
                    }`}
                    onClick={() => setImageData({...imageData, type: 'youtube'})}
                  >
                    <FaYoutube className="text-xl" />
                    <span>YouTube</span>
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  value={imageData.title}
                  onChange={(e) => {
                    setImageData({ ...imageData, title: e.target.value });
                    if (e.target.value) {
                      setError({ ...error, title: "" });
                    }
                  }}
                  placeholder="Enter title"
                  className="custom-input placeholder:font-semibold"
                />
                {error.title && (
                  <p className="error-message text-red text-sm mt-1">
                    {error.title}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                <textarea
                  value={imageData.description}
                  onChange={(e) =>
                    setImageData({ ...imageData, description: e.target.value })
                  }
                  placeholder="Enter description"
                  className="custom-input h-[8rem] placeholder:font-semibold"
                />
              </div>

              {imageData.type === 'youtube' ? (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">YouTube URL</label>
                  <input
                    value={imageData.youtubeUrl}
                    onChange={(e) => {
                      setImageData({ ...imageData, youtubeUrl: e.target.value });
                      if (validateYoutubeUrl(e.target.value)) {
                        setError({ ...error, youtubeUrl: "" });
                      }
                    }}
                    placeholder="Enter YouTube URL"
                    className="custom-input placeholder:font-semibold"
                  />
                  {error.youtubeUrl && (
                    <p className="error-message text-red text-sm mt-1">
                      {error.youtubeUrl}
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <input
                    ref={choosImageRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (!e.target.files[0]?.type.startsWith('image/')) {
                        setError({ ...error, file: "Only images are allowed." });
                        return;
                      }
                      setImageData({ ...imageData, file: e.target.files[0] });
                      if (e.target.files[0]) {
                        setError({ ...error, file: "" });
                      }
                    }}
                    className="hidden"
                  />

                  {selectedData?.url && !isAdding ? (
                    <div className="w-full h-[30rem] relative rounded-lg overflow-hidden">
                      <img
                        src={selectedData.url}
                        alt="Preview"
                        className="w-full h-full object-cover scale-in-center"
                      />
                      <button
                        onClick={() => choosImageRef.current.click()}
                        className="absolute bottom-4 right-4 bg-accent text-white py-2 px-6 rounded-full shadow-lg hover:bg-accent-dark transition-colors"
                      >
                        Replace Image
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <ImagePreview
                        file={imageData.file}
                        choosImageRef={choosImageRef}
                      />
                      {imageData.file && (
                        <button
                          onClick={() => choosImageRef.current.click()}
                          className="absolute bottom-4 right-4 bg-accent text-white py-2 px-6 rounded-full shadow-lg hover:bg-accent-dark transition-colors"
                        >
                          Replace Image
                        </button>
                      )}
                    </div>
                  )}

                  {error.file && (
                    <p className="error-message text-red text-sm mt-2">
                      {error.file}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                className="py-3 px-8 rounded-full border border-jacarta-100 font-semibold hover:bg-light-base transition-all"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                onClick={handleAdd}
              >
                {isAdding ? "Add Content" : "Update Content"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
