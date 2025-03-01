import Produto from "../models/ModeloProduto.js";

const ServicoProduto = {
  cadastrarProduto: async ({
      nome,
      quantidade,
      preco,
      categoria,
  }) => {
    try {


      const novoProduto = await Produto.create({
      nome,
      quantidade,
      preco,
      categoria,
      });

      return novoProduto;
    } catch (erro) {
      throw erro;
    }
  },

  listarProduto: async () => {
    try {
      return await Produto.find();
    } catch (erro) {
      throw erro;
    }
  },

  atualizarProduto: async (id, dadosAtualizados) => {
    try {
      const     produtoAtualizado = await   produto.findByIdAndUpdate(
        id,
        dadosAtualizados,
        {
          new: true,
        }
      );
      if (!produtoAtualizado) {
        throw new Error("Produto não encontrado!");
      }
      return produtoAtualizado;
    } catch (erro) {
      throw erro;
    }
  },

  excluirProduto: async (id) => {
    try {
      const produtoExcluido = await Produto.findByIdAndDelete(id);
      if (!ProdutoExcluido) {
        throw new Error("Produto não encontrado!");
      }
      return produtoExcluido;
    } catch (erro) {
      throw erro;
    }
  },
};

export default ServicoProduto;
