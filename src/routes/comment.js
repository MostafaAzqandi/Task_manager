import express from "express";
import TaskCommentController from "../controllers/taskCommentController.js";
import {
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  taskAccessMiddleware,
  ensureCommentOwner
} from "../middlewares/index.js";
import { routes } from "../utils/routes.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authMiddleware,
  workspaceAccessMiddleware("view"),
  boardAccessMiddleware,
  taskAccessMiddleware,
  TaskCommentController.createComment,
);
router.patch(
  "/:commentId",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  boardAccessMiddleware,
  taskAccessMiddleware,
  ensureCommentOwner,
  TaskCommentController.updateComment,
);
router.delete(
  "/:commentId",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  boardAccessMiddleware,
  taskAccessMiddleware,
  ensureCommentOwner,
  TaskCommentController.deleteComment,
);



export default router;