const express = require('express');

const authenticate = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");

const dashboardController = require('./dashboard.controller');

const router = express.Router();

router.get(
    '/student',
    authenticate,
    requireRole('STUDENT'),
    dashboardController.getStudentDashboardStats
);

module.exports = router;