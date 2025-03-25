"use client";

import Image from "next/image";
import { useState } from "react";

const collections = [
  {
    id: 1,
    src: "/img/avatars/collection_ava_1.png",
    name: "CryptoKitties",
  },
  {
    id: 1,
    src: "/img/avatars/collection_ava_2.jpg",
    name: "KaijuKings",
  },
  {
    id: 2,
    src: "/img/avatars/collection_ava_3.png",
    name: "Kumo x World",
  },
  {
    id: 3,
    src: "/img/avatars/collection_ava_4.jpg",
    name: "Irene DAO",
  },
  {
    id: 4,
    src: "/img/avatars/collection_ava_5.png",
    name: "GenerativeDungeon",
  },
  {
    id: 5,
    src: "/img/avatars/collection_ava_6.jpg",
    name: "ENS Domains",
  },
  {
    id: 6,
    src: "/img/avatars/collection_ava_7.png",
    name: "Cozy Penguin",
  },
];

const categories = [
  "Art",
  "Collectibles",
  "Domain",
  "Music",
  "Photography",
  "Virtual World",
];
const sortingOptions = [
  "Recently Added",
  "Price: Low to High",
  "Price: High to Low",
  "Auction ending soon",
];
const currency = [
  { chain: "ETH", src: "/img/chains/ETH.png" },
  { chain: "FLOW", src: "/img/chains/FLOW.png" },
  { chain: "FUSD", src: "/img/chains/FUSD.png" },
  { chain: "XTZ", src: "/img/chains/XTZ.png" },
  { chain: "DAI", src: "/img/chains/DAI.png" },
  { chain: "RARI", src: "/img/chains/RARI.png" },
];
export default function Filter() {
  const [currentCollcetion, setCurrentCollcetion] = useState(collections[0]);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [activeCurrency, setActiveCurrency] = useState(currency[0]);
  const [activeSort, setActiveSort] = useState(sortingOptions[0]);
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between">
      <div className="flex flex-wrap items-center">
        {/* Collections */}
        <div className="my-1 mr-2.5">
          <button
            className="dropdown-toggle group group flex h-9 items-center rounded-lg border border-jacarta-100 bg-white px-4 font-display text-sm font-semibold text-jacarta-700 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:bg-accent"
            id="onSaleCollectionsFilter"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
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
              <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm2 8H4v6h16v-6h-5v3H9v-3zm11-6H4v4h5V9h6v2h5V7zm-9 4v3h2v-3h-2zM9 3v2h6V3H9z" />
            </svg>
            <span>Collections</span>
          </button>
          <div
            className="dropdown-menu z-10 hidden min-w-[280px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
            aria-labelledby="onSaleCollectionsFilter"
          >
            {/* Search */}
            <div className="p-4">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative block"
              >
                <input
                  type="search"
                  className="w-full rounded-2xl border border-jacarta-100 py-[0.6875rem] px-4 pl-10 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
                  placeholder="Search"
                />
                <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-4 w-4 fill-jacarta-500 dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path>
                  </svg>
                </span>
              </form>
            </div>

            {/* Collections List */}
            <ul className="scrollbar-custom flex max-h-48 flex-col overflow-y-auto">
              {collections.map((elm, i) => (
                <li onClick={() => setCurrentCollcetion(elm)} key={i}>
                  <div
                    className={
                      currentCollcetion == elm
                        ? "cursor-pointer dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                        : "cursor-pointer dropdown-item flex w-full items-center rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                    }
                  >
                    <span className="flex items-center space-x-3">
                      <Image
                        width={64}
                        height={64}
                        src={elm.src}
                        className="h-8 w-8 rounded-full"
                        loading="lazy"
                        alt="avatar"
                      />
                      <span className="text-jacarta-700 dark:text-white">
                        {elm.name}
                      </span>
                    </span>
                    {currentCollcetion == elm && (
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
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Clear / Apply */}
            <div className="-ml-2 -mr-2 mt-4 flex items-center justify-center space-x-3 border-t border-jacarta-100 px-7 pt-4 dark:border-jacarta-600">
              <button
                type="button"
                className="flex-1 rounded-full bg-white py-2 px-6 text-center text-sm font-semibold text-accent shadow-white-volume transition-all hover:bg-accent-dark hover:text-white hover:shadow-accent-volume"
              >
                Clear
              </button>
              <button
                type="button"
                className="flex-1 rounded-full bg-accent py-2 px-6 text-center text-sm font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="my-1 mr-2.5">
          <button
            className="dropdown-toggle group group flex h-9 items-center rounded-lg border border-jacarta-100 bg-white px-4 font-display text-sm font-semibold text-jacarta-700 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:bg-accent"
            id="onSaleCategoriesFilter"
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
            <span>Category</span>
          </button>
          <div
            className="dropdown-menu z-10 hidden min-w-[220px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
            aria-labelledby="onSaleCategoriesFilter"
          >
            <ul className="flex flex-col flex-wrap">
              {currentCategory == "" ? (
                <li onClick={() => setCurrentCategory("")}>
                  <div className=" cursor-pointer dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                    <span className="text-jacarta-700 dark:text-white">
                      All
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
                </li>
              ) : (
                <li onClick={() => setCurrentCategory("")}>
                  <div className=" cursor-pointer dropdown-item flex w-full items-center rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                    All
                  </div>
                </li>
              )}
              {categories.map((elm, i) => (
                <li onClick={() => setCurrentCategory(elm)} key={i}>
                  {elm == currentCategory ? (
                    <div className=" cursor-pointer dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
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
                    <div className=" cursor-pointer dropdown-item flex w-full items-center rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                      {elm}
                    </div>
                  )}{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Price Range */}
        <div className="my-1 mr-2.5">
          <button
            className="dropdown-toggle group group flex h-9 items-center rounded-lg border border-jacarta-100 bg-white px-4 font-display text-sm font-semibold text-jacarta-700 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:bg-accent"
            id="onSalePriceRangeFilter"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
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
              <path d="M17 16h2V4H9v2h8v10zm0 2v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3zM5.003 8L5 20h10V8H5.003zM7 16h4.5a.5.5 0 1 0 0-1h-3a2.5 2.5 0 1 1 0-5H9V9h2v1h2v2H8.5a.5.5 0 1 0 0 1h3a2.5 2.5 0 1 1 0 5H11v1H9v-1H7v-2z" />
            </svg>
            <span>Price Range</span>
          </button>

          <div
            className="dropdown-menu z-10 hidden min-w-[220px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
            aria-labelledby="onSalePriceRangeFilter"
          >
            {/* Blockchain */}
            <div className="dropdown mb-4 cursor-pointer px-5 pt-2">
              <div
                className="dropdown-toggle flex items-center justify-between rounded-lg border border-jacarta-100 py-3.5 px-3 text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
                role="button"
                id="onSaleFilterPriceBlockchain"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="flex items-center font-display">
                  <Image
                    width={400}
                    height={400}
                    src={activeCurrency.src}
                    alt="eth"
                    className="mr-2 h-5 w-5 rounded-full"
                    loading="lazy"
                  />
                  {activeCurrency.chain}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-4 w-4 fill-jacarta-500 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                </svg>
              </div>

              <div
                className="dropdown-menu z-10 hidden min-w-[252px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                aria-labelledby="onSaleFilterPriceBlockchain"
              >
                {currency.map((elm, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCurrency(elm)}
                    className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm text-jacarta-700 transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                  >
                    <span className="flex items-center">
                      <Image
                        width={20}
                        height={20}
                        src={elm.src}
                        alt="eth"
                        className="mr-2 h-5 w-5 rounded-full"
                      />
                      {elm.chain}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* From / To */}
            <div className="flex items-center space-x-3 px-5 pb-2">
              <input
                type="number"
                placeholder="From"
                className="w-full max-w-[7.5rem] rounded-lg border border-jacarta-100 py-[0.6875rem] px-4 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
              />
              <input
                type="number"
                placeholder="To"
                className="w-full max-w-[7.5rem] rounded-lg border border-jacarta-100 py-[0.6875rem] px-4 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
              />
            </div>

            {/* Clear / Apply */}
            <div className="-ml-2 -mr-2 mt-4 flex items-center justify-center space-x-3 border-t border-jacarta-100 px-7 pt-4 dark:border-jacarta-600">
              <button
                type="button"
                className="flex-1 rounded-full bg-white py-2 px-6 text-center text-sm font-semibold text-accent shadow-white-volume transition-all hover:bg-accent-dark hover:text-white hover:shadow-accent-volume"
              >
                Clear
              </button>
              <button
                type="button"
                className="flex-1 rounded-full bg-accent py-2 px-6 text-center text-sm font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sort */}
      <div className="dropdown my-1 cursor-pointer">
        <div
          className="dropdown-toggle inline-flex w-48 items-center justify-between rounded-lg border border-jacarta-100 bg-white py-2 px-3 text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
          role="button"
          id="onSaleSort"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="font-display">{activeSort}</span>
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
          className="dropdown-menu z-10 hidden min-w-[220px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
          aria-labelledby="onSaleSort"
        >
          <span className="block px-5 py-2 font-display text-sm font-semibold text-jacarta-300">
            Sort By
          </span>
          {sortingOptions.map((elm, i) => (
            <button
              onClick={() => setActiveSort(elm)}
              key={i}
              className={
                activeSort == elm
                  ? "dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm text-jacarta-700 transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                  : "dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
              }
            >
              {elm}
              {activeSort == elm && (
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
          <span className="block px-5 py-2 font-display text-sm font-semibold text-jacarta-300">
            Options
          </span>
          <div className="dropdown-item block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
            <span className="flex items-center justify-between">
              <span>Verified Only</span>
              <input
                type="checkbox"
                defaultValue="checkbox"
                name="check"
                defaultChecked
                className="relative h-4 w-7 cursor-pointer appearance-none rounded-lg border-none bg-jacarta-100 after:absolute after:top-0.5 after:left-0.5 after:h-3 after:w-3 after:rounded-full after:bg-jacarta-400 after:transition-all checked:bg-accent checked:bg-none checked:after:left-3.5 checked:after:bg-white checked:hover:bg-accent focus:ring-transparent focus:ring-offset-0 checked:focus:bg-accent"
              />
            </span>
          </div>
          <div className="dropdown-item block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
            <span className="flex items-center justify-between">
              <span>NFSW Only</span>
              <input
                type="checkbox"
                defaultValue="checkbox"
                name="check"
                className="relative h-4 w-7 cursor-pointer appearance-none rounded-lg border-none bg-jacarta-100 after:absolute after:top-0.5 after:left-0.5 after:h-3 after:w-3 after:rounded-full after:bg-jacarta-400 after:transition-all checked:bg-accent checked:bg-none checked:after:left-3.5 checked:after:bg-white checked:hover:bg-accent focus:ring-transparent focus:ring-offset-0 checked:focus:bg-accent"
              />
            </span>
          </div>
          <div className="dropdown-item block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
            <span className="flex items-center justify-between">
              <span>Show Lazy Minted</span>
              <input
                type="checkbox"
                defaultValue="checkbox"
                name="check"
                className="relative h-4 w-7 cursor-pointer appearance-none rounded-lg border-none bg-jacarta-100 after:absolute after:top-0.5 after:left-0.5 after:h-3 after:w-3 after:rounded-full after:bg-jacarta-400 after:transition-all checked:bg-accent checked:bg-none checked:after:left-3.5 checked:after:bg-white checked:hover:bg-accent focus:ring-transparent focus:ring-offset-0 checked:focus:bg-accent"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
