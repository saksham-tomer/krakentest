"use client";

import Image from "next/image";
import { useState } from "react";
import ModalVideo from "react-modal-video";

export default function Intro() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-jacarta-900 font-body text-jacarta-500 mt-40">
      <div className="relative mx-auto max-w-[90rem] ">
        <Image
          width={1413}
          height={760}
          src="/img/FLOATERS_kraken.png"
          // src="/img/nft-game/crypto_icons.png"
          className="pointer-events-none absolute -top-1/4 animate-fly"
          alt="image"
        />
        <div className="container">
          <figure className="relative overflow-hidden rounded-3xl before:absolute before:inset-0 before:bg-jacarta-900/25">
            <Image
              width={1170}
              height={760}
              src="/img/video_thumb.jpg"
              // src="/img/nft-game/nft_game_video_poster.jpg"
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
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z"></path>
              </svg>
            </div>
          </figure>
        </div>
        <ModalVideo
          channel="youtube"
          youtube={{ autoplay: 1 }}
          allowFullScreen
          isOpen={isOpen}
          videoId="wkTbgeN2o9k"
          onClose={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}
