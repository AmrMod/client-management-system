const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.post("/register", usersController.addUsers);

router.post("/login", usersController.login);

module.exports = router;

