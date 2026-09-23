const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getStudentDashboardStats = async (userId) => {

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

    const [
        totalRequests,
        pendingRequests,
        inProgressRequests,
        resolvedRequests,
        rejectedRequests
    ] = await Promise.all([

        prisma.request.count({
            where: {
                studentId: student.id
            }
        }),

        prisma.request.count({
            where: {
                studentId: student.id,
                status: 'PENDING'
            }
        }),

        prisma.request.count({
            where: {
                studentId: student.id,
                status: 'IN_PROGRESS'
            }
        }),

        prisma.request.count({
            where: {
                studentId: student.id,
                status: 'RESOLVED'
            }
        }),

        prisma.request.count({
            where: {
                studentId: student.id,
                status: 'REJECTED'
            }
        })

    ]);

    return {
        totalRequests,
        pendingRequests,
        inProgressRequests,
        resolvedRequests,
        rejectedRequests
    };
};

module.exports = {
    getStudentDashboardStats
};