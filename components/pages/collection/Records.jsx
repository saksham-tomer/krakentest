"use client";

import { items } from "@/data/item";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const buttons = [
  {
    id: 1,
    label: "Listing",
    svgPath:
      "M10.9 2.1l9.899 1.415 1.414 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1zm.707 2.122L3.828 12l8.486 8.485 7.778-7.778-1.06-7.425-7.425-1.06zm2.12 6.364a2 2 0 1 1 2.83-2.829 2 2 0 0 1-2.83 2.829z",
  },
  {
    id: 2,
    label: "Bids",
    svgPath:
      "M14 20v2H2v-2h12zM14.586.686l7.778 7.778L20.95 9.88l-1.06-.354L17.413 12l5.657 5.657-1.414 1.414L16 13.414l-2.404 2.404.283 1.132-1.415 1.414-7.778-7.778 1.415-1.414 1.13.282 6.294-6.293-.353-1.06L14.586.686zm.707 3.536l-7.071 7.07 3.535 3.536 7.071-7.07-3.535-3.536z",
  },
  {
    id: 3,
    label: "Transfer",
    svgPath:
      "M16.05 12.05L21 17l-4.95 4.95-1.414-1.414 2.536-2.537L4 18v-2h13.172l-2.536-2.536 1.414-1.414zm-8.1-10l1.414 1.414L6.828 6 20 6v2H6.828l2.536 2.536L7.95 11.95 3 7l4.95-4.95z",
  },
  {
    id: 4,
    label: "Likes",
    svgPath:
      "M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z",
  },
  {
    id: 5,
    label: "Purchases",
    svgPath:
      "M6.5 2h11a1 1 0 0 1 .8.4L21 6v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6l2.7-3.6a1 1 0 0 1 .8-.4zM19 8H5v12h14V8zm-.5-2L17 4H7L5.5 6h13zM9 10v2a3 3 0 0 0 6 0v-2h2v2a5 5 0 0 1-10 0v-2h2z",
  },
];
export default function Records() {
  const [currentCategory, setCurrentCategory] = useState();
  const [filteredItems, setFilteredItems] = useState(items);
  useEffect(() => {
    if (currentCategory) {
      setFilteredItems(items.filter((elm) => elm.status == currentCategory));
    } else {
      setFilteredItems(items);
    }
  }, [currentCategory]);

  return (
    <div className="lg:flex">
      {/* Records */}
      <div className="mb-10 shrink-0 basis-8/12 space-y-5 lg:mb-0 lg:pr-10">
        {filteredItems.map((elm, i) => (
          <Link
            key={i}
            href={`/item/${elm.id}`}
            className="relative flex items-center rounded-2.5xl border border-jacarta-100 bg-white p-8 transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700"
          >
            <figure className="mr-5 self-start">
              <Image
                width={48}
                height={48}
                src={elm.imageSrc}
                alt="avatar 2"
                className="rounded-2lg"
                loading="lazy"
              />
            </figure>

            <div>
              <h3 className="mb-1 font-display text-base font-semibold text-jacarta-700 dark:text-white">
                {elm.name}
              </h3>
              <span className="mb-3 block text-sm text-jacarta-500 dark:text-jacarta-200">
                {elm.details}
              </span>
              <span className="block text-xs text-jacarta-300">{elm.time}</span>
            </div>

            <div className="ml-auto rounded-full border border-jacarta-100 p-3 dark:border-jacarta-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-jacarta-700 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d={elm.svgPath} />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Filters */}
      <aside className="basis-4/12 lg:pl-5">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative mb-12 block"
        >
          <input
            type="search"
            className="w-full rounded-2xl border border-jacarta-100 py-[0.6875rem] px-4 pl-10 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
            placeholder="Search"
          />
          <button
            type="submit"
            className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl"
          >
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
          </button>
        </form>

        <h3 className="mb-4 font-display font-semibold text-jacarta-500 dark:text-white">
          Filters
        </h3>
        <div className="flex flex-wrap">
          <button
            onClick={() => setCurrentCategory()}
            className={`  ${
              !currentCategory
                ? " border-transparent !bg-accent text-white"
                : ""
            }  group mr-2.5 mb-2.5 inline-flex items-center rounded-xl border border-jacarta-100 bg-white px-4 py-3 hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-accent`}
          >
            <span className="text-2xs font-medium">All</span>
          </button>
          {buttons.map((elm, i) => (
            <button
              onClick={() => setCurrentCategory(elm.label)}
              key={i}
              className={` ${
                currentCategory == elm.label
                  ? " border-transparent !bg-accent text-white"
                  : ""
              } group mr-2.5 mb-2.5 inline-flex items-center rounded-xl border border-jacarta-100 bg-white px-4 py-3 hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:border-transparent dark:hover:bg-accent`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={` ${
                  currentCategory == elm.label ? " fill-white" : ""
                } mr-2 h-4 w-4 fill-jacarta-700 group-hover:fill-white dark:fill-white`}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d={elm.svgPath} />
              </svg>
              <span className="text-2xs font-medium">{elm.label}</span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
