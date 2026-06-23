import { Router } from "express";

import {
  create,
  list,
} from "./roles.controller.js";

import { authenticateMiddleware } from "../../middlewares/authenticate.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";

const router = Router();

router.post("/", authenticateMiddleware, authorizeMiddleware(1), create);

router.get("/", authenticateMiddleware, authorizeMiddleware(1), list);

export default router;