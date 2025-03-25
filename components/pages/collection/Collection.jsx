import Image from "next/image";
import Charts from "./Charts";
import Items from "./Items";
import Records from "./Records";

export default function Collection() {
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
        {/* Tabs Nav */}
        <ul
          className="nav nav-tabs mb-12 flex items-center justify-center border-b border-jacarta-100 dark:border-jacarta-600"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
              id="items-tab"
              data-bs-toggle="tab"
              data-bs-target="#items"
              type="button"
              role="tab"
              aria-controls="items"
              aria-selected="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M13 21V11h8v10h-8zM3 13V3h8v10H3zm6-2V5H5v6h4zM3 21v-6h8v6H3zm2-2h4v-2H5v2zm10 0h4v-6h-4v6zM13 3h8v6h-8V3zm2 2v2h4V5h-4z" />
              </svg>
              <span className="font-display text-base font-medium">Items</span>
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
              id="activity-tab"
              data-bs-toggle="tab"
              data-bs-target="#activity"
              type="button"
              role="tab"
              aria-controls="activity"
              aria-selected="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M4 5v14h16V5H4zM3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm11.793 6.793L13 8h5v5l-1.793-1.793-3.864 3.864-2.121-2.121-2.829 2.828-1.414-1.414 4.243-4.243 2.121 2.122 2.45-2.45z" />
              </svg>
              <span className="font-display text-base font-medium">
                Activity
              </span>
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {/* Items Tab */}
          <div
            className="tab-pane fade show active"
            id="items"
            role="tabpanel"
            aria-labelledby="items-tab"
          >
            <Items />
          </div>
          {/* end items tab */}

          {/* Activity Tab */}
          <div
            className="tab-pane fade"
            id="activity"
            role="tabpanel"
            aria-labelledby="activity-tab"
          >
            <Charts />

            {/* Records / Filter */}
            <Records />
          </div>
          {/* end activity tab */}
        </div>
      </div>
    </section>
  );
}
