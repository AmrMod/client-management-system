const express = require('express');
const router = express.Router();

const studentController = require('./student.controller');
const authenticate = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");

router.get('/', authenticate, requireRole("ADMIN"), studentController.getAllStudents);

module.exports = router;