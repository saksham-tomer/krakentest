import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import PageTitle from "@/components/pages/wallet/PageTitle";
import Coupons from "@/components/pages/wallet/Coupons";

export const metadata = {
  title: "Wallet || Kraken Games",
};

export default function WalletPage() {
  return (
    <>
      <Header />
      <main className="pt-[5.5rem] lg:pt-24">
        <PageTitle />
        <Coupons />
      </main>
      <Footer />
    </>
  );
}
