import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Banner from "@/components/pages/collection/Banner";
import Collection from "@/components/pages/collection/Collection";
import Profile from "@/components/pages/collection/Profile";

export const metadata = {
  title: "Collection Details || Xhibiter | NFT Marketplace Nextjs Template",
};

export default function ClooectionSinglePage({ params }) {
  return (
    <>
      <Header />
      <main className="pt-[5.5rem] lg:pt-24">
        <Banner />
        <Profile id={params.id} />
        <Collection />
      </main>
      <Footer />
    </>
  );
}
