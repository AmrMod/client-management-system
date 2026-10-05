const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const authenticate = require("../middleware/auth.middleware");


router.get(             
    "/me",
    authenticate,
    userController.getCurrentUser
);










module.exports = router;
