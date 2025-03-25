"use client";
import { useEffect, useState } from "react";
import tippy from "tippy.js";
import Socials from "../collection/Socials";
import CopyToClipboard from "@/utlis/AddClipboard";
import Image from "next/image";
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import Banner from "@/components/pages/user/Banner";
import Link from "next/link";
import { useUser } from '@/contexts/UserContext';

export default function Profile() {
  const { axiosInstance, loading, error } = useAxiosWithAuth();
  const { profile } = useUser();

  const [userProfile, setUserProfile ] = useState({
    bio: "",
    cover_photo: "",
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    profile_photo: "",
    user_id: "",
    joined_at:""
  })

  async function getProfile(){
    console.log("Get profile API called");
    try {
      const response = await axiosInstance.get(process.env.NEXT_PUBLIC_BACKEND_URL+"/ai-games/profile");
      console.log(response);
  
      // Access the data using the assumed structure: response.data.success.data
      if (response.data && response.data.success) {
        console.log(response.data, response.data.success);
        setUserProfile(response.data.success.data); // set user profile with data
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  }

  // Helper function to format the date
  function formatDate(isoString) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const day = date.getDate();

    return `${month} ${day}, ${year}`;
  }

  useEffect(() => {
    tippy("[data-tippy-content]");
    new CopyToClipboard();
    getProfile()
  }, []);
  return (
    <div>
      <Banner cover_photo={userProfile.cover_photo}/>
      <section className="relative bg-light-base pb-12 pt-28 dark:bg-jacarta-800">
        <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <figure className="relative">
            <Image
              width={138}
              height={138}
              src={userProfile.profile_photo??"/img/user/user_avatar.gif"}
              alt="collection avatar"
              className="rounded-xl border-[5px] border-white dark:border-jacarta-600"
            />
            <div
              className="absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
              data-tippy-content="Verified Collection"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-[.875rem] w-[.875rem] fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
              </svg>
            </div>
          </figure>
        </div>

        <div className="container">
          <div className="text-center">
            <h2 className="mb-2 font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              {userProfile.username}
            </h2>
            <div className="mb-8 inline-flex items-center justify-center rounded-full border border-jacarta-100 bg-white py-1.5 px-4 dark:border-jacarta-600 dark:bg-jacarta-700">
              {userProfile.subscription ? (
                <>
                  <span data-tippy-content="Premium">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-1 h-4 w-4">
                      <path fill="#FFD700" d="M12 2L8.5 8.5 2 9.27l5 4.87L5.5 21 12 17.77 18.5 21 17 14.14l5-4.87L15.5 8.5z"/>
                    </svg>
                  </span>
                  <button
                    className="js-copy-clipboard max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap dark:text-jacarta-200"
                    data-tippy-content="Premium"
                  >
                    <span className="text-yellow-500">{userProfile.subscription.plan_type}</span>
                  </button>
                </>
              ) : (
                <>
                  <span data-tippy-content="Points">
                  <Image
                    src="/img/wallets/coin.png"
                    alt="Coins"
                    width={16}
                    height={16}
                    className="mr-1"
                  />
                  </span>
                  <button
                    className="js-copy-clipboard max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap dark:text-jacarta-200"
                    data-tippy-content="Copy"
                  >
                    <span>{userProfile.game_points} GP</span>
                  </button>
                </>
              )}
            </div>

            <p className="mx-auto mb-2 max-w-xl text-lg dark:text-jacarta-300">
              {userProfile.bio}
            </p>
            <span className="text-jacarta-400">{userProfile.joined_at?formatDate(userProfile.joined_at):""}</span>

            <div className="mt-6 flex items-center justify-center space-x-2.5">
              {/* <div className="rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600">
                <div
                  onClick={() => setLoved((pre) => !pre)}
                  className={`js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm before:absolute before:h-4 before:w-4 before:bg-[url('../img/heart-fill.svg')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0 ${
                    loved ? "js-likes--active" : ""
                  }`}
                  role="button"
                  data-tippy-content="Favorite"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-200"
                  >
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
                  </svg>
                </div>
              </div> */}
              <div className="dropdown rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600">
                <a
                  href="#"
                  className="dropdown-toggle inline-flex h-10 w-10 items-center justify-center text-sm"
                  role="button"
                  id="collectionShare"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-tippy-content="Share"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-200"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M13.576 17.271l-5.11-2.787a3.5 3.5 0 1 1 0-4.968l5.11-2.787a3.5 3.5 0 1 1 .958 1.755l-5.11 2.787a3.514 3.514 0 0 1 0 1.458l5.11 2.787a3.5 3.5 0 1 1-.958 1.755z" />
                  </svg>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end z-10 hidden min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                  aria-labelledby="collectionShare"
                >
                  <Socials />
                </div>
              </div>
              <div className="dropdown rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600">
                <a
                  href="#"
                  className="dropdown-toggle inline-flex h-10 w-10 items-center justify-center text-sm"
                  role="button"
                  id="collectionActions"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg
                    width="16"
                    height="4"
                    viewBox="0 0 16 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-jacarta-500 dark:fill-jacarta-200"
                  >
                    <circle cx="2" cy="2" r="2" />
                    <circle cx="8" cy="2" r="2" />
                    <circle cx="14" cy="2" r="2" />
                  </svg>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end z-10 hidden border border-jacarta-100 min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                  aria-labelledby="collectionActions"
                >
                  <Link
                    href="/edit-profile"
                    aria-label="profile"
                  >
                  <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                    Edit Profile
                  </button>
                  </Link>
                  <hr className="my-2 mx-4 h-px border-0 bg-jacarta-100 dark:bg-jacarta-600" />
                  <button 
                    className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                    data-bs-toggle="modal"
                    data-bs-target="#buyPointsModal"
                  >
                    Buy Points
                    </button>
                  {/* <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                    Share
                  </button>
                  <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                    Report
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  
  );
}
