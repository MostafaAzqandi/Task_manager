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
  workspaceAccessMiddleware,
  BoardController.createBoard
);
router.get(
  "/new",
  authMiddleware,
  workspaceAccessMiddleware,
  BoardController.createBoardPage
);
// router.get(
//   "/",
//   authMiddleware,
//   workspaceAccessMiddleware,
//   BoardController.getBoardsPage,
// );
router.get(
  "/:boardId",
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  BoardController.getBoardPage
);

router.get(
  "/:boardId/edit",
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  BoardController.getBoardEditPage
);
router.patch(
  "/:boardId",
  authMiddleware,
  workspaceAccessMiddleware,
  boardAccessMiddleware,
  BoardController.updateBoard
);
export default router;
