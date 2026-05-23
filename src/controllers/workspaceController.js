import sequelize from "../database/database.js";
import { Workspace, WorkspaceMember } from "../models/index.js";

class WorkspaceController {
  async createWorkspace(req, res) {
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
  async getWorkspaces(req, res) {
    try {
      const workspaces = await req.user.getWorkspaces();
      res.json(workspaces);
    } catch (error) {
      next(error);
    }
  }
}

export default new WorkspaceController();
