import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Collections from "@/components/pages/games-collection/Collections";

export const metadata = {
  title:
    "Games | Kraken",
};

export default function CollectionWideSidebarPage() {
  return (
    <>
      <Header/>
      <main className="mt-24">
        <Collections/>
      </main>
      <Footer />
    </>
  );
}
