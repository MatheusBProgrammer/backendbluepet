// Função de login para o admin
const adminLogin = (req, res) => {
  const { username, password } = req.body;
  // Simular autenticação de admin (credenciais fixas)
  if (username === "bluepetpb" && password === "32137721Aa") {
    // Retorna uma resposta de sucesso
    res.status(200).json({
      message: "Login efetuado com sucesso",
      user: {
        username: username,
        role: "admin", // Indicando o papel do usuário
      },
    });
  } else {
    // Credenciais inválidas
    res.status(401).json({ message: "Credenciais inválidas" });
  }
};

module.exports = { adminLogin };
