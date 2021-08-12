const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const User=require('./../models/userModel')
const { deleteOne, updateOne } = require('./handlerFactory')


const filterObj=(obj, ...allowedfields)=>{
    const newObj={}
   Object.keys(obj).forEach(el =>{
       if(allowedfields.includes(el)) newObj[el]=obj[el]
   }) 
   return newObj
}
exports. getAllUsers=catchAsync(async(req,res, next)=>{
    const users=await User.find()
    res.status(200).json({
        success:true,
        results:users.length,
         data:{
             users
         }
     })
})

exports.updateMe= catchAsync(async(req, res, next)=>{
//Create error if user post password data
if(req.body.password || req.body.passwordConfirm){
    return next(new AppError('This route is not for passwords updates', 404))
}
//Update user document
const filteredBody=filterObj(req.body, 'name', 'email')
const updatedUser=await User.findByIdAndUpdate(req.user.id, filteredBody,{new:true, runValidators:true})
res.status(200).json({
    success:true,
    data:{
        user:updatedUser
    }
})
})
exports.getMe=(req,res, next)=>{
    req.params.id=req.user.id
    next()
}
exports. getUser= catchAsync( async(req,res, next)=>{
    const user=await User.findById(req.params.id)
    res.status(200).json({
        success:true,
         data:{
             user
         }
     })
})

exports.deleteMe=catchAsync(async(req,res,next)=>{
    await User.findByIdAndUpdate(req.body.id, {active:false})

    res.status(204).json({
        success:true,
        data:{}
    })
})
exports. createUser=(req,res)=>{
    res.status(500).json({
        success:false,
        message:'This route is not yet defined'
    })
}

exports. updateUser=updateOne(User)
exports. deleteUser=deleteOne(User)
