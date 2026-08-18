const express = require("express");

const router = express.Router();

const staffController = require("./staff.controller");

router.get("/", staffController.getAllStaff);

module.exports = router;