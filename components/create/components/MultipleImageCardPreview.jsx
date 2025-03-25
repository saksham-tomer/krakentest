import Masonry from "react-masonry-css";
import { IoClose } from "react-icons/io5";

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
  setSavedImage,
}) => {
  return (
    <div>
      <div className="overflow-y-auto p-2 pl-0 bg-slate-100 w-full">
        <Masonry
          breakpointCols={5}
          className="my-masonry-grid max-h-[42rem] pt-4 pr-4"
          columnClassName="my-masonry-grid_column"
        >
          {savedFiles &&
            savedFiles.map((file, index) => (
              <div
                className="relative rounded-lg relative !bg-transparent border border-jacarta-100 dark:border-jacarta-600"
                key={index}
              >
                <a
                  data-bs-toggle="modal"
                  data-bs-target="#imageModal"
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
                    setSavedImage(true);
                    setIsAdding(false);
                  }}
                >
                  <div className="p-4" key={index}>
                    <img
                      src={file.url}
                      className="rounded-lg w-full h-full"
                      alt={`Preview ${index + 1}`}
                    />

                    <p className="text-md text-jacarta-400 dark:text-white my-2">
                      {file.name}
                    </p>
                    <p className="text-sm text-jacarta-400 dark:text-white">
                      {file.description}
                    </p>
                  </div>
                </a>
                {onRemoveURL && (
                  <button
                    type="button"
                    onClick={(e) => {
                      onRemoveURL(index);
                    }}
                    className="absolute -top-4 -right-4 p-1"
                  >
                    <IoClose className="text-red text-2xl bg-jacarta-800 rounded-full p-1 border border-jacarta-600" />
                  </button>
                )}
              </div>
            ))}

          {files &&
            files.map((file, index) => (
              <div
                className="relative rounded-lg relative !bg-transparent border border-jacarta-100 dark:border-jacarta-600"
                key={index}
              >
                <a
                  data-bs-toggle="modal"
                  data-bs-target="#imageModal"
                  onClick={() => {
                    if (element === "location") {
                      setSelectedLocationImage(index);
                      setSelectedLocation(elementIndex);
                    } else {
                      setSelectedNPCImage(index);
                      setSelectedNPC(elementIndex);
                    }
                    setSavedImage(false);
                    setSelectedElement(element);
                    setIsAdding(false);
                  }}
                >
                  <div className="p-4" key={index}>
                    <img
                      src={window.URL.createObjectURL(file.file)}
                      className="rounded-lg w-full h-full"
                      alt={`Preview ${index + 1}`}
                    />

                    <p className="text-md text-jacarta-400 dark:text-white my-2">
                      {file.title}
                    </p>
                    <p className="text-sm text-jacarta-400 dark:text-white">
                      {file.description}
                    </p>
                  </div>
                </a>
                {onRemove && (
                  <button
                    type="button"
                    onClick={(e) => {
                      onRemove(index);
                    }}
                    className="absolute -top-4 -right-4 p-1"
                  >
                    <IoClose className="text-red text-2xl bg-jacarta-800 rounded-full p-1 border border-jacarta-600" />
                  </button>
                )}
              </div>
            ))}
        </Masonry>
      </div>
    </div>
  );
};

export default MultipleImageCardPreview;
