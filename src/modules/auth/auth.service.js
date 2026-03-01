const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../../utils/hash');
const { ApiError } = require('../../shared/ApiError');
const { loadEnv } = require('../../config/env');

const env = loadEnv();

const buildSignToken = (signingEnv) => (user) =>
  jwt.sign({ sub: user.id, email: user.email, role: user.role }, signingEnv.JWT_SECRET, {
    expiresIn: signingEnv.JWT_EXPIRES_IN,
  });

const createAuthService = ({ authRepository, signToken = buildSignToken(env) }) => {
  const register = async (payload) => {
    const existing = await authRepository.findByEmail(payload.email);
    if (existing) {
      throw new ApiError('Email already in use', 409);
    }
    const hashed = await hashPassword(payload.password);
    const user = await authRepository.create({
      email: payload.email,
      password: hashed,
      role: payload.role || 'user',
    });
    return { id: user.id, token: signToken(user) };
  };

  const login = async (payload) => {
    const user = await authRepository.findByEmail(payload.email);
    if (!user) {
      throw new ApiError('Invalid credentials', 401);
    }
    const match = await comparePassword(payload.password, user.password);
    if (!match) {
      throw new ApiError('Invalid credentials', 401);
    }
    return { id: user.id, token: signToken(user) };
  };

  return { register, login };
};

module.exports = { createAuthService };
