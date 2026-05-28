import { TaskAssignee, WorkspaceMember, User, Task } from "../models/index.js";
import { routes } from "../utils/routes.js";

class TaskController {
  async createTask(req, res, next) {
    try {
      const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        boardId: req.params.boardId,
        createdBy: req.user.id,
      });

      res.json(task);
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
      const task = await Task.findByPk(req.task.id, {
        include: {
          model: User,
          as: "creator"
        }
      });
      const assignees = await task.getAssignees();
      console.log(users);
      
      res.render("tasks/show", { users, workspace, board, task, assignees, routes });
    } catch (error) {}
  }
  async updateTask(req, res, next) {
    try {
      await req.task.update({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      });
      res.json(req.task);
    } catch (error) {
      next(error);
    }
  }
  async deleteTask(req, res, next) {
    try {
      await req.task.destroy();
      res.json({
        message: "Task deleted",
      });
    } catch (error) {
      next(error);
    }
  }
  async assignTask(req, res, next) {
    try {
      const membership = await WorkspaceMember.findOne({
        where: {
          workspaceId: req.params.workspaceId,
          userId: req.body.userId,
        },
      });

      if (!membership) {
        return res.status(400).json({
          error: "User Not in workspace",
        });
      }
      const isAssigned = await TaskAssignee.findOne({
        where: {
          taskId: req.task.id,
          userId: req.body.userId,
        },
      });
      if (isAssigned) {
        return res.status(400).json({
          error: "User already assigned",
        });
      }

      await TaskAssignee.create({
        taskId: req.task.id,
        userId: req.body.userId,
      });

      // res.json({ message: "Task assigned" });
      res.redirect(routes.task(req.workspace.id, req.board.id, req.task.id));
    } catch (error) {
      next(error);
    }
  }
  getTaskEditPage(req, res, next) {
    res.render("tasks/edit");
  }
}

export default new TaskController();
