"use client";
import { activity } from "@/data/itemDetails";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Activity() {
  const [filterAction, setfilterAction] = useState();
  const [filteredItems, setFilteredItems] = useState(activity);
  useEffect(() => {
    if (filterAction) {
      setFilteredItems(activity.filter((elm) => elm.action == filterAction));
    } else {
      setFilteredItems(activity);
    }
  }, [filterAction]);

  return (
    <>
      <div className=" border border-b-0 border-jacarta-100 bg-light-base px-4 pt-5 pb-2.5 dark:border-jacarta-600 dark:bg-jacarta-700">
        <div className="flex flex-wrap">
          <button
            onClick={() => setfilterAction()}
            className={
              !filterAction
                ? "mr-2.5 mb-2.5 inline-flex items-center rounded-xl border border-transparent bg-accent px-4 py-3 hover:bg-accent-dark dark:hover:bg-accent-dark fill-white"
                : "group mr-2.5 mb-2.5 inline-flex items-center rounded-xl border border-jacarta-100 bg-white px-4 py-3 hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-accent hover:fill-white dark:fill-white "
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className={`mr-2 h-4 w-4 `}
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M10.9 2.1l9.899 1.415 1.414 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1zm.707 2.122L3.828 12l8.486 8.485 7.778-7.778-1.06-7.425-7.425-1.06zm2.12 6.364a2 2 0 1 1 2.83-2.829 2 2 0 0 1-2.83 2.829z"></path>
            </svg>
            <span
              className={`text-2xs font-medium ${
                !filterAction ? "text-white" : ""
              } `}
            >
              Listing
            </span>
          </button>

          {activity.map((elm, i) => (
            <button
              key={i}
              onClick={() => setfilterAction(elm.action)}
              className={
                filterAction == elm.action
                  ? "mr-2.5 mb-2.5 inline-flex items-center rounded-xl border border-transparent bg-accent px-4 py-3 hover:bg-accent-dark dark:hover:bg-accent-dark fill-white"
                  : "group mr-2.5 mb-2.5 inline-flex items-center rounded-xl border border-jacarta-100 bg-white px-4 py-3 hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-accent hover:fill-white dark:fill-white "
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={`mr-2 h-4 w-4  `}
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d={elm.svgPath}></path>
              </svg>
              <span
                className={`text-2xs font-medium ${
                  filterAction == elm.action ? "text-white" : ""
                } `}
              >
                {elm.action}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        role="table"
        className="scrollbar-custom max-h-72 w-full overflow-y-auto rounded-lg rounded-tl-none border border-jacarta-100 bg-white text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
      >
        <div
          className="sticky top-0 flex bg-light-base dark:bg-jacarta-600"
          role="row"
        >
          <div className="w-[17%] py-2 px-4" role="columnheader">
            <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
              Event
            </span>
          </div>
          <div className="w-[17%] py-2 px-4" role="columnheader">
            <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
              Price
            </span>
          </div>
          <div className="w-[22%] py-2 px-4" role="columnheader">
            <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
              From
            </span>
          </div>
          <div className="w-[22%] py-2 px-4" role="columnheader">
            <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
              To
            </span>
          </div>
          <div className="w-[22%] py-2 px-4" role="columnheader">
            <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
              Date
            </span>
          </div>
        </div>
        {filteredItems.map((elm, i) => (
          <div key={i} className="flex" role="row">
            <div
              className="flex w-[17%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-2 h-4 w-4 fill-jacarta-700 group-hover:fill-white dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d={elm.svgPath}></path>
              </svg>
              {elm.action}
            </div>
            <div
              className="flex w-[17%] items-center whitespace-nowrap border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
              <span className="-ml-1" data-tippy-content={elm.currency}>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  y="0"
                  viewBox="0 0 1920 1920"
                  // xml:space="preserve"
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
              <span className="text-sm font-medium tracking-tight text-green">
                {elm.amount}
              </span>
            </div>
            <div
              className="flex w-[22%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
              <Link href={`/user/${elm.id}`} className="text-accent">
                {elm.user}
              </Link>
            </div>
            <div
              className="flex w-[22%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
              <Link href={`/user/${elm.id}`} className="text-accent">
                {elm.token}
              </Link>
            </div>
            <div
              className="flex w-[22%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
              role="cell"
            >
              <a
                href="#"
                className="flex flex-wrap items-center text-accent"
                target="_blank"
                rel="nofollow noopener"
                title="Opens in a new window"
                data-tippy-content="March 13 2022, 2:32 pm"
              >
                <span className="mr-1">{elm.timeAgo}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-4 w-4 fill-current"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
