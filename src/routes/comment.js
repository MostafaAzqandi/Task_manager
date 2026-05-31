import express from "express";
import TaskCommentController from "../controllers/taskCommentController.js";
import {
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  taskAccessMiddleware,
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


export default router;