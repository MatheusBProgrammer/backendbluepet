const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("../src/config/db");

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao MongoDB
connectDB();

const app = express();

// Configuração do CORS antes das rotas
app.use(cors());

// Middleware para JSON
app.use(express.json());

// Importar rotas
const adminRoutes = require("../src/routes/adminRoutes"); // Verifique se isso está correto
const productRoutes = require("../src/routes/productRoutes"); // Verifique se isso está correto

// Usar as rotas
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
// Rota para a raiz que retorna { ok: true }
app.get("/", (req, res) => {
  res.json({ ok: true });
});
// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
