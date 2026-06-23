import express from "express";
import { register, login, me, changePassword, requestReset, resetPassword } from "./auth.controller.js";
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authenticateMiddleware, me);

router.put("/change-password", authenticateMiddleware, changePassword);

router.post("/request-reset", requestReset);
router.post("/reset-password", resetPassword);

export default router;