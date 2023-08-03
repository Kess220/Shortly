import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/dbConfig.js";
import Joi from "joi";

const generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const signin = async (req, res) => {
  // Definir o esquema de validação do body
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(422).json({ error: "Dados inválidos no body." });
  }

  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe com o e-mail fornecido
    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length === 0) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // Verificar se a senha é válida
    const user = existingUser.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // Gerar o token de autenticação
    const token = generateAuthToken(user.id);

    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000,
    });

    // Responder com o token no corpo da resposta
    res.status(200).json({ token });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res.status(500).json({
      error: "Erro interno do servidor ao autenticar usuário.",
      error,
    });
  }
};
