const express = require('express');

const authenticate = require("../middleware/auth.middleware");
const notificationController = require('./notification.controller');

const router = express.Router();

router.get(
    '/',
    authenticate,
    notificationController.getMyNotifications
);

router.patch(
    '/:id/read',
    authenticate,
    notificationController.markNotificationAsRead
);

module.exports = router;