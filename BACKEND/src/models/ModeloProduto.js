import mongoose from "mongoose";

const EsquemaProduto = new mongoose.Schema(
  {
    nome: {
      type: String,
      // required: true,
    },
    quantidade: {
      type: String,
      required: true,
      unique: true,
    },
    preco: {
      type: String,
      // required: true,
    },
    categoria: {
      type: String,
      required: true,
    },  
 },
 
  {
    timestamps: true,
  }
);

export default mongoose.model("Produto", EsquemaProduto);
