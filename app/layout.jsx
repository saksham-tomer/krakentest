"use client";

import WalletModal from "@/components/modals/WalletModal";
import "../public/styles/style.css";
import "swiper/css";
// import "swiper/css/pagination";
import "tippy.js/dist/tippy.css";
import "react-modal-video/css/modal-video.css";
import BuyModal from "@/components/modals/BuyModal";
import BidModal from "@/components/modals/BidModal";
import PropertiesModal from "@/components/modals/PropertiesModal";
import LevelsModal from "@/components/modals/LevelsModal";
import ModeChanger from "@/components/common/ModeChanger";
import LoginModal from "@/components/modals/LoginModal";
import LoginModalForCreating from "@/components/modals/LoginModalForCreating";
import ToastNotification from "@/components/ToastNotification";
import BuyPointsModal from "@/components/modals/BuyPointsModal";
import Script from 'next/script'

if (typeof window !== "undefined") {
  // Import the script only on the client side
  import("bootstrap/dist/js/bootstrap.esm").then((module) => {
    // Module is imported, you can access any exported functionality if
  });
}

import { UserProvider } from '@/contexts/UserContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></Script>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}

      </Script>
      </head>
      <body
        itemScope
        itemType="http://schema.org/WebPage"
        className={
          "overflow-x-hidden font-body text-jacarta-500 dark:bg-jacarta-900"
        }
      >
        <UserProvider>
          <ModeChanger />
          {children}
          <WalletModal />
          <BuyModal />
          <BidModal />
          <PropertiesModal />
          <LevelsModal />
          <LoginModal />
          <LoginModalForCreating />
          <ToastNotification />
          <BuyPointsModal />
        </UserProvider>
      </body>
    </html>
  );
}
