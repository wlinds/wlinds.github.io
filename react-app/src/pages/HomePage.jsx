import useFetchJSON from "../hooks/useFetchJSON";
import Hero from "../components/Hero";
import CodingSection from "../components/CodingSection";
import SideCards from "../components/SideCards";
import FeaturedWebsites from "../components/FeaturedWebsites";
import EthicsSection from "../components/EthicsSection";
import StackSection from "../components/StackSection";
import ExperienceSection from "../components/ExperienceSection";
import MusicSection from "../components/MusicSection";
import "./HomePage.css";

export default function HomePage() {
  const { data: content, loading } = useFetchJSON("/data/site-content.json");

  if (loading || !content) return null;

  return (
    <>
      <main className="main-content">
        <section className="left-main-content">
          <Hero hero={content.hero} />
          <CodingSection coding={content.my_coding} />
        </section>
        <aside className="side-content">
          <SideCards />
        </aside>
      </main>

      <FeaturedWebsites />
      <EthicsSection ethics={content.my_ethics} />
      <StackSection stack={content.my_stack} />
      <ExperienceSection experience={content.professional_experience} />
      <MusicSection music={content.my_music} />
    </>
  );
}
