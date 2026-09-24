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

const getSupportDashboardData = async (userId) => {

    const staff = await prisma.staffProfile.findUnique({
        where: {
            userId
        },
        select: {
            id: true
        }
    });

    if (!staff) {
        const error = new Error('Staff profile not found');

        error.status = 404;

        throw error;
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const [
        openRequests,
        inProgressRequests,
        resolvedToday,
        highPriorityRequests,
        recentRequests
    ] = await Promise.all([

        prisma.request.count({
            where: {
                assignedStaffId: staff.id,
                status: 'PENDING'
            }
        }),

        prisma.request.count({
            where: {
                assignedStaffId: staff.id,
                status: 'IN_PROGRESS'
            }
        }),

        prisma.request.count({
            where: {
                assignedStaffId: staff.id,
                status: 'RESOLVED',
                updatedAt: {
                    gte: startOfToday,
                    lte: endOfToday
                }
            }
        }),

        prisma.request.count({
            where: {
                assignedStaffId: staff.id,
                priority: 'HIGH',
                status: {
                    notIn: ['RESOLVED', 'REJECTED']
                }
            }
        }),

        prisma.request.findMany({
            where: {
                assignedStaffId: staff.id
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 3,
            select: {
                id: true,
                title: true,
                priority: true,
                status: true,
                createdAt: true,
                student: {
                    select: {
                        name: true
                    }
                },
                supportUnit: {
                    select: {
                        name: true
                    }
                }
            }
        })

    ]);

    return {
        openRequests,
        inProgressRequests,
        resolvedToday,
        highPriorityRequests,
        recentRequests
    };
};

const getManagerDashboardData = async (userId) => {

    const manager = await prisma.staffProfile.findUnique({
        where: {
            userId
        },
        select: {
            id: true,
            supportUnitId: true,
            staffRole: true
        }
    });

    if (!manager) {
        const error = new Error('Staff profile not found');

        error.status = 404;

        throw error;
    }

    if (manager.staffRole !== 'MANAGER') {
        const error = new Error('Manager profile required');

        error.status = 403;

        throw error;
    }

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [
        pendingRequests,
        activeRequests,
        students,
        resolvedThisMonth,
        highPriorityPending,
        recentRequests
    ] = await Promise.all([

        prisma.request.count({
            where: {
                supportUnitId: manager.supportUnitId,
                status: 'PENDING'
            }
        }),

        prisma.request.count({
            where: {
                supportUnitId: manager.supportUnitId,
                status: 'IN_PROGRESS'
            }
        }),

        prisma.request.findMany({
            where: {
                supportUnitId: manager.supportUnitId
            },
            select: {
                studentId: true
            },
            distinct: ['studentId']
        }),

        prisma.request.count({
            where: {
                supportUnitId: manager.supportUnitId,
                status: 'RESOLVED',
                updatedAt: {
                    gte: startOfMonth
                }
            }
        }),

        prisma.request.count({
            where: {
                supportUnitId: manager.supportUnitId,
                status: 'PENDING',
                priority: 'HIGH'
            }
        }),

        prisma.request.findMany({
            where: {
                supportUnitId: manager.supportUnitId
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 5,
            select: {
                id: true,
                title: true,
                priority: true,
                status: true,
                createdAt: true,
                student: {
                    select: {
                        name: true
                    }
                },
                assignedStaff: {
                    select: {
                        name: true
                    }
                }
            }
        })

    ]);

    return {
        pendingRequests,
        activeRequests,
        students: students.length,
        resolvedThisMonth,
        highPriorityPending,
        recentRequests
    };
};

const getAdminDashboardData = async () => {

    const [
        students,
        staff,
        requests,
        supportUnits,
        pendingRequests,
        inProgressRequests,
        resolvedRequests,
        rejectedRequests
    ] = await Promise.all([

        prisma.studentProfile.count(),

        prisma.staffProfile.count(),

        prisma.request.count(),

        prisma.supportUnit.count(),

        prisma.request.count({
            where: {
                status: 'PENDING'
            }
        }),

        prisma.request.count({
            where: {
                status: 'IN_PROGRESS'
            }
        }),

        prisma.request.count({
            where: {
                status: 'RESOLVED'
            }
        }),

        prisma.request.count({
            where: {
                status: 'REJECTED'
            }
        })

    ]);

    return {
        students,
        staff,
        requests,
        supportUnits,
        pendingRequests,
        inProgressRequests,
        resolvedRequests,
        rejectedRequests
    };
};

module.exports = {
    getStudentDashboardStats,
    getSupportDashboardData,
    getManagerDashboardData,
    getAdminDashboardData
};