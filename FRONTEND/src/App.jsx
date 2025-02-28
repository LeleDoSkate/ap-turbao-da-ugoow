import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashbord";
import { isAuthenticated } from "./utils/ajudaAutenticacao";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login"); // Redireciona para o login, caso não esteja autenticado
    }
  }, [navigate]);

  return (
    <Routes>
      {/* Rota de login */}
      <Route path="/login" element={<Login />} />

      {/* Rota protegida */}
      <Route
        path="/dashboard/*"
        element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
      />

      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;