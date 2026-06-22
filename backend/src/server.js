import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createDb  } from "./db/index.js";

const app = express();
const db = createDb();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await db.execute("select 1 as ok");

    res.json({
      ok: true,
      message: "Drizzle conectado correctamente",
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: "Error conectando a la base de datos",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});