import express from "express";
import dotenv from "dotenv";
import { db } from "./config/dbConfig.js";
import authRoutes from "./routes/auth.Routes.js";
import urlRoutes from "./routes/url.Routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(authRoutes);
app.use("/urls", urlRoutes);

db.connect((err, client) => {
  if (err) {
    console.error("Erro ao conectar-se ao banco de dados:", err);
    return;
  }

  console.log("Conexão com o banco de dados estabelecida com sucesso!");

  // Adicione as rotas e middlewares aqui, por exemplo:
  app.get("/", (req, res) => {
    res.send("Olá, mundo!");
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});
