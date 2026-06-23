import { Router } from "express";
import * as controller from "./tickets.controller.js";

import { authenticateMiddleware } from "../../middlewares/authenticate.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";

const router = Router();

router.post("/", authenticateMiddleware, controller.create);

router.get("/", authenticateMiddleware, controller.list);

router.get("/:id", authenticateMiddleware, controller.getById);

router.put("/:id", authenticateMiddleware, controller.update);

router.patch("/:id/close", authenticateMiddleware, controller.close);

router.patch(
  "/:id/assign",
  authenticateMiddleware,
  authorizeMiddleware(1),
  controller.assign
);

export default router;