import { api } from "./api";

export const login = async (email, senha) => {
  const response = await api.post("/api/usuario/login", { email, senha });
  return response.data;
};