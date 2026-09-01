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

    //zod has taken care of this - No need for this anymore
    // if (!userId || !title || !description || !supportUnitId) {
    //     const error = new Error(
    //         'Support unit, title, and description are required'
    //     );

    //     error.status = 400;
    //     throw error;
    // }

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

// const getRequestsByUserId = async (userId) => {

//     const student = await prisma.studentProfile.findUnique({
//         where: {
//             userId
//         },
//         select: {
//             id: true
//         }
//     });

//     if (!student) {
//         const error = new Error('Student profile not found');

//         error.status = 404;
//         throw error;
//     }

//     return await prisma.request.findMany({
//         where: {
//             studentId: student.id
//         },
//         select: {
//             id: true,
//             title: true,
//             priority: true,
//             status: true,
//             createdAt: true,
//             supportUnit: {
//                 select: {
//                     name: true
//                 }
//             }
//         },
//         orderBy: {
//             createdAt: 'asc'
//         }
//     });
// };


const getRequestsByUserId = async (
    userId,
    page,
    limit,
    search,
    sortBy,
    order
) => {

    const skip = (page - 1) * limit;

    // ==========================================
    // FIND STUDENT
    // ==========================================

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


    // ==========================================
    // SEARCH + OWNERSHIP
    // ==========================================

    const where = {
        studentId: student.id,

        ...(search
            ? {
                  OR: [
                      {
                          title: {
                              contains: search
                          }
                      },
                      {
                          supportUnit: {
                              name: {
                                  contains: search
                              }
                          }
                      }
                  ]
              }
            : {})
    };


    // ==========================================
    // DATABASE QUERY
    // ==========================================

    const [requests, totalRequests] = await Promise.all([

        prisma.request.findMany({
            where,

            skip,
            take: limit,

            orderBy: {
                [sortBy]: order
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
            }
        }),

        prisma.request.count({
            where
        })

    ]);


    // ==========================================
    // PAGINATION
    // ==========================================

    const totalPages = Math.ceil(
        totalRequests / limit
    );


    return {
        requests,
        totalRequests,
        totalPages,
        currentPage: page,
        limit,
        sortBy,
        order
    };
};

// const getRequestsByManager = async (userId) => {

//     const manager = await prisma.staffProfile.findUnique({
//         where: {
//             userId
//         },
//         select: {
//             id: true,
//             supportUnitId: true
//         }
//     });

//     if (!manager) {
//         const error = new Error('Staff profile not found');

//         error.status = 404;
//         throw error;
//     }

//     const requests = await prisma.request.findMany({
//         where: {
//             supportUnitId: manager.supportUnitId
//         },
//         select: {
//             id: true,
//             title: true,
//             priority: true,
//             status: true,
//             createdAt: true,

//             student: {
//                 select: {
//                     name: true,
//                     studentId: true
//                 }
//             },

//             assignedStaff: {
//                 select: {
//                     name: true
//                 }
//             }
//         },
//         orderBy: {
//             createdAt: 'desc'
//         }
//     });

//     return requests;
// };

const getRequestsByManager = async ({
    userId,
    page,
    limit,
    search,
    status,
    priority,
    sortBy,
    order
}) => {

    // ==========================================
    // FIND MANAGER
    // ==========================================

    const manager = await prisma.staffProfile.findUnique({
        where: {
            userId
        },
        select: {
            supportUnitId: true
        }
    });

    if (!manager) {
        const error = new Error('Staff profile not found');

        error.status = 404;
        throw error;
    }


    // ==========================================
    // PAGINATION
    // ==========================================

    const skip = (page - 1) * limit;


    // ==========================================
    // SEARCH + FILTER
    // ==========================================

    const where = {
        supportUnitId: manager.supportUnitId,

        ...(search && {
            OR: [
                {
                    title: {
                        contains: search
                    }
                },
                {
                    student: {
                        name: {
                            contains: search
                        }
                    }
                },
                {
                    student: {
                        studentId: {
                            contains: search
                        }
                    }
                }
            ]
        }),

        ...(status && {
            status
        }),

        ...(priority && {
            priority
        })
    };


    // ==========================================
    // DATABASE QUERIES
    // ==========================================

    const [requests, totalRequests] = await Promise.all([

        prisma.request.findMany({
            where,

            skip,
            take: limit,

            orderBy: {
                [sortBy]: order
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
                        id: true,
                        name: true
                    }
                }
            }
        }),

        prisma.request.count({
            where
        })
    ]);


    // ==========================================
    // PAGINATION RESPONSE
    // ==========================================

    const totalPages = Math.ceil(
        totalRequests / limit
    );

    return {
        requests,
        totalRequests,
        totalPages,
        currentPage: page,
        sortBy,
        order
    };
};


const getSupportUnits = async () => {
    return await prisma.supportUnit.findMany({
        orderBy: {
            name: 'asc'
        }
    });
};

