/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Link from "next/link";
import Address from "./Address";

export default function Contact() {
  return (
    <section className="relative py-24 dark:bg-jacarta-800">
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
        <div className="lg:flex">
          <div className="mb-12 lg:mb-0 lg:w-2/3 lg:pr-12">
            <h2 className="mb-4 font-display text-xl text-jacarta-700 dark:text-white">
              Contact Us
            </h2>
            <p className="mb-16 text-lg leading-normal dark:text-jacarta-300">
              Have a question? Need help? Don't hesitate, drop us a line
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex space-x-7">
                <div className="mb-6 w-1/2">
                  <label
                    htmlFor="name"
                    className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white"
                  >
                    Name<span className="text-red">*</span>
                  </label>
                  <input
                    name="name"
                    className="contact-form-input w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                    id="name"
                    type="text"
                    required
                  />
                </div>

                <div className="mb-6 w-1/2">
                  <label
                    htmlFor="email"
                    className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white"
                  >
                    Email<span className="text-red">*</span>
                  </label>
                  <input
                    name="email"
                    className="contact-form-input w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                    id="email"
                    type="email"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white"
                >
                  Message<span className="text-red">*</span>
                </label>
                <textarea
                  id="message"
                  className="contact-form-input w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                  required
                  name="message"
                  rows="5"
                ></textarea>
              </div>

              <div className="mb-6 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="contact-form-consent-input"
                  name="agree-to-terms"
                  className="h-5 w-5 self-start rounded border-jacarta-200 text-accent checked:bg-accent focus:ring-accent/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
                />
                <label
                  htmlFor="contact-form-consent-input"
                  className="text-sm dark:text-jacarta-200"
                >
                  I agree to the{" "}
                  <Link href="/tos" className="text-accent">
                    Terms of Service
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                id="contact-form-submit"
              >
                Submit
              </button>

              <div
                id="contact-form-notice"
                className="relative mt-4 hidden rounded-lg border border-transparent p-4"
              ></div>
            </form>
          </div>

          <div className="lg:w-1/3 lg:pl-5">
            <h2 className="mb-4 font-display text-xl text-jacarta-700 dark:text-white">
              Information
            </h2>
            <p className="mb-6 text-lg leading-normal dark:text-jacarta-300">
              Don't hesitaste, drop us a line Collaboratively administrate
              channels whereas virtual. Objectively seize scalable metrics
              whereas proactive e-services.
            </p>

            <Address />
          </div>
        </div>
      </div>
    </section>
  );
}
