const express=require('express')
const router=express.Router({mergeParams:true})
const {getAllReviews, createReview, deleteReview, updateReview}=require('./../controllers/reviewController')
const{protect, restrictTo}=require('./../controllers/authController')

router.route('/').get(getAllReviews).post( protect, restrictTo('user'), createReview)

router.route('/:id').delete(protect, restrictTo('user','admin'), deleteReview).patch(protect, restrictTo('user','admin'), updateReview)







module.exports=router