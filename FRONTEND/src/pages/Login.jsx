import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { saveToken } from "../utils/ajudaAutenticacao";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(email, senha);
      saveToken(token); // Salva o token no LocalStorage
      navigate("/dashboard", { replace: true }); // Redireciona ao dashboard
    } catch (error) {
      setErro(error.response ? error.response.data.mensagem : "Erro desconhecido");
    }
  };
  

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleLogin} style={{ textAlign: "center" }}>
        <h2>Login</h2>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", padding: "10px" }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#3498db", color: "#fff" }}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;