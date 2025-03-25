/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import Socials from "./Socials";
import tippy from "tippy.js";
import Image from "next/image";
import { allCollections } from "@/data/collections";
import Link from "next/link";
export default function Profile({ id }) {
  const [loved, setLoved] = useState();
  const [item, setItem] = useState(allCollections[0]);

  useEffect(() => {
    const filteredItem = allCollections.filter((elm) => elm.id == id)[0];
    if (filteredItem) {
      setItem(filteredItem);
    }
    tippy("[data-tippy-content]");
  }, []);

  return (
    <section className="relative bg-light-base pb-12 pt-28 dark:bg-jacarta-800">
      <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <figure className="relative">
          <Image
            width={138}
            height={138}
            src={
              item.avatar
                ? item.avatar
                : "/img/collections/collection_avatar.jpg"
            }
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
            {item.name ? item.name : "NFT Funny Cat"}
          </h2>
          <div className="mb-8">
            <span className="text-sm font-bold text-jacarta-400">
              Created by{" "}
            </span>
            <Link
              href={`/user/${item.id}`}
              className="text-sm font-bold text-accent"
            >
              051_Hart
            </Link>
          </div>

          <div className="mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border border-jacarta-100 bg-white dark:border-jacarta-600 dark:bg-jacarta-800">
            <a
              href="#"
              className="w-1/2 rounded-l-xl border-r border-jacarta-100 py-4 hover:shadow-md dark:border-jacarta-600 sm:w-32"
            >
              <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                7.2K
              </div>
              <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                Items
              </div>
            </a>
            <a
              href="#"
              className="w-1/2 border-jacarta-100 py-4 hover:shadow-md dark:border-jacarta-600 sm:w-32 sm:border-r"
            >
              <div className="mb-1 text-base font-bold text-jacarta-700 dark:text-white">
                5.3K
              </div>
              <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                Owners
              </div>
            </a>
            <a
              href="#"
              className="w-1/2 border-r border-jacarta-100 py-4 hover:shadow-md dark:border-jacarta-600 sm:w-32"
            >
              <div className="mb-1 flex items-center justify-center text-base font-medium text-jacarta-700 dark:text-white">
                <span className="-mt-px inline-block" data-tippy-content="ETH">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    y="0"
                    viewBox="0 0 1920 1920"
                    // xml:space="preserve"
                    className="h-4 w-4"
                  >
                    <path
                      fill="#8A92B2"
                      d="M959.8 80.7L420.1 976.3 959.8 731z"
                    />
                    <path
                      fill="#62688F"
                      d="M959.8 731L420.1 976.3l539.7 319.1zm539.8 245.3L959.8 80.7V731z"
                    />
                    <path
                      fill="#454A75"
                      d="M959.8 1295.4l539.8-319.1L959.8 731z"
                    />
                    <path
                      fill="#8A92B2"
                      d="M420.1 1078.7l539.7 760.6v-441.7z"
                    />
                    <path fill="#62688F" d="M959.8 1397.6v441.7l540.1-760.6z" />
                  </svg>
                </span>
                <span className="font-bold">2.55</span>
              </div>
              <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                Floor Price
              </div>
            </a>
            <a
              href="#"
              className="w-1/2 rounded-r-xl border-jacarta-100 py-4 hover:shadow-md sm:w-32"
            >
              <div className="mb-1 flex items-center justify-center text-base font-medium text-jacarta-700 dark:text-white">
                <span className="-mt-px inline-block" data-tippy-content="ETH">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    y="0"
                    viewBox="0 0 1920 1920"
                    // xml:space="preserve"
                    className="h-4 w-4"
                  >
                    <path
                      fill="#8A92B2"
                      d="M959.8 80.7L420.1 976.3 959.8 731z"
                    />
                    <path
                      fill="#62688F"
                      d="M959.8 731L420.1 976.3l539.7 319.1zm539.8 245.3L959.8 80.7V731z"
                    />
                    <path
                      fill="#454A75"
                      d="M959.8 1295.4l539.8-319.1L959.8 731z"
                    />
                    <path
                      fill="#8A92B2"
                      d="M420.1 1078.7l539.7 760.6v-441.7z"
                    />
                    <path fill="#62688F" d="M959.8 1397.6v441.7l540.1-760.6z" />
                  </svg>
                </span>
                <span className="font-bold">17.2K</span>
              </div>
              <div className="text-2xs font-medium tracking-tight dark:text-jacarta-400">
                Volume Traded
              </div>
            </a>
          </div>

          <p className="mx-auto max-w-xl text-lg dark:text-jacarta-300">
            Unique, fully 3D and built to unite the design multiverse. Designed
            and styled by Digimental.
          </p>

          <div className="mt-6 flex items-center justify-center space-x-2.5">
            <div className="rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600">
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
            </div>
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
                className="dropdown-menu dropdown-menu-end z-10 hidden min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                aria-labelledby="collectionActions"
              >
                <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                  New bid
                </button>
                <hr className="my-2 mx-4 h-px border-0 bg-jacarta-100 dark:bg-jacarta-600" />
                <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                  Refresh Metadata
                </button>
                <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                  Share
                </button>
                <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                  Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
