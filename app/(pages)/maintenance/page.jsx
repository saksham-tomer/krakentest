import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Hero from "@/components/pages/maintenance/Hero";

export const metadata = {
  title: "Maintenance || Xhibiter | NFT Marketplace Nextjs Template",
};

export default function MaintenancePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
