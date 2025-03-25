
import TermsConditions from "@/components/pages/terms/TermsConditions";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "Create Game || Kraken",
};

export default function TermsAndConditions() {
  return (
    <>
      <Header />
      <main>
        <TermsConditions />
      </main>
      <Footer />
    </>
  );
}
