const { ApiError } = require('../shared/ApiError');

const rbacMiddleware =
  (allowedRoles = []) =>
  (req, res, next) => {
    const role = req.user?.role;
    if (!role) {
      return next(new ApiError('Forbidden', 403));
    }
    if (allowedRoles.length && !allowedRoles.includes(role)) {
      return next(new ApiError('Forbidden', 403));
    }
    return next();
  };

module.exports = { rbacMiddleware };
