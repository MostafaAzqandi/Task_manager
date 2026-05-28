import { Board } from "../models/index.js";
import { routes } from "../utils/routes.js";
//i mean here i : const workspace= req.workspace ....
class BoardController {
  async createBoard(req, res, next) {
    try {
      await Board.create({
        title: req.body.title,
        workspaceId: req.workspace.id,
        createdBy: req.user.id,
      });

      // res.json(board);
      res.redirect("/boards");
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
  async updateBoard(req,res, next) {
    try {
      await req.board.update({
        title: req.body.title,
        description: req.body.description
      });
      res.redirect(routes.board(req.workspace.id, req.board.id));
    } catch (error) {
      next(error)
    }
  }
  async createBoardPage(req, res, next) {
    try {
      const workspace = req.workspace;
      res.render("boards/create", { workspace });
    } catch (error) {
      next(error);
    }
  }
  async getBoardPage(req, res, next) {
    try {
      const workspace = req.workspace;
      const board = req.board;
      const tasks = await board.getTasks();
      const taskCount = await board.countTasks();
      res.render("boards/show", { workspace, board, tasks, taskCount, routes });
    } catch (error) {
      next(error);
    }
  }
  getBoardEditPage(req, res, next) {
    const workspace = req. workspace;
    const board = req.board;
    res.render("boards/edit", { workspace, board, routes });
  }
}

export default new BoardController();
