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

export const getUrlById = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar a url encurtada no DB com base no ID
    const result = await db.query("SELECT * FROM links WHERE id = $1", [id]);

    // Verificar se a URL encurtada existe
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "URL encurtada não existe." });
    }

    const { short_code: shortUrl, original_url: url } = result.rows[0];
    res.status(200).json({ id, shortUrl, url });
  } catch (error) {
    console.error("Erro ao buscar URL encurtada:", error);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao buscar URL encurtada." });
  }
};

export const deleteUrl = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar se a URL encurtada existe no banco de dados
    const result = await db.query("SELECT * FROM links WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "URL encurtada não existe." });
    }

    await db.query("DELETE FROM links WHERE id = $1", [id]);

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir URL encurtada:", error);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao excluir URL encurtada." });
  }
};
