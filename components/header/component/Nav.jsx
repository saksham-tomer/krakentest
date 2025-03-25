"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useUserCookie from "@/hooks/useUserCookie";
import { logout } from "@/utlis/logoutUser";
import { useUser } from '@/contexts/UserContext';

export default function Nav() {
  const pathname = usePathname();
  const user = useUserCookie();
  const { profile } = useUser();


  const listItemStyling =
    "flex items-center justify-between py-3.5 font-display text-base text-jacarta-800 dark:text-white hover:text-accent focus:text-accent  dark:hover:text-accent dark:focus:text-accent lg:px-3 xl:px-4";

  return (
    <>
      <div className="lg:hidden js-nav-dropdown group relative mx-5 mb-6 rounded-lg border border-jacarta-100 p-4 dark:border-jacarta-600">
        <span className="text-sm font-medium tracking-tight dark:text-jacarta-200">
          {profile?.subscription ? 'Subscription' : 'Balance'}
        </span>
        {profile?.subscription ? (
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="-ml-1 mr-1 h-[1.125rem] w-[1.125rem]">
              <path fill="#FFD700" d="M12 2L8.5 8.5 2 9.27l5 4.87L5.5 21 12 17.77 18.5 21 17 14.14l5-4.87L15.5 8.5z"/>
            </svg>
            <span className="text-lg font-bold text-yellow-500">{profile?.subscription.plan_type}</span>
          </div>
        ) : (
          <div className="flex items-center">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              y="0"
              viewBox="0 0 1920 1920"
              className="-ml-1 mr-1 h-[1.125rem] w-[1.125rem]"
            >
              <path fill="#8A92B2" d="M959.8 80.7L420.1 976.3 959.8 731z"></path>
              <path fill="#62688F" d="M959.8 731L420.1 976.3l539.7 319.1zm539.8 245.3L959.8 80.7V731z"></path>
              <path fill="#454A75" d="M959.8 1295.4l539.8-319.1L959.8 731z"></path>
              <path fill="#8A92B2" d="M420.1 1078.7l539.7 760.6v-441.7z"></path>
              <path fill="#62688F" d="M959.8 1397.6v441.7l540.1-760.6z"></path>
            </svg>
            <span className="text-lg font-bold text-green">{profile?.game_points} GP</span>
          </div>
        )}
      </div>
      <li className="js-nav-dropdown group relative">
        <Link href="/" className={listItemStyling}>
          Home
        </Link>
      </li>
      <li className="js-nav-dropdown group relative">
        <Link href="/games" className={listItemStyling}>
          Games
        </Link>
      </li>

     
      <li className="js-nav-dropdown group sm:hidden block">
        <Link 
          href="/create"
          data-bs-toggle={!user ? "modal" : undefined}
          data-bs-target={!user ? "#loginModalForCreating" : undefined} 
          className={listItemStyling}
        >
          Create Game
        </Link>
      </li>

      {user &&(<li className="js-nav-dropdown group relative">
        <Link href="/stories" className={listItemStyling}>
          My Playthroughs
        </Link>
      </li>)}
      {user &&(<li className="lg:hidden js-nav-dropdown group relative">
        <Link href="/wallet" className={listItemStyling}>
          Coupons
        </Link>
      </li>)}
      {/* <li className="js-nav-dropdown group relative">
        <Link href="/all-creators" className={listItemStyling}>
          Creators
        </Link>
      </li> */}
      <li className="js-nav-dropdown group relative">
        <a
          target="_blank"
          href="https://discord.gg/YrHz2Db4Z2"
          className={listItemStyling}
        >
          Community
        </a>
      </li>
      {user &&(<li className="js-nav-dropdown group relative">
        <button
          className={`${listItemStyling} font-semibold text-white`}
          data-bs-toggle="modal"
          data-bs-target="#buyPointsModal"
        >
          Get Points
        </button>
      </li>
    )}

      {user &&(
         <li className="lg:hidden js-nav-dropdown group relative">
         <Link href="/login" onClick={logout} className={listItemStyling}>
           Logout
         </Link>
       </li>

      )}
     
    </>
  );
}
