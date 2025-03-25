import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Collections from "@/components/pages/Collections";
import GamesList from "@/components/pages/games/GamesList";

export const metadata = {
  title: "Collcetions || Xhibiter | NFT Marketplace Nextjs Template",
};

export default function CollectionsPage() {
  return (
    <>
      <Header />
      <main>
        <GamesList />
      </main>
      <Footer />
    </>
  );
}
