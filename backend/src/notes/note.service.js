const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all notes for a specific user.
 * @param {number} userId - The user ID
 * @returns {Promise<Array>} List of notes
 */
const getNotesByUserId = async (userId) => {
    const notes = await prisma.userNote.findMany({
        where: { userId: Number(userId) },
        orderBy: { createdAt: 'desc' }
    });

    return notes;
};

/**
 * Get a single note by ID.
 * @param {number} id - The note ID
 * @returns {Promise<Object>} The note
 */
const getNoteById = async (id) => {
    const note = await prisma.userNote.findUnique({
        where: { id: Number(id) }
    });

    if (!note) {
        const error = new Error('Note not found');
        error.status = 404;
        throw error;
    }

    return note;
};

/**
 * Create a new note for a user.
 * @param {Object} data - { userId, title, content }
 * @returns {Promise<Object>} The created note
 */
const createNote = async ({ userId, title, content }) => {
    if (!userId || !title || !content) {
        const error = new Error('userId, title, and content are required');
        error.status = 400;
        throw error;
    }

    const note = await prisma.userNote.create({
        data: {
            userId: Number(userId),
            title,
            content
        }
    });

    return note;
};

/**
 * Update an existing note.
 * @param {number} id - The note ID
 * @param {Object} data - { title, content }
 * @returns {Promise<Object>} The updated note
 */
const updateNote = async (id, { title, content }) => {
    const note = await prisma.userNote.update({
        where: { id: Number(id) },
        data: { title, content }
    });

    return note;
};

/**
 * Delete a note by ID.
 * @param {number} id - The note ID
 * @returns {Promise<Object>} The deleted note
 */
const deleteNote = async (id) => {
    const note = await prisma.userNote.delete({
        where: { id: Number(id) }
    });

    return note;
};

module.exports = {
    getNotesByUserId,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};
