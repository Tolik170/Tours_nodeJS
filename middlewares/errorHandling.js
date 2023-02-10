const errorMiddleware = (err, req, res, next) => {
  const { status, code, message } = err;

  if (!status && !code) {
    return res.status(500).json({
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message,
    });
  }
  res.status(status).json({
    status,
    code,
    message,
  });
};

module.exports = errorMiddleware;
