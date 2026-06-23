import { Router } from "express";

import * as controller from "./tickets.controller.js";

const router = Router();

router.post("/", controller.create);

router.get("/", controller.list);

router.get("/:id", controller.getById);

router.put("/:id", controller.update);

router.patch("/:id/close", controller.close);

export default router;