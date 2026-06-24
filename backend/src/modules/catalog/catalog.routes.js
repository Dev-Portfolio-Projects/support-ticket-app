import { Router } from "express";

import * as controller from "./catalog.controller.js";

import { authenticateMiddleware } from "../../middlewares/authenticate.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";

const router = Router();

router.get("/", authenticateMiddleware, controller.getCatalog);

router.post("/statuses", authenticateMiddleware, controller.createStatus);
router.post("/priorities", authenticateMiddleware, controller.createPriority);
router.post("/categories", authenticateMiddleware, controller.createCategory);

router.get("/statuses", authenticateMiddleware, controller.getStatuses);
router.get("/priorities", authenticateMiddleware, controller.getPriorities);
router.get("/categories", authenticateMiddleware, controller.getCategories);

export default router;