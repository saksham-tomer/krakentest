import Socials from "./Socials";
import MarketplaceLinks from "./MarketplaceLinks";
import CompanyLinks from "./CompanyLinks";
import MyAccountKink from "./MyAccountLink";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="page-footer bg-white dark:bg-jacarta-900">
      <div className="container">
        <div className="grid grid-cols-6 gap-x-7 gap-y-14 pt-24 pb-12 md:grid-cols-12">
          <div className="col-span-full sm:col-span-3 md:col-span-4">
            <Link href="/" className="mb-6 inline-block">
              <Image
                width={80}
                height={56}
                src="/img/logo.png"
                className="max-h-[80px] dark:hidden"
                alt="Kraken | Game Marketplace"
              />
              <Image
                width={80}
                height={56}
                src="/img/logo.png"
                className="hidden max-h-[80px] dark:block"
                alt="Kraken | Game Marketplace"
              />
            </Link>
            <p className="mb-12 dark:text-jacarta-300">
              Create, and monetize Ai Generative Games that are truly adaptive and immersive. As a writer, you can connect your creative universe and expand it ad infinitum! Gamers get a story that is truly theirs in a game world that is truly unique
            </p>

            <div className="flex space-x-5">
              <Socials />
            </div>
          </div>

          <div className="col-span-full sm:col-span-3 md:col-span-2 md:col-start-7">
            <h3 className="mb-6 font-display text text-jacarta-700 dark:text-white">
              Marketplace
            </h3>
            <ul className="flex flex-col space-y-1 dark:text-jacarta-300">
              <MarketplaceLinks />
            </ul>
          </div>

          <div className="col-span-full sm:col-span-3 md:col-span-2">
            <h3 className="mb-6 font-display text text-jacarta-700 dark:text-white">
              About Kraken
            </h3>
            <ul className="flex flex-col space-y-1 dark:text-jacarta-300">
              <CompanyLinks />
            </ul>
          </div>

          <div className="col-span-full sm:col-span-3 md:col-span-2">
            <h3 className="mb-6 font-display text text-jacarta-700 dark:text-white">
              My Account
            </h3>
            <ul className="flex flex-col space-y-1 dark:text-jacarta-300">
              <MyAccountKink />
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between space-y-2 py-8 sm:flex-row sm:space-y-0">
          <span className="text-sm dark:text-jacarta-400">
            &copy; {new Date().getFullYear()} Kraken

          </span>
          <ul className="flex flex-wrap space-x-4 text-sm dark:text-jacarta-400">
            <li>
              {/* <a href="#" className="hover:text-accent">
                Terms and conditions
              </a> */}
              <Link href="/termsConditions" className="hover:text-accent">Terms and conditions</Link>
            </li>
            <li>
              <a href="/privacyPolicy" className="hover:text-accent">
                Privacy policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
