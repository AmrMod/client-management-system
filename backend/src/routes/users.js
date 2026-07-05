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

router.get("/getupdateUser/:id", usersController.getupdateUser)

router.delete("/users/:id", usersController.deleteUser)

router.put("/updateuserbyadmin/:id", usersController.updateuserbyadmin)

router.put("/updateclientprofile/:id", usersController.updateclientprofile)

module.exports = router;

