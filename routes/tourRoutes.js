const express = require('express');
const tourController = require('../controllers/tourController');
const aliasTopTour = require('../middlewares/aliasTopTour');
const asyncWrapper = require('../middlewares/asyncWrapper');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

// router.route('/top-5-cheap').get(aliasTopTour, tourController.getTours); //* v1
router.get('/top-5-cheap', asyncWrapper(aliasTopTour, tourController.getTours)); //* v2

router.get('/', asyncWrapper(protect, tourController.getTours));
router.get('/tour-stats', asyncWrapper(tourController.getToursStats));
router.get('/monthly-plan/:year', asyncWrapper(tourController.getMonthlyPlan));
router.get('/:tourId', asyncWrapper(tourController.getTourById));
router.post('/', asyncWrapper(tourController.createTour));
router.patch('/:tourId', asyncWrapper(tourController.updateTour));
router.delete('/:tourId', protect, restrictTo('admin'), asyncWrapper(tourController.deleteTour));

module.exports = router;
