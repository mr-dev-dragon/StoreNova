import { createRoot } from "react-dom/client";
import "./styles/index.css";
import Home from "./views/home";
import { FavoritesProvider } from "./context/FavoritesContext";
createRoot(document.getElementById("root")).render(
  <FavoritesProvider>
    <Home />
  </FavoritesProvider>
);
