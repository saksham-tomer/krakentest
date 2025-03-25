/* eslint-disable react/no-unescaped-entities */
import { result } from "@/data/caseStudies";

export default function Result() {
  return (
    <section className="pt-32 pb-28 dark:bg-jacarta-900">
      <div className="container">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2 lg:pr-16">
            <h2 className="mb-6 font-display text-3xl text-jacarta-700 dark:text-white">
              Results
            </h2>
            <p className="mb-8 dark:text-jacarta-300">
              As you may already know, there are an infinite number of things
              you can test on your site to help you increase sales. SEO was
              about achieving significant uplifts in rankings, traffic, and
              revenue. They were ambitious in becoming the market leader online
              for advertising agencies.
            </p>
            <p className="mb-8 dark:text-jacarta-300">
              As you may already know, there are an infinite number of things
              you can test on your site to help you increase sales. From layout
              to copy to design, there are limitless combinations of changes
              that may improve your visitor-to-sale conversion rate. But what's
              "enough" when you're just starting out? What elements should you
              focus on testing before rolling out your traffic campaign?
            </p>
          </div>
          <div className="lg:w-[45%]">
            <div className="md:flex md:space-x-6 xl:space-x-12">
              <div className="md:w-1/2">
                {result.slice(0, 2).map((elm, i) => (
                  <div
                    key={i}
                    className="mb-6 rounded-2.5xl border border-jacarta-100 p-12 dark:border-jacarta-600 dark:bg-jacarta-700 xl:mb-12"
                  >
                    <span className="font-display text-4xl font-semibold text-green md:text-6xl">
                      {elm.percentage}
                    </span>
                    <p className="text-md text-jacarta-700 dark:text-white">
                      {elm.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 md:w-1/2">
                {result.slice(2, 4).map((elm, i) => (
                  <div
                    key={i}
                    className="mb-6 rounded-2.5xl border border-jacarta-100 p-12 dark:border-jacarta-600 dark:bg-jacarta-700 xl:mb-12"
                  >
                    <span className="font-display text-4xl font-semibold text-green md:text-6xl">
                      {elm.percentage}
                    </span>
                    <p className="text-md text-jacarta-700 dark:text-white">
                      {elm.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
