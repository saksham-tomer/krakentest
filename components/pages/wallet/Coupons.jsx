"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import { toast } from "react-toastify";
import { useUser } from '@/contexts/UserContext';

export default function Coupons() {

  const { axiosInstance } = useAxiosWithAuth();
  const { profile, getProfile, gamePointCoupons, creatorCoupons, fetchCoupons} = useUser();

  async function handleRedeem(code) {
    console.log(code,"code");
    // call /ai-games/redeem-game-point-coupon/ wiht post request and send coupon_code as body
    const response = await axiosInstance.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/redeem-game-point-coupon/", {
      coupon_code: code
    });
    console.log(response,"response");
    if (response.status === 200) {
      // on success again call fetchCoupons
      fetchCoupons(); // on sucess only fetchCoupons
      getProfile();
      toast.success("Coupon redeemed successfully");
    } else {
      toast.error("Coupon redemption failed");
    }
  }

  async function handleCancelSubscription(){
    try {
      const response = await axiosInstance.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/subscription/cancel/");
      if (response.status === 200) {
        getProfile();
        toast.success("Subscription cancelled successfully");
      } else {
        toast.error("Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error("Failed to cancel subscription");
    }

  }


  return (
    <section className="relative pb-20 pt-28 dark:bg-jacarta-800">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={789}
          src="/img/gradient_light.jpg"
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      <div className="container">
          <div className="mb-8 rounded-2xl bg-white dark:bg-jacarta-700 shadow-lg p-6">
            {profile?.subscription ? (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <span data-tippy-content="Premium" className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-7 w-7">
                        <path fill="#FFD700" d="M12 2L8.5 8.5 2 9.27l5 4.87L5.5 21 12 17.77 18.5 21 17 14.14l5-4.87L15.5 8.5z"/>
                      </svg>
                    </span>
                    <span className="text-yellow-600 dark:text-yellow-400 font-bold text-xl">{profile.subscription.plan_type}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mr-4">
                      Expires on {new Date(profile.subscription.end_date).toLocaleDateString()}
                    </span>
                    <span className={`px-4 py-2 ${
                      profile.subscription.status === 'cancelled' 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    } text-sm font-semibold rounded-lg`}>
                      Status: {profile.subscription.status === 'cancelled' ? 'Cancelled' : 'Active'}
                    </span>
                  </div>
                </div>
                {profile.subscription.status === 'active' && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleCancelSubscription}
                      className="group relative inline-flex items-center justify-center rounded-lg border-2 border-red-600 bg-red-600/90 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-700 hover:border-red-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-jacarta-800 dark:bg-red-500/90 dark:border-red-500 dark:hover:bg-red-600 dark:hover:border-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Cancel Subscription
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl">
                    <Image
                      src="/img/wallets/coin.png"
                      alt="Game Points" 
                      width={24}
                      height={24}
                      className="animate-pulse"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Current Balance</span>
                    <span className="text-2xl font-bold text-jacarta-700 dark:text-white">
                      {profile?.game_points} GP
                    </span>
                  </div>
                </div>
                {/* <button
                  className="js-copy-clipboard select-none rounded-lg bg-accent/20 dark:bg-accent/10 px-4 py-2 text-accent hover:bg-accent/30 dark:hover:bg-accent/20 transition-colors duration-200"
                  data-tippy-content="Copy Balance"
                >
                  Copy
                </button> */}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mb-8">
            <h1 className="font-display text-3xl font-medium dark:text-white">Game Point Coupons</h1>
            {!profile?.subscription && (
              <button
                className="rounded-full bg-accent py-2 px-6 text-sm font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                data-bs-toggle="modal"
                data-bs-target="#buyPointsModal"
              >
                Buy Game Points
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {gamePointCoupons.length === 0 && (
            <div className="col-span-full text-center py-6">
              <p className="text-base dark:text-white">No game point coupons available at the moment.</p>
            </div>
          )}
          {gamePointCoupons.slice(-4).map((elm, i) => {
            const isExpired = elm.expiration_date && new Date(elm.expiration_date) < new Date();
            return (
              <div
                key={i}
                className="relative rounded-xl border border-jacarta-100 bg-white p-4 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-700"
              >
                {elm.redeemed ? (
                  <div className="absolute top-0 right-0 bg-red-500 dark:text-white px-2 py-0.5 text-xs rounded-tr-xl rounded-bl-xl">
                    Redeemed
                  </div>
                ) : isExpired ? (
                  <div className="absolute top-0 right-0 bg-red-500 dark:text-white px-2 py-0.5 text-xs rounded-tr-xl rounded-bl-xl">
                    Expired
                  </div>
                ) : (
                  <div className="absolute top-0 right-0 bg-green-500 dark:text-white px-2 py-0.5 text-xs rounded-tr-xl rounded-bl-xl">
                    Available
                  </div>
                )}
                <Image
                  width={48}
                  height={48}
                  src="/img/wallets/coin.png"
                  className="mx-auto mb-3 h-12 w-12 rounded-full border border-jacarta-100 bg-white dark:border-jacarta-600 dark:bg-jacarta-700"
                  alt="coupon"
                />
                {elm.expiration_date && (
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <span className="font-semibold text-jacarta-700 dark:text-white">Expires:</span>
                      <span className="dark:text-jacarta-300">
                        {new Date(elm.expiration_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-semibold text-jacarta-700 dark:text-white">Points:</span>
                    <span className="dark:text-jacarta-300">{elm.points}</span>
                  </div>
                  {elm.shared_by && (
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-semibold text-jacarta-700 dark:text-white">By:</span>
                      <span className="dark:text-jacarta-300 truncate">{elm.shared_by}</span>
                    </div>
                  )}
                  
                  {!elm.redeemed && !isExpired && (
                    <button 
                      className="mt-2 w-full rounded-full bg-accent py-2 px-4 text-xs font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                      onClick={() => handleRedeem(elm.code)}
                    >
                      Redeem
                    </button>
                  )}
                  {isExpired && !elm.redeemed && (
                    <p className="text-red-500 text-xs">
                      Expired coupon. Redeem same day.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          </div>

          <h1 className="font-display text-3xl font-medium dark:text-white mt-12 mb-8">Creator Coupons</h1>
          
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {creatorCoupons.length === 0 && (
            <div className="col-span-full text-center py-6">
              <p className="text-base dark:text-white">No creator coupons available at the moment.</p>
            </div>
          )}
          {creatorCoupons.map((elm, i) => (
              <div
                key={i}
                className="relative rounded-xl border border-jacarta-100 bg-white p-4 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-700"
              >
                {elm.redeemed_count >= elm.max_redeem ? (
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-0.5 text-xs rounded-tr-xl rounded-bl-xl">
                    Redeemed
                  </div>
                ) : (
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-0.5 text-xs rounded-tr-xl rounded-bl-xl">
                    Available
                  </div>
                )}
                <Image
                  width={48}
                  height={48}
                  src="/img/wallets/coin.png"
                  className="mx-auto mb-3 h-12 w-12 rounded-full border border-jacarta-100 bg-white dark:border-jacarta-600 dark:bg-jacarta-700"
                  alt="coupon"
                />
                <h3 className="mb-2 font-display text-sm text-jacarta-700 dark:text-white truncate">
                  {elm.code}
                </h3>
                <p className="mb-3 text-xs dark:text-jacarta-300 line-clamp-2">{elm.description || 'No description available'}</p>
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-semibold text-jacarta-700 dark:text-white">Game:</span>
                    <span className="dark:text-jacarta-300 truncate">{elm.game_name}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-semibold text-jacarta-700 dark:text-white">Expires:</span>
                    <span className="dark:text-jacarta-300">
                      {new Date(elm.expiration_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-semibold text-jacarta-700 dark:text-white">Used:</span>
                    <span className="dark:text-jacarta-300">{elm.redeemed_count}/{elm.max_redeem}</span>
                  </div>
                  {new Date(elm.expiration_date) > new Date() && elm.redeemed_count < elm.max_redeem && (
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(elm.code);
                        toast.success('Coupon code copied to clipboard!');
                      }}
                      className="mt-2 w-full rounded-full bg-accent py-2 px-4 text-xs font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                    >
                      Share
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
