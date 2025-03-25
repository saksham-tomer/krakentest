import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
// import Banner from "@/components/pages/edit-profile/Banner";
import EditProfile from "@/components/pages/edit-profile/EditProfile";

export const metadata = {
  title: "Edit Profile || Kraken | Game Marketplace",
};

export default function EditProfilePage() {
  return (
    <>
      <Header />
      <main className="pt-[5.5rem] lg:pt-24">
        {/* <Banner /> */}
        <EditProfile />
      </main>
      <Footer />
    </>
  );
}
