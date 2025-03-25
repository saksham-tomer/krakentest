"use client";

import { useState } from "react";

const sortingOptions = [
  "Recently Listed",
  "Recently Created",
  "Price Low to High",
  "Price High to Low",
];

export default function Sorting() {
  const [sortingOption, setSortingOption] = useState(sortingOptions[0]);

  return (
    <div className="flex flex-wrap items-center space-x-3">
      <ul
        className="nav nav-tabs flex items-center justify-center border border-jacarta-100 dark:border-jacarta-600 rounded-lg overflow-hidden"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link nav-link--style-5 active group relative flex items-center justify-center whitespace-nowrap h-[2.875rem] w-12 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
            id="view-grid-tab"
            data-bs-toggle="tab"
            data-bs-target="#view-grid"
            type="button"
            role="tab"
            aria-controls="view-grid"
            aria-selected="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="h-5 w-5 fill-current"
            >
              <path
                d="M3 3H11V11H3V3ZM3 13H11V21H3V13ZM13 3H21V11H13V3ZM13 13H21V21H13V13ZM15 5V9H19V5H15ZM15 15V19H19V15H15ZM5 5V9H9V5H5ZM5 15V19H9V15H5Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link nav-link--style-5 relative flex items-center justify-center whitespace-nowrap h-[2.875rem] w-12 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
            id="view-list-tab"
            data-bs-toggle="tab"
            data-bs-target="#view-list"
            type="button"
            role="tab"
            aria-controls="view-list"
            aria-selected="false"
            tabIndex="-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="h-5 w-5 fill-current"
            >
              <path
                d="M11 4H21V6H11V4ZM11 8H17V10H11V8ZM11 14H21V16H11V14ZM11 18H17V20H11V18ZM3 4H9V10H3V4ZM5 6V8H7V6H5ZM3 14H9V20H3V14ZM5 16V18H7V16H5Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
      <div className="dropdown relative cursor-pointer">
        <div
          className="dropdown-toggle inline-flex w-48 items-center justify-between rounded-lg border border-jacarta-100 bg-white h-12 py-3 px-4 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
          role="button"
          id="categoriesSort"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="">Sort by</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="h-5 w-5 fill-jacarta-500 dark:fill-white"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
          </svg>
        </div>

        <div
          className="dropdown-menu z-10 hidden w-full whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
          aria-labelledby="categoriesSort"
        >
          {sortingOptions.map((elm, i) => (
            <button
              key={i}
              onClick={() => setSortingOption(elm)}
              className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm text-jacarta-700 transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
            >
              {elm}
              {elm == sortingOption && (
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
  );
}
