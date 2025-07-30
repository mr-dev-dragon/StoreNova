import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/home";
import { FavoritesProvider } from "./servers/context/FavoritesContext";
createRoot(document.getElementById("root")).render(
  <FavoritesProvider>
    <Home />
  </FavoritesProvider>
);
