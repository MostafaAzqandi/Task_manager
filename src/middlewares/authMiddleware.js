async function authMiddleware(req, res, next) {
  try {
    if (!req.session.userId)
      return res.status(401).json({ error: "Unauthorized!" });

    next();
  } catch (error) {
    res.status(500).json({ error: "Server Error!" });
  }
}

export default authMiddleware;
