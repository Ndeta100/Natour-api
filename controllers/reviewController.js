const Review=require('./../models/reviewModel')
const catchAsync=require('./../utils/catchAsync')
const {deleteOne, updateOne}=require('./handlerFactory')

const AppError=require('./../utils/appError')


exports.getAllReviews=catchAsync(async(req, res, next)=>{
    let filter={}
    if(req.params.tourId) filter={tour:req.params.tourId}
    const reviews=await Review.find(filter)
    res.status(200).json({
        success:true,
        results:reviews.length,
        data:{
            reviews
        }
    })
})

exports.createReview=catchAsync(async(req, res, next)=>{

    //ALLOW NESTED ROUTES
    if(!req.body.tour) req.body.tour=req.params.tourId
    if(!req.body.user) req.body.user=req.user.id
    const review = await Review.create(req.body)
    res.status(201).json({
        success:true,
        data:{
            review
        }
    })
})
exports.deleteReview=deleteOne(Review)
exports.updateReview=updateOne(Review)