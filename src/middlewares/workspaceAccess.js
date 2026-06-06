import AppError from "../utils/AppError.js";
import { Workspace, WorkspaceMember } from "../models/index.js";
import permissions from "../utils/permissions.js";

function workspaceAccessMiddleware() {
  return async (req, res, next) => {
    try {
      const workspace = await Workspace.findByPk(req.params.workspaceId);

      if (!workspace) {
        throw new AppError("Workspace not found", 404);
      }

      req.workspace = workspace;

      const membership = await WorkspaceMember.findOne({
        where: {
          workspaceId: workspace.id,
          userId: req.user.id,
        },
      });

      const isPublic = workspace.visibility === "public";
      const isMember = !!membership;

      if (!isPublic && !isMember) {
        throw new AppError("Access denied", 403);
      }

      if (!isMember) {
        req.permissions = {
          canEdit: false,
          canInvite: false,
          canAssign: false,
          canDelete: false
        };

        res.locals.permissions = req.permissions;
        return next();
      }
      const role = membership.role;
      req.permissions = permissions[role];

      res.locals.permissions = req.permissions;

      return next();
    } catch (error) {
      next(error);
    }
  };
}

export default workspaceAccessMiddleware;