import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Collcetions from "@/components/pages/user/Collcetions";
import Profile from "@/components/pages/user/Profile";

export const metadata = {
  title: "Profile || Kraken",
};

export default function UserPage() {
  


  return (
    <>
      <Header />
      <main className="pt-[5.5rem] lg:pt-24">
        <Profile/>
        <Collcetions userID={"1"}/>
      </main>
      <Footer />
    </>
  );
}
