const express=require('express')
const router=express.Router()
const {protect, restrictTo}=require('./../controllers/authController')
const reviewRouter=require('./../routes/reviewRoutes')
const {getAllTours, getTour, createTour, updateTour, deleteTour,aliasTopTours,getTourStats,getMonthlyPlan}=require('../controllers/tourController')

router.use('/:tourId/reviews', reviewRouter)
router.route('/top-5-cheap').get(aliasTopTours, getAllTours)
router.route('/monthly-plan/:year').get(getMonthlyPlan)
router.route('/tour-stats').get(getTourStats)
router.route('/').get( getAllTours).post(protect, restrictTo('admin', 'lead-guide'), createTour)
router.route('/:id').get( getTour).patch(protect, restrictTo('admin', 'lead-guide') ,updateTour).delete(protect,restrictTo('admin','guide'), deleteTour)


module.exports=router