const getSupportStaffByManager = async (userId) => {

    const manager = await prisma.staffProfile.findUnique({
        where: {
            userId
        },
        select: {
            supportUnitId: true
        }
    });

    if (!manager) {
        const error = new Error('Staff profile not found');

        error.status = 404;
        throw error;
    }

    const staff = await prisma.staffProfile.findMany({
        where: {
            supportUnitId: manager.supportUnitId,
            staffRole: 'SUPPORT_STAFF'
        },
        select: {
            id: true,
            name: true
        },
        orderBy: {
            name: 'asc'
        }
    });

    return staff;
};

const assignRequest = async (requestId, staffId, managerUserId) => {

    const manager = await prisma.staffProfile.findUnique({
        where: {
            userId: managerUserId
        },
        select: {
            supportUnitId: true
        }
    });

    if (!manager) {
        const error = new Error('Manager profile not found');

        error.status = 404;
        throw error;
    }

    const request = await prisma.request.findUnique({
        where: {
            id: requestId
        },
        select: {
            id: true,
            supportUnitId: true
        }
    });

    if (!request) {
        const error = new Error('Request not found');

        error.status = 404;
        throw error;
    }

    if (request.supportUnitId !== manager.supportUnitId) {
        const error = new Error(
            'You cannot assign a request outside your support unit'
        );

        error.status = 403;
        throw error;
    }

    const staff = await prisma.staffProfile.findUnique({
        where: {
            id: staffId
        },
        select: {
            id: true,
            supportUnitId: true,
            staffRole: true
        }
    });

    if (!staff) {
        const error = new Error('Support staff not found');

        error.status = 404;
        throw error;
    }

    if (staff.staffRole !== 'SUPPORT_STAFF') {
        const error = new Error(
            'Request can only be assigned to support staff'
        );

        error.status = 400;
        throw error;
    }

    if (staff.supportUnitId !== request.supportUnitId) {
        const error = new Error(
            'Support staff does not belong to this support unit'
        );

        error.status = 400;
        throw error;
    }

    const updatedRequest = await prisma.request.update({
        where: {
            id: requestId
        },
        data: {
            assignedStaffId: staffId
        },
        select: {
            id: true,
            title: true,
            status: true,
            priority: true,
            assignedStaff: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    return updatedRequest;
};

// const getSupportRequests = async (userId) => {

//     const staff = await prisma.staffProfile.findUnique({
//         where: {
//             userId
//         },
//         select: {
//             id: true
//         }
//     });

//     if (!staff) {
//         const error = new Error('Staff profile not found');

//         error.status = 404;
//         throw error;
//     }

//     return await prisma.request.findMany({
//         where: {
//             assignedStaffId: staff.id
//         },
//         select: {
//             id: true,
//             title: true,
//             priority: true,
//             status: true,
//             createdAt: true,

//             student: {
//                 select: {
//                     name: true,
//                     studentId: true
//                 }
//             }
//         },
//         orderBy: {
//             createdAt: 'desc'
//         }
//     });
// };

const getSupportRequests = async ({
    userId,
    page,
    limit,
    search,
    status,
    priority,
    sortBy,
    order
}) => {

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

    const skip = (page - 1) * limit;

    const where = {
        assignedStaffId: staff.id,

        ...(search && {
            OR: [
                {
                    title: {
                        contains: search
                    }
                },
                {
                    student: {
                        name: {
                            contains: search
                        }
                    }
                }
            ]
        }),

        ...(status && {
            status
        }),

        ...(priority && {
            priority
        })
    };

    const [requests, totalRequests] = await Promise.all([

        prisma.request.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: order
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
                }
            }
        }),

        prisma.request.count({
            where
        })

    ]);

    return {
        requests,
        pagination: {
            page,
            limit,
            totalRequests,
            totalPages: Math.ceil(totalRequests / limit)
        }
    };
};


const updateRequestStatus = async (
    requestId,
    userId,
    status
) => {

    const allowedStatuses = [
        "PENDING",
        "IN_PROGRESS",
        "RESOLVED",
        "REJECTED"
    ];

    if (!allowedStatuses.includes(status)) {
        const error = new Error("Invalid request status");

        error.status = 400;
        throw error;
    }

    const staff = await prisma.staffProfile.findUnique({
        where: {
            userId
        },
        select: {
            id: true
        }
    });

    if (!staff) {
        const error = new Error("Staff profile not found");

        error.status = 404;
        throw error;
    }

    const request = await prisma.request.findUnique({
        where: {
            id: requestId
        },
        select: {
            id: true,
            assignedStaffId: true
        }
    });

    if (!request) {
        const error = new Error("Request not found");

        error.status = 404;
        throw error;
    }

    if (request.assignedStaffId !== staff.id) {
        const error = new Error(
            "You can only update requests assigned to you"
        );

        error.status = 403;
        throw error;
    }

    return await prisma.request.update({
        where: {
            id: requestId
        },
        data: {
            status
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
            }
        }
    });
};

module.exports = {
    createRequest,
    getRequestsByManager,
    getRequestsByUserId,
    getSupportUnits,
    getSupportStaffByManager,
    assignRequest,
    getSupportRequests,
    updateRequestStatus
};