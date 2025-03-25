import { benefits } from "@/data/resources";
import Image from "next/image";

export default function Benefits() {
  return (
    <section className="relative pt-32 pb-24">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={900}
          src="/img/gradient.jpg"
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      <picture className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
        <Image
          width={1920}
          height={900}
          src="/img/gradient_dark.jpg"
          alt="gradient dark"
          className="h-full w-full"
        />
      </picture>
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="mb-6 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
            Xhibiter Affiliate Partnership
          </h1>
          <p className="mb-16 text-lg leading-normal dark:text-jacarta-200">
            Interested in making money with Xhibiter? Earn A 20% Commission For
            Every Sale You Refer By Recommending The Most Powerful NFT
            marketplace.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {benefits.map((elm, i) => (
            <div
              key={i}
              className="rounded-2.5xl bg-white p-[3.75rem] text-center transition-shadow hover:shadow-xl dark:bg-jacarta-800"
            >
              <div className="mb-6 inline-flex rounded-full bg-[#CDBCFF] p-2.5">
                <div className="inline-flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-[2.25rem] w-[2.25rem] fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d={elm.svgPath} />
                  </svg>
                </div>
              </div>
              <h3 className="mx-auto mb-4 max-w-[9.625rem] font-display text-lg text-jacarta-700 dark:text-white">
                {elm.count} {elm.text}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
