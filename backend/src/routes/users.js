const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.post("/register", usersController.addUsers);

router.post("/login", usersController.login);

router.get("/users", usersController.getAllUsers);

router.post("/createUserByAdmin", usersController.createUserByAdmin)

router.delete("/users/:id", usersController.deleteUser)

module.exports = router;

