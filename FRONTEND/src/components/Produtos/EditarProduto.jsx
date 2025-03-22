import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";

const EditarProduto = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    nivelAcesso: "Produto", // Valor padrão
  });

  useEffect(() => {
    const buscarProduto = async () => {
      try {
        const resposta = await api.get(`/api/produto/buscar/${id}`);
        setFormData(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar produto:", erro);
        alert("Erro ao buscar produto. Tente novamente.");
      }
    };

    buscarProduto();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await api.put(`/api/produto/atualizar/${id}`, formData);
      console.log("Produto atualizado:", resposta.data);
      alert("Produto atualizado com sucesso!");
    } catch (erro) {
      console.error("Erro ao atualizar produto:", erro);
      alert("Erro ao atualizar produto. Tente novamente.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Editar Produto</h2>
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
          Atualizar
        </button>
      </form>
    </div>
  );
};

export default EditarProduto;

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