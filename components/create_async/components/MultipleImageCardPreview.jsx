import { IoClose } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";

const MultipleImageCardPreview = ({
  files,
  savedFiles,
  setSelectedLocation,
  setSelectedLocationImage,
  setSelectedNPC,
  setSelectedNPCImage,
  setSelectedElement,
  setSelectedSavedImage,
  onRemove,
  onRemoveURL,
  element,
  elementIndex,
  setIsAdding,
  setSavedImage
}) => {
  const isYoutubeUrl = (url) => {
    if (!url) return false;
    
    // Check for all common YouTube URL formats
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtu\.be\/|youtube\.com\/shorts\/)([^#&?]*).*/;
    return youtubeRegex.test(url);
  };

  const getPreviewUrl = (file) => {
    if (!file) return '';
    if (file instanceof File || file instanceof Blob) {
      return URL.createObjectURL(file);
    }
    return file.url || '';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5 bg-white dark:bg-jacarta-800 rounded-xl shadow-sm">
      {savedFiles && savedFiles.length > 0 && (
        <div className="col-span-full mb-2">
          <h3 className="text-sm font-medium text-jacarta-700 dark:text-white">Saved Images</h3>
          <div className="w-16 h-1 bg-accent mt-1 mb-3"></div>
        </div>
      )}
      
      {savedFiles &&
        savedFiles.map((file, index) => (
          <div
            className="relative rounded-xl overflow-hidden bg-white dark:bg-jacarta-700 border border-jacarta-100 dark:border-jacarta-600 shadow-sm hover:shadow-md transition-all duration-200 group min-h-[240px] transform hover:-translate-y-1"
            key={`saved-${index}`}
          >
            <a
              data-bs-toggle="modal"
              data-bs-target="#imageModal"
              className="block h-full cursor-pointer"
              onClick={() => {
                if (element === "location") {
                  setSelectedLocationImage(index);
                  setSelectedLocation(elementIndex);
                } else {
                  setSelectedNPCImage(index);
                  setSelectedNPC(elementIndex);
                }
                setSelectedSavedImage(index);
                setSelectedElement(element);
                setSavedImage && setSavedImage(true);
                setIsAdding(false);
              }}
            >
              <div className="flex flex-col h-full">
                <div className="flex-grow flex items-center justify-center p-2 overflow-hidden bg-light-base dark:bg-jacarta-600" style={{ height: "160px" }}>
                  {isYoutubeUrl(file.url) ? (
                    <div className="flex items-center justify-center bg-jacarta-700 rounded-lg w-full h-full aspect-square">
                      <FaYoutube className="text-5xl text-red-600" />
                    </div>
                  ) : (
                    <img
                      src={file.url}
                      className="rounded-lg w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      alt={file.name || `Image ${index + 1}`}
                    />
                  )}
                </div>
                <div className="p-2.5">
                  {file.name && (
                    <p className="text-sm font-medium text-jacarta-700 dark:text-white truncate">
                      {file.name}
                    </p>
                  )}
                  {file.description && (
                    <p className="text-xs text-jacarta-500 dark:text-jacarta-300 mt-1 line-clamp-2 overflow-hidden">
                      {file.description}
                    </p>
                  )}
                </div>
              </div>
            </a>
            {onRemoveURL && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveURL(index);
                }}
                className="absolute top-2 right-2 p-1.5 bg-white dark:bg-jacarta-700 rounded-full shadow-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                title="Remove image"
              >
                <IoClose className="text-red-500 text-lg" />
              </button>
            )}
          </div>
        ))}

      {files && files.length > 0 && (
        <div className="col-span-full mb-2 mt-3">
          <h3 className="text-sm font-medium text-jacarta-700 dark:text-white">New Images</h3>
          <div className="w-16 h-1 bg-accent mt-1 mb-3"></div>
        </div>
      )}
      
      {files &&
        files.map((file, index) => (
          <div
            className="relative rounded-xl overflow-hidden bg-white dark:bg-jacarta-700 border border-jacarta-100 dark:border-jacarta-600 shadow-sm hover:shadow-md transition-all duration-200 group min-h-[240px] transform hover:-translate-y-1"
            key={`new-${index}`}
          >
            <a
              data-bs-toggle="modal"
              data-bs-target="#imageModal"
              className="block h-full cursor-pointer"
              onClick={() => {
                if (element === "location") {
                  setSelectedLocationImage(index);
                  setSelectedLocation(elementIndex);
                } else {
                  setSelectedNPCImage(index);
                  setSelectedNPC(elementIndex);
                }
                setSavedImage && setSavedImage(false);
                setSelectedElement(element);
                setIsAdding(false);
              }}
            >
              <div className="flex flex-col h-full">
                <div className="flex-grow flex items-center justify-center p-2 overflow-hidden bg-light-base dark:bg-jacarta-600" style={{ height: "160px" }}>
                  {file.youtubeUrl ? (
                    <div className="flex items-center justify-center bg-jacarta-700 rounded-lg w-full h-full aspect-square">
                      <FaYoutube className="text-5xl text-red-600" />
                    </div>
                  ) : (
                    <img
                      src={getPreviewUrl(file.file)}
                      className="rounded-lg w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      alt={file.title || `Preview ${index + 1}`}
                    />
                  )}
                </div>
                <div className="p-2.5">
                  {file.title && (
                    <p className="text-sm font-medium text-jacarta-700 dark:text-white truncate">
                      {file.title}
                    </p>
                  )}
                  {file.description && (
                    <p className="text-xs text-jacarta-500 dark:text-jacarta-300 mt-1 line-clamp-2 overflow-hidden">
                      {file.description}
                    </p>
                  )}
                </div>
              </div>
            </a>
            {onRemove && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(index);
                }}
                className="absolute top-2 right-2 p-1.5 bg-white dark:bg-jacarta-700 rounded-full shadow-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                title="Remove image"
              >
                <IoClose className="text-red-500 text-lg" />
              </button>
            )}
          </div>
        ))}
        
      {(!files || files.length === 0) && (!savedFiles || savedFiles.length === 0) && (
        <div className="col-span-full py-8 text-center">
          <p className="text-jacarta-500 dark:text-jacarta-300">No images added yet</p>
        </div>
      )}
    </div>
  );
};

export default MultipleImageCardPreview;
