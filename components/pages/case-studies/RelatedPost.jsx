import { caseStudies } from "@/data/caseStudies";
import Image from "next/image";
import Link from "next/link";

export default function RelatedPost() {
  return (
    <section className="relative py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-sm text-center">
          <h2 className="mb-6 text-center font-display text-3xl font-medium text-jacarta-700 dark:text-white">
            Related Case Studies
          </h2>
        </div>
        <div className="grid gap-12 md:grid-cols-2">
          {caseStudies.slice(2, 4).map((elm, i) => (
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
      </div>
    </section>
  );
}
