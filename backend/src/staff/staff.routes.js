const express = require("express");

const router = express.Router();

const staffController = require("./staff.controller");
const authenticate = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");

router.get("/", authenticate, requireRole("ADMIN"), staffController.getAllStaff);

module.exports = router;