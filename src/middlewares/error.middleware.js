const { ApiError } = require('../shared/ApiError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (logger) => (err, req, res, _next) => {
  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  logger.error({ err, path: req.path }, 'Request error');

  res.status(statusCode).json({
    success: false,
    message,
    code: statusCode,
    requestId: res.locals.requestId,
  });
};

module.exports = { errorHandler };
