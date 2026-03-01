const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { rateLimiter } = require('./middlewares/rateLimit.middleware');
const { errorHandler } = require('./middlewares/error.middleware');
const { authMiddleware } = require('./middlewares/auth.middleware');
const { requestIdMiddleware } = require('./middlewares/requestId.middleware');
const { getPrismaClient } = require('./database/prismaClient');
const { createAuthRepository } = require('./modules/auth/auth.repository');
const { createAuthService } = require('./modules/auth/auth.service');
const { buildAuthRouter } = require('./modules/auth/auth.routes');
const { createUserRepository } = require('./modules/user/user.repository');
const { buildUserService } = require('./modules/user/user.service');
const { buildUserRouter } = require('./modules/user/user.routes');
const { ApiError } = require('./shared/ApiError');
const { logger } = require('./config/logger');
const { sendSuccess } = require('./utils/response');

const app = express();

const prisma = getPrismaClient();
const authRepository = createAuthRepository({ prisma });
const authService = createAuthService({ authRepository });
const authRoutes = buildAuthRouter({ authService });
const userRepository = createUserRepository({ prisma });
const userService = buildUserService({ userRepository });
const userRoutes = buildUserRouter({ userService });

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(requestIdMiddleware);

app.use(rateLimiter);

app.get('/api', (req, res) => {
  sendSuccess(res, { status: 'ok' }, 'Welcome to the API');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);

app.use((req, res, next) => {
  next(new ApiError('Route not found', 404));
});

app.use(errorHandler(logger));

module.exports = { app };
