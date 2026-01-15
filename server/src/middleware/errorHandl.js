const STATUS_MAP = {
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

module.exports = {
  errorHandler: (err, req, res, next) => {
    if (err.code && STATUS_MAP[err.code]) {
      return res.status(STATUS_MAP[err.code]).json({
        error: err.code,
        message: err.message,
        details: err.criteria || undefined,
        extra: err.extra || undefined,
      });
    }

    res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "伺服器錯誤",
    });
  },
};
