const { defineConfig } = require('@prisma/config');
const { loadEnv } = require('./src/config/env');

const env = loadEnv();

module.exports = defineConfig({
  schema: './prisma/schema.prisma',
  datasources: {
    db: {
      provider: 'mysql',
      url: { fromEnvVar: 'DATABASE_URL', value: env.DATABASE_URL },
    },
  },
});
