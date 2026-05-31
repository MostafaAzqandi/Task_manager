function globalMiddleware(req, res, next) {
  res.locals.user = req.user || null;
  res.locals.flash = {
    error: req.flash("error")[0] || null,
    success: req.flash("success")[0] || null
  }

  next();
}

export default globalMiddleware;
