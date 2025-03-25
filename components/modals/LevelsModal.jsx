/* eslint-disable react/no-unescaped-entities */
export default function LevelsModal() {
  return (
    <div
      className="modal fade"
      id="levelsModal"
      tabIndex="-1"
      aria-labelledby="addLevelsLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addLevelsLabel">
              Add levels
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
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

          <div className="modal-body p-6">
            <p className="mb-8 dark:text-jacarta-300">
              Levels show up underneath your item, are clickable, and can be
              filtered in your collection's sidebar.
            </p>

            <div className="relative my-3 flex items-center">
              <button className="flex h-12 w-12 shrink-0 items-center justify-center self-end rounded-l-lg border border-r-0 border-jacarta-100 bg-jacarta-50 hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-6 w-6 fill-jacarta-500 dark:fill-jacarta-300"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                </svg>
              </button>

              <div className="w-1/2">
                <label className="mb-3 block font-display text-base font-semibold text-jacarta-700 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  className="h-12 w-full border border-r-0 border-jacarta-100 focus:ring-inset focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder-jacarta-300"
                  placeholder="Speed"
                />
              </div>

              <div className="flex w-1/2 items-end">
                <div className="flex-1">
                  <label className="mb-3 block font-display text-base font-semibold text-jacarta-700 dark:text-white">
                    Value
                  </label>
                  <input
                    type="number"
                    className="h-12 w-full border border-jacarta-100 focus:ring-inset focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder-jacarta-300"
                    placeholder="3"
                  />
                </div>

                <div className="flex h-12 w-12 items-center justify-center self-end border-y border-jacarta-100 bg-jacarta-50 px-2 dark:border-jacarta-600 dark:bg-jacarta-800 dark:text-jacarta-400">
                  Of
                </div>

                <div className="flex-1 self-end">
                  <input
                    type="number"
                    className="h-12 w-full rounded-r-lg border border-jacarta-100 focus:ring-inset focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder-jacarta-300"
                    placeholder="10"
                  />
                </div>
              </div>
            </div>

            <button className="mt-2 rounded-full border-2 border-accent py-2 px-8 text-center text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-white">
              Add More
            </button>
          </div>

          <div className="modal-footer">
            <div className="flex items-center justify-center space-x-4">
              <button
                type="button"
                className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
