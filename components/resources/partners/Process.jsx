import { process } from "@/data/resources";

export default function Process() {
  return (
    <section className="relative py-24">
      <div className="container">
        <div className="mx-auto mb-20 max-w-xl text-center">
          <h2 className="mb-6 text-center font-display text-3xl font-medium text-jacarta-700 dark:text-white">
            How Our Affiliate Program Works
          </h2>
          <p className="dark:text-jacarta-300">
            While we take pride in being the first and largest marketplace and
            in our robust feature set, we also help our partners succeed with
            the following...
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {process.map((elm, i) => (
            <div
              key={i}
              className="mb-12 rounded-2.5xl border border-jacarta-100 bg-white p-8 pt-0 text-center transition-shadow hover:shadow-xl dark:border-jacarta-600 dark:bg-jacarta-700"
            >
              <div className="mb-9 -mt-8 inline-flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-jacarta-100 bg-white dark:border-jacarta-600 dark:bg-jacarta-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-12 w-12 fill-accent"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d={elm.svgPath} />
                </svg>
              </div>

              <h3 className="mb-4 font-display text-lg text-jacarta-700 dark:text-white">
                {elm.title}
              </h3>
              <p className="dark:text-jacarta-300">{elm.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
