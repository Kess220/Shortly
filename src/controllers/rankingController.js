import { db } from "../config/dbConfig.js";

export const getRanking = async (req, res) => {
  try {
    const query = `
      SELECT
        u.id,
        u.name,
        CAST(COUNT(l.id) AS INTEGER) AS "linksCount",
        CAST(SUM(l.visit_count) AS INTEGER) AS "visitCount"
      FROM
        users u
      LEFT JOIN
        links l ON u.id = l.userid
      GROUP BY
        u.id, u.name
      ORDER BY
        "visitCount" DESC
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
