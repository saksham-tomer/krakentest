"use client";

import { statistis4 } from "@/data/statictis";
import Image from "next/image";
import { useState } from "react";
import ModalVideo from "react-modal-video";

export default function Intro() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="pb-24">
      <div className="container">
        <figure className="relative mt-16 overflow-hidden rounded-3xl before:absolute before:inset-0 before:bg-jacarta-900/25 lg:-mt-96">
          <Image
            width={1170}
            height={702}
            src="/img/about/video_cover.jpg"
            className="w-full"
            alt="video"
          />
          <div
            onClick={() => setIsOpen(true)}
            className=" cursor-pointer js-video-modal-trigger absolute top-1/2 left-1/2 flex h-24 w-24 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white transition-transform will-change-transform hover:scale-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="h-rotate h-8 w-8 fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z" />
            </svg>
          </div>
        </figure>

        <div className="pt-24">
          <h2 className="mb-16 text-center font-display text-3xl text-jacarta-700 dark:text-white">
            Numbers Speak
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4">
            {statistis4.map((elm, i) => (
              <div key={i} className="mb-10 text-center">
                <span className="block font-display text-5xl text-jacarta-700 dark:text-white">
                  {elm.value}
                </span>
                <span className="block dark:text-jacarta-300">{elm.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="dQw4w9WgXcQ"
        onClose={() => setIsOpen(false)}
      />
    </section>
  );
}
