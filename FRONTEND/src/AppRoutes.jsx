// src/AppRoutes.jsx
import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Perfil from "./components/Usuario/Perfil";
import EditarUsuario from "./components/Usuario/EditarUsuario";
import ListarUsuarios from "./components/Usuario/ListarUsuarios";
import CadastrarUsuario from "./components/Usuario/CadastrarUsuario";
import EditarProduto from "./components/Produto/EditarProduto";
import ListarProduto from "./components/Produto/ListarProduto";
import CadastrarProduto from "./components/Produto/CadastrarProduto";
import { ThemeContext } from "./theme/ThemeContext";

const AppRoutes = () => {
  const navigate = useNavigate(); // useNavigate deve funcionar agora
  const { theme, isLoggedIn, setIsLoggedIn } = useContext(ThemeContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div style={{ flex: 1, padding: "20px", backgroundColor: theme.background, color: theme.text }}>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/perfil"
          element={isLoggedIn ? <Perfil /> : <Navigate to="/login" />}
        />
        <Route
          path="/usuarios/listar"
          element={isLoggedIn ? <ListarUsuarios /> : <Navigate to="/login" />}
        />
        <Route
          path="/usuarios/cadastrar"
          element={isLoggedIn ? <CadastrarUsuario /> : <Navigate to="/login" />}
        />
        <Route
          path="/usuarios/editar/:id"
          element={isLoggedIn ? <EditarUsuario /> : <Navigate to="/login" />}
        />
        // produtos //
        <Route
          path="/produtos/listar"
          element={isLoggedIn ? <ListarProduto /> : <Navigate to="/login" />}
        />
        <Route
          path="/produtos/cadastrar"
          element={isLoggedIn ? <CadastrarProduto /> : <Navigate to="/login" />}
        />
        <Route
          path="/produtos/editar/:id"
          element={isLoggedIn ? <EditarProduto /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;