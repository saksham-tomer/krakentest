import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import GameDetails from "@/components/pages/game/GameDetails";

export const metadata = {
  title: "Game Details || Kraken",
};

export default function GameDetailsPage({ params }) {
  return (
    <>
      <Header />
      <main className="mt-24">
        <GameDetails id={params.gameId} />
      </main>
      <Footer />
    </>
  );
}
