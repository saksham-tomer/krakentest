"use client";
import Button from "@/components/ui/Button";
import useUserCookie from "@/hooks/useUserCookie";
import CopyToClipboard from "@/utlis/AddClipboard";
import { logout } from "@/utlis/logoutUser";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import tippy from "tippy.js";
import { LuLogIn } from "react-icons/lu";
import { useUser } from '@/contexts/UserContext';

const languages = ["English", "Español", "Deutsch"];

export default function Profile() {
  const { profile } = useUser();
  const [activeLanguage, setActiveLanguage] = useState(languages[0]);
  useEffect(() => {
    tippy("[data-tippy-content]");
    new CopyToClipboard();
  }, []);

  const user = useUserCookie();

  return (
    <div className="js-nav-dropdown group-dropdown relative flex items-center">
      {user ? (
        <>
          <button
            className="dropdown-toggle group mx-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
            id="profileDropdown"
            aria-expanded="false"
            aria-label="profile"
          >
            {user && user.profile_photo && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden object-cover">
                <Image src={user.profile_photo} fill />
              </div>
            )}
          </button>
          <div
            className="dropdown-menu group-dropdown-hover:visible lg:invisible !-right-4 !top-[85%] !left-auto z-10 hidden min-w-[14rem] whitespace-nowrap rounded-xl bg-white transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full group-dropdown-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:grid lg:!translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl"
            aria-labelledby="profileDropdown"
          >
        <Link href="/wallet" className="mx-5 mb-6 rounded-lg border border-jacarta-100 p-4 dark:border-jacarta-600">
          <span className="text-sm font-medium tracking-tight dark:text-jacarta-200">
            {profile?.subscription ? 'Subscription' : 'Balance'}
          </span>
          {profile?.subscription ? (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="-ml-1 mr-1 h-[1.125rem] w-[1.125rem]">
                <path fill="#FFD700" d="M12 2L8.5 8.5 2 9.27l5 4.87L5.5 21 12 17.77 18.5 21 17 14.14l5-4.87L15.5 8.5z"/>
              </svg>
              <span className="text-lg font-bold text-yellow-500">{profile?.subscription.plan_type}</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Image
                    src="/img/wallets/coin.png"
                    alt="Coins"
                    width={16}
                    height={16}
                    className="mr-1"
                  />
              <span className="text-lg font-bold text-green">{profile?.game_points} GP</span>
            </div>
          )}
        </Link>
            <Link
              href="/profile"
              className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-4 w-4 fill-jacarta-700 transition-colors dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M11 14.062V20h2v-5.938c3.946.492 7 3.858 7 7.938H4a8.001 8.001 0 0 1 7-7.938zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z"></path>
              </svg>
              <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
                My Profile
              </span>
            </Link>
            <Link
              href="/wallet"
              className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
            >
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z" />
              </svg>
              <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
                Wallet
              </span>
            </Link>
            {user && (
              <Link
                href="#"
                className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
                data-bs-toggle="modal"
                data-bs-target="#buyPointsModal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-4 w-4 fill-jacarta-700 transition-colors dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.5-8v2H11v2h2v-2h1.5v-2h-4v-2h4v-2H13V8h-2v2H8.5v2h4v2h-4z" />
                </svg>
                <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
                  Buy Game Points
                </span>
              </Link>
            )}
            <Link
              href="/edit-profile"
              className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-4 w-4 fill-jacarta-700 transition-colors dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M9.954 2.21a9.99 9.99 0 0 1 4.091-.002A3.993 3.993 0 0 0 16 5.07a3.993 3.993 0 0 0 3.457.261A9.99 9.99 0 0 1 21.5 8.876 3.993 3.993 0 0 0 20 12c0 1.264.586 2.391 1.502 3.124a10.043 10.043 0 0 1-2.046 3.543 3.993 3.993 0 0 0-3.456.261 3.993 3.993 0 0 0-1.954 2.86 9.99 9.99 0 0 1-4.091.004A3.993 3.993 0 0 0 8 18.927a3.993 3.993 0 0 0-3.457-.26A9.99 9.99 0 0 1 2.5 15.121 3.993 3.993 0 0 0 4 11.999a3.993 3.993 0 0 0-1.502-3.124 10.043 10.043 0 0 1 2.046-3.543A3.993 3.993 0 0 0 8 5.071a3.993 3.993 0 0 0 1.954-2.86zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
                Edit Profile
              </span>
            </Link>

            <Link
              href="/login"
              onClick={logout}
              className="flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-4 w-4 fill-jacarta-700 transition-colors dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7 11V8l-5 4 5 4v-3h8v-2H7z" />
              </svg>
              <span className="mt-1 font-display text-sm text-jacarta-700 dark:text-white">
                Sign out
              </span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="mx-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent focus:border-transparent focus:bg-accent dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent"
          >
            <LuLogIn className="text-lgl text-white" />
          </Link>
        </>
      )}
    </div>
  );
}
