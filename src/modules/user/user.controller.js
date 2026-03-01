const { sendSuccess } = require('../../utils/response');

const buildUserController = ({ userService }) => {
  const listUsers = async (req, res, next) => {
    try {
      const users = await userService.list();
      return sendSuccess(res, users);
    } catch (err) {
      return next(err);
    }
  };

  const getUser = async (req, res, next) => {
    try {
      const user = await userService.get(req.params.id);
      return sendSuccess(res, user);
    } catch (err) {
      return next(err);
    }
  };

  const updateUser = async (req, res, next) => {
    try {
      const user = await userService.update(req.params.id, req.body);
      return sendSuccess(res, user, 'Updated');
    } catch (err) {
      return next(err);
    }
  };

  const deleteUser = async (req, res, next) => {
    try {
      const result = await userService.remove(req.params.id);
      return sendSuccess(res, result, 'Deleted');
    } catch (err) {
      return next(err);
    }
  };

  return { listUsers, getUser, updateUser, deleteUser };
};

module.exports = { buildUserController };
