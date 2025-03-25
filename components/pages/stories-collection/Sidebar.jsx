"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import tippy from "tippy.js";

const collectionFilteringOptions = [
  {
    id: 1,
    imgSrc: "/img/nft-aggregator/item-14.jpg",
    name: "Table Top",
    count: 0,
    varified: true,
  },
  {
    id: 2,
    imgSrc: "/img/nft-aggregator/item-2.jpg",
    name: "Romance",
    count: 0,
  },
  {
    id: 3,
    imgSrc: "/img/nft-aggregator/item-7.jpg",
    name: "Romantasy",
    count: 0,
  },
  {
    id: 4,
    imgSrc: "/img/nft-aggregator/item-1.jpg",
    name: "Isekai",
    count: 0,
  },
];

const chains = [
  { id: 1, imgSrc: "/img/chains/eth-chain.png", name: "Ethereum" },
  { id: 2, imgSrc: "/img/chains/polygon-chain.png", name: "Polygon" },
  { id: 3, imgSrc: "/img/chains/tezos-chain.png", name: "Tezos" },
  { id: 4, imgSrc: "/img/chains/solana-chain.png", name: "Solana" },
];

const status = [
  { id: 1, label: "Buy Now" },
  { id: 2, label: "On Auction" },
  { id: 3, label: "New" },
  { id: 4, label: "Has Offers" },
];
const currencies = ["USD", "ETH", "SOL"];
const categories = [
  "Tabletop",
  "Romance",
  "Romantasy",
  "Isekai",
  "Fantasy",
  "Sci-Fi",
  "Mystery",
  "Steampunk",
  "Contemporary",
  "Historical",
  "Thriller",
  "Horror",
];

