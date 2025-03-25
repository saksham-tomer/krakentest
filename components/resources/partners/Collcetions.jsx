"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { collections3 } from "@/data/collections";
import Image from "next/image";
import Link from "next/link";

export default function Collcetions() {
  return (
    <div className="relative">
      <Swiper
        slidesPerGroupAuto
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={5}
        breakpoints={{
          420: {
            slidesPerView: 1,
          },
          565: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: ".snbn5",
          prevEl: ".snbp5",
        }}
        className="swiper collections-slider !py-5"
      >
        {collections3.map((elm, i) => (
          <SwiperSlide key={i}>
            <article>
              <div className="rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                <Link
                  href={`/collection/${elm.id}`}
                  className="flex space-x-[0.625rem]"
                >
                  <span className="w-[74.5%]">
                    <Image
                      width={152}
                      height={242}
                      src={elm.images[0]}
                      alt="item 1"
                      className="h-full w-full rounded-[0.625rem] object-cover"
                      loading="lazy"
                    />
                  </span>
                  <span className="flex w-1/3 flex-col space-y-[0.625rem]">
                    {elm.images.slice(1).map((img, i2) => (
                      <Image
                        width={68}
                        height={74}
                        key={i2}
                        src={img}
                        alt="item 1"
                        className="h-full rounded-[0.625rem] object-cover"
                        loading="lazy"
                      />
                    ))}
                  </span>
                </Link>

                <Link
                  href={`/collection/${elm.id}`}
                  className="mt-4 block font-display text-base text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent"
                >
                  {elm.name}
                </Link>

                <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                  <div className="flex flex-wrap items-center">
                    <Link href={`/user/${elm.id}`} className="mr-2 shrink-0">
                      <Image
                        width={20}
                        height={20}
                        src={elm.avatar}
                        alt="owner"
                        className="h-5 w-5 rounded-full"
                      />
                    </Link>
                    <span className="mr-1 dark:text-jacarta-400">by</span>
                    <Link href={`/user/${elm.id}`} className="text-accent">
                      <span>{elm.ownerName}</span>
                    </Link>
                  </div>
                  <span className="text-sm dark:text-jacarta-300">
                    {elm.itemCount} Items
                  </span>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="snbp5 swiper-button-prev swiper-button-prev-2 group absolute top-1/2 -left-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume sm:-left-6">
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
      <div className=" snbn5 swiper-button-next swiper-button-next-2 group absolute top-1/2 -right-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume sm:-right-6">
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
  );
}
