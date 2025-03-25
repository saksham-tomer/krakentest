/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";

export default function BuyModal() {
  return (
    <div
      className="modal fade"
      id="buyNowModal"
      tabIndex="-1"
      aria-labelledby="buyNowModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="buyNowModalLabel">
              Complete checkout
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
            <div className="mb-2 flex items-center justify-between">
              <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                Item
              </span>
              <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                Subtotal
              </span>
            </div>

            <div className="relative flex items-center border-t border-b border-jacarta-100 py-4 dark:border-jacarta-600">
              <figure className="mr-5 self-start">
                <Image
                  width={48}
                  height={48}
                  src="/img/avatars/avatar_2.jpg"
                  alt="avatar 2"
                  className="rounded-2lg"
                  loading="lazy"
                />
              </figure>

              <div>
                <Link href={`/collections`} className="text-sm text-accent">
                  Elon Musk #709
                </Link>
                <h3 className="mb-1 font-display text-base font-semibold text-jacarta-700 dark:text-white">
                  Lazyone Panda
                </h3>
                <div className="flex flex-wrap items-center">
                  <span className="mr-1 block text-sm text-jacarta-500 dark:text-jacarta-300">
                    Creator Earnings: 5%
                  </span>
                  <span data-tippy-content="The creator of this collection will receive 5% of the sale total from future sales of this item.">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="h-4 w-4 fill-jacarta-700 dark:fill-jacarta-300"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="ml-auto">
                <span className="mb-1 flex items-center whitespace-nowrap">
                  <span data-tippy-content="ETH">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0"
                      y="0"
                      viewBox="0 0 1920 1920"
                      // xml:space="preserve"
                      className="h-4 w-4"
                    >
                      <path
                        fill="#8A92B2"
                        d="M959.8 80.7L420.1 976.3 959.8 731z"
                      ></path>
                      <path
                        fill="#62688F"
                        d="M959.8 731L420.1 976.3l539.7 319.1zm539.8 245.3L959.8 80.7V731z"
                      ></path>
                      <path
                        fill="#454A75"
                        d="M959.8 1295.4l539.8-319.1L959.8 731z"
                      ></path>
                      <path
                        fill="#8A92B2"
                        d="M420.1 1078.7l539.7 760.6v-441.7z"
                      ></path>
                      <path
                        fill="#62688F"
                        d="M959.8 1397.6v441.7l540.1-760.6z"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-sm font-medium tracking-tight dark:text-jacarta-100">
                    1.55 ETH
                  </span>
                </span>
                <div className="text-right text-sm dark:text-jacarta-300">
                  $130.82
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="mb-2 flex items-center justify-between border-b border-jacarta-100 py-2.5 dark:border-jacarta-600">
              <span className="font-display font-semibold text-jacarta-700 hover:text-accent dark:text-white">
                Total
              </span>
              <div className="ml-auto">
                <span className="flex items-center whitespace-nowrap">
                  <span data-tippy-content="ETH">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0"
                      y="0"
                      viewBox="0 0 1920 1920"
                      // xml:space="preserve"
                      className="h-4 w-4"
                    >
                      <path
                        fill="#8A92B2"
                        d="M959.8 80.7L420.1 976.3 959.8 731z"
                      ></path>
                      <path
                        fill="#62688F"
                        d="M959.8 731L420.1 976.3l539.7 319.1zm539.8 245.3L959.8 80.7V731z"
                      ></path>
                      <path
                        fill="#454A75"
                        d="M959.8 1295.4l539.8-319.1L959.8 731z"
                      ></path>
                      <path
                        fill="#8A92B2"
                        d="M420.1 1078.7l539.7 760.6v-441.7z"
                      ></path>
                      <path
                        fill="#62688F"
                        d="M959.8 1397.6v441.7l540.1-760.6z"
                      ></path>
                    </svg>
                  </span>
                  <span className="font-medium tracking-tight text-green">
                    1.55 ETH
                  </span>
                </span>
                <div className="text-right dark:text-jacarta-300">$130.82</div>
              </div>
            </div>

            {/* Terms */}
            <div className="mt-4 flex items-center space-x-2">
              <input
                type="checkbox"
                id="buyNowTerms"
                className="h-5 w-5 self-start rounded border-jacarta-200 text-accent checked:bg-accent focus:ring-accent/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
              />
              <label
                htmlFor="buyNowTerms"
                className="text-sm dark:text-jacarta-200"
              >
                By checking this box, I agree to Xhibiter's{" "}
                <a href="#" className="text-accent">
                  Terms of Service
                </a>
              </label>
            </div>
          </div>
          {/* end body */}

          <div className="modal-footer">
            <div className="flex items-center justify-center space-x-4">
              <button
                type="button"
                className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
              >
                Confirm Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
