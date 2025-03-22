// src/theme/ThemeContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { lightTheme, darkTheme } from "./colors";
import { isAuthenticated, removeToken } from "../utils/ajudaAutenticacao";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated()); // Estado de autenticação

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Função para fazer logout
  const handleLogout = () => {
    removeToken(); // Remove o token
    setIsLoggedIn(false); // Atualiza o estado de autenticação
  };

  // Verifica a autenticação ao carregar a página
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    // Aplica as variáveis de tema ao body
    document.body.style.setProperty("--background", theme.background);
    document.body.style.setProperty("--text", theme.text);
    document.body.style.setProperty("--sidebar-background", theme.sidebarBackground);
    document.body.style.setProperty("--button-background", theme.buttonBackground);
    document.body.style.setProperty("--button-text", theme.buttonText);

    // Variáveis da tabela
    document.body.style.setProperty("--table-header-bg", theme.tableHeaderBg);
    document.body.style.setProperty("--table-header-text", theme.tableHeaderText);
    document.body.style.setProperty("--table-row-bg-odd", theme.tableRowBgOdd);
    document.body.style.setProperty("--table-row-bg-even", theme.tableRowBgEven);
    document.body.style.setProperty("--table-row-hover-bg", theme.tableRowHoverBg);
    document.body.style.setProperty("--table-border-color", theme.tableBorderColor);
    document.body.style.setProperty("--button-edit-bg", theme.buttonEditBg);
    document.body.style.setProperty("--button-edit-hover-bg", theme.buttonEditHoverBg);
    document.body.style.setProperty("--button-delete-bg", theme.buttonDeleteBg);
    document.body.style.setProperty("--button-delete-hover-bg", theme.buttonDeleteHoverBg);

    // Define o atributo data-theme para o body (opcional, se estiver usando CSS baseado em atributos)
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [theme, isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLoggedIn, setIsLoggedIn, handleLogout }}>
      {children}
    </ThemeContext.Provider>
  );
};