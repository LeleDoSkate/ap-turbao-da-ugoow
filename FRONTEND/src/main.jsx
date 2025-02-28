import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Importa o Router
import App from "./App"; // Importa o App

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Router> {/* Envolvendo App com Router */}
      <App />
    </Router>
  </StrictMode>
);