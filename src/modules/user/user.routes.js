const { Router } = require('express');
const { buildUserController } = require('./user.controller');
const { validate, updateUserSchema } = require('./user.validator');
const { rbacMiddleware } = require('../../middlewares/rbac.middleware');

const buildUserRouter = ({ userService }) => {
  const { listUsers, getUser, updateUser, deleteUser } = buildUserController({ userService });
  const router = Router();

  router.get('/', rbacMiddleware(['admin', 'manager']), listUsers);
  router.get('/:id', getUser);
  router.patch('/:id', rbacMiddleware(['admin']), validate(updateUserSchema), updateUser);
  router.delete('/:id', rbacMiddleware(['admin']), deleteUser);

  return router;
};

module.exports = { buildUserRouter };
