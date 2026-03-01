const jwt = require('jsonwebtoken');
const { loadEnv } = require('../config/env');

const createTokenSigner =
  ({ secret, expiresIn }) =>
  (payload) =>
    jwt.sign(payload, secret, { expiresIn });

const buildUserTokenPayload = (user) => ({
  sub: user.id,
  email: user.email,
  role: user.role,
});

const getDefaultTokenSigner = () => {
  const env = loadEnv();
  return createTokenSigner({ secret: env.JWT_SECRET, expiresIn: env.JWT_EXPIRES_IN });
};

module.exports = { createTokenSigner, buildUserTokenPayload, getDefaultTokenSigner };
