"use client";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { HiSparkles } from "react-icons/hi2";

const linksData = [
  {
    id: 1,
    href: "#",
    text: "Eclipse Chronicles",
  },
  {
    id: 2,
    href: "#",
    text: "Shadowforge",
  },
  {
    id: 3,
    href: "#",
    text: "Harmony Realms",
  },
];

export default function Hero() {
  return (
    <section className="hero relative py-20 md:pt-32">
      <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={900}
          src="/img/gradient.jpg"
          alt="gradient"
          className="w-full"
        />
      </picture>
      <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden dark:block">
        <Image
          width={1920}
          height={900}
          src="/img/gradient_dark.jpg"
          alt="gradient dark"
          className="w-full"
        />
      </picture>

      <div className="container">
        <div className="mx-auto max-w-2xl pt-24 text-center">
          <h1 className="mb-10 font-display text-5xl text-jacarta-700 dark:text-white lg:text-6xl xl:text-7xl">
            Discover, Create & Play{" "}
            <span className="animate-gradient">Games</span>
          </h1>

          {/* <form onSubmit={(e) => e.preventDefault()} className="relative mb-4">
            <input
              type="search"
              className="w-full rounded-2xl border border-jacarta-100 py-4 px-4 pl-10 text-md text-jacarta-700 placeholder-jacarta-300 focus:ring-accent dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
              placeholder="Search by Name, Game type or Creator"
            />
            <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-4 w-4 fill-jacarta-500 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
              </svg>
            </span>
          </form> */}

          {/* <span className="dark:text-jacarta-300">Popular searches:</span>
          {linksData.map((elm, i) => (
            <span key={i}>
              {" "}
              <a
                href={elm.href}
                className="text-accent hover:text-jacarta-700 dark:hover:text-white"
              >
                {elm.text}
              </a>
              {i + 1 != linksData.length && <span>,</span>}
            </span>
          ))} */}
        </div>
      </div>
      <Link href="/games">
        <Button className=" mt-8 flex items-center gap-3 mx-auto self-center jello-horizontal animate-bounce delay-150">
          <HiSparkles
            className="text-2xl scale-in-center"
            style={{ animationDelay: "0.5s" }}
          />
          Browse all games
        </Button>
      </Link>
    </section>
  );
}
