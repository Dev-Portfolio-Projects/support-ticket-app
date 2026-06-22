import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { db } from "./db/index.js";

// AUTH ROUTES
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json());

// HEALTH CHECK
app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

// DB TEST (Neon + Drizzle)
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

// AUTH MODULE
app.use("/auth", authRoutes);

// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});