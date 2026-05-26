import { Board, Workspace } from "../models/index.js";

class BoardController {
  async createBoard(req, res, next) {
    try {
      const board = await Board.create({
        title: req.body.title,
        workspaceId: req.workspace.id,
        createdBy: req.user.id,
      });

      res.json(board);
    } catch (error) {
      next(error);
    }
  }
  async getBoards(req, res, next) {
    try {
      const boards = await Board.findAll({
        where: {
          workspaceId: req.workspace.id,
        },
      });
      res.json(boards);
    } catch (error) {
      next(error);
    }
  }
  async getBoard(req, res, next) {
    try {
      res.json(req.board);
    } catch (error) {
      next(error);
    }
  }
  async getBoardPage(req, res, next) {
    try {
      const workspace = req.workspace;
      const board = req.board;
      const tasks = await board.getTasks();
      const taskCount = await board.countTasks()
      res.render("boards/show", { workspace, board, tasks, taskCount });
    } catch (error) {
      next(error);
    }
  }
}

export default new BoardController();
