const express = require('express');
const userController = require('../controllers/userController');
const asyncWrapper = require('../middlewares/asyncWrapper');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.param('id', (req, res, next, id) => {
  // console.log('user id is', id);
  next();
});

router.get('/', asyncWrapper(userController.getUsers));
router.patch('/updateMe/:id', protect, asyncWrapper(userController.updateMe));
router.get('/:id', asyncWrapper(userController.getUserById));
router.patch('/:id', asyncWrapper(userController.updateUser));
router.delete('/:id', asyncWrapper(userController.deleteUser));

module.exports = router;
