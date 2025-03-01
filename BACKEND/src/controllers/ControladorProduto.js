import express from 'express';
import ServicoProduto from '../services/ServicoProduto.js';

const router = express.Router();

// Cadastro 
router.post('/cadastrar', async (req, res) => {
  const { nome, quantidade, preco, categoria, } = req.body;

  try {
    const produtoCadastrado = await ServicoProduto.cadastrarProduto({
      nome,
      quantidade,
      preco,
      categoria,
    });
    res.status(201).json(produtoCadastrado);
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
});


router.post('/login', async (req, res) => {
  const { nome, categoria } = req.body;

  try {
    const token = await ServicoProduto.loginUsuario({ nome, categoria });
    res.status(200).json({ mensagem: 'Produto feito!', token });
  } catch (erro) {
    res.status(401).json({ mensagem: erro.message });
  }
});

// Listar todos (rota protegida)
router.get('/listar', async (req, res) => {
  try {
    const produtos = await ServicoProduto.listarProdutos();
    res.status(200).json(produtos);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
});

// Atualizar usuário (rota protegida)
router.put('/atualizar/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, categoria, quantidade } = req.body;

  try {
    const produtoAtualizado = await ServicoProduto.atualizarProduto(id, {
      nome,
      quantidade,
      preco,
      categoria,
    });
    res.status(200).json(produtoAtualizado);
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
});

// Excluir produto (rota protegida)
router.delete('/excluir/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await ServicoProduto.excluirProduto(id);
    res.status(200).json({ mensagem: 'Produto excluído com sucesso!' });
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
});

export default router;
