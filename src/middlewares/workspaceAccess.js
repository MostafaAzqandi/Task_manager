import AppError from "../utils/AppError.js";
import { Workspace, WorkspaceMember } from "../models/index.js";

function workspaceAccessMiddleware(mode) {
  return async (req, res, next) => {
    try {
      const workspace = await Workspace.findByPk(
        req.params.workspaceId
      );

      if (!workspace) {
        throw new AppError(
          "Workspace not found",
          404
        );
      }

      // VIEW MODE → public allowed
      if (mode === "view") {
        if (
          workspace.visibility === "public"
        ) {
          req.workspace = workspace;
          return next();
        }
      }

      // EDIT MODE → always require membership
      const membership =
        await WorkspaceMember.findOne({
          where: {
            workspaceId: workspace.id,
            userId: req.user.id,
          },
        });

      if (!membership) {
        throw new AppError(
          "Access denied",
          403
        );
      }

      req.workspace = workspace;
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default workspaceAccessMiddleware;