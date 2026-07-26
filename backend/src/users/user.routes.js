const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.get('/', userController.getAllUsers);
//router.get('/totalUsers/', userController.getTotalUsers);
//router.get('/users-this-month', userController.getUsersThisMonth);
router.get('/dashboard/stats', userController.getDashboardStats);
router.get('/search', userController.searchUsers );
router.get('/:id', userController.getUserById);
router.post('/', userController.createUserByAdmin);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUserByAdmin);
router.put('/profile/:id', userController.updateClientProfile);
router.put('/password/:id', userController.updatePassword);



module.exports = router;
