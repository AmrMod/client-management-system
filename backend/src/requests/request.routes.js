const express = require('express');
const router = express.Router();
const requestController = require('./request.controller');
const authenticate = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");
const requireStaffRole = require('../middleware/staffRole.middleware');

//after zod implementation
const validate =
    require("../middleware/validate.middleware");

const {
    createRequestSchema,
    getMyRequestsSchema,
    managerRequestsSchema,
    supportRequestsSchema,
    managerStudentSummarySchema,
    managerStaffSummarySchema,
    adminRequestsSchema
} = require("./request.validation");

const upload = require("../middleware/upload.middleware");


router.post(
    '/',
    authenticate,
    requireRole("STUDENT"),
    upload.single("attachment"),
    validate(createRequestSchema),
    requestController.createRequest
);



router.get(
    "/",
    authenticate,
    requireRole("STUDENT"),
    validate(getMyRequestsSchema),
    requestController.getMyRequests
);

router.get(
    '/recent',
    authenticate,
    requireRole('STUDENT'),
    requestController.getRecentRequests
);



router.get(
    '/manager',
    authenticate,
    requireRole('STAFF'),
    requireStaffRole('MANAGER'),
    validate(managerRequestsSchema),
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

router.get(
    '/admin',
    authenticate,
    requireRole('ADMIN'),
    validate(adminRequestsSchema),
    requestController.getAllRequestsForAdmin
);


router.patch(
    '/:id/assign',
    authenticate,
    requireRole('STAFF'),
    requireStaffRole('MANAGER'),
    requestController.assignRequest
);




router.get(
    '/:id/attachment',
    authenticate,
    requireRole("STUDENT", "STAFF"),
    requestController.downloadAttachment
);


router.get(
    '/my-assigned',
    authenticate,
    requireRole('STAFF'),
    requireStaffRole('SUPPORT_STAFF'),
    validate(supportRequestsSchema),
    requestController.getSupportRequests
);

router.patch(
    '/:id/status',
    authenticate,
    requireRole('STAFF'),
    requireStaffRole('SUPPORT_STAFF'),
    requestController.updateRequestStatus
);

router.get(
    "/manager/student-summary",
    authenticate,
    requireRole("STAFF"),
    requireStaffRole("MANAGER"),
    validate(managerStudentSummarySchema),
    requestController.getManagerStudentSummary
);

router.get(
    "/manager/staff-summary",
    authenticate,
    requireRole("STAFF"),
    requireStaffRole("MANAGER"),
    validate(managerStaffSummarySchema),
    requestController.getManagerStaffSummary
);



module.exports = router;