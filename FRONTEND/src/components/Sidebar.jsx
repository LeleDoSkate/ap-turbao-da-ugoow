// src/components/Sidebar.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../theme/ThemeContext";
import { lightTheme, darkTheme } from "../theme/colors";
import { FaHome, FaUser, FaUsers, FaPlus, FaBars, FaSignOutAlt } from "react-icons/fa"; // Ícones
import "../styles/Sidebar.css"; // Importe o CSS

const Sidebar = () => {
  const { theme, toggleTheme, handleLogout } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation(); // Para verificar a rota atual
  const [usuariosAberto, setUsuariosAberto] = useState(false); // Estado para controlar a expansão das subopções
  const [produtosAberto, setProdutosAberto] = useState(false); // Estado para controlar a expansão das subopções
  const [sidebarAberto, setSidebarAberto] = useState(true); // Estado para controlar a expansão da sidebar

  // Verifica se um link está ativo
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`sidebar-container ${theme === lightTheme ? "light-theme" : "dark-theme"
        }`}
      style={{
        width: sidebarAberto ? "250px" : "80px", // Largura ajustável
        backgroundColor: theme.sidebarBackground,
        color: theme.text,
      }}
    >
      {/* Botão para expandir/retrair a sidebar */}
      <button
        onClick={() => setSidebarAberto(!sidebarAberto)}
        className="sidebar-toggle-button"
      >
        <FaBars size={20} /> {/* Ícone de menu */}
      </button>

      <div className="sidebar-menu">
        <h2 style={{ display: sidebarAberto ? "block" : "none" }}>Menu</h2>
        <ul>
          {/* Home */}
          <li>
            <Link
              to="/dashboard"
              className={`sidebar-link ${isActive("/dashboard") ? "active" : ""}`}
            >
              <FaHome size={20} className="sidebar-icon" />
              {sidebarAberto && "Home"}
            </Link>
          </li>

          {/* Perfil */}
          <li>
            <Link
              to="/perfil"
              className={`sidebar-link ${isActive("/perfil") ? "active" : ""}`}
            >
              <FaUser size={20} className="sidebar-icon" />
              {sidebarAberto && "Perfil"}
            </Link>
          </li>

          {/* Usuários */}
          <li>
            <div
              onClick={() => setUsuariosAberto(!usuariosAberto)}
              className="sidebar-link"
            >
              <FaUsers size={20} className="sidebar-icon" />
              {sidebarAberto && (
                <>
                  <span className="sidebar-text">Usuários</span>
                  <span>{usuariosAberto ? "▼" : "▶"}</span>
                </>
              )}
            </div>
            {usuariosAberto && sidebarAberto && ( // Subopções visíveis apenas se a sidebar estiver aberta
              <ul className="sidebar-submenu">
                <li>
                  <Link
                    to="/usuarios/listar"
                    className={`sidebar-link ${isActive("/usuarios/listar") ? "active" : ""}`}
                  >
                    <FaUsers size={16} className="sidebar-icon" />
                    Listar Usuários
                  </Link>
                </li>
                <li>
                  <Link
                    to="/usuarios/cadastrar"
                    className={`sidebar-link ${isActive("/usuarios/cadastrar") ? "active" : ""}`}
                  >
                    <FaPlus size={16} className="sidebar-icon" />
                    Cadastrar Usuário
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Produtos */}
          <li>
            <div
              onClick={() => setProdutosAberto(!produtosAberto)}
              className="sidebar-link"
            >
              <FaUsers size={20} className="sidebar-icon" />
              {sidebarAberto && (
                <>
                  <span className="sidebar-text">Produtos</span>
                  <span>{produtosAberto ? "▼" : "▶"}</span>
                </>
              )}
            </div>
            {produtosAberto && sidebarAberto && ( // Subopções visíveis apenas se a sidebar estiver aberta
              <ul className="sidebar-submenu">
                <li>
                  <Link
                    to="/produtos/listar"
                    className={`sidebar-link ${isActive("/produtos/listar") ? "active" : ""}`}
                  >
                    <FaUsers size={16} className="sidebar-icon" />
                    Listar Produtos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Produtos/cadastrar"
                    className={`sidebar-link ${isActive("/Produtos/cadastrar") ? "active" : ""}`}
                  >
                    <FaPlus size={16} className="sidebar-icon" />
                    Cadastrar Produtos
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Botão de Alternar Tema */}
      <button
        onClick={toggleTheme}
        className="sidebar-button"
        backgroundColor={theme.buttonBackground}
        style={{
        }}

      >
        {sidebarAberto ? "Alternar Tema" : "🌓"} {/* Ícone ou texto */}
      </button>

      {/* Botão de Sair */}
      <button
        onClick={() => {
          handleLogout();
          navigate("/login");
        }}
        className="sidebar-button logout-button"
      >
        {sidebarAberto ? "Sair" : <FaSignOutAlt size={20} />} {/* Ícone ou texto */}
      </button>
    </div>
  );
};

export default Sidebar;