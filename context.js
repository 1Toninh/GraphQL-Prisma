const { PrismaClient } = require('@prisma/client')

const prismaClient = new PrismaClient();

const context = {
    prisma: prismaClient,
}

module.exports = {
    context: context,
}