"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import { collections4 } from "@/data/item";
import Link from "next/link";
import Image from "next/image";
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import Button from "@/components/ui/Button";
import PreviewMedia from "@/components/games/PreviewMedia";

import { useEffect, useRef } from "react";

export default function CoverFlowSlider() {
  const buttonRef = useRef(null);
  const { axiosInstance, loading, error } = useAxiosWithAuth();
  const [games, setGames] = useState([]);

  function formatDate(isoString) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" }); // Full month name
    const day = date.getDate();

    return `${month} ${day}, ${year}`;
  }

  async function fetchGames() {
    try {
      const response = await axiosInstance.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/api/showcased-games/"
      );

      if (response.data?.success?.data) {
        const gamesData = response.data?.success?.data;
        if (gamesData.length > 10) {
          setGames(gamesData);  
        } else {
          const repeatedGames = [];
          while (repeatedGames.length < 10) {
            repeatedGames.push(...gamesData);
          }
          setGames(repeatedGames);
        }
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  }

  useEffect(() => {
    fetchGames();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("jello-horizontal");
          } else {
            entry.target.classList.remove("jello-horizontal");
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is in view
      }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative px-6 pb-16 sm:px-0">
        <Swiper
          breakpoints={{
            100: {
              slidesPerView: 1,
            },
            575: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 5,
            },
            1500: {
              slidesPerView: 6,
            },
          }}
          slidesPerGroupAuto
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCoverflow, Navigation]}
          navigation={{
            nextEl: ".snbn7",
            prevEl: ".snbp7",
          }}
          className="swiper coverflow-slider !py-5"
        >
          {games.map((game, i) => (
            <SwiperSlide key={i}>
              <article className="min-w-[320px] h-full">
                <Link
                  href={`/games/${game.game_id}`}
                  className="animate-gradient--no-text-fill block animate-gradient overflow-hidden rounded-2.5xl !bg-clip-border p-[2px] text-center shadow-md transition-shadow hover:shadow-lg h-full"
                >
                  <div className="rounded-[1.125rem] bg-jacarta-900 p-4 h-full flex flex-col">
                    <Image
                      width={381}
                      height={381}
                      src="/img/nft-game/gradient_glow_small.png"
                      alt="image"
                      className="absolute inset-0"
                    />
                    <figure className="relative rounded-xl mb-8 w-full flex justify-center flex-grow bg-gradient-to-b from-jacarta-600 to-jacarta-700">
                      <PreviewMedia
                        musicUrl={game.opener_mp3}
                        mediaUrl={game.preview_image}
                        mediaType={game.preview_image_type}
                        alt="Game Preview"
                        width={300}
                        height={350}
                        className="w-full h-full object-contain"
                      />
                    </figure>

                    <div className="relative rounded-2lg bg-jacarta-700 p-4">
                      <h3 className="mb-3 text-md font-semibold leading-none text-white h-[48px] line-clamp-2" title={game.game_name}>
                        {game.game_name.length > 40 ? `${game.game_name.substring(0, 40)}...` : game.game_name}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
                        {game.game_tags.map((tag, i) => (
                          <React.Fragment key={i}>
                            {i < 2 && (
                              <div className="flex items-center">
                                <div className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-jacarta-900">
                                  {i % 3 == 0 ? (
                                    <svg
                                      width="16"
                                      height="16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_1739_6537)">
                                        <path
                                          d="M10.666 1.333v1.334H10v2.162c0 .772.167 1.534.49 2.234l2.855 6.184a1 1 0 01-.908 1.42H3.563a1 1 0 01-.909-1.42L5.51 7.063c.323-.7.49-1.462.49-2.234V2.667h-.666V1.333h5.333zm-2 1.334H7.333v2.666h1.333V2.667z"
                                          fill="url(#paint0_linear_1739_6537)"
                                        />
                                      </g>
                                      <defs>
                                        <linearGradient
                                          id="paint0_linear_1739_6537"
                                          x1="8"
                                          y1="14.667"
                                          x2="7.735"
                                          y2="1.641"
                                          gradientUnits="userSpaceOnUse"
                                        >
                                          <stop stopColor="#8054FF" />
                                          <stop
                                            offset="1"
                                            stopColor="#FF68D5"
                                          />
                                        </linearGradient>
                                        <clipPath id="clip0_1739_6537">
                                          <path fill="#fff" d="M0 0h16v16H0z" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  ) : (
                                    <svg
                                      width="16"
                                      height="16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_1739_6544)">
                                        <path
                                          d="M9.334 12V9.338h-7.95a5.333 5.333 0 019.588-4.605A3.667 3.667 0 1111.667 12H9.334zm-5.333 1.333h6.666v1.334H4.001v-1.334zm-2.667-2.666h6.667V12H1.334v-1.333z"
                                          fill="url(#paint0_linear_1739_6544)"
                                        />
                                      </g>
                                      <defs>
                                        <linearGradient
                                          id="paint0_linear_1739_6544"
                                          x1="8.174"
                                          y1="14.667"
                                          x2="7.994"
                                          y2="2.348"
                                          gradientUnits="userSpaceOnUse"
                                        >
                                          <stop stopColor="#C5FFFB" />
                                          <stop
                                            offset="1"
                                            stopColor="#39FFF3"
                                          />
                                        </linearGradient>
                                        <clipPath id="clip0_1739_6544">
                                          <path fill="#fff" d="M0 0h16v16H0z" />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  )}
                                </div>
                                <span className="font-display text-sm font-semibold text-white">
                                  {tag}
                                </span>
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="snbp7 swiper-button-prev swiper-button-prev-4 group absolute top-1/2 left-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="fill-jacarta-700 group-hover:fill-accent"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
          </svg>
        </div>

        <div className="snbn7 swiper-button-next swiper-button-next-4 group absolute top-1/2 right-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="fill-jacarta-700 group-hover:fill-accent"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// <div className="flex items-center">
//   <div className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-jacarta-900">
//     <svg
//       width="16"
//       height="16"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g clipPath="url(#clip0_1739_6537)">
//         <path
//           d="M10.666 1.333v1.334H10v2.162c0 .772.167 1.534.49 2.234l2.855 6.184a1 1 0 01-.908 1.42H3.563a1 1 0 01-.909-1.42L5.51 7.063c.323-.7.49-1.462.49-2.234V2.667h-.666V1.333h5.333zm-2 1.334H7.333v2.666h1.333V2.667z"
//           fill="url(#paint0_linear_1739_6537)"
//         />
//       </g>
//       <defs>
//         <linearGradient
//           id="paint0_linear_1739_6537"
//           x1="8"
//           y1="14.667"
//           x2="7.735"
//           y2="1.641"
//           gradientUnits="userSpaceOnUse"
//         >
//           <stop stopColor="#8054FF" />
//           <stop offset="1" stopColor="#FF68D5" />
//         </linearGradient>
//         <clipPath id="clip0_1739_6537">
//           <path fill="#fff" d="M0 0h16v16H0z" />
//         </clipPath>
//       </defs>
//     </svg>
//   </div>
//   <span className="font-display text-sm font-semibold text-white">
//     One
//   </span>
// </div>
// <div className="flex items-center">
//   <div className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-jacarta-900">
//     <svg
//       width="16"
//       height="16"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g clipPath="url(#clip0_1739_6544)">
//         <path
//           d="M9.334 12V9.338h-7.95a5.333 5.333 0 019.588-4.605A3.667 3.667 0 1111.667 12H9.334zm-5.333 1.333h6.666v1.334H4.001v-1.334zm-2.667-2.666h6.667V12H1.334v-1.333z"
//           fill="url(#paint0_linear_1739_6544)"
//         />
//       </g>
//       <defs>
//         <linearGradient
//           id="paint0_linear_1739_6544"
//           x1="8.174"
//           y1="14.667"
//           x2="7.994"
//           y2="2.348"
//           gradientUnits="userSpaceOnUse"
//         >
//           <stop stopColor="#C5FFFB" />
//           <stop offset="1" stopColor="#39FFF3" />
//         </linearGradient>
//         <clipPath id="clip0_1739_6544">
//           <path fill="#fff" d="M0 0h16v16H0z" />
//         </clipPath>
//       </defs>
//     </svg>
//   </div>
//   <span className="font-display text-sm font-semibold text-white">
//     Two
//   </span>
// </div>
