import express from "express";
import BoardController from "../controllers/boardController.js";
import {
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware
} from "../middlewares/index.js"
const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  BoardController.createBoard
);

router.get(
  "/new",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  BoardController.createBoardPage
);

router.get(
  "/:boardId",
  authMiddleware,
  workspaceAccessMiddleware("view"),
  boardAccessMiddleware,
  BoardController.getBoardPage
);

router.get(
  "/:boardId/edit",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  boardAccessMiddleware,
  BoardController.getBoardEditPage
);

router.patch(
  "/:boardId",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  boardAccessMiddleware,
  BoardController.updateBoard
);

router.delete(
  "/:boardId",
  authMiddleware,
  workspaceAccessMiddleware("edit"),
  boardAccessMiddleware,
  BoardController.deleteBoard
);

export default router;
