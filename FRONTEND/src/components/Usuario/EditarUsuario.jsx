// src/components/EditarUsuario.jsx
import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";

const EditarUsuario = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    nivelAcesso: "Usuario", // Valor padrão
  });

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await api.get(`/api/usuario/buscar/${id}`);
        setFormData(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar usuário:", erro);
        alert("Erro ao buscar usuário. Tente novamente.");
      }
    };

    buscarUsuario();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await api.put(`/api/usuario/atualizar/${id}`, formData);
      console.log("Usuário atualizado:", resposta.data);
      alert("Usuário atualizado com sucesso!");
    } catch (erro) {
      console.error("Erro ao atualizar usuário:", erro);
      alert("Erro ao atualizar usuário. Tente novamente.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Editar Usuário</h2>
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
            <option value="Usuario">Usuário</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>
          Atualizar
        </button>
      </form>
    </div>
  );
};

export default EditarUsuario;

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