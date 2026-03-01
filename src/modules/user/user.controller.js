const { sendSuccess } = require('../../utils/response');
const { wrapAsync } = require('../../utils/wrapAsync');

const buildUserController = ({ userService }) => {
  const listUsers = wrapAsync(async (req, res) => {
    const users = await userService.listUsers();
    return sendSuccess(res, users);
  });

  const getUser = wrapAsync(async (req, res) => {
    const user = await userService.getUser(req.params.id);
    return sendSuccess(res, user);
  });

  const updateUser = wrapAsync(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    return sendSuccess(res, user, 'Updated');
  });

  const deleteUser = wrapAsync(async (req, res) => {
    const result = await userService.deleteUser(req.params.id);
    return sendSuccess(res, result, 'Deleted');
  });

  return { listUsers, getUser, updateUser, deleteUser };
};

module.exports = { buildUserController };
