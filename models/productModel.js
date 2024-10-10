// models/productModel.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  type: { type: String, required: true, enum: ["farmacia", "petshop"] },
  price: { type: Number, required: true }, // Novo campo para o preço
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
