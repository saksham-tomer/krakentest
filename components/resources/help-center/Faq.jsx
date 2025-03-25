import { faqs2 } from "@/data/faq";

export default function Faq() {
  return (
    <div className="accordion mx-auto max-w-[35rem]" id="accordionFAQ">
      {faqs2.map((elm, i) => (
        <div
          key={i}
          className="accordion-item mb-5 overflow-hidden rounded-lg border border-jacarta-100 dark:border-jacarta-600"
        >
          <h2 className="accordion-header" id={`faq-heading-${elm.id}`}>
            <button
              className={`accordion-button  relative flex w-full items-center justify-between bg-white px-4 py-3 text-left font-display text-jacarta-700 dark:bg-jacarta-700 dark:text-white ${
                i == 0 ? "" : "collapsed"
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#faq-${elm.id}`}
              aria-expanded={true}
              aria-controls={`faq-${elm.id}`}
            >
              <span>{elm.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="accordion-arrow h-4 w-4 shrink-0 fill-jacarta-700 transition-transform dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
              </svg>
            </button>
          </h2>
          <div
            id={`faq-${elm.id}`}
            className={`accordion-collapse collapse ${
              i == 0 ? "show" : ""
            } visible`}
            aria-labelledby={`faq-heading-${elm.id}`}
            data-bs-parent="#accordionFAQ"
          >
            <div className="accordion-body border-t border-jacarta-100 bg-white p-4 dark:border-jacarta-600 dark:bg-jacarta-700">
              <p className="dark:text-jacarta-200">{elm.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
