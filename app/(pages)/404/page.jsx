import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import NotFound from "@/components/pages/404";

export const metadata = {
  title: "Not Found || Xhibiter | NFT Marketplace Nextjs Template",
};
export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="pt-[5.5rem] lg:pt-24">
        <NotFound />
      </main>
      <Footer />
    </>
  );
}
