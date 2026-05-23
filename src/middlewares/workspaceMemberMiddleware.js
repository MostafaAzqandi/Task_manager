import { WorkspaceMember } from "../models/index.js";
async function workspaceMemberMiddleware(req, res, next) {
  try {
    const workspaceId = req.params.workspaceId;
    const membership = await WorkspaceMember.findOne({
      where: {
        workspaceId,
        userId: req.user.id
      }
    });
    if (!membership) {
      return res.status(403).json({
        error: "Access denied!",
      });
    }
    req.membership = membership;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error!" });
  }
}

export default workspaceMemberMiddleware;
