import HeroSection from "../Components/HeroSection";
import Categories from "../Components/Categories";
import BestSeller from "../Components/BestSeller";
import BottomBanner from "../Components/BottomBanner";
import NewsLetter from "../Components/NewsLetter";
const Home = () => {
  return (
    <div className="flex flex-col h-auto w-full gap-16 px-6 md:px-16 lg:px-24 xl:px-32 py-4">
      <HeroSection />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
