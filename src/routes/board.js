import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import BoardController from "../controllers/boardController.js";
import workspaceMemberMiddleware from "../middlewares/workspaceMemberMiddleware.js";

const router = express.Router({mergeParams: true});

router.post("/",authMiddleware, workspaceMemberMiddleware, BoardController.createBoard);
router.get("/",authMiddleware, workspaceMemberMiddleware, BoardController.getBoards);
router.get("/:boardId",authMiddleware, workspaceMemberMiddleware, BoardController.getBoard);






export default router;