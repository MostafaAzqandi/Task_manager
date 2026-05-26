import express from "express";
import WorkspaceController from "../controllers/workspaceController.js";
import { authMiddleware, workspaceAccessMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.post("/", authMiddleware, WorkspaceController.createWorkspace);
router.get(
  "/new",
  authMiddleware,
  WorkspaceController.createWorkspacePage,
);
router.get(
  "/:workspaceId",
  authMiddleware,
  workspaceAccessMiddleware,
  WorkspaceController.getWorkspacePage,
);

router.get(
  "/",
  authMiddleware,
  WorkspaceController.getWorkspacesPage,
);



export default router;
