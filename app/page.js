import CreatorsList from "@/components/common/CreatorsList";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import CoverFlowSlider from "@/components/home/CoverFlowSlider";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Process from "@/components/home/Process";
import Link from "next/link";

export const metadata = {
  title: "Kraken Games",
};
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CoverFlowSlider />
        <Intro />

        {/* <section className="container flex flex-col py-24">
          <div className="flex items-center justify-between mb-8 ">
            <h2 className="text-center font-display text-3xl text-jacarta-700 dark:text-white">
              <span
                className="mr-4 inline-block h-6 w-6 animate-heartBeat bg-contain bg-center text-xl"
                style={{
                  backgroundImage:
                    "url(https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/2764-fe0f.png)",
                }}
              ></span>
              Top creators
            </h2>{" "}
            <Link
              href="/all-creators"
              className="self-center inline-block rounded-md bg-accent-dark py-3 px-8 text-center font-semibold text-white  transition-all hover:bg-accent-dark"
            >
              Show All
            </Link>
          </div>
          <CreatorsList />
        </section> */}
        <Process />
      </main>
      <Footer />
    </>
  );
}
