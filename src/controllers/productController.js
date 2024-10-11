// controllers/productController.js

const Product = require("../models/productModel");
const uploadImageToImgbb = require("../utils/uploadImageToImagebb");

// Registrar produto
const registerProduct = async (req, res) => {
  const { name, description, quantity, type, price } = req.body; // Incluindo price
  let imageUrl = null;

  try {
    // Verificar se há um arquivo de imagem na requisição
    if (req.file) {
      imageUrl = await uploadImageToImgbb(req.file.buffer);
    }

    const product = new Product({
      name,
      description,
      quantity,
      imageUrl,
      type,
      price, // Incluindo o campo preço
    });

    await product.save();
    res
      .status(201)
      .json({ message: "Produto registrado com sucesso", product });
  } catch (error) {
    res.status(500).json({ error: "Falha ao registrar produto" });
  }
};

// Atualizar produto
const updateProduct = async (req, res) => {
  const { name, description, quantity, type, price } = req.body; // Incluindo price
  let imageUrl = null;

  try {
    // Verificar se há um novo arquivo de imagem
    if (req.file) {
      imageUrl = await uploadImageToImgbb(req.file.buffer);
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.quantity = quantity || product.quantity;
    product.type = type || product.type;
    product.price = price || product.price; // Atualiza o preço, se fornecido
    if (imageUrl) product.imageUrl = imageUrl;

    await product.save();
    res
      .status(200)
      .json({ message: "Produto atualizado com sucesso", product });
  } catch (error) {
    res.status(500).json({ error: "Falha ao atualizar produto" });
  }
};

// Excluir produto
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.status(200).json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Falha ao excluir produto" });
  }
};

// Buscar todos os produtos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar produtos" });
  }
};

module.exports = {
  registerProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
