import { caseStudies } from "@/data/caseStudies";
import Image from "next/image";
import Link from "next/link";

export default function CaseStudies() {
  return (
    <>
      <section className="relative py-32">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image
            width={1920}
            height={900}
            src="/img/gradient.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <picture className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
          <Image
            width={1920}
            height={900}
            src="/img/gradient_dark.jpg"
            alt="gradient dark"
            className="h-full w-full"
          />
        </picture>
        <div className="container relative z-10">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="mb-6 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              Case Studies
            </h1>
            <p className="text-lg leading-normal dark:text-jacarta-200">
              Be part of our young and innovative team, and we build trust,
              embrace feedback, grow rapidly, and love our work.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2">
            {caseStudies.map((elm, i) => (
              <article key={i}>
                <Link href={`/single-case-study/${elm.id}`}>
                  <figure className="mb-10 overflow-hidden rounded-2.5xl transition-shadow hover:shadow-xl">
                    <Image
                      width={561}
                      height={498}
                      src={elm.imgSrc}
                      alt="image"
                    />
                  </figure>
                </Link>
                <h2 className="group mb-2 max-w-md font-display text-lg text-jacarta-700 dark:text-white">
                  <Link
                    href={`/single-case-study/${elm.id}`}
                    className="group-hover:text-accent"
                  >
                    {elm.title}
                  </Link>
                </h2>
                <Link
                  href={`/single-case-study/${elm.id}`}
                  className="text-sm font-bold text-accent"
                >
                  View Case Study
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/collections"
              className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
            >
              Load More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
