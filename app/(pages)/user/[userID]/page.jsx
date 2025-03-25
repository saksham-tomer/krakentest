import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Banner from "@/components/pages/user/Banner";
import Collcetions from "@/components/pages/user/Collcetions";
import Profile from "@/components/pages/user/Profile";

export const metadata = {
  title: "User || Xhibiter | NFT Marketplace Nextjs Template",
};

export default function UserPage() {
  return (
    <>
      <Header />
      <main className="pt-[5.5rem] lg:pt-24">
        <Banner />
        <Profile />
        <Collcetions />
      </main>
      <Footer />
    </>
  );
}
