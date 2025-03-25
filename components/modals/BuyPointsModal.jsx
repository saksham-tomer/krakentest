/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";

export default function BuyPointsModal() {
  const [selectedOption, setSelectedOption] = useState(null);
  const { axiosInstance, loading, error } = useAxiosWithAuth();

  const pointsOptions = [
    { points: 50, price: 2.99 },
    { points: 100, price: 5.98 },
    { points: 200, price: 10.00 },
    { points: 500, price: 20.00 }
  ];

  const handlePurchase = async () => {
    if (!selectedOption) return;
    
    try {
      let response;
      if (selectedOption.type === 'subscription') {
        response = await axiosInstance.post(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/payments/create-subscription-checkout/"
        );
      } else {
        response = await axiosInstance.post(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/payments/create-points-checkout/",
          {
            points: selectedOption.points
          }
        );
      }

      // Redirect to Stripe checkout
      if (response.data.session_url) {
        window.location.href = response.data.session_url;
      }

    } catch (err) {
      console.error("Payment session creation failed:", err);
      // Handle error - show toast notification etc
    }
  };

  return (
    <div
      className="modal fade"
      id="buyPointsModal"
      tabIndex="-1"
      aria-labelledby="buyPointsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-2xl font-display font-semibold text-jacarta-700 dark:text-white" id="buyPointsModalLabel">
              Buy Game Points
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

          <div className="modal-body p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* One-time purchase options */}
              {pointsOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedOption({ type: 'onetime', ...option })}
                  className={`cursor-pointer rounded-2xl border-2 p-6 transition-all hover:shadow-lg hover:transform hover:scale-[1.02]
                    ${selectedOption?.points === option.points 
                      ? 'border-accent bg-accent/10' 
                      : 'border-jacarta-100 dark:border-jacarta-600 hover:border-accent/50'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold text-jacarta-700 dark:text-white">
                      {option.points} GP
                    </div>
                    <div className="text-lg font-semibold text-accent">
                      ${option.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-sm text-jacarta-500 dark:text-jacarta-300">
                    One-time purchase
                  </div>
                </div>
              ))}

              {/* Subscription option */}
              <div
                onClick={() => setSelectedOption({ type: 'subscription', price: 9.99 })}
                className={`cursor-pointer rounded-2xl border-2 p-6 transition-all hover:shadow-lg hover:transform hover:scale-[1.02] sm:col-span-2
                  ${selectedOption?.type === 'subscription' 
                    ? 'border-accent bg-accent/10' 
                    : 'border-jacarta-100 dark:border-jacarta-600 hover:border-accent/50'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-jacarta-700 dark:text-white">
                    Unlimited GP
                  </div>
                  <div className="text-lg font-semibold text-accent">
                    $9.99/month
                  </div>
                </div>
                <div className="text-sm text-jacarta-500 dark:text-jacarta-300">
                  Monthly subscription with unlimited game points
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer border-t border-jacarta-100 dark:border-jacarta-600 p-6">
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={handlePurchase}
                disabled={!selectedOption}
                className={`rounded-full py-4 px-10 text-center font-semibold text-white shadow-accent-volume transition-all
                  ${selectedOption 
                    ? 'bg-accent hover:bg-accent-dark transform hover:scale-105' 
                    : 'bg-jacarta-300 cursor-not-allowed opacity-75'}`}
              >
                {selectedOption ? 'Complete Purchase' : 'Select an Option'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
