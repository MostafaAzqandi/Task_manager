import AppError from "../utils/AppError.js";

async function authMiddleware(req, res, next) {
  try {
    if (!req.session.userId) throw new AppError("Unauthorized", 401);

    next();
  } catch (error) {
    next(error);
  }
}

export default authMiddleware;
