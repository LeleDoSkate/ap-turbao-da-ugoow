import React, { useState } from "react";
import { api } from "../../services/api";

const CadastrarProduto = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    nivelAcesso: "Produto", // Valor padrão
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await api.post("/api/produto/cadastrar", formData);
      console.log("Produto cadastrado:", resposta.data);
      alert("Produto cadastrado com sucesso!");
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        senha: "",
        nivelAcesso: "Produto",
      });
    } catch (erro) {
      console.error("Erro ao cadastrar produto:", erro);
      alert("Erro ao cadastrar produto. Tente novamente.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cadastrar Produto</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nome:</label>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Telefone:</label>
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Senha:</label>
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nível de Acesso:</label>
          <select
            name="nivelAcesso"
            value={formData.nivelAcesso}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="Adm">Administrador</option>
            <option value="SubAdm">Sub-Administrador</option>
            <option value="Produto">Produto</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastrarProduto;

// Estilos
const styles = {
  container: {
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  select: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};