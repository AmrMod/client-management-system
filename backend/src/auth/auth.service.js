const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Register a new user.
 * @param {Object} data - { name, email, password }
 * @returns {Promise<Object>} The created user
 */
const register = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        const error = new Error('Name, email, and password are required');
        error.status = 400;
        throw error;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        const error = new Error('Email already exists');
        error.status = 400;
        throw error;
    }

    const newUser = await prisma.user.create({
        data: { name, email, password }
    });

    return newUser;
};

/**
 * Authenticate a user by email and password.
 * @param {Object} data - { email, password }
 * @returns {Promise<Object>} The authenticated user
 */
const login = async ({ email, password }) => {
    if (!email || !password) {
        const error = new Error('Email and password are required');
        error.status = 400;
        throw error;
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }

    if (user.password !== password) {
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }

    return user;
};

module.exports = {
    register,
    login
};
