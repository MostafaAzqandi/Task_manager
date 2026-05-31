import {
  TaskAssignee,
  WorkspaceMember,
  User,
  Task,
  TaskComment,
} from "../models/index.js";
import { routes } from "../utils/routes.js";

class TaskController {
  async createTask(req, res, next) {
    try {
      const { title, description, priority, status, startDate, expireDate } =
        req.body;
      await Task.create({
        title,
        description,
        priority,
        status,
        startDate,
        expireDate,
        boardId: req.board.id,
        createdBy: req.user.id,
      });

      // res.json(task);
      res.redirect(routes.board(req.workspace.id, req.board.id));
    } catch (error) {
      next(error);
    }
  }
  async getTasks(req, res, next) {
    try {
      const tasks = await Task.findAll({
        where: {
          boardId: req.board.id,
        },
      });
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }
  async getTask(req, res, next) {
    try {
      res.json(req.task);
    } catch (error) {}
  }
  async getTaskPage(req, res, next) {
    try {
      const workspace = req.workspace;
      const users = await workspace.getUsers();
      const board = req.board;
      const comments = await TaskComment.findAll({
        where: {
          taskId: req.task.id,
        },
        include: {
          model: User,
          as: "author",
        },
        order: [["createdAt", "ASC"]],
      });
      const task = req.task;
      const assignees = await task.getAssignees();

      res.render("tasks/show", {
        users,
        workspace,
        board,
        task,
        assignees,
        comments,
        routes,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateTask(req, res, next) {
    try {
      const { title, description, priority, status, startDate, expireDate } =
        req.body;
      await req.task.update({
        title,
        description,
        status,
        priority,
        startDate,
        expireDate,
      });
      // res.json(req.task);
      res.redirect(routes.task(req.workspace.id, req.board.id, req.task.id));
    } catch (error) {
      next(error);
    }
  }
  async deleteTask(req, res, next) {
    try {
      await req.task.destroy();
      // res.json({ message: "Task deleted" });
      res.redirect(routes.board(req.workspace.id, req.board.id));
    } catch (error) {
      next(error);
    }
  }
  async assignTask(req, res, next) {
    try {
      const redirectToTask = routes.task(req.workspace.id, req.board.id, req.task.id);
      const membership = await WorkspaceMember.findOne({
        where: {
          workspaceId: req.params.workspaceId,
          userId: req.body.userId,
        },
      });

      if (!membership) {
        req.flash("error", "User Not in workspace");
        return res.redirect(redirectToTask);
      }
      const isAssigned = await TaskAssignee.findOne({
        where: {
          taskId: req.task.id,
          userId: req.body.userId,
        },
      });
      if (isAssigned) {
        req.flash("error", "User already assigned");
        return res.redirect(redirectToTask);
      }

      await TaskAssignee.create({
        taskId: req.task.id,
        userId: req.body.userId,
      });
      req.flash("success", "User Assigned");
      return res.redirect(redirectToTask);
      // res.json({ message: "Task assigned" });
    } catch (error) {
      next(error);
    }
  }
  getTaskEditPage(req, res, next) {
    try {
      const workspace = req.workspace;
      const board = req.board;
      const task = req.task;
      res.render("tasks/edit", { workspace, board, task, routes });
    } catch (error) {
      next(error);
    }
  }
  createTaskPage(req, res, next) {
    try {
      const workspace = req.workspace;
      const board = req.board;
      res.render("tasks/create", { workspace, board, routes, error: null });
    } catch (error) {}
  }
}

export default new TaskController();
