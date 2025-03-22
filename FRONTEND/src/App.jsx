// src/App.jsx
import React, { useContext } from "react";
import { ThemeContext } from "./theme/ThemeContext";
import AppRoutes from "./AppRoutes";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App = () => {
  const { isLoggedIn } = useContext(ThemeContext); // Use o estado de autenticação

  return (
    <div className="app-container">
      {/* Renderize o Sidebar apenas se o usuário estiver autenticado */}
      {isLoggedIn && <Sidebar />}
      <div className="main-content">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;