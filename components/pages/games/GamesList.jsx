"use client";

import { collections3 } from "@/data/collections";
import Image from "next/image";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { gameGenres } from "@/constants/game";
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import Loader from "@/components/ui/Loader";

const sortingOptions = [
  { text: "Trending" },
  { text: "Top" },
  { text: "Recent" },
];

const GamesList = () => {
  const { loading, error, data, getData } = useAxiosWithAuth();

  const getAllGames = async () => {
    await getData("get", "games/all");
  };

  useEffect(() => {
    getAllGames();
  }, []);

  const [currentSorting, setCurrentSorting] = useState(sortingOptions[0]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filtered, setFiltered] = useState(collections3);
  useEffect(() => {
    let tempfiltered = [];
    if (activeCategory == "all") {
      tempfiltered = collections3;
    } else {
      tempfiltered = collections3.filter(
        (elm) => elm.category == activeCategory
      );
    }

    setFiltered(tempfiltered);
  }, [activeCategory]);

  return (
    <section className="py-24 h-screen relative">
      {loading && (
        <div className="center-absolute">
          <Loader />
        </div>
      )}
      {!loading && (
        <>
          {" "}
          <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <Image
              width={1920}
              height={789}
              priority
              src="/img/gradient_light.jpg"
              alt="gradient"
              className="h-full w-full"
            />
          </picture>
          <div className="container">
            <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              All Games
            </h1>

            <div className="mb-8 flex  items-start justify-between">
              <ul className="flex flex-wrap items-center basis-[70%]">
                <li className="my-1 mr-2.5">
                  <div
                    onClick={() => setActiveCategory("all")}
                    className={`  ${
                      activeCategory == "all" ? "bg-jacarta-100" : "bg-white"
                    }  ${
                      activeCategory == "all"
                        ? " dark:bg-jacarta-700"
                        : "dark:bg-jacarta-900"
                    } cursor-pointer group flex h-9 items-center rounded-lg border border-jacarta-100  px-4 font-display text-sm font-semibold text-jacarta-500 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600  dark:text-white dark:hover:border-transparent dark:hover:bg-accent dark:hover:text-white`}
                  >
                    All
                  </div>
                </li>
                {gameGenres.map((elm, i) => (
                  <li
                    onClick={() => setActiveCategory(elm.name)}
                    key={i}
                    className="my-1 mr-2.5"
                  >
                    <div
                      className={`  ${
                        activeCategory == elm.name
                          ? "bg-jacarta-100"
                          : "bg-white"
                      }  ${
                        activeCategory == elm.name
                          ? " dark:bg-jacarta-700"
                          : "dark:bg-jacarta-900"
                      } cursor-pointer group flex h-9 items-center rounded-lg border border-jacarta-100  px-4 font-display text-sm font-semibold text-jacarta-500 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600  dark:text-white dark:hover:border-transparent dark:hover:bg-accent dark:hover:text-white`}
                    >
                      <span>{elm}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="dropdown relative my-1 cursor-pointer">
                <div
                  className="dropdown-toggle inline-flex w-48 items-center justify-between rounded-lg border border-jacarta-100 bg-white py-2 px-3 text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
                  role="button"
                  id="categoriesSort"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="font-display">{currentSorting.text}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-4 w-4 fill-jacarta-500 dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                  </svg>
                </div>

                <div
                  className="dropdown-menu z-10 hidden w-full whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                  aria-labelledby="categoriesSort"
                >
                  {" "}
                  {sortingOptions.map((elm, i) => (
                    <button
                      onClick={() => setCurrentSorting(elm)}
                      key={i}
                      className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm text-jacarta-700 transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                    >
                      {elm.text}
                      {currentSorting == elm && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="h-4 w-4 fill-accent"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
              {data &&
                data.length > 0 &&
                data.map((game, i) => (
                  <article key={i}>
                    <GameCard gameData={game} index={i} />
                  </article>
                ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
export default GamesList;
