import { db } from "../config/dbConfig.js";

const ERROR_MESSAGES = {
  UNAUTHORIZED: "Token de autenticação não fornecido ou inválido.",
  USER_NOT_FOUND: "Usuário não encontrado.",
  SERVER_ERROR: "Erro interno do servidor ao obter perfil do usuário.",
};

export const getUserProfile = async (req, res) => {
  try {
    // Verificar se o usuário está autenticado através do token
    if (!req.user) {
      console.log("Token de autenticação não fornecido ou inválido.");
      return res.status(401).json({ error: ERROR_MESSAGES.UNAUTHORIZED });
    }

    const { userId } = req.user; // Extraímos o ID do usuário do token

    // Buscar os dados do usuário no banco de dados usando o ID do usuário
    const userQuery = await db.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    console.log("Resultado da consulta ao banco de dados:", userQuery.rows);

    const user = userQuery.rows[0];

    // Verificar se o usuário existe
    if (!user) {
      console.log("Usuário não encontrado no banco de dados.");
      return res.status(404).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    // Buscar a soma da quantidade de visitas de todos os links do usuário
    const visitCountQuery = await db.query(
      "SELECT SUM(visit_count) AS total_visits FROM links WHERE userid = $1",
      [userId]
    );

    // Converter a soma de visitas de string para número usando parseInt
    const totalVisits = parseInt(visitCountQuery.rows[0].total_visits, 10) || 0;

    // Buscar as URLs encurtadas do usuário com a soma da quantidade de visitas de cada link
    const shortenedUrlsQuery = await db.query(
      "SELECT id, short_code AS shortUrl, original_url AS url, visit_count FROM links WHERE userid = $1",
      [userId]
    );

    const shortenedUrls = shortenedUrlsQuery.rows.map((url) => {
      const { shorturl, ...rest } = url;
      return {
        ...rest,
        shortUrl: shorturl, // Renomeando a propriedade
      };
    });

    const userProfile = {
      id: user.id,
      name: user.name,
      visitCount: totalVisits,
      shortenedUrls: shortenedUrls,
    };
    // Responder com os dados do usuário
    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Erro ao obter perfil do usuário:", error);
    res.status(500).json({ error: ERROR_MESSAGES.SERVER_ERROR });
  }
};
