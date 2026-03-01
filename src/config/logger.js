const pino = require('pino');
const { loadEnv } = require('./env');

const env = loadEnv();

const logger = pino({
  level: env.LOG_LEVEL,
  transport:
    env.NODE_ENV !== 'production'
      ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:standard' } }
      : undefined,
});

module.exports = { logger };
