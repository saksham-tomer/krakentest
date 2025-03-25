/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import { toast } from 'react-toastify';

export default function CouponModal({ game, onPurchase }) {
  const { axiosInstance, loading: axiosLoading, error: axiosError } = useAxiosWithAuth();

  const [couponCode, setCouponCode] = useState("");
  const [validCoupon, setValidCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateCoupon = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai-games/creator-coupon/${couponCode}/`
      );

      if (response.data.success) {
        // Verify the coupon is for this game
        if (response.data.data.game.id === game?.game_id) {
          setValidCoupon(response.data.data);
          toast.success("Coupon applied successfully!");
        } else {
          setError("This coupon is not valid for this game");
          toast.error("Invalid coupon for this game");
        }
      } else {
        setError("Invalid coupon code");
        toast.error("Invalid coupon code");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error("Invalid coupon code");
      } else {
        console.error(err);
      }
      setError("Error validating coupon");
      toast.error("Error validating coupon");
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscountedPrice = () => {
    if (!validCoupon) return game?.price;
    return (game?.price * 0.8).toFixed(2); // 20% discount
  };

  return (
    <div
      className="modal fade"
      id="couponModal"
      tabIndex="-1"
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="couponModalLabel">
              Complete Purchase
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
            {/* Game Details */}
            <div className="relative flex items-center border-t border-b border-jacarta-100 py-4 dark:border-jacarta-600">
              <figure className="mr-5 self-start">
                <Image
                  width={48}
                  height={48}
                  src={game?.preview_image || "/img/games/default.jpg"}
                  alt={game?.game_name}
                  className="rounded-2lg"
                  loading="lazy"
                />
              </figure>

              <div>
                <h3 className="mb-1 font-display text-base font-semibold text-jacarta-700 dark:text-white">
                  {game?.game_name}
                </h3>
                <div className="text-sm text-jacarta-500 dark:text-jacarta-300">
                  Original Price: ${game?.price}
                </div>
              </div>
            </div>

            {/* Coupon Input */}
            <div className="mt-4">
              <label className="mb-2 block font-display text-jacarta-700 dark:text-white">
                Have a coupon code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                  placeholder="Enter coupon code"
                />
                <button
                  onClick={validateCoupon}
                  disabled={loading || !couponCode}
                  className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                >
                  {loading ? "Validating..." : "Apply"}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              {validCoupon && (
                <p className="mt-2 text-sm text-green-500">
                  Coupon applied! You get 20% off.
                </p>
              )}
            </div>

            {/* Total */}
            <div className="mt-4 flex items-center justify-between border-t border-jacarta-100 py-4 dark:border-jacarta-600">
              <span className="font-display text-lg font-semibold text-jacarta-700 dark:text-white">
                Total Amount:
              </span>
              <span className="font-display text-lg font-semibold text-accent">
                ${calculateDiscountedPrice()}
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => onPurchase(couponCode)}
                className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
              >
                Purchase Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
