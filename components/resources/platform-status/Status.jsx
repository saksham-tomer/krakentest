"use client";
import { incidentsData, servicesData } from "@/data/resources";
import Image from "next/image";
import { useEffect } from "react";
import tippy from "tippy.js";

export default function Status() {
  useEffect(() => {
    tippy("[data-tippy-content]");
  }, []);
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
        <div className="mx-auto max-w-[53.125rem]">
          <div className="mb-16 rounded-lg bg-green p-4 font-display text-md font-medium text-white">
            <span>All Systems Operational</span>
          </div>

          <div className="mb-14 divide-y divide-jacarta-100 overflow-hidden rounded-lg border border-jacarta-100 bg-white dark:divide-jacarta-600 dark:border-jacarta-600 dark:bg-jacarta-700">
            {servicesData.map((elm, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 px-5"
              >
                <span className="font-medium text-jacarta-700 dark:text-white">
                  {elm.name}
                  {elm.tooltip && (
                    <span
                      className="inline-block ml-1"
                      data-tippy-content={elm.tooltip}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-300"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z" />
                      </svg>
                    </span>
                  )}
                </span>
                <span
                  className={
                    elm.status === "Operational"
                      ? "text-green"
                      : "text-orange-bright"
                  }
                >
                  {elm.status}
                </span>
              </div>
            ))}
          </div>

          <h2 className="mb-6 font-display text-xl text-jacarta-700 dark:text-white">
            Past Incidents
          </h2>

          {incidentsData.map((elm, i) => (
            <div className="mb-8" key={i}>
              <div className="mb-4 border-b border-jacarta-100 pb-4 text-lg font-medium text-jacarta-700 dark:border-jacarta-600 dark:text-white">
                {elm.date}
              </div>
              {elm.incident ? (
                <p className="mb-4 font-medium text-orange-bright">
                  {elm.incident}
                </p>
              ) : (
                <p className="dark:text-jacarta-300">
                  No incidents reported today.
                </p>
              )}

              {elm.resolutions &&
                elm.resolutions.map((resolution, index) => (
                  <div className="mb-6" key={index}>
                    <p className="dark:text-jacarta-300">
                      <strong className="text-jacarta-700 dark:text-white">
                        {resolution.status}
                      </strong>{" "}
                      - {resolution.description}
                    </p>
                    <time className="text-sm dark:text-jacarta-300">
                      {resolution.time}
                    </time>
                  </div>
                ))}
            </div>
          ))}

          <div className="mt-12 flex items-center justify-between border-t border-jacarta-100 pt-4 text-2xs dark:border-jacarta-600">
            <a href="#" className="flex items-center space-x-1 text-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-rotate h-4 w-4 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" />
              </svg>
              <span>Incident History</span>
            </a>
            <a
              href="https://themeforest.net/user/ib-themes/portfolio"
              className="hover:text-blue dark:text-jacarta-300"
            >
              Powered by ib-themes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
