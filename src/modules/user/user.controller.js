const { sendSuccess } = require('../../utils/response');
const { wrapAsync } = require('../../utils/wrapAsync');

const buildUserController = ({ userService }) => {
  const listUsers = wrapAsync(async (req, res) => {
    const users = await userService.list();
    return sendSuccess(res, users);
  });

  const getUser = wrapAsync(async (req, res) => {
    const user = await userService.get(req.params.id);
    return sendSuccess(res, user);
  });

  const updateUser = wrapAsync(async (req, res) => {
    const user = await userService.update(req.params.id, req.body);
    return sendSuccess(res, user, 'Updated');
  });

  const deleteUser = wrapAsync(async (req, res) => {
    const result = await userService.remove(req.params.id);
    return sendSuccess(res, result, 'Deleted');
  });

  return { listUsers, getUser, updateUser, deleteUser };
};

module.exports = { buildUserController };
