const express = require("express");
const {
  registerProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/productController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Rota para registrar um novo produto (autenticado e com upload de imagem)
router.post("/register", upload.single("image"), registerProduct);

// Rota para atualizar um produto existente (autenticado e com upload de imagem)
router.put("/update/:id", upload.single("image"), updateProduct);

// Rota para excluir um produto (autenticado)
router.delete("/delete/:id", deleteProduct);

// Rota para buscar todos os produtos
router.get("/", getAllProducts);

module.exports = router;
