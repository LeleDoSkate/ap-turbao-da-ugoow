import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/ajudaAutenticacao";
import { decodificarToken } from '../utils/ajudaAutenticacao';


const Dashboard = () => {
  const navigate = useNavigate();
  const decodedToken = decodificarToken();
  const nomeUsuario = decodedToken ? decodedToken.nome : 'Visitante';
  const nivelAcesso = decodedToken ? decodedToken.nivelAcesso : 'Sem acesso';

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <button
          onClick={handleLogout}
          style={{
            float: "right",
            backgroundColor: "#e74c3c",
            color: "#fff",
            padding: "10px 20px",
          }}
        >
          Sair
        </button>
        <h1>Bem-vindo a Dashboard!</h1>
        <h2>Nome: {nomeUsuario}!</h2>
        <h2>Nível de Acesso: {nivelAcesso}</h2>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;