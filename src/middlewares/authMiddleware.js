import { User } from "../models/index.js";
async function authMiddleware(req, res, next) {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Unauthorized!" });

    const user = await User.findByPk(req.session.userId);

    if (!user) return res.status(401).json({ error: "User not found!" });
    req.user = user;

    next();

  } catch (error) {
    res.status(500).json({ error: "Server Error!" });
  }
}

export default authMiddleware;