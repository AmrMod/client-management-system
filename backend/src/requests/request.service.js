const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const notificationService = require('../notifications/notification.service');

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
    priority,
    file
}) => {

    

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

    if (file) {
        await prisma.requestAttachment.create({
            data: {
                requestId: newRequest.id,
                fileName: file.originalname,
                fileUrl: file.path,
                fileType: file.mimetype,
                fileSize: file.size
            }
        });
    }

    await notificationService.createNotification(
        userId,
        "Request Submitted",
        `Your request "${newRequest.title}" has been submitted successfully.`
    );

    const managers =
    await notificationService.getManagersBySupportUnit(
        supportUnitId
    );

    for (const manager of managers) {
        await notificationService.createNotification(
            manager.userId,
            "New Request",
            `A new support request "${newRequest.title}" has been submitted.`
        );
    }

    if (priority === "HIGH") {
        for (const manager of managers) {
            await notificationService.createNotification(
                manager.userId,
                "High-Priority Request",
                `A high-priority request "${newRequest.title}" requires your attention.`
            );
        }
    }

    return newRequest;
};



const getRecentRequests = async (userId) => {

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
            status: true,
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 3
    });

};


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
                },

                attachments: {
                    select: {
                        id: true,
                        fileName: true,
                        fileType: true,
                        fileSize: true
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
                },

                attachments: {
                    select: {
                        id: true,
                        fileName: true,
                        fileType: true,
                        fileSize: true
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
        where: { id: requestId },
        select: {
            id: true,
            supportUnitId: true,
            student: {
                select: {
                    userId: true
                }
            }
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
            userId: true,
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

    await notificationService.createNotification(
        request.student.userId,
        "Request Assigned",
        `Your request "${updatedRequest.title}" has been assigned to ${updatedRequest.assignedStaff.name}.`
    );

    await notificationService.createNotification(
        staff.userId,
        "New Request Assigned",
        `Request "${updatedRequest.title}" has been assigned to you.`
    );

    return updatedRequest;
};



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
                },

                attachments: {
                    select: {
                        id: true,
                        fileName: true,
                        fileType: true,
                        fileSize: true
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
        where: { id: requestId },
        select: {
            id: true,
            assignedStaffId: true,
            supportUnitId: true,
            title: true,
            student: {
                    select: {
                    userId: true
                }
            }
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

    const updatedRequest = await prisma.request.update({
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

    await notificationService.createNotification(
        request.student.userId,
        status === "RESOLVED"
            ? "Request Resolved"
            : "Request Updated",
        status === "RESOLVED"
            ? `Your request "${request.title}" has been resolved.`
            : `Your request "${request.title}" status changed to ${status
                .replace("_", " ")
                .toLowerCase()}.`
    );

    const managers =
    await notificationService.getManagersBySupportUnit(
        request.supportUnitId
    );

    for (const manager of managers) {
        await notificationService.createNotification(
            manager.userId,
            status === "RESOLVED"
                ? "Request Resolved"
                : "Request Status Changed",
            status === "RESOLVED"
                ? `Request "${request.title}" has been resolved.`
                : `Request "${request.title}" status changed to ${status
                    .replace("_", " ")
                    .toLowerCase()}.`
        );
    }

    return updatedRequest;
};



const getRequestAttachment = async (requestId, userId, role) => {

    let requestWhere;

    // =========================
    // STUDENT
    // =========================

    if (role === "STUDENT") {

        const student = await prisma.studentProfile.findUnique({
            where: {
                userId
            },
            select: {
                id: true
            }
        });

        if (!student) {
            const error = new Error("Student profile not found");
            error.status = 404;
            throw error;
        }

        requestWhere = {
            id: requestId,
            studentId: student.id
        };
    }


    // =========================
    // STAFF
    // =========================

    else if (role === "STAFF") {

        const staff = await prisma.staffProfile.findUnique({
            where: {
                userId
            },
            select: {
                id: true,
                staffRole: true,
                supportUnitId: true
            }
        });

        if (!staff) {
            const error = new Error("Staff profile not found");
            error.status = 404;
            throw error;
        }


        // MANAGER
        if (staff.staffRole === "MANAGER") {

            requestWhere = {
                id: requestId,
                supportUnitId: staff.supportUnitId
            };
        }


        // SUPPORT STAFF
        else if (staff.staffRole === "SUPPORT_STAFF") {

            requestWhere = {
                id: requestId,
                assignedStaffId: staff.id
            };
        }


        else {
            const error = new Error("Access denied");
            error.status = 403;
            throw error;
        }
    }


    else {
        const error = new Error("Access denied");
        error.status = 403;
        throw error;
    }


    // =========================
    // FIND REQUEST + ATTACHMENT
    // =========================

    const request = await prisma.request.findFirst({
        where: requestWhere,
        select: {
            attachments: {
                take: 1,
                select: {
                    fileName: true,
                    fileUrl: true
                }
            }
        }
    });

    if (!request) {
        const error = new Error("Request not found");
        error.status = 404;
        throw error;
    }


    const attachment = request.attachments[0];

    if (!attachment) {
        const error = new Error("No attachment found");
        error.status = 404;
        throw error;
    }

    return attachment;
};

const getManagerStudentSummary = async ({
    userId,
    page,
    limit,
    search
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
        const error = new Error("Staff profile not found");

        error.status = 404;
        throw error;
    }


    // ==========================================
    // PAGINATION
    // ==========================================

    const skip = (page - 1) * limit;


    // ==========================================
    // STUDENT FILTER
    // ==========================================

    const studentWhere = {

        requests: {
            some: {
                supportUnitId: manager.supportUnitId
            }
        },

        ...(search && {
            OR: [
                {
                    name: {
                        contains: search
                    }
                },
                {
                    studentId: {
                        contains: search
                    }
                }
            ]
        })
    };


    // ==========================================
    // GET STUDENTS
    // ==========================================

    const [students, totalStudents] = await Promise.all([

        prisma.studentProfile.findMany({
            where: studentWhere,

            skip,
            take: limit,

            select: {
                id: true,
                studentId: true,
                name: true,

                _count: {
                    select: {
                        requests: {
                            where: {
                                supportUnitId:
                                    manager.supportUnitId
                            }
                        }
                    }
                }
            }
        }),

        prisma.studentProfile.count({
            where: studentWhere
        })
    ]);


    // ==========================================
    // GET ACTIVE REQUEST COUNTS
    // ==========================================

    const studentIds = students.map(
        (student) => student.id
    );

    const activeRequests = await prisma.request.groupBy({
        by: ["studentId"],

        where: {
            supportUnitId: manager.supportUnitId,

            studentId: {
                in: studentIds
            },

            status: "IN_PROGRESS"
        },

        _count: {
            id: true
        }
    });


    // ==========================================
    // FORMAT RESPONSE
    // ==========================================

    const summary = students.map((student) => {

        const active = activeRequests.find(
            (item) =>
                item.studentId === student.id
        );

        return {
            studentId: student.studentId,
            name: student.name,
            requests: student._count.requests,
            activeRequests: active?._count.id || 0
        };
    });


    // ==========================================
    // PAGINATION RESPONSE
    // ==========================================

    const totalPages = Math.ceil(
        totalStudents / limit
    );

    return {
        students: summary,
        totalStudents,
        totalPages,
        currentPage: page
    };
};

const getManagerStaffSummary = async ({
    userId,
    page,
    limit,
    search,
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
        const error = new Error("Staff profile not found");

        error.status = 404;
        throw error;
    }


    // ==========================================
    // PAGINATION
    // ==========================================

    const skip = (page - 1) * limit;


    // ==========================================
    // SEARCH
    // ==========================================

    const where = {
        supportUnitId: manager.supportUnitId,

        staffRole: "SUPPORT_STAFF",

        ...(search && {
            name: {
                contains: search
            }
        })
    };


    // ==========================================
    // GET STAFF
    // ==========================================

    const [staff, totalStaff] = await Promise.all([

        prisma.staffProfile.findMany({
            where,

            skip,
            take: limit,

            orderBy: {
                [sortBy]: order
            },

            select: {
                id: true,
                name: true,

                supportUnit: {
                    select: {
                        name: true
                    }
                },

                _count: {
                    select: {
                        requests: true
                    }
                }
            }
        }),

        prisma.staffProfile.count({
            where
        })
    ]);


    // ==========================================
    // GET RESOLVED COUNTS
    // ==========================================

    const staffIds = staff.map(
        (member) => member.id
    );

    const resolvedRequests = await prisma.request.groupBy({
        by: ["assignedStaffId"],

        where: {
            assignedStaffId: {
                in: staffIds
            },

            status: "RESOLVED"
        },

        _count: {
            id: true
        }
    });


    // ==========================================
    // FORMAT RESPONSE
    // ==========================================

    const summary = staff.map((member) => {

        const resolved = resolvedRequests.find(
            (item) =>
                item.assignedStaffId === member.id
        );

        return {
            id: member.id,
            name: member.name,
            supportUnit: member.supportUnit.name,
            requests: member._count.requests,
            resolved: resolved?._count.id || 0
        };
    });


    // ==========================================
    // PAGINATION RESPONSE
    // ==========================================

    const totalPages = Math.ceil(
        totalStaff / limit
    );

    return {
        staff: summary,
        totalStaff,
        totalPages,
        currentPage: page,
        sortBy,
        order
    };
};

const getAllRequestsForAdmin = async ({
    page,
    limit,
    search,
    status,
    priority,
    supportUnitId,
    sortBy,
    order
}) => {

    // ==========================================
    // PAGINATION
    // ==========================================

    const skip = (page - 1) * limit;


    // ==========================================
    // SEARCH + FILTER
    // ==========================================

    const where = {

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
        }),

        ...(supportUnitId && {
            supportUnitId
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

                supportUnit: {
                    select: {
                        id: true,
                        name: true
                    }
                },

                assignedStaff: {
                    select: {
                        id: true,
                        name: true
                    }
                },

                attachments: {
                    select: {
                        id: true,
                        fileName: true,
                        fileType: true,
                        fileSize: true
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
        limit,
        sortBy,
        order
    };
};



module.exports = {
    createRequest,
    getRequestsByManager,
    getRequestsByUserId,
    getSupportUnits,
    getSupportStaffByManager,
    assignRequest,
    getSupportRequests,
    updateRequestStatus, 
    getRequestAttachment,
    getRecentRequests,
    getManagerStudentSummary,
    getManagerStaffSummary,
    getAllRequestsForAdmin
};