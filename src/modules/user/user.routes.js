const { Router } = require('express');
const { buildUserController } = require('./user.controller');
const { validate, updateUserSchema } = require('./user.validator');

const buildUserRouter = ({ userService }) => {
  const { getAllUsers, getUser, updateUser, deleteUser } = buildUserController({ userService });
  const router = Router();

  router.get('/', getAllUsers);
  router.get('/:id', getUser);
  router.patch('/:id', validate(updateUserSchema), updateUser);
  router.delete('/:id', deleteUser);

  return router;
};

module.exports = { buildUserRouter };
