const express = require('express');

const authenticate = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");
const requireStaffRole = require('../middleware/staffRole.middleware');


const dashboardController = require('./dashboard.controller');

const router = express.Router();

router.get(
    '/student',
    authenticate,
    requireRole('STUDENT'),
    dashboardController.getStudentDashboardStats
);

router.get(
    '/staff',
    authenticate,
    requireRole('STAFF'),
    requireStaffRole('SUPPORT_STAFF'),
    dashboardController.getSupportDashboardData
);

router.get(
    '/manager',
    authenticate,
    requireRole('STAFF'),
    requireStaffRole('MANAGER'),
    dashboardController.getManagerDashboardData
);

router.get(
    '/admin',
    authenticate,
    requireRole('ADMIN'),
    dashboardController.getAdminDashboardData
);

module.exports = router;