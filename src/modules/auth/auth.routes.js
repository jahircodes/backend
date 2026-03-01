const { Router } = require('express');
const { buildAuthController } = require('./auth.controller');
const { validate, registerSchema, loginSchema } = require('./auth.validator');

const buildAuthRouter = ({ authService }) => {
  const { register, login } = buildAuthController({ authService });
  const router = Router();

  router.post('/register', validate(registerSchema), register);
  router.post('/login', validate(loginSchema), login);

  return router;
};

module.exports = { buildAuthRouter };
