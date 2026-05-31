import AppError from "../utils/AppError.js";
import { Task, User } from "../models/index.js";

async function taskAccessMiddleware(req, res, next) {
    try {
        const task = await Task.findOne({
            where:{
                id: req.params.taskId,
                boardId: req.params.boardId
            },
            include: {
                model: User,
                as: "creator"
            }
        });

        if (!task) throw new AppError("Task not found", 404);
        req.task = task;
        next();
    } catch (error) {
        next(error)
    }
}

export default taskAccessMiddleware;