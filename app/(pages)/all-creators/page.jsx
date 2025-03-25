import CreatorsList from "@/components/common/CreatorsList";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Filter from "@/components/pages/user/Filter";

const AllCreatorsPage = () => {
  return (
    <>
      <Header />
      <main className="container py-32">
        <h2 className="text-center font-display text-3xl text-jacarta-700 dark:text-white mb-8">
          <span
            className="mr-4 inline-block h-6 w-6 animate-heartBeat bg-contain bg-center text-xl"
            style={{
              backgroundImage:
                "url(https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/2764-fe0f.png)",
            }}
          ></span>
          All creators
        </h2>{" "}
        <Filter />
        <CreatorsList />
      </main>
      <Footer />
    </>
  );
};
export default AllCreatorsPage;
