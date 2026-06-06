import { Board, Notification } from "../models/index.js";

async function globalMiddleware(req, res, next) {
  res.locals.user = req.user || null;
  res.locals.flash = {
    error: req.flash("error")[0] || null,
    success: req.flash("success")[0] || null,
  };
  res.locals.notifications = req.user
    ? await req.user.getNotifications({
        order: [["createdAt", "DESC"]],
        limit: 5,
      })
    : [];
  next();
}

export default globalMiddleware;
