import { User } from "../models/index.js";

async function loadUserMiddleware(req, res, next) {
  try {
    if (req.session.userId) {
      const user = await User.findByPk(req.session.userId);

      req.user = user;
    }

    next();
  } catch (error) {
    next(error);
  }
}

export default loadUserMiddleware;
