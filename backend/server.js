import express, { request, response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import pool from "./db.js";

const app = express();

app.use(cors()); // 2. Habilita o CORS para permitir requisições do React
app.use(express.json());

const JWT_SECRET = "sua_chave_secreta_aqui";

// Usuário simulado (Senha: '123456')

app.get("/home", (request, response) => {
  return response.send("Bem-vindo à nossa API!");
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
    email,
  ]);

  const usuario = result.rows[0];

  if (!usuario) {
    return res.status(401).json({
      mensagem: "Usuário não encontrado",
    });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

  if (!senhaValida) {
    return res.status(401).json({ mensagem: "Senha incorreta" });
  }

  const token = jwt.sign({ email: usuario.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.json({ token });
});

app.post("/registrar", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senha_hash = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, senha_hash],
    );

    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ mensagem: "E-mail já registrado" });
    }
    res.status(500).json({ erro: err.message });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
