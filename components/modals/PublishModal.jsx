/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useState, useEffect } from "react";

export default function PublishModal({ game, onPublish }) {
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState("");

  const handlePublish = () => {
    onPublish(
      isPaid,
      isPaid ? parseFloat(price) : 0
    );
    setIsPaid(false);
    setPrice(0);
  };

  useEffect(() => {
    if (!game) {
      const closeButton = document.querySelector('#publishModal .btn-close');
      if (closeButton) {
        closeButton.click();
      }
    }
  }, [game]);


  return (
    <div
      className="modal fade"
      id="publishModal"
      tabIndex="-1"
      aria-labelledby="publishModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="publishModalLabel">
              Publish Game
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

          {/* Body */}
          <div className="modal-body p-6">
            <div className="relative flex flex-col items-center border-b border-jacarta-100 py-4 dark:border-jacarta-600">
              {/* We will enable image feature soon */}
              {/* <figure className="mb-4 w-full max-w-[300px]">
                {game?.preview_image && (
                  <Image
                    width={300}
                    height={300}
                    src={game.preview_image}
                    alt={game.game_name}
                    className="rounded-2lg w-full h-auto"
                    loading="lazy"
                  />
                )}
              </figure> */}

              <div className="w-full text-center">
                <h3 className="mb-2 font-display text-xl font-semibold text-jacarta-700 dark:text-white">
                  {game?.game_name}
                </h3>
                <div className="max-h-[200px] overflow-y-auto">
                  <p className="text-sm dark:text-jacarta-300">
                    {game?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Game Type Selection */}
            <div className="mt-4">
              <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                Game Type
              </span>
              <div className="mt-2 flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gameType"
                    checked={!isPaid}
                    onChange={() => setIsPaid(false)}
                    className="mr-2"
                  />
                  <span className="text-sm dark:text-jacarta-200">Free Game</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gameType" 
                    checked={isPaid}
                    onChange={() => setIsPaid(true)}
                    className="mr-2"
                  />
                  <span className="text-sm dark:text-jacarta-200">Paid Game</span>
                </label>
              </div>
            </div>

            {/* Price Input */}
            {isPaid && (
              <div className="mt-4">
                <label className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                  Price (USD)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                />
              </div>
            )}

            {/* Terms */}
            {/* <div className="mt-4 flex items-center space-x-2">
              <input
                type="checkbox"
                id="publishTerms"
                className="h-5 w-5 self-start rounded border-jacarta-200 text-accent checked:bg-accent focus:ring-accent/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
              />
              <label
                htmlFor="publishTerms"
                className="text-sm dark:text-jacarta-200"
              >
                I confirm that I want to publish this game
              </label>
            </div> */}
          </div>

          <div className="modal-footer">
            <div className="flex items-center justify-center space-x-4">
              <button
                type="button"
                onClick={handlePublish}
                className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
              >
                Publish Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
