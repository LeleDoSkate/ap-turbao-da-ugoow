import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { saveToken } from "../utils/ajudaAutenticacao";
import { ThemeContext } from "../theme/ThemeContext"; // Importe o ThemeContext
import logo from "../assets/logo.webp"; // Importe o logo

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(ThemeContext); // Use o contexto para atualizar o estado de autenticação

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(email, senha);
      saveToken(token); // Salva o token no LocalStorage
      setIsLoggedIn(true); // Atualiza o estado de autenticação
      navigate("/dashboard", { replace: true }); // Redireciona ao dashboard
    } catch (error) {
      setErro(error.response ? error.response.data.mensagem : "Erro desconhecido");
    }
  };

  return (
    <div className="main-login" style={{ display: "flex", height: "100vh" }}>
      <div className="left-login" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div>
          <h1>?<br /> ?</h1>
          <img
            className="img"
            src={logo} // Caminho relativo da imagem
            alt="banner"
            style={{ maxWidth: "75%", height: "auto" }}
          />
        </div>
      </div>

      <div className="right-login" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="card-login" style={{ width: "300px", padding: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", textAlign: "center" }}>
          <h2>Login</h2>
          {erro && <p style={{ color: "red" }}>{erro}</p>}
          <form onSubmit={handleLogin}>
            <div className="text-field" style={{ marginBottom: "10px" }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>

            <div className="text-field" style={{ marginBottom: "20px" }}>
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#3498db",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Entrar
            </button>
          </form>

          <p style={{ marginTop: "15px" }}>
            Esqueceu a senha?{" "}
            <a className="recupera-senha" href="/cadastro" style={{ textDecoration: "none", color: "#3498db" }}>
              Recuperar senha
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;