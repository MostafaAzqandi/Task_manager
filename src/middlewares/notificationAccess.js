import { Notification } from "../models/index.js";
import { routes } from "../utils/routes.js";

async function notificationAccessMiddleware(req, res, next) {
  try {
    const notification = await Notification.findOne({
      where: {
        id: req.params.notificationId,
        userId: req.user.id,
      },
    });

    if (!notification) {
      req.flash("error", "Permission denied");
      return res.redirect(
        routes.workspace(req.workspace.id),
      );
    }

    req.notification = notification;

    next();
  } catch (error) {
    next(error);
  }
}

export default notificationAccessMiddleware;
