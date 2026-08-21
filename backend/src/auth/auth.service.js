const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt");
const { generateToken } = require("./auth.utils");



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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword }
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
        const error = new Error("Email and password are required");
        error.status = 400;
        throw error;
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        const error = new Error("Invalid credentials");
        error.status = 401;
        throw error;
    }

    // Compare plain-text password with stored hash
    const passwordMatches = await bcrypt.compare(
        password,
        user.password
    );


    if (!passwordMatches) {
        const error = new Error("Invalid credentials");
        error.status = 401;
        throw error;
    }

    //jwt creation
    const token = generateToken(user);

    // Never return the password/hash to the frontend
    // return {
    //     id: user.id,
    //     email: user.email,
    //     role: user.role,
    //     createdAt: user.createdAt,
    // };

    //return token added
    return {
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        },
        token,
    };
};

module.exports = {
    register,
    login
};
