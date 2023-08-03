import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Token de autenticação não fornecido." });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "chave_padrao"
    );
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return res.status(401).json({ error: "Token de autenticação inválido." });
  }
};
