import AppError from "../errors/AppError.js";
import { Workspace, WorkspaceMember } from "../models/index.js";
async function workspaceMemberMiddleware(req, res, next) {
  try {
    const membership = await WorkspaceMember.findOne({
      where: {
        workspaceId: req.params.workspaceId,
        userId: req.user.id,
      },
    });
    if (!membership) throw new AppError("Access denied", 403);
    const workspace = await Workspace.findByPk(req.params.workspaceId);
    req.workspace = workspace;
    next();
  } catch (error) {
    next(error);
  }
}

export default workspaceMemberMiddleware;
