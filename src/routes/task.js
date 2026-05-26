import express from "express";
import TaskController from "../controllers/taskController.js";
import {
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  taskAccessMiddleware,
} from "../middlewares/index.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  TaskController.createTask,
);
router.get(
  "/",
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  TaskController.getTasks,
);
router.get(
  "/:taskId",
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  taskAccessMiddleware,
  TaskController.getTaskPage,
);
router.patch(
  "/:taskId",
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  taskAccessMiddleware,
  TaskController.updateTask,
);
router.delete(
  "/:taskId",
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  taskAccessMiddleware,
  TaskController.deleteTask,
);
router.post(
  "/:taskId/assign",
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  taskAccessMiddleware,
  TaskController.assignTask,
);

export default router;
