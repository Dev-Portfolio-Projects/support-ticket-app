import { Router } from "express";

import * as controller from "./catalog.controller.js";

const router = Router();

router.post("/statuses", controller.createStatus);
router.post("/priorities", controller.createPriority);
router.post("/categories", controller.createCategory);

router.get("/statuses", controller.getStatuses);
router.get("/priorities", controller.getPriorities);
router.get("/categories", controller.getCategories);

export default router;