"use client";
import { process3 } from "@/data/process";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Process() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter an email address", {
        style: { backgroundColor: "#242957", color: "white" },
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ai-games/news/subscribe/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 201) {
        toast.success(data.message, {
          style: { backgroundColor: "#242957", color: "white" },
        });
        setEmail(""); // Clear email input after successful subscription
      } else {
        toast.error(data.message || "Something went wrong", {
          style: { backgroundColor: "#242957", color: "white" },
        });
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again later.", {
        style: { backgroundColor: "#242957", color: "white" },
      });
    }
  };

  return (
    <section className="relative py-24 dark:bg-jacarta-800">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={789}
          src="/img/gradient_light.jpg"
          priority
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      <div className="container">
        <h2 className="mb-16 text-center font-display text-3xl text-jacarta-700 dark:text-white">
          Create Your Games here.
        </h2>
        <div className="flex flex-col md:flex-row gap-12 justify-center items-center md:items-start">
          {process3.map((elm, i) => (
            <div key={i} className="text-center w-[300px]">
              <div
                className={`mb-6 inline-flex rounded-full bg-[${elm.backgroundColor}] p-3`}
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${elm.bgClass}`}
                >
                  <Image
                    width={24}
                    height={24}
                    src={elm.iconSrc}
                    alt="process"
                  />
                </div>
              </div>
              <h3
                dir="ltr"
                className="mb-4 font-display text-lg text-jacarta-700 dark:text-white h-[50px]"
              >
                {elm.title}
              </h3>
              <p className="dark:text-jacarta-300">{elm.description}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-20 max-w-2xl text-center text-lg text-jacarta-700 dark:text-white">
          Join our mailing list to stay in the loop with our newest feature
          releases, Game drops, and tips and tricks for navigating Kraken
        </p>

        <div className="mx-auto mt-7 max-w-md text-center">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-full border border-jacarta-100 py-3 px-4 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder-white"
            />
            <button
              type="submit"
              className="absolute top-2 right-2 rtl:left-2 rtl:right-auto rounded-full bg-accent px-6 py-2 font-display text-sm text-white hover:bg-accent-dark"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="mx-auto mt-7 max-w-md text-center flex justify-center mt-[80px]">
          <a
            target="_blank"
            href="https://discord.gg/YrHz2Db4Z2"
            className=" flex items-center justify-center bg-[#5865F2] hover:bg-[#4a56d3] rounded-xl px-6 py-2 font-display text-xl text-white shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Join us on<span className="animate-gradient ml-1"> Discord</span>
          </a>
        </div>
      </div>
    </section>
  );
}
