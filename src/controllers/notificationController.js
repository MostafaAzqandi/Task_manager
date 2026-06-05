import { Notification } from "../models/index.js";

class NotificationController {
  async read(req, res, next) {
    try {
      const notification = req.notification;
      notification.isRead = true;

      await notification.save();
      return res.json({
        success: true,
        id: notification.id
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController();
