
const express=require('express')
const router=express.Router()
const {getAllUsers, getUser, createUser, updateMe, updateUser, deleteUser, deleteMe, getMe}=require('../controllers/userController')
const {signUp,protect, login, forgotPassword, resetPassword,updatePassword}=require('./../controllers/authController')
router.get('/me', protect, getMe, getUser)
router.post('/signup', signUp)
router.post('/login', login)
router.patch('/resetpassword/:token', resetPassword)
router.post('/forgotpassword', forgotPassword)
router.patch('/updatepassword', protect,updatePassword)
router.patch('/updateme', protect, updateMe)
router.delete('/deleteme', protect, deleteMe)
router.route('/').get(protect,getAllUsers).post(createUser)

router.route('/:id').get(protect,getUser).patch(protect,updateUser).delete(protect,deleteUser)

module.exports=router