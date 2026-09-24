const notificationService = require('./notification.service');

const getMyNotifications = async (req, res, next) => {
    try {
        const notifications =
            await notificationService.getNotificationsByUserId(
                req.user.userId
            );

        res.json(notifications);

    } catch (error) {
        next(error);
    }
};

const markNotificationAsRead = async (req, res, next) => {
    try {
        const notification =
            await notificationService.markNotificationAsRead(
                Number(req.params.id),
                req.user.userId
            );

        res.json(notification);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMyNotifications,
    markNotificationAsRead
};