import express from "express";
import { register, login, me, changePassword, requestReset, resetPassword } from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, me);

router.put("/change-password", authMiddleware, changePassword);

router.post("/request-reset", requestReset);
router.post("/reset-password", resetPassword);

export default router;