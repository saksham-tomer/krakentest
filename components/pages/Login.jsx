"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

import { signIn } from "next-auth/react";

import { FaGoogle, FaDiscord } from "react-icons/fa";

export default function Login() {
  const handleGoogleSignIn = () => {
    signIn("google");
  };

  const handleDiscordSignIn = () => {
    signIn("discord");
  };

  return (
    <section className="relative h-screen">
      <div className="lg:flex lg:h-full">
        {/* Left */}
        <div className="relative text-center lg:w-1/2">
          <Image
            width={960}
            height={1080}
            src="/img/login.jpg"
            alt="login"
            className="absolute h-full w-full object-cover"
          />
          {/* Logo */}
          <Link href="/" className="relative inline-block py-36">
            <Image
              width={74}
              height={160}
              src="/img/logo.png"
              className="inline-block max-h-[80px]"
              alt="Xhibiter | NFT Marketplace"
            />
          </Link>
        </div>

        {/* Right */}
        <div className="relative flex items-center justify-center p-[10%] lg:w-1/2">
          <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <Image
              width={1920}
              height={789}
              src="/img/gradient_light.jpg"
              alt="gradient"
              className="h-full w-full"
            />
          </picture>

          <div className="w-full max-w-[25.625rem] text-center">
            <h1 className="mb-10   font-display text-4xl text-jacarta-700 dark:text-white">
              Sign in
            </h1>
            <div className="form-container space-y-4">
              <Button
                onClick={handleGoogleSignIn}
                className={`bg-jacarta-900 border-2 border-accent-lighter text-accent-lighter capitalize w-full`}
              >
                <FaGoogle className="text-xl mr-2" />
                Login with Google
              </Button>

              <Button
                onClick={handleDiscordSignIn}
                className={`bg-[#5865F2] border-2 border-[#5865F2] text-white capitalize w-full hover:bg-[#4752C4] hover:border-[#4752C4]`}
              >
                <FaDiscord className="text-xl mr-2" />
                Login with Discord
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
