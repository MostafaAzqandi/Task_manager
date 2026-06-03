import { Board } from "../models/index.js";

async function globalMiddleware(req, res, next) {
  res.locals.user = req.user || null;
  res.locals.flash = {
    error: req.flash("error")[0] || null,
    success: req.flash("success")[0] || null,
  };
  if (req.user) {
    res.locals.workspaces = await req.user.getWorkspaces({
      include: [Board],
    });
  }
  res.locals.currentWorkspaceId = req.workspace?.id || null;
  next();
}

export default globalMiddleware;
