import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Banner from "@/components/pages/collection/Banner";
import Collcetions from "@/components/pages/user/Collcetions";

export const metadata = {
  title: "Item Details || Xhibiter | NFT Marketplace Nextjs Template",
};

export default function WorldDetailPage({ params }) {
  return (
    <>
      <Header />
      <main className="mt-24">
        <Banner />
        <Collcetions />
      </main>
      <Footer />
    </>
  );
}
