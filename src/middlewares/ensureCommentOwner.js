import { TaskComment } from "../models/index.js";
import { routes } from "../utils/routes.js";

async function ensureCommentOwner(req, res, next) {
  try {
    const comment = await TaskComment.findOne({
      where: {
        id: req.params.commentId,
        taskId: req.task.id,
        userId: req.user.id,
      },
    });

    if (!comment) {
      req.flash("error", "Comment not found or no permission");
      return res.redirect(
        routes.task(req.workspace.id, req.board.id, req.task.id),
      );
    }

    req.comment = comment;

    next();
  } catch (error) {
    next(error);
  }
}

export default ensureCommentOwner;
