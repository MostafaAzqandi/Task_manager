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
  workspaceAccessMiddleware("edit"),
  boardAccessMiddleware,
  TaskController.createTask,
);
router.get(
  "/new",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  boardAccessMiddleware,
  TaskController.createTaskPage,
);
router.get(
  "/",
  authMiddleware,
  workspaceAccessMiddleware("view"),
  boardAccessMiddleware,
  TaskController.getTasks,
);
router.get(
  "/:taskId",
  authMiddleware,
  workspaceAccessMiddleware("view"),
  boardAccessMiddleware,
  taskAccessMiddleware,
  TaskController.getTaskPage,
);
router.patch(
  "/:taskId",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  boardAccessMiddleware,
  taskAccessMiddleware,
  TaskController.updateTask,
);
router.delete(
  "/:taskId",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  boardAccessMiddleware,
  taskAccessMiddleware,
  TaskController.deleteTask,
);
router.post(
  "/:taskId/assign",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  boardAccessMiddleware,
  taskAccessMiddleware,
  TaskController.assignTask,
);
router.get(
  "/:taskId/edit",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  boardAccessMiddleware,
  taskAccessMiddleware,
  TaskController.getTaskEditPage,
);


export default router;
