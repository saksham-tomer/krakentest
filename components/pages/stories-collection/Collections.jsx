"use client";
import { useState, useEffect } from "react";
import { collections6, collections7 } from "@/data/collections";
import Sidebar from "./Sidebar";

import Sorting from "./Sorting";
import Image from "next/image";
import Link from "next/link";
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import Button from "@/components/ui/Button";
import PreviewMedia from "@/components/games/PreviewMedia";
import useUserCookie from "@/hooks/useUserCookie";

const games_dummy = [
  {
    game_id: "17894548-d5c9-47ae-ad05-da0ab4a9fca9",
    user: "4ec97c05-2797-44d8-8c5d-802f6ab79c21",
    preview_image:
      "https://storage.googleapis.com/kraken-4aa67.appspot.com/website_media/games/user_4ec97c05-2797-44d8-8c5d-802f6ab79c21/17894548-d5c9-47ae-ad05-da0ab4a9fca9/preview_images/Screenshot%20from%202024-11-16%2003-10-53d95a61d7-792c-4840-9b0a-8e5cffe61fbf.png",
    game_name: "test",
    game_opener: "test",
    game_prompt: "test",
    opener_mp3: null,
    description: "Test",
    game_tags: ["Romance", "Fantasy", "Steampunk"],
    story_documents: [],
    game_location: [
      {
        location_description: "test",
        location_images: [
          "https://storage.googleapis.com/kraken-4aa67.appspot.com/game_specific_resources/games/user_4ec97c05-2797-44d8-8c5d-802f6ab79c21/game_17894548-d5c9-47ae-ad05-da0ab4a9fca9/location_images/Screenshot%20from%202024-11-16%2003-10-532fdbafc5-daf4-41e7-a4ff-c78b24340e7f.png",
        ],
      },
    ],
    game_npc: [
      {
        npc_description: "set",
        npc_images: [
          "https://storage.googleapis.com/kraken-4aa67.appspot.com/game_specific_resourcesgames/games/user_4ec97c05-2797-44d8-8c5d-802f6ab79c21/game_17894548-d5c9-47ae-ad05-da0ab4a9fca9/npc_images/Screenshot%20from%202024-11-16%2003-10-53af08c3fa-47a9-4cd3-b892-32912559d2ba.png",
        ],
      },
    ],
    created_at: "2024-11-15T21:59:59.778827Z",
  },
];
export default function Collections() {
  const { axiosInstance, loading, error } = useAxiosWithAuth();
  const user = useUserCookie();

  const [stories, setStories] = useState([]);

  async function fetchStories() {
    console.log("Get stories API called");
    try {
      const response = await axiosInstance.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/user/stories/"
      );

      // Access the data using the assumed structure: response.data.success.data
      if (response.data && response.data.success) {
        setStories(response.data.success.data);
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching stories:", err);
    }
  }

  useEffect(() => {
    fetchStories();
  }, []);

  function formatDate(isoString) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();

    return `${month} ${day}, ${year}`;
  }

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="relative pt-16 pb-24 mx-auto">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={789}
          src="/img/gradient_light.jpg"
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      <div className="px-6 xl:px-24">
        {/* Filters / Sorting */}
        {/* <div className="flex flex-wrap justify-between">
          <div className="flex space-x-2 mb-2">
            <button className="js-collections-toggle-filters flex h-10 group flex-shrink-0 items-center justify-center space-x-1 rounded-lg border border-jacarta-100 bg-white py-1.5 px-4 font-display text-sm font-semibold text-jacarta-500 hover:bg-accent hover:border-accent dark:hover:bg-accent dark:border-jacarta-600 dark:bg-jacarta-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-4 w-4 fill-jacarta-700 dark:fill-white group-hover:fill-white"
              >
                <path fill="none" d="M0 0H24V24H0z"></path>
                <path d="M21 4v2h-1l-5 7.5V22H9v-8.5L4 6H3V4h18zM6.404 6L11 12.894V20h2v-7.106L17.596 6H6.404z"></path>
              </svg>
              <span className="mt-0.5 dark:text-white group-hover:text-white">
                Filters
              </span>
            </button>

            <button className="lex h-10 group flex-shrink-0 items-center justify-center space-x-1 rounded-lg border border-jacarta-100 bg-white py-1.5 px-4 font-medium text-2xs hover:bg-accent hover:border-accent dark:hover:bg-accent dark:border-jacarta-600 dark:bg-jacarta-700">
              <span className="mt-0.5 dark:text-white group-hover:text-white">
                Clear All
              </span>
            </button>
          </div>

          <Sorting />
        </div> */}
        {/* end filters / sorting */}

        <div className="w-full mt-6 ">
          {/* Sidebar */}
          {/* <Sidebar /> */}
          {/* end sidebar */}
          {/* Content */}
          <div className="w-full js-collections-content">
            <div className="w-full flex justify-between">
              <div className="mb-8 pb-px">
                <h1 className="pt-3 mb-2 font-display text-2xl font-medium text-jacarta-700 dark:text-white">
                  My Playthroughs
                </h1>
                <p className="dark:text-jacarta-400 font-medium text-2xs">
                  {stories.length} items
                </p>
              </div>
              {/* <Link
                href={`/create`}
                className="h-[48px] animate-gradient--no-text-fill block animate-gradient overflow-hidden rounded-xl !bg-clip-border text-center shadow-md transition-shadow hover:shadow-lg"
              >
                <button className="bg-black/[.3] flex items-center justify-center bg-background px-6 py-2 font-bold text-xl text-white transition-all duration-200 ease-in-out transform hover:scale-105">
                  Create Game
                </button>
              </Link> */}
              <div className="ml-auto hidden sm:block h-[38px] animate-gradient--no-text-fill block animate-gradient overflow-hidden rounded-xl !bg-clip-border text-center shadow-md transition-shadow hover:shadow-lg">
                <Link
                  href={user ? `/games` : "#"}
                  className="cursor-pointer bg-black/[.3] flex items-center justify-center bg-background px-3 py-2 font-bold text-md text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  Explore Games
                </Link>
              </div>
            </div>

            <div className="tab-content">
              {/* Grid */}
              <div
                className="tab-pane fade show active"
                id="view-grid"
                role="tabpanel"
                aria-labelledby="view-grid-tab"
              >
                <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                  {stories.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-6 border border-dashed border-jacarta-100 dark:border-jacarta-600 rounded-lg text-center dark:bg-jacarta-700 bg-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 10h11M9 21V3m0 3H5m4-2h4M21 16.6A2.6 2.6 0 0118.4 19H5.6A2.6 2.6 0 013 16.4V5.6A2.6 2.6 0 015.6 3h12.8A2.6 2.6 0 0121 5.6v10.8z"
                        />
                      </svg>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        No stories available. Start playing!
                      </p>
                    </div>
                  )}

                  {stories?.map((story, i) => (
                    <article key={i}>
                      <div className="w-[270px] h-full flex flex-col block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                        <figure className="relative">
                          <Link href={`/games/${story.game.game_id}/play?story_id=${story.story_id}`}>
                          <PreviewMedia
                              musicUrl={story.game.opener_mp3}
                              mediaUrl={story.game.preview_image}
                              mediaType={story.game.preview_image_type}
                              alt="Game Preview"
                            />
                          </Link>
                        </figure>

                        <div className="mt-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Last interaction: {new Date(story.last_interaction).toLocaleString()}
                          </p>
                        </div>

                        <div className="mt-4">
                          <Link href={`/games/${story.game.game_id}/play?story_id=${story.story_id}`}>
                            <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">
                              {story.game.game_name.length > 30
                                ? story.game.game_name.slice(0, 30) + "..."
                                : story.game.game_name}
                            </span>
                          </Link>
                        </div>

                        <div className="mt-2">
                          <p className="text-sm text-jacarta-700 min-h-[40px] hover:text-accent dark:text-white">
                            {story.name
                              ? story.name.length > 50
                                ? story.name.slice(0, 50) + "..."
                                : story.name
                              : `Story 1`}
                          </p>
                        </div>

                        <div className="mt-4 flex-1 flex">
                          <Link 
                            href={`/games/${story.game.game_id}/play?story_id=${story.story_id}`}
                            className="flex self-end items-center justify-center gap-2 w-full rounded-xl bg-accent py-3 px-4 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            <span>Continue Story</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* List */}
              <div
                className="tab-pane fade"
                id="view-list"
                role="tabpanel"
                aria-labelledby="view-list-tab"
              >
                <div className="scrollbar-custom overflow-x-auto">
                  <div
                    role="table"
                    className="w-full min-w-[736px] border border-jacarta-100 bg-white text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white rounded-2lg"
                  >
                    <div
                      className="flex rounded-t-2lg bg-jacarta-50 dark:bg-jacarta-600"
                      role="row"
                    >
                      <div
                        className="md:w-2/5 w-1/4 py-3 px-4"
                        role="columnheader"
                      >
                        <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                          Collection
                        </span>
                      </div>
                      <div
                        className="md:w-[12%] w-[15%] py-3 px-4 text-right"
                        role="columnheader"
                      >
                        <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                          Floor Price
                        </span>
                      </div>
                      <div
                        className="md:w-[12%] w-[15%] py-3 px-4 text-right"
                        role="columnheader"
                      >
                        <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                          Volume
                        </span>
                      </div>
                      <div
                        className="md:w-[12%] w-[15%] py-3 px-4 text-right"
                        role="columnheader"
                      >
                        <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                          Volume Change
                        </span>
                      </div>
                      <div
                        className="md:w-[12%] w-[15%] py-3 px-4 text-right"
                        role="columnheader"
                      >
                        <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                          Items
                        </span>
                      </div>
                      <div
                        className="md:w-[12%] w-[15%] py-3 px-4 text-right"
                        role="columnheader"
                      >
                        <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                          Owners
                        </span>
                      </div>
                    </div>

                    {collections7.map((elm, i) => (
                      <Link
                        href={`/user/${elm.id}`}
                        key={i}
                        className="flex transition-shadow hover:shadow-lg"
                        role="row"
                      >
                        <div
                          className="flex md:w-2/5 w-1/4 items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                          role="cell"
                        >
                          <span className="mr-3 lg:mr-5">{elm.id}</span>
                          <figure className="relative mr-2 w-8 shrink-0 self-start lg:mr-5 lg:w-12">
                            <Image
                              width={48}
                              height={48}
                              src={elm.avatar}
                              alt="avatar 1"
                              className="rounded-2lg"
                              loading="lazy"
                            />
                            {elm.varified && (
                              <div
                                className="absolute -right-2 -bottom-1 flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
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
                            )}
                          </figure>
                          <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                            {elm.name}
                          </span>
                        </div>
                        <div
                          className="flex justify-end items-center md:w-[12%] w-[15%] whitespace-nowrap border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                          role="cell"
                        >
                          <span className="-ml-1" data-tippy-content="ETH">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              x="0"
                              y="0"
                              viewBox="0 0 1920 1920"
                              className="mr-1 h-4 w-4"
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
                          <span className="text-sm font-medium tracking-tight">
                            {elm.ethValue1}
                          </span>
                        </div>
                        <div
                          className="flex justify-end md:w-[12%] w-[15%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                          role="cell"
                        >
                          <span className="-ml-1" data-tippy-content="ETH">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              x="0"
                              y="0"
                              viewBox="0 0 1920 1920"
                              className="mr-1 h-4 w-4"
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
                          <span className="text-sm font-medium tracking-tight">
                            {elm.ethValue2}
                          </span>
                        </div>
                        <div
                          className="flex justify-end md:w-[12%] w-[15%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                          role="cell"
                        >
                          <span
                            className={`text-${
                              elm.percentageChange > 0 ? "green" : "red"
                            }`}
                          >
                            {elm.percentageChange > 0
                              ? `+${elm.percentageChange}%`
                              : `-${elm.percentageChange}%`}
                          </span>
                        </div>
                        <div
                          className="flex justify-end md:w-[12%] w-[15%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                          role="cell"
                        >
                          {elm.value1}
                        </div>
                        <div
                          className="flex justify-end md:w-[12%] w-[15%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                          role="cell"
                        >
                          {elm.value2}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* end content */}
        </div>
      </div>
    </section>
  );
}