export default function Sidebar() {
  const [currency, setCurrency] = useState(currencies[0]);
  const [category, setCategory] = useState(categories[0]);
  useEffect(() => {
    tippy("[data-tippy-content]");
  }, []);
  return (
    <div className="lg:w-1/5 mb-10 js-collections-sidebar lg:h-[calc(100vh_-_232px)] lg:overflow-auto lg:sticky lg:top-32 lg:mr-12 pr-4 scrollbar-custom divide-y divide-jacarta-100 dark:divide-jacarta-600">
      {/* Collections filter */}
      <div>
        {/* <h2 id="filters-collections-heading">
          <button
            className="accordion-button relative flex w-full items-center justify-between py-3 text-left font-display text-xl text-jacarta-700 dark:text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filters-collections"
            aria-expanded="true"
            aria-controls="filters-collections"
          >
            <span>Games</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="accordion-arrow h-5 w-5 shrink-0 fill-jacarta-700 transition-transform dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
            </svg>
          </button>
        </h2> */}
        <div
          id="filters-collections"
          className="mt-3 collapse show visible"
          aria-labelledby="filters-collections-heading"
        >
          <form onSubmit={(e) => e.preventDefault()} className="relative mb-6">
            <input
              type="search"
              className="w-full rounded-lg border border-jacarta-100 py-[0.6875rem] px-4 pl-10 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
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
          {/* <ul className="space-y-6 mb-8">
            {collectionFilteringOptions.map((elm, i) => (
              <li key={i}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-5 w-5 mr-3 rounded border-jacarta-200 text-accent checked:bg-accent focus:ring-accent/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
                  />
                  <figure className="relative mr-2 w-8 shrink-0 lg:mr-4 lg:w-10">
                    <Image
                      width={40}
                      height={40}
                      src={elm.imgSrc}
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
                  <span className="ml-auto text-sm dark:text-jacarta-300">
                    {elm.count}
                  </span>
                </label>
              </li>
            ))}
          </ul> */}
        </div>
      </div>

      {/* Chains filter */}
      {/* <div className="mt-4 pt-4">
        <h2 id="filters-chains-heading">
          <button
            className="accordion-button collapsed relative flex w-full items-center justify-between py-3 text-left font-display text-xl text-jacarta-700 dark:text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filters-chains"
            aria-expanded="false"
            aria-controls="filters-chains"
          >
            <span>Chains</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="accordion-arrow h-5 w-5 shrink-0 fill-jacarta-700 transition-transform dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
            </svg>
          </button>
        </h2>
        <div
          id="filters-chains"
          className="mt-3 collapse visible"
          aria-labelledby="filters-chains-heading"
        >
          <ul className="space-y-6 mb-8">
            {chains.map((elm, i) => (
              <li key={i}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-5 w-5 mr-3 rounded border-jacarta-200 text-accent checked:bg-accent focus:ring-accent/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
                  />
                  <figure className="relative mr-2 w-8 shrink-0">
                    <Image
                      width={64}
                      height={64}
                      src={elm.imgSrc}
                      alt={elm.name}
                      className="rounded-2lg"
                      loading="lazy"
                    />
                  </figure>
                  <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                    {elm.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      {/* Status filter */}
      {/* <div className="mt-4 pt-4">
        <h2 id="filters-status-heading">
          <button
            className="accordion-button collapsed relative flex w-full items-center justify-between py-3 text-left font-display text-xl text-jacarta-700 dark:text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filters-status"
            aria-expanded="false"
            aria-controls="filters-status"
          >
            <span>Status</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="accordion-arrow h-5 w-5 shrink-0 fill-jacarta-700 transition-transform dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
            </svg>
          </button>
        </h2>
        <div
          id="filters-status"
          className="mt-3 collapse visible"
          aria-labelledby="filters-status-heading"
        >
          <ul className="space-y-6 mb-8">
            {status.map((elm, i) => (
              <li key={i}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-5 w-5 mr-2 rounded border-jacarta-200 text-accent checked:bg-accent focus:ring-accent/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
                  />
                  <span className="dark:text-white">{elm.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      {/* Price filter */}
      {/* <div className="mt-4 pt-4">
        <h2 id="filters-price-heading">
          <button
            className="accordion-button relative flex w-full items-center justify-between py-3 text-left font-display text-xl text-jacarta-700 dark:text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filters-price"
            aria-expanded="true"
            aria-controls="filters-price"
          >
            <span>Price</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="accordion-arrow h-5 w-5 shrink-0 fill-jacarta-700 transition-transform dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
            </svg>
          </button>
        </h2>
        <div
          id="filters-price"
          className="mt-3 mb-8 space-y-4 collapse show visible"
          aria-labelledby="filters-price-heading"
        >
          <div className="dropdown relative cursor-pointer">
            <div
              className="dropdown-toggle flex items-center justify-between rounded-lg border border-jacarta-100 bg-white w-full h-12 py-3 px-4 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
              role="button"
              id="filtersPrice"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>USD</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-5 w-5 fill-jacarta-500 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
              </svg>
            </div>

            <div
              className="dropdown-menu z-10 hidden w-full whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
              aria-labelledby="filtersPrice"
            >
              {currencies.map((elm, i) => (
                <button
                  key={i}
                  onClick={() => setCurrency(elm)}
                  className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm text-jacarta-700 transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                >
                  {elm}
                  {currency == elm && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="h-4 w-4 fill-accent"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <input
              className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
              type="text"
              placeholder="Min"
            />
            <input
              className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
              type="text"
              placeholder="Max"
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-accent-lighter w-full py-3 px-8 text-center font-semibold text-white transition-all hover:bg-accent-dark"
          >
            Apply
          </button>
        </div>
      </div> */}

      {/* Categories filter */}
      <div className="mt-4 pt-4">
        <h2 id="filters-categories-heading">
          <button
            className="accordion-button relative flex w-full items-center justify-between py-3 text-left font-display text-xl text-jacarta-700 dark:text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filters-categories"
            aria-expanded="true"
            aria-controls="filters-categories"
          >
            <span>Categories</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="accordion-arrow h-5 w-5 shrink-0 fill-jacarta-700 transition-transform dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
            </svg>
          </button>
        </h2>
        <div
          id="filters-categories"
          className="mt-3 collapse show visible"
          aria-labelledby="filters-categories-heading"
        >
          <ul className="flex flex-wrap items-center">
            {categories.map((elm, i) => (
              <li
                key={i}
                onClick={() => setCategory(elm)}
                className="my-1 mr-2.5"
              >
                <button
                  className={
                    category == elm
                      ? "group flex h-9 items-center rounded-lg border border-accent bg-accent px-4 font-display text-sm font-semibold text-white transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-900 dark:text-white dark:hover:border-transparent dark:hover:bg-accent dark:hover:text-white"
                      : "group flex h-9 items-center rounded-lg border border-jacarta-100 bg-white px-4 font-display text-sm font-semibold text-jacarta-500 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-900 dark:text-white dark:hover:border-transparent dark:hover:bg-accent dark:hover:text-white"
                  }
                >
                  <span>{elm}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
