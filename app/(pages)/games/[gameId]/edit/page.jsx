
import Edit from "@/components/create/Edit";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "Edit Game || Kraken",
};

export default function EditGamePage({ params }) {
  return (
    <>
      <Header />
      <main>
        <Edit game_id = {params.gameId}/>
      </main>
      <Footer />
    </>
  );
}
