const { PrismaClient } = require('@prisma/client');

const createPrismaClient = () => new PrismaClient();

// Single shared instance for the app; tests can create isolated clients via createPrismaClient.
const prisma = createPrismaClient();

const getPrismaClient = () => prisma;

module.exports = { createPrismaClient, getPrismaClient, prisma };
