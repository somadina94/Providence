const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const Router = express.Router();

Router.post('/signup', authController.signup);
Router.post('/login', authController.login);
Router.post('/loginAdmin', authController.loginAdmin);
Router.post('/verification', authController.verifylogin);
Router.get('/logout', authController.logout);

Router.post('/forgotPin', authController.forgotPin);
Router.patch('/resetPin/:token', authController.resetPin);

Router.patch('/updateMyPin', authController.protect, authController.updatePin);

Router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadPhoto,
  userController.updateMe
);

Router.patch(
  '/updateUser/:id',
  authController.protect,
  authController.restictTo('admin'),
  userController.uploadPhoto,
  userController.updateUserByAdmin
);

Router.delete('/deleteMe', authController.protect, userController.deleteMe);

Router.patch(
  '/deactivate/:id',
  authController.protect,
  authController.restictTo('admin'),
  userController.blockUser
);

Router.patch('/accountHistory/:1d', userController.updateUserTransaction);

Router.patch(
  '/transferToken',
  authController.protect,
  authController.sendTransferCode
);

Router.post(
  '/localTransfer',
  authController.protect,
  authController.localTransfer
);
Router.post(
  '/internationalTransfer',
  authController.protect,
  authController.IntTransfer
);

Router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUserById
);

Router.patch(
  '/transactions/:id',
  authController.protect,
  userController.updateUserTransaction
);

Router.patch(
  '/reversal/:id',
  authController.protect,
  authController.restictTo('admin'),
  userController.reverseTransaction
);

Router.delete(
  '/transactions/:id',
  authController.protect,
  authController.restictTo('admin'),
  userController.deleteTransaction
);

Router.route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(
    authController.protect,
    userController.uploadPhoto,
    userController.createUser
  );

Router.route('/:id').get(
  authController.protect,
  authController.restictTo('admin'),
  userController.getUserById
);

Router.route('/:id').delete(
  authController.protect,
  authController.restictTo('admin'),
  userController.deleteUser
);

module.exports = Router;
