import React, { useEffect, useState, useContext } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../theme/ThemeContext"; // Importe o ThemeContext
import { FaEdit, FaTrash } from "react-icons/fa"; // Ícones para editar e excluir
import "../../styles/Table.css"; // Importe o CSS

const ListarProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const { theme } = useContext(ThemeContext); // Use o tema atual

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const resposta = await api.get("/api/produto/listar");
        setProdutos(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
      }
    };

    buscarProdutos();
  }, []);

  const handleExcluir = async (id) => {
    try {
      await api.delete(`/api/produto/excluir/${id}`);
      setProdutos(produtos.filter((produto) => produto._id !== id));
    } catch (erro) {
      console.error("Erro ao excluir produto:", erro);
    }
  };

  return (
    <div className="table-container" style={{ color: theme.text }}>
      <h2>Lista de Produtos</h2>
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
            {produtos.map((produto, index) => (
              <tr key={produto._id}>
                <td>{produto.nome}</td>
                <td>{produto.email}</td>
                <td>{produto.telefone}</td>
                <td>{produto.nivelAcesso}</td>
                <td>
                  <div className="table-actions">
                    <Link
                      to={`/produtos/editar/${produto._id}`}
                      className="table-button edit"
                    >
                      <FaEdit /> {/* Ícone de editar */}
                      {window.innerWidth > 768 && "Editar"} {/* Mostra texto apenas em telas maiores */}
                    </Link>
                    <button
                      onClick={() => handleExcluir(produto._id)}
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

export default ListarProdutos;