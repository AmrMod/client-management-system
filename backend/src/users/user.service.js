const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all users.
 * @returns {Promise<Array>} List of all users
 */
const getAllUsers = async () => {
    return await prisma.user.findMany();
};

/**
 * Get a single user by ID.
 * @param {number} id - The user ID
 * @returns {Promise<Object>} The user
 */
const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id: Number(id) }
    });

    return user;
};

/**
 * Create a user by admin with an optional role.
 * @param {Object} data - { name, email, password, role }
 * @returns {Promise<Object>} The created user (id, name, email, role, createdAt)
 */
const createUserByAdmin = async ({ name, email, password, role }) => {
    if (!name || !email || !password) {
        const error = new Error('Name, email and password are required');
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
        data: {
            name,
            email,
            password,          // Replace with hashed password later
            role: role || "CLIENT"
        }
    });

    return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt
    };
};

/**
 * Delete a user by ID.
 * @param {number} id - The user ID
 * @returns {Promise<Object>} The deleted user
 */
const deleteUser = async (id) => {
    const user = await prisma.user.delete({
        where: { id: Number(id) }
    });

    return user;
};

/**
 * Update a user by admin.
 * @param {number} id - The user ID
 * @param {Object} data - { name, email, password, role }
 * @returns {Promise<Object>} The updated user
 */
const updateUserByAdmin = async (id, { name, email, password, role }) => {
    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email, password, role }
    });

    return user;
};

/**
 * Update a client's profile (user + client profile).
 * @param {number} id - The user ID (for the user table)
 * @param {Object} data - { userId, name, email, Phone, company, status }
 * @returns {Promise<Object>} { user, clientProfile }
 */
const updateClientProfile = async (id, { userId, name, email, Phone, company, status }) => {
    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email }
    });

    const clientProfile = await prisma.Clientprofile.update({
        where: { userId: Number(userId) },
        data: { Phone, company, status }
    });

    return { user, clientProfile };
};

/**
 * Update a user's password after verifying the current password.
 * @param {number} id - The user ID
 * @param {Object} data - { currentPassword, password }
 * @returns {Promise<Object>} The updated user
 */
const updatePassword = async (id, { currentPassword, password }) => {
    const existingUser = await prisma.user.findUnique({
        where: { id: Number(id) }
    });

    if (existingUser.password != currentPassword) {
        const error = new Error('Current password is incorrect');
        error.status = 400;
        throw error;
    }

    if (!password) {
        const error = new Error('Password is required');
        error.status = 400;
        throw error;
    }

    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { password }
    });

    return user;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUserByAdmin,
    deleteUser,
    updateUserByAdmin,
    updateClientProfile,
    updatePassword
};
