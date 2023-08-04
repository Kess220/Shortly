import { db } from "../config/dbConfig.js";

export const getRanking = async (req, res) => {
  try {
    const query = `
      SELECT
        u.id,
        u.name,
        COUNT(l.id) AS "linksCount", -- Usando aspas para manter o nome
        SUM(l.visit_count) AS "visitCount" -- Usando aspas para manter o nome
      FROM
        users u
      LEFT JOIN
        links l ON u.id = l.userid
      GROUP BY
        u.id, u.name
      ORDER BY
        "visitCount" 
      LIMIT 10;
    `;

    const result = await db.query(query);
    const ranking = result.rows;

    res.status(200).json(ranking);
  } catch (error) {
    console.error("Erro ao obter ranking:", error);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao obter ranking." });
  }
};
