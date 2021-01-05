const express = require('express');
const { route } = require('../app');
const router = express.Router()
const tourController = require('../Controller/tourController')
const authController = require('../Controller/authController');

//router.param('id', tourController.checkId);
router
    .route('/')
    .get(authController.protect,tourController.getAlltours)
    // .post(tourController.checkBody, tourController.createTour);
    .post(tourController.createTour)
router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.deleteTour);

module.exports = router;