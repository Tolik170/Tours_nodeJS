const express = require('express');
const authController = require('../controllers/authController');
const asyncWrapper = require('../middlewares/asyncWrapper');
const { protect } = require('../middlewares/auth');

const router = express.Router();


router.post('/signup', asyncWrapper(authController.signup));
router.post('/login', asyncWrapper(authController.login));
router.patch('/updatePassword', protect, asyncWrapper(authController.updatePassword));
router.post('/forgotPassword', asyncWrapper(authController.forgotPassword));
router.patch('/resetPassword/:token', asyncWrapper(authController.resetPassword));

module.exports = router;
