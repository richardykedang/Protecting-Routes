const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const authController = require('../Controller/authController');
//router.param('id', tourController.checkId);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
    .route('/')
    .get(userController.getAllUser)
    .post(userController.createUser)
router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;