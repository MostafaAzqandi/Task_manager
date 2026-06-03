import { TaskComment, User } from "../models/index.js";
import { logActivity } from "../utils/activityLogger.js";
import { routes } from "../utils/routes.js";

class TaskCommentController {
  async createComment(req, res, next) {
    try {
      if (!req.body.content?.trim()) {
        req.flash("error", "Comment cannot be empty");
        return res.redirect(routes.task(req.workspace.id, req.board.id, req.task.id));
      }
      await TaskComment.create({
        content: req.body.content,
        userId: req.user.id,
        taskId: req.task.id,
      });

      await logActivity({
        taskId: req.task.id,
        userId: req.user.id,
        action: "comment_created",
      });
      req.flash("success", "Comment created");
      return res.redirect(
        routes.task(req.workspace.id, req.board.id, req.task.id),
      );
    } catch (error) {
      next(error);
    }
  }
  async updateComment(req, res, next) {
    try {
      if (!req.body.content?.trim()) {
        req.flash("error", "Comment cannot be empty");
        return res.redirect(
          routes.task(req.workspace.id, req.board.id, req.task.id),
        );
      }
      await req.comment.update({
        content: req.body.content,
      });
      await logActivity({
        taskId: req.task.id,
        userId: req.user.id,
        action: "comment_updated",
      });
      req.flash("success", "Comment changed");
      return res.redirect(
        routes.task(req.workspace.id, req.board.id, req.task.id),
      );
    } catch (error) {
      next(error);
    }
  }
  async deleteComment(req, res, next) {
    try {
      await req.comment.destroy();
      await logActivity({
        taskId: req.task.id,
        userId: req.user.id,
        action: "comment_deleted",
      });
      req.flash("success", "Comment Deleted");
      return res.redirect(
        routes.task(req.workspace.id, req.board.id, req.task.id),
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskCommentController();
