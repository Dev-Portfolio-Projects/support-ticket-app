import dotenv from "dotenv";
dotenv.config();

import express from "express";

import authRoutes from "./modules/auth/auth.routes.js";
import rolesRoutes from "./modules/roles/roles.routes.js";
import catalogRoutes from "./modules/catalog/catalog.routes.js";
import ticketsRoutes from "./modules/tickets/tickets.routes.js";

const app = express();

app.use(express.json());

// HEALTH CHECK
app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

// API ROUTES
app.use("/auth", authRoutes);
app.use("/roles", rolesRoutes);
app.use("/catalog", catalogRoutes);
app.use("/tickets", ticketsRoutes);

// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});