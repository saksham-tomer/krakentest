import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import ItemDetails from "@/components/pages/item/ItemDetails";

export const metadata = {
  title: "Item Details || Xhibiter | NFT Marketplace Nextjs Template",
};

export default function CharacterDetailPage({ params }) {
  return (
    <>
      <Header />
      <main className="mt-24">
        <ItemDetails id={params.id} />
      </main>
      <Footer />
    </>
  );
}
