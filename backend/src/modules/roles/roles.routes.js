import { Router } from "express";

import {
  create,
  list,
} from "./roles.controller.js";

const router = Router();

router.post("/", create);

router.get("/", list);

export default router;