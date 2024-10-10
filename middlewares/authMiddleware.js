const Admin = require("../models/adminModel");

// Middleware de autenticação
const authMiddleware = async (req, res, next) => {
  const { username, password } = req.headers;

  try {
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(500).json({ error: "Falha na autenticação" });
  }
};

module.exports = authMiddleware;
