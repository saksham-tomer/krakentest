"use client";

import { useState } from "react";

const blockChainOptions = ["Ethereum", "Polygon", "Flow", "Tezos"];
const categories = [
  "All",
  "Art",
  "Collectibles",
  "Domain",
  "Music",
  "Photography",
  "Virtual World",
];
const timeOptions = [
  { value: "7-days", label: "Last 7 Days" },
  { value: "14-days", label: "Last 14 Days" },
  { value: "30-days", label: "Last 30 Days" },
  { value: "60-days", label: "Last 60 Days" },
  { value: "90-days", label: "Last 90 Days", selected: true },
  { value: "last-year", label: "Last Year" },
  { value: "all-time", label: "All Time" },
];
import { ranking } from "@/data/ranking";
import Image from "next/image";
import Link from "next/link";

export default function Ranking() {
  const [activeBlockchainOption, setActiveBlockchainOption] = useState(
    blockChainOptions[0]
  );
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeTimeOption, setActiveTimeOption] = useState(timeOptions[0]);
  return (
    <section className="relative py-24">
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
        <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
          Rankings
        </h1>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center justify-between">
          <div className="flex flex-wrap items-center">
            {/* Categories */}
            <div className="my-1 mr-2.5">
              <button
                className="dropdown-toggle group group flex h-9 items-center rounded-lg border border-jacarta-100 bg-white px-4 font-display text-sm font-semibold text-jacarta-700 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:bg-accent"
                id="categoriesFilter"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="mr-1 h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white dark:fill-jacarta-100"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M14 10v4h-4v-4h4zm2 0h5v4h-5v-4zm-2 11h-4v-5h4v5zm2 0v-5h5v4a1 1 0 0 1-1 1h-4zM14 3v5h-4V3h4zm2 0h4a1 1 0 0 1 1 1v4h-5V3zm-8 7v4H3v-4h5zm0 11H4a1 1 0 0 1-1-1v-4h5v5zM8 3v5H3V4a1 1 0 0 1 1-1h4z" />
                </svg>
                <span>All Categories</span>
              </button>
              <div
                className="dropdown-menu z-10 hidden min-w-[220px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                aria-labelledby="categoriesFilter"
              >
                <ul className="flex flex-col flex-wrap">
                  {categories.map((elm, i) => (
                    <li
                      onClick={() => setActiveCategory(elm)}
                      key={i}
                      className="cursor-pointer"
                    >
                      {activeCategory == elm ? (
                        <div className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                          <span className="text-jacarta-700 dark:text-white">
                            {elm}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="mb-[3px] h-4 w-4 fill-accent"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                          </svg>
                        </div>
                      ) : (
                        <div className="dropdown-item flex w-full items-center rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                          {elm}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Chains */}
            <div className="my-1 mr-2.5">
              <button
                className="dropdown-toggle group group flex h-9 items-center rounded-lg border border-jacarta-100 bg-white px-4 font-display text-sm font-semibold text-jacarta-700 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:bg-accent"
                id="blockchainFilter"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="mr-1 h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white dark:fill-jacarta-100"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M20 16h2v6h-6v-2H8v2H2v-6h2V8H2V2h6v2h8V2h6v6h-2v8zm-2 0V8h-2V6H8v2H6v8h2v2h8v-2h2zM4 4v2h2V4H4zm0 14v2h2v-2H4zM18 4v2h2V4h-2zm0 14v2h2v-2h-2z" />
                </svg>
                <span>All Chains</span>
              </button>
              <div
                className="dropdown-menu z-10 hidden min-w-[220px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                aria-labelledby="blockchainFilter"
              >
                <ul className="flex flex-col flex-wrap">
                  {blockChainOptions.map((elm, i) => (
                    <li
                      onClick={() => setActiveBlockchainOption(elm)}
                      key={i}
                      className="cursor-pointer"
                    >
                      {activeBlockchainOption == elm ? (
                        <div className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                          <span className="text-jacarta-700 dark:text-white">
                            {elm}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="mb-[3px] h-4 w-4 fill-accent"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                          </svg>
                        </div>
                      ) : (
                        <div className="dropdown-item flex w-full items-center rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                          {elm}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="dropdown relative my-1 cursor-pointer">
            <div
              className="dropdown-toggle inline-flex w-48 items-center justify-between rounded-lg border border-jacarta-100 bg-white py-2 px-3 text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
              role="button"
              id="sortOrdering"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="font-display">{activeTimeOption.label}</span>
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
              aria-labelledby="sortOrdering"
            >
              {timeOptions.map((elm, i) => (
                <button
                  onClick={() => setActiveTimeOption(elm)}
                  key={i}
                  className={
                    activeTimeOption == elm
                      ? "dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm text-jacarta-700 transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                      : "dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                  }
                >
                  {elm.label}
                  {activeTimeOption == elm && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="mb-[3px] h-4 w-4 fill-accent"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/*  */}
        </div>
        {/* end filters */}

        {/* Table */}
        <div className="scrollbar-custom overflow-x-auto">
          <div
            role="table"
            className="w-full min-w-[736px] border border-jacarta-100 bg-white text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white lg:rounded-2lg"
          >
            <div
              className="flex rounded-t-2lg bg-jacarta-50 dark:bg-jacarta-600"
              role="row"
            >
              <div className="w-[28%] py-3 px-4" role="columnheader">
                <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                  Collection
                </span>
              </div>
              <div className="w-[12%] py-3 px-4" role="columnheader">
                <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                  Volume
                </span>
              </div>
              <div className="w-[12%] py-3 px-4" role="columnheader">
                <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                  24h %
                </span>
              </div>
              <div className="w-[12%] py-3 px-4" role="columnheader">
                <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                  7d %
                </span>
              </div>
              <div className="w-[12%] py-3 px-4" role="columnheader">
                <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                  Floor Price
                </span>
              </div>
              <div className="w-[12%] py-3 px-4" role="columnheader">
                <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                  Owners
                </span>
              </div>
              <div className="w-[12%] py-3 px-4" role="columnheader">
                <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                  Items
                </span>
              </div>
            </div>

            {ranking.map((elm, i) => (
              <Link
                href={`/user/${elm.id}`}
                key={i}
                className="flex transition-shadow hover:shadow-lg"
                role="row"
              >
                <div
                  className="flex w-[28%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                  role="cell"
                >
                  <span className="mr-2 lg:mr-4">{i + 1}</span>
                  <figure className="relative mr-2 w-8 shrink-0 self-start lg:mr-5 lg:w-12">
                    <Image
                      width={40}
                      height={40}
                      src={elm.image}
                      alt="avatar 1"
                      className="rounded-2lg"
                      loading="lazy"
                    />
                    {elm.varified && (
                      <div
                        className="absolute -right-2 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
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
                  className="flex w-[12%] items-center whitespace-nowrap border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
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
                    {elm.volume}
                  </span>
                </div>
                <div
                  className="flex w-[12%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                  role="cell"
                >
                  <span
                    className={`text-${
                      elm.percentageChange?.includes("+") ? "green" : "red"
                    }`}
                  >
                    {elm.percentageChange}
                  </span>
                </div>
                <div
                  className="flex w-[12%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                  role="cell"
                >
                  <span
                    className={`text-${
                      elm.percentageChangeweekly?.includes("+")
                        ? "green"
                        : "red"
                    }`}
                  >
                    {elm.percentageChangeweekly}
                  </span>
                </div>
                <div
                  className="flex w-[12%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                  role="cell"
                >
                  <span className="-ml-1" data-tippy-content={elm.collection}>
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
                    {elm.quantity}
                  </span>
                </div>
                <div
                  className="flex w-[12%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                  role="cell"
                >
                  <span>{elm.owner}</span>
                </div>
                <div
                  className="flex w-[12%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                  role="cell"
                >
                  <span>{elm.supply}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
