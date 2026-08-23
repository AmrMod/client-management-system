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

    if (!userId || !title || !description || !supportUnitId) {
        const error = new Error(
            'Support unit, title, and description are required'
        );

        error.status = 400;
        throw error;
    }

    // Find the student's profile using the authenticated user's ID
    const student = await prisma.studentProfile.findUnique({
        where: {
            userId: userId
        }
    });

    if (!student) {
        const error = new Error('Student profile not found');

        error.status = 404;
        throw error;
    }

    // Create the request using the StudentProfile ID
    const newRequest = await prisma.request.create({
        data: {
            studentId: student.id,
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

const getRequestsByUserId = async (userId) => {

    const student = await prisma.studentProfile.findUnique({
        where: {
            userId
        },
        select: {
            id: true
        }
    });

    if (!student) {
        const error = new Error('Student profile not found');

        error.status = 404;
        throw error;
    }

    return await prisma.request.findMany({
        where: {
            studentId: student.id
        },
        select: {
            id: true,
            title: true,
            priority: true,
            status: true,
            createdAt: true,
            supportUnit: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
};

const getRequestsByManager = async (userId) => {

    const manager = await prisma.staffProfile.findUnique({
        where: {
            userId
        },
        select: {
            id: true,
            supportUnitId: true
        }
    });

    if (!manager) {
        const error = new Error('Staff profile not found');

        error.status = 404;
        throw error;
    }

    const requests = await prisma.request.findMany({
        where: {
            supportUnitId: manager.supportUnitId
        },
        select: {
            id: true,
            title: true,
            priority: true,
            status: true,
            createdAt: true,

            student: {
                select: {
                    name: true,
                    studentId: true
                }
            },

            assignedStaff: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return requests;
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
    getRequestsByManager,
    getRequestsByUserId,
    getSupportUnits
};