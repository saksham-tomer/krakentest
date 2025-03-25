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

export default function Collections() {
  const { axiosInstance, loading, error } = useAxiosWithAuth();
  const user = useUserCookie();

  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  async function fetchGames() {
    console.log("Get games API called");
    try {
      const response = await axiosInstance.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/games/all/published"
      );

      // Access the data using the assumed structure: response.data.success.data
      if (response.data && response.data.success) {
        setGames(response.data.success.data);
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  }

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(()=>{
    setFilteredGames(games)
  }, [games])

  function formatDate(isoString) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" }); // Full month name
    const day = date.getDate();

    return `${month} ${day}, ${year}`;
  }

  return (
    <section className="relative pt-16 pb-24">
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

        <div className="lg:flex mt-6">
          {/* Sidebar */}
          <Sidebar games={games} setFilteredGames={setFilteredGames}/>
          {/* end sidebar */}
          {/* Content */}
          <div className="lg:w-4/5 js-collections-content">
            <div className="flex justify-between">
              <div className="mb-8 pb-px">
                <h1 className="pt-3 mb-2 font-display text-2xl font-medium text-jacarta-700 dark:text-white">
                  Explore Games
                </h1>
                <p className="dark:text-jacarta-400 font-medium text-2xs">
                  {filteredGames.length} items
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
                <a
                  href={user ? `/create` : undefined}
                  data-bs-toggle={!user ? "modal" : undefined}
                  data-bs-target={!user ? "#loginModalForCreating" : undefined}
                  className="cursor-pointer bg-black/[.3] flex items-center justify-center bg-background px-3 py-2 font-bold text-md text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  Create Game
                </a>
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
                  {filteredGames.length === 0 && (
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
                        No games available. Start by creating your own game!
                      </p>
                    </div>
                  )}

                  {filteredGames.map((game, i) => (
                    <article key={i}>
                      <div className="min-w-[270px] sm:min-w-[300px] max-w-[270px] block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                        <figure className="relative">
                          <Link href={`/games/${game.game_id}`}>
                            {/* <Image
                            width={230}
                            height={230}
                            src={game.preview_image}
                            alt="item 5"
                            className="w-[230px] h-[230px] object-cover rounded-[0.625rem]"
                            loading="lazy"
                          /> */}

                            <PreviewMedia
                              musicUrl={game.opener_mp3}
                              mediaUrl={game.preview_image}
                              mediaType={game.preview_image_type}
                              alt="Game Preview"
                            />
                          </Link>
                          <span className="text-jacarta-400 text-xs">
                            {game.created_at ? formatDate(game.created_at) : ""}
                          </span>

                          {!game.is_free && (
                            <span className="absolute top-2 left-2 bg-accent text-white text-xs px-1 rounded">
                              Paid
                            </span>
                          )}
                          {/* <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-md bg-white p-2 dark:bg-jacarta-700">
                          <span
                            onClick={() => addLike(elm.id)}
                            className={`js-likes relative cursor-pointer before:absolute before:h-4 before:w-4 before:bg-[url('../img/heart-fill.svg')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0 ${
                              elm.liked ? "js-likes--active" : ""
                            }`}
                            data-tippy-content="Favorite"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              className="h-4 w-4 fill-jacarta-500 hover:fill-red dark:fill-jacarta-200 dark:hover:fill-red"
                            >
                              <path fill="none" d="M0 0H24V24H0z" />
                              <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
                            </svg>
                          </span>
                          <span className="text-sm dark:text-jacarta-200">
                            {elm.likes}
                          </span>
                        </div> */}
                          {/* <div className="absolute left-3 -bottom-3">
                          <div className="flex -space-x-2">
                            <a href="#">
                              <Image
                                width={24}
                                height={24}
                                src={game.creatorAvatar}
                                alt="creator"
                                className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                                data-tippy-content="Creator: Sussygirl"
                              />
                            </a>
                            <a href="#">
                              <Image
                                width={24}
                                height={24}
                                src={elm.ownerAvatar}
                                alt="owner"
                                className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                                data-tippy-content="Owner: Sussygirl"
                              />
                            </a>
                          </div>
                        </div> */}
                        </figure>
                        <div className="mt-4 flex items-center justify-between">
                          <Link href={`/games/${game.game_id}`}>
                            <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">
                              {game.game_name.length > 30
                                ? game.game_name.slice(0, 30) + "..."
                                : game.game_name}
                            </span>
                          </Link>
                          {/* <div className="dropup rounded-full hover:bg-jacarta-100 dark:hover:bg-jacarta-600">
                          <a
                            href="#"
                            className="dropdown-toggle inline-flex h-8 w-8 items-center justify-center text-sm"
                            role="button"
                            id="itemActions"
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
                            className="dropdown-menu dropdown-menu-end z-10 hidden min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                            aria-labelledby="itemActions"
                          >
                            <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Publish
                            </button>
                            <hr className="my-2 mx-4 h-px border-0 bg-jacarta-100 dark:bg-jacarta-600" />
                            <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Edit
                            </button>
                            
                            
                          </div>
                        </div> */}
                        </div>
                        {/* <div className="mt-2 text-sm">
                        <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                          {elm.price}
                        </span>
                        <span className="text-jacarta-500 dark:text-jacarta-300">
                          {elm.bidCount}
                        </span>
                      </div> */}

                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-sm text-jacarta-700 min-h-[54px] hover:text-accent dark:text-white">
                            {game.description.length > 70
                              ? game.description.substring(0, 70) + "..."
                              : game.description}
                          </p>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                          {/* <button
                          className="font-display text-sm font-semibold text-accent"
                          data-bs-toggle="modal"
                          data-bs-target="#buyNowModal"
                        >
                          Preview
                        </button> */}

                          {/* {`/games/${game.game_id}/play`} */}
                          {/* 
                      <Button
                        size="sm"
                        className="text-nowrap"
                        onClick={()=>{}}
                      >
                        Play
                      </Button> */}

                      
                        {
                          game?.is_free || game?.is_purchased?
                          <a
                            href={`/games/${game.game_id}/play`}
                            // data-bs-toggle="modal"
                            // data-bs-target="#placeBidModal"
                            className="inline-block w-full rounded-xl bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                          >
                            Play Game
                          </a>:
                          <a
                            href={`/games/${game.game_id}`}
                            // data-bs-toggle="modal"
                            // data-bs-target="#placeBidModal"
                            className="flex items-center justify-center gap-2 w-full rounded-xl bg-accent py-3 px-4 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                          >
                          
                          <svg className="fill-white" height="15px" width="15px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_509_"> <path id="XMLID_510_" d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"></path> </g> </g></svg>
                            <span className="pt-1">
                              Details
                            </span>
                          </a>
                        }
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
                              //   xml:space="preserve"
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
                              //   xml:space="preserve"
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
