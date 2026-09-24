const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createNotification = async (
    userId,
    title,
    message
) => {
    return prisma.notification.create({
        data: {
            userId,
            title,
            message
        },
        select: {
            id: true,
            title: true,
            message: true,
            read: true,
            createdAt: true
        }
    });
};

const getNotificationsByUserId = async (userId) => {
    return prisma.notification.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            title: true,
            message: true,
            read: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};

const markNotificationAsRead = async (notificationId, userId) => {
    const notification = await prisma.notification.findUnique({
        where: {
            id: notificationId
        },
        select: {
            id: true,
            userId: true,
            read: true
        }
    });

    if (!notification) {
        const error = new Error('Notification not found');
        error.status = 404;
        throw error;
    }

    if (notification.userId !== userId) {
        const error = new Error(
            'You cannot update this notification'
        );
        error.status = 403;
        throw error;
    }

    return prisma.notification.update({
        where: {
            id: notificationId
        },
        data: {
            read: true
        },
        select: {
            id: true,
            title: true,
            message: true,
            read: true,
            createdAt: true
        }
    });
};

module.exports = {
    createNotification,
    getNotificationsByUserId,
    markNotificationAsRead
};