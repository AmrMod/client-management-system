const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

const validate =
    require("../middleware/validate.middleware");

const {
    loginSchema
} = require('./auth.validation');


router.post(
    '/register',
    authController.register
);

router.post(
    '/login',
    validate(loginSchema),
    authController.login
);

module.exports = router;
