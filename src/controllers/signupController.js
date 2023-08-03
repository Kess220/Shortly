import bcrypt from "bcrypt";
import { db } from "../config/dbConfig.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (typeof name !== "string") {
    return res
      .status(422)
      .json({ error: "O campo 'name' deve ser uma string." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(422)
      .json({ error: "O campo 'email' deve ser um email válido." });
  }

  try {
    // Verificar se o usuário já está cadastrado com o e-mail fornecido
    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "Usuário com este e-mail já cadastrado." });
    }

    // Criptografar a senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir o novo usuário no banco de dados
    await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Usuário cadastrado com sucesso." });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao cadastrar usuário." });
  }
};
