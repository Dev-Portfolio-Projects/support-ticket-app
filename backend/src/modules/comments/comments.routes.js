import { Router } from "express";

import {
  addComment,
  listComments,
} from "./comments.controller.js";

import { authenticateMiddleware } from "../../middlewares/authenticate.middleware.js";

const router = Router();

router.post(
  "/:ticketId",
  authenticateMiddleware,
  addComment
);

router.get(
  "/:ticketId",
  authenticateMiddleware,
  listComments
);

export default router;