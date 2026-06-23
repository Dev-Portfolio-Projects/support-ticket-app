import dotenv from "dotenv";
dotenv.config();

import express from "express";

import authRoutes from "./modules/auth/auth.routes.js";
import rolesRoutes from "./modules/roles/roles.routes.js";

const app = express();

app.use(express.json());

// HEALTH CHECK
app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

// API ROUTES
app.use("/auth", authRoutes);
app.use("/roles", rolesRoutes);

// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});