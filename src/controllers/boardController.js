import { Board } from "../models/index.js";

class BoardController {
  async createBoard(req, res) {
    try {
      const board = await Board.create({
        title: req.body.title,
        workspaceId: req.params.workspaceId,
        createdBy: req.user.id,
      });

      res.json(board);
    } catch (error) {
      next(error);
    }
  }
  async getBoards(req, res) {
    try {
      const boards = await Board.findAll({
        where: {
          workspaceId: req.params.workspaceId,
        },
      });
      res.json(boards);
    } catch (error) {
      next(error);
    }
  }
  async getBoard(req, res) {
    try {
      const board = await Board.findOne({
        where: {
          id: req.params.boardId,
          workspaceId: req.params.workspaceId,
        },
      });
      if (!board) {
        return res.status(404).json({
          error: "Board not found",
        });
      }
      res.json(board);
    } catch (error) {
      next(error);
    }
  }
}

export default new BoardController();
