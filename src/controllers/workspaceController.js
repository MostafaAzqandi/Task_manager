import sequelize from "../database/database.js";
import { Task, Workspace, WorkspaceMember, Board } from "../models/index.js";

class WorkspaceController {
  async createWorkspace(req, res, next) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const workspace = await Workspace.create(
        {
          title: req.body.title,
          createdBy: req.user.id,
        },
        { transaction },
      );
      await WorkspaceMember.create(
        {
          userId: req.user.id,
          workspaceId: workspace.id,
          role: "owner",
        },
        { transaction },
      );
      await transaction.commit();

      res.json(workspace);
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      next(error);
    }
  }
  async getWorkspaces(req, res, next) {
    try {
      const workspaces = await req.user.getWorkspaces();
      res.json(workspaces);
    } catch (error) {
      next(error);
    }
  }
  getWorkspace(req, res, next) {
    try {
      res.json(req.workspace);
    } catch (error) {
      next(error);
    }
  }
  async getWorkspacesPage(req, res, next) {
    try {
      const workspaces = await req.user.getWorkspaces({
        include: [Board],
        joinTableAttributes: [ "role" ]
      });
      
      res.render("workspaces/index", { workspaces });
    } catch (error) {
      next(error);
    }
  }
  async getWorkspacePage(req, res, next) {
    try {
      const workspace = req.workspace;
      const memberCount = await workspace.countUsers();
      const boards = await workspace.getBoards({
        include: [Task]
      });
      res.render("workspaces/show", { workspace , boards, memberCount});
    } catch (error) {
      next(error);
    }
  }
  createWorkspacePage(req, res, next){
    try {
      res.render("workspaces/create");
    } catch (error) {
      next(error);
    }
  }
}

export default new WorkspaceController();
