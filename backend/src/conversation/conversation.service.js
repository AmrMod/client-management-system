const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createConversation = async (userId, supportUnitId) => {
    const student = await prisma.studentProfile.findUnique({
        where: { userId },
        select: { id: true }
    });

    if (!student) {
        const error = new Error('Student profile not found');
        error.status = 404;
        throw error;
    }

    const supportUnit = await prisma.supportUnit.findUnique({
        where: { id: supportUnitId },
        select: { id: true, name: true }
    });

    if (!supportUnit) {
        const error = new Error('Support unit not found');
        error.status = 404;
        throw error;
    }

    const existingConversation = await prisma.conversation.findUnique({
        where: {
            studentId_supportUnitId: {
                studentId: student.id,
                supportUnitId
            }
        },
        select: {
            id: true,
            studentId: true,
            supportUnitId: true,
            createdAt: true,
            updatedAt: true,
            supportUnit: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    if (existingConversation) {
        return existingConversation;
    }

    return await prisma.conversation.create({
        data: {
            studentId: student.id,
            supportUnitId
        },
        select: {
            id: true,
            studentId: true,
            supportUnitId: true,
            createdAt: true,
            updatedAt: true,
            supportUnit: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
};


const getMyConversations = async (userId) => {
    const student = await prisma.studentProfile.findUnique({
        where: { userId },
        select: { id: true }
    });

    if (!student) {
        const error = new Error('Student profile not found');
        error.status = 404;
        throw error;
    }

    return await prisma.conversation.findMany({
        where: {
            studentId: student.id
        },
        select: {
            id: true,
            supportUnitId: true,
            createdAt: true,
            updatedAt: true,
            supportUnit: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });
};


const createMessage = async ({
    userId,
    role,
    conversationId,
    content
}) => {
    let senderId;
    let senderType;

    // Student sending message
    if (role === 'STUDENT') {
        const student = await prisma.studentProfile.findUnique({
            where: { userId },
            select: { id: true }
        });

        if (!student) {
            const error = new Error('Student profile not found');
            error.status = 404;
            throw error;
        }

        senderId = student.id;
        senderType = 'STUDENT';
    }

    // Staff sending message
    else if (role === 'STAFF') {
        const staff = await prisma.staffProfile.findUnique({
            where: { userId },
            select: {
                id: true,
                supportUnitId: true
            }
        });

        if (!staff) {
            const error = new Error('Staff profile not found');
            error.status = 404;
            throw error;
        }

        senderId = staff.id;
        senderType = 'STAFF';

        // Staff can only message conversations belonging
        // to their own support unit
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            select: {
                id: true,
                supportUnitId: true
            }
        });

        if (!conversation) {
            const error = new Error('Conversation not found');
            error.status = 404;
            throw error;
        }

        if (conversation.supportUnitId !== staff.supportUnitId) {
            const error = new Error(
                'You are not authorized to message this conversation'
            );
            error.status = 403;
            throw error;
        }
    }

    else {
        const error = new Error('You are not authorized to send messages');
        error.status = 403;
        throw error;
    }

    // Check student's conversation ownership
    if (role === 'STUDENT') {
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            select: {
                id: true,
                studentId: true
            }
        });

        if (!conversation) {
            const error = new Error('Conversation not found');
            error.status = 404;
            throw error;
        }

        if (conversation.studentId !== senderId) {
            const error = new Error(
                'You are not authorized to message this conversation'
            );
            error.status = 403;
            throw error;
        }
    }

    const message = await prisma.message.create({
        data: {
            conversationId,
            senderId,
            senderType,
            content
        },
        select: {
            id: true,
            conversationId: true,
            senderId: true,
            senderType: true,
            content: true,
            createdAt: true
        }
    });

    return {
        ...message,
        senderType: message.senderType.toLowerCase()
    };
};


const getMessages = async ({
    userId,
    role,
    conversationId
}) => {
    let conversation;

    if (role === 'STUDENT') {
        const student = await prisma.studentProfile.findUnique({
            where: { userId },
            select: { id: true }
        });

        if (!student) {
            const error = new Error('Student profile not found');
            error.status = 404;
            throw error;
        }

        conversation = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
                studentId: student.id
            },
            select: {
                id: true
            }
        });
    }

    else if (role === 'STAFF') {
        const staff = await prisma.staffProfile.findUnique({
            where: { userId },
            select: {
                id: true,
                supportUnitId: true
            }
        });

        if (!staff) {
            const error = new Error('Staff profile not found');
            error.status = 404;
            throw error;
        }

        conversation = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
                supportUnitId: staff.supportUnitId
            },
            select: {
                id: true
            }
        });
    }

    else {
        const error = new Error(
            'You are not authorized to view this conversation'
        );
        error.status = 403;
        throw error;
    }

    if (!conversation) {
        const error = new Error('Conversation not found');
        error.status = 404;
        throw error;
    }

    const messages = await prisma.message.findMany({
        where: {
            conversationId
        },
        select: {
            id: true,
            conversationId: true,
            senderId: true,
            senderType: true,
            content: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    return messages.map(message => ({
        ...message,
        senderType: message.senderType.toLowerCase()
    }));

    // const newMessages = [];

    // for (const message of messages) {
    //     const newMessage = {
    //         ...message,
    //         senderType: message.senderType.toLowerCase()
    //     };

    //     newMessages.push(newMessage);
    // }

    // return newMessages;
};


module.exports = {
    createConversation,
    getMyConversations,
    createMessage,
    getMessages
};