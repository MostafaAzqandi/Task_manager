import { TaskComment } from "../models";

class taskCommentController {
  async createComment(req, res, next) {
    try {
      await TaskComment.create({
        content: req.body.content,
        userId: req.user.id,
        taskId: req.task.id
      });
    } catch (error) {
      next(error);
    }
  }
  async getComments(req, res, next) {
    try {
      const comments = await TaskComment.findAll({
        where: {
          taskId: req.task.id,
        }
      });
    } catch (error) {
      next(error);
    }
  }
  async updateComment(req, res, next) {}
  async deleteComment(req, res, next) {}
}
