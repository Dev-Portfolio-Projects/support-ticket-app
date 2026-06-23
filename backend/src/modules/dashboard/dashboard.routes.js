import { Router } from "express";
import * as controller from "./dashboard.controller.js";

import { authenticateMiddleware } from "../../middlewares/authenticate.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";

const router = Router();

router.get("/", authenticateMiddleware, authorizeMiddleware(1), controller.getDashboard);

export default router;