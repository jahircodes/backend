const { sendSuccess } = require('../../utils/response');
const { wrapAsync } = require('../../utils/wrapAsync');

const buildAuthController = ({ authService }) => {
  const register = wrapAsync(async (req, res) => {
    const result = await authService.register(req.body);
    return sendSuccess(res, result, 'Registered');
  });

  const login = wrapAsync(async (req, res) => {
    const result = await authService.login(req.body);
    return sendSuccess(res, result, 'Logged in');
  });

  return { register, login };
};

module.exports = { buildAuthController };
