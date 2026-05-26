function errorHandler(error, req, res, next) {
  console.error(error);

  const status = error.statusCode || 500;
  const message = error.message || "Server Error!";
  if (status === 404) {
    return res.status(404).render("errors/404", {
      error,
    });
  }

  if (status === 403) {
    return res.status(403).render("errors/403", {
      error,
    });
  }

  res.status(500).render("errors/500", {
    message
  });
}

export default errorHandler;
