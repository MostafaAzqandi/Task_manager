import AppError from "../errors/AppError.js";
import { Board } from "../models/index.js";

async function boardAccessMiddleware(req, res, next) {
  try {
    const board = await Board.findOne({
      where: {
        id: req.params.boardId,
        workspaceId: req.workspace.id,
      },
    });

    if (!board) throw new AppError("Board not found", 404);

    req.board = board;
    next();
  } catch (error) {
    next(error);
  }
}

export default boardAccessMiddleware;
