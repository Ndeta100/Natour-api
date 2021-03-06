const catchAsync=require('./../utils/catchAsync')
const AppError=require('./../utils/appError')
exports.deleteOne=Model=>catchAsync( async(req, res, next)=>{
    const doc= await Model.findByIdAndDelete(req.params.id)
     if(!doc){
      return next(new AppError(`No document found with id of ${req.params.id}`, 404))
  }
      res.status(204).json({
          success:true,
          data:{
              tour:null
          }
      })
  })

  exports.updateOne=Model=>catchAsync( async(req, res, next)=>{
    const doc=await Model.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true
    })
    if(!doc){
      return next(new AppError(`No document found with id of ${req.params.id}`, 404))
  }
      res.status(200).json({
          success:true,
          data:{
             data: doc
          }
      })
  })

  exports.createOne=Model=>catchAsync( async(req, res, next)=>{
    const doc =await Model.create(req.body)
     res.status(201).json({
         success:true,
         data:{
             tour:doc 
         }
     })
     })

