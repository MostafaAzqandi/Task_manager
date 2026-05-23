import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import WorkspaceController from "../controllers/workspaceController.js";
import workspaceMemberMiddleware from "../middlewares/workspaceMemberMiddleware.js";

const router = express.Router();

router.post("/",authMiddleware, WorkspaceController.createWorkspace);
router.get("/",authMiddleware, WorkspaceController.getWorkspaces);
router.get("/:workspaceId",authMiddleware, workspaceMemberMiddleware, async (req, res) => {
    res.json({
        message: "Workspace access granted."
    })
});




export default router;