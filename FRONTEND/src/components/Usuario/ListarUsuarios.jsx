// src/components/ListarUsuarios.jsx
import React, { useEffect, useState, useContext } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../theme/ThemeContext"; // Importe o ThemeContext
import { FaEdit, FaTrash } from "react-icons/fa"; // Ícones para editar e excluir
import "../../styles/Table.css"; // Importe o CSS

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const { theme } = useContext(ThemeContext); // Use o tema atual

  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const resposta = await api.get("/api/usuario/listar");
        setUsuarios(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar usuários:", erro);
      }
    };

    buscarUsuarios();
  }, []);

  const handleExcluir = async (id) => {
    try {
      await api.delete(`/api/usuario/excluir/${id}`);
      setUsuarios(usuarios.filter((usuario) => usuario._id !== id));
    } catch (erro) {
      console.error("Erro ao excluir usuário:", erro);
    }
  };

  return (
    <div className="table-container" style={{ color: theme.text }}>
      <h2>Lista de Usuários</h2>
      <div style={{ overflowX: "auto" }}>
        <table className="table" style={{ backgroundColor: theme.background }}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Nível de Acesso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={usuario._id}>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.telefone}</td>
                <td>{usuario.nivelAcesso}</td>
                <td>
                  <div className="table-actions">
                    <Link
                      to={`/usuarios/editar/${usuario._id}`}
                      className="table-button edit"
                    >
                      <FaEdit /> {/* Ícone de editar */}
                      {window.innerWidth > 768 && "Editar"} {/* Mostra texto apenas em telas maiores */}
                    </Link>
                    <button
                      onClick={() => handleExcluir(usuario._id)}
                      className="table-button delete"
                    >
                      <FaTrash /> {/* Ícone de excluir */}
                      {window.innerWidth > 768 && "Excluir"} {/* Mostra texto apenas em telas maiores */}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarUsuarios;