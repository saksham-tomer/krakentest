"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function Banner({image, setImage, setImageFile}) {
  // const [image, setImage] = useState("/img/user/banner.jpg");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="relative">
      <Image
        width={1920}
        height={300}
        src={image??"/img/user/banner.jpg"}
        alt="banner"
        className="h-[18.75rem] object-cover w-[100%] "
      />
      <div className="container relative -translate-y-4">
        <div className="group absolute right-0 bottom-4 flex items-center rounded-lg bg-white py-2 px-4 font-display text-sm hover:bg-accent">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={handleImageChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="mr-1 h-4 w-4 fill-jacarta-400 group-hover:fill-white"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"></path>
          </svg>
          <span className="mt-0.5 block group-hover:text-white">
            Edit cover photo
          </span>
        </div>
      </div>
    </div>
  );
}
