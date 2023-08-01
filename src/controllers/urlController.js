// controllers/linkController.js
import { nanoid } from "nanoid";
import { db } from "../config/dbConfig.js";

// Função para encurtar a URL
export const shortenUrl = async (req, res) => {
  const { url } = req.body;
  const userId = req.user?.id;

  if (!url) {
    return res.status(422).json({ error: "A URL é obrigatória." });
  }

  try {
    const shortCode = nanoid(8);

    const createdAt = new Date();

    const result = await db.query(
      "INSERT INTO links (original_url, short_code, created_at, userid) VALUES ($1, $2, $3, $4) RETURNING id",
      [url, shortCode, createdAt, userId]
    );

    const newLinkId = result.rows[0].id;

    res.status(201).json({ id: newLinkId, shortUrl: shortCode });
  } catch (error) {
    console.error("Erro ao encurtar a URL:", error);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao encurtar a URL." });
  }
};
