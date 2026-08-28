const express = require('express');
const router = express.Router();
const requestController = require('./request.controller');
const authenticate = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");
const requireStaffRole = require('../middleware/staffRole.middleware');


router.post('/', authenticate, requireRole("STUDENT"), requestController.createRequest);
router.get('/', authenticate, requireRole('STUDENT'), requestController.getMyRequests);
router.get(
    '/manager',
    authenticate,
    requireRole('STAFF'),
    requireStaffRole('MANAGER'),
    requestController.getManagerRequests
);
router.get('/support-units', requestController.getSupportUnits);
router.get(
    '/staff',
    authenticate,
    requireRole('STAFF'),
    requireStaffRole('MANAGER'),
    requestController.getSupportStaff
);
router.patch(
    '/:id/assign',
    authenticate,
    requireRole('STAFF'),
    requireStaffRole('MANAGER'),
    requestController.assignRequest
);

router.get(
    '/my-assigned',
    authenticate,
    requireRole('STAFF'),
    requireStaffRole('SUPPORT_STAFF'),
    requestController.getSupportRequests
);

router.patch(
    '/:id/status',
    authenticate,
    requireRole('STAFF'),
    requireStaffRole('SUPPORT_STAFF'),
    requestController.updateRequestStatus
);


module.exports = router;