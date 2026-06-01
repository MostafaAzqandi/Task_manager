import { TaskComment, User } from "../models/index.js";
import { routes } from "../utils/routes.js";

class TaskCommentController {
  async createComment(req, res, next) {
    try {
      await TaskComment.create({
        content: req.body.content,
        userId: req.user.id,
        taskId: req.task.id
      });
      req.flash("success", "Comment submited successfuly");
    } catch (error) {
      next(error);
    }
  }
  async updateComment(req, res, next) {}
  async deleteComment(req, res, next) {}
}

export default new TaskCommentController();