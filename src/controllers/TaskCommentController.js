import { TaskComment, User } from "../models/index.js";
import { routes } from "../utils/routes.js";

class TaskCommentController {
  async createComment(req, res, next) {
    try {
      await TaskComment.create({
        content: req.body.content,
        userId: req.user.id,
        taskId: req.task.id,
      });
      req.flash("success", "Comment submited successfuly");
      return res.redirect(routes.task(req.workspace.id, req.board.id, req.task.id));
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
