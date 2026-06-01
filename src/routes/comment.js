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
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  taskAccessMiddleware,
  TaskCommentController.createComment,
);
router.patch(
  "/:commentId",
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  taskAccessMiddleware,
  ensureCommentOwner,
  TaskCommentController.updateComment,
);
router.delete(
  "/:commentId",
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  taskAccessMiddleware,
  ensureCommentOwner,
  TaskCommentController.deleteComment,
);



export default router;