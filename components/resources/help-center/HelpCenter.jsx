import { items } from "@/data/help-center";

import Faq from "./Faq";
import Image from "next/image";
import Link from "next/link";

export default function HelpCenter() {
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
        <h2 className="mb-10 text-center font-display text-xl font-medium text-jacarta-700 dark:text-white">
          Or browse categories
        </h2>

        <div className="mb-16 grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3">
          {items.map((elm, i) => (
            <a
              key={i}
              href="#"
              className="rounded-2lg border border-jacarta-100 bg-white p-6 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-700"
            >
              <h3 className="mb-2 font-display text-base font-semibold text-jacarta-700 dark:text-white">
                {elm.title}
              </h3>
              <p className="dark:text-jacarta-300">{elm.description}</p>
            </a>
          ))}
        </div>

        <h2 className="mb-10 text-center font-display text-xl font-medium text-jacarta-700 dark:text-white">
          Frequently asked questions
        </h2>
        <p className="mx-auto mb-10 max-w-md text-center text-lg text-jacarta-300">
          Join our community now to get free updates and also alot of freebies
          are waiting for you or
          <Link href="/contact" className="text-accent">
            Contact Support
          </Link>
        </p>

        <Faq />
      </div>
    </section>
  );
}
