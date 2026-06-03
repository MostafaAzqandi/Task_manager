import { Board } from "../models/index.js";
import { routes } from "../utils/routes.js";

class BoardController {
  async createBoard(req, res, next) {
    try {
      if (!req.body.title?.trim()) {
        req.flash("error", "Title cannot be empty");
        return res.redirect(routes.workspace(req.workspace.id) + "/boards/new");
      }
      await Board.create({
        title: req.body.title,
        workspaceId: req.workspace.id,
        createdBy: req.user.id,
      });

      req.flash("success", "Board Created");
      return res.redirect(routes.workspace(req.workspace.id));
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
      const { title, description } = req.body;
      if (!title?.trim() || ! description?.trim()) {
        req.flash("error", "Fields cannot be empty");
        return res.redirect(routes.board(req.workspace.id, req.board.id) + "/edit");
      }
      await req.board.update({
        title,
        description
      });
      req.flash("success", "Board Updated");
      return res.redirect(routes.board(req.workspace.id, req.board.id));
    } catch (error) {
      next(error)
    }
  }
  async deleteBoard(req, res, next) {
    try {
      await req.board.destroy();
      // res.json({ message: "Task deleted" });
      req.flash("success", "Board Deleted");
      return res.redirect(routes.workspace(req.workspace.id));
    } catch (error) {
      next(error);
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
    try {
      const workspace = req. workspace;
      const board = req.board;
      res.render("boards/edit", { workspace, board, routes });
    } catch (error) {
      next(error);
    }
  }
}

export default new BoardController();
