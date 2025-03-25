"use client";

export default function PageTitle() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-20 after:absolute after:inset-0 after:bg-jacarta-900/60"
      style={{
        backgroundImage: "url(/img/page-title/knowledge_base_banner.jpg)",
      }}
    >
      <div className="container relative z-10">
        <h1 className="mb-4 text-center font-display text-4xl font-medium text-white">
          How can I help you?
        </h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative mx-auto block max-w-md"
        >
          <input
            type="search"
            className="w-full rounded-2xl border border-jacarta-100 py-[0.6875rem] px-4 pl-10 text-jacarta-700 placeholder-jacarta-500 focus:ring-accent"
            placeholder="Search"
          />
          <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="h-4 w-4 fill-jacarta-500"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path>
            </svg>
          </span>
        </form>
      </div>
    </section>
  );
}
