import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DownloadsPage from "./pages/DownloadsPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import MLConceptsPage from "./pages/MLConceptsPage";
import DoggoBlocksPage from "./pages/DoggoBlocksPage";
import DoggoBlocksPrivacy from "./pages/DoggoBlocksPrivacy";
import DoggoBlocksSupport from "./pages/DoggoBlocksSupport";
import MeretPage from "./pages/MeretPage";
import MeretPrivacy from "./pages/MeretPrivacy";
import MeretSupport from "./pages/MeretSupport";
import SudokistPage from "./pages/SudokistPage";
import SudokistPrivacy from "./pages/SudokistPrivacy";
import SudokistSupport from "./pages/SudokistSupport";
import IHTOTPage from "./pages/IHTOTPage";
import IHTOTPrivacy from "./pages/IHTOTPrivacy";
import IHTOTSupport from "./pages/IHTOTSupport";
import PlantPlannerPage from "./pages/PlantPlannerPage";
import PlantPlannerPrivacy from "./pages/PlantPlannerPrivacy";
import PlantPlannerSupport from "./pages/PlantPlannerSupport";
import PlantPlannerDeleteAccount from "./pages/PlantPlannerDeleteAccount";
import CodePage from "./pages/CodePage";
import NotFoundPage from "./pages/NotFoundPage";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* App pages have their own standalone layout */}
      <Route path="/doggo-blocks" element={<DoggoBlocksPage />} />
      <Route path="/doggo-blocks-privacy" element={<DoggoBlocksPrivacy />} />
      <Route path="/doggo-blocks-support" element={<DoggoBlocksSupport />} />
      <Route path="/meret" element={<MeretPage />} />
      <Route path="/meret-privacy" element={<MeretPrivacy />} />
      <Route path="/meret-support" element={<MeretSupport />} />
      <Route path="/sudokist" element={<SudokistPage />} />
      <Route path="/sudokist-privacy" element={<SudokistPrivacy />} />
      <Route path="/sudokist-support" element={<SudokistSupport />} />
      <Route path="/ihtot" element={<IHTOTPage />} />
      <Route path="/ihtot-privacy" element={<IHTOTPrivacy />} />
      <Route path="/ihtot-support" element={<IHTOTSupport />} />
      <Route path="/plantplanner" element={<PlantPlannerPage />} />
      <Route path="/plantplanner-privacy" element={<PlantPlannerPrivacy />} />
      <Route path="/plantplanner-support" element={<PlantPlannerSupport />} />
      <Route path="/plantplanner-delete-account" element={<PlantPlannerDeleteAccount />} />

      {/* All other pages use the shared Header/Footer layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/code" element={<CodePage />} />
        <Route path="/ml-concepts" element={<MLConceptsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
