import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroSection from "./Components/HeroSection/HeroSection";
import RecipeDetails from "./Components/RecipeDetails/RecipeDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
