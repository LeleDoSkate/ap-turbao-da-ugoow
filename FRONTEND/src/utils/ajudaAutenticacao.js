import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      removeToken(); // Remove o token se expirado
      return false;
    }
    return true; // Retorna verdadeiro se o token não expirou
  }
  return false; // Retorna falso se não houver token
};


export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const decodificarToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      // Verifica se o token expirou
      if (decoded.exp * 1000 < Date.now()) {
        console.error("Token expirado");
        return null;
      }
      return decoded; // Retorna o token decodificado
    } catch (error) {
      console.error("Erro ao decodificar o token", error);
      return null;
    }
  }
  return null;
};