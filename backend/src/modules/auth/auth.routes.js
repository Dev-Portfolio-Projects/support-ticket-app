import express from "express";
import { register, login, me, changePassword } from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, me);

router.put("/change-password", authMiddleware, changePassword);

export default router;