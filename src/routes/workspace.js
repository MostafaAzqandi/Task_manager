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
  workspaceAccessMiddleware("view"),
  WorkspaceController.getWorkspacePage,
);
router.get(
  "/:workspaceId/edit",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  WorkspaceController.getWorkspaceEditPage,
);

router.patch(
  "/:workspaceId",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  WorkspaceController.updateWorkspace,
);
router.delete(
  "/:workspaceId",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  WorkspaceController.deleteWorkspace
);

router.get(
  "/",
  authMiddleware,
  WorkspaceController.getWorkspacesPage,
);

router.post(
  "/:workspaceId/invite",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  WorkspaceController.inviteUser
);

export default router;
