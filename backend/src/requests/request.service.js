const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Create a new request.
 *
 * @param {Object} data
 * @param {number} data.userId
 * @param {string} data.title
 * @param {string} data.description
 * @param {string} [data.priority]
 * @returns {Promise<Object>}
 */
const createRequest = async ({
    userId,
    supportUnitId,
    title,
    description,
    priority
}) => {

    if (!userId || !title || !description) {
        const error = new Error(
            'User ID, title, and description are required'
        );

        error.status = 400;
        throw error;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        const error = new Error('User not found');

        error.status = 404;
        throw error;
    }

    const newRequest = await prisma.request.create({
        data: {
            userId,
            supportUnitId,
            title,
            description,
            priority



            
            //if priority is optional.
            // if (priority) {
            //     data.priority = priority;
            // }


        }
    });

    return newRequest;
};

const getSupportUnits = async () => {
    return await prisma.supportUnit.findMany({
        orderBy: {
            name: 'asc'
        }
    });
};


module.exports = {
    createRequest,
    getSupportUnits
};