import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ThemeModal from "./components/ThemeModal";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Customizer from "./pages/Customizer";
import Planner from "./pages/Planner";
import StyleQuiz from "./pages/StyleQuiz";
import Budget from "./pages/Budget";
import ColorLab from "./pages/ColorLab";
import Challenge from "./pages/Challenge";
import Marketplace from "./pages/Marketplace";
import Gallery from "./pages/Gallery";
import SavedDesigns from "./pages/SavedDesigns";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}


export default function App() {

  const [theme, setTheme] = useState(
    localStorage.getItem("livingCanvasTheme") || "sand"
  );

  const [themeOpen, setThemeOpen] = useState(false);


  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("livingCanvasTheme", theme);
  }, [theme]);


  return (
    <>
      <ScrollToTop />

      <Navbar
        onThemeClick={() => setThemeOpen(true)}
      />

      <ThemeModal
        open={themeOpen}
        onClose={() => setThemeOpen(false)}
        onThemeChange={setTheme}
      />

      <main>
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/gallery"
            element={<Gallery />}
          />

          <Route
            path="/customizer"
            element={<Customizer />}
          />

          <Route
            path="/planner"
            element={<Planner />}
          />

          <Route
            path="/style"
            element={<StyleQuiz />}
          />

          <Route
            path="/budget"
            element={<Budget />}
          />

          <Route
            path="/color-lab"
            element={<ColorLab />}
          />

          <Route
            path="/challenge"
            element={<Challenge />}
          />

          <Route
            path="/marketplace"
            element={<Marketplace />}
          />


 <Route
  path="/saved-designs"
  element={<SavedDesigns />}
/>

          <Route
            path="*"
            element={<Home />}
          />

        </Routes>
        

      </main>

      <Footer />
    </>
  );
}
