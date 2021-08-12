const mongoose=require('mongoose')
const crypto=require('crypto')
const validator=require('validator')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'User must have a name']
    },
    email:{
        type:String,
        required:[true,'Please add an email'],
        unique: true,
        lowercase:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
          ]
    },
    photo:String,
    role: {
        type: String,
        enum: ['user', 'admin', 'lead-guide','guide'],
        default: 'user',
    },
    password:{
        type:String,
        required:[true, 'Please provide a password'],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true, 'Please confirm password'],
      validate:{
          validator:function(el){
              return el=== this.password
          }
      }
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
    active:{
        type:Boolean,
        default:true,
        select:false
    }
})

userSchema.pre('save', async function( next){
    //only run if password was modified
    if(!this.isModified('password')) return next()
    //hash the password
   this.password=await bcrypt.hash(this.password, 12)
   //empty the passwordConfirm field
   this.passwordConfirm=undefined
   next()
})
userSchema.pre('save', function(next){
if(!this.isModified('password')|| this.isNew) return next()

this.passwordChangedAt=Date.now()-1000
next()
})

userSchema.pre(/^find/, function(next){
  //This points to the current query
  this.find({active:{$ne:false}})
  next()
})
userSchema.methods.correctPassword=async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}
userSchema.methods.changesPasswordAfter=function(JWTTimestamp){

    if(this.passwordChangedAt){
        const changeTimeStamp=parseInt( this.passwordChangedAt.getTime()/1000, 10)
        return JWTTimestamp<changeTimeStamp
    }
    return false
}

userSchema.methods.createPasswordResetoken=function(){
 const resetToken=crypto.randomBytes(32).toString('hex')
 this.passwordResetToken= crypto.createHash('sha256').update(resetToken).digest('hex')
 this.passwordResetExpires=Date.now()+10*60*1000

 return resetToken
}
const User=mongoose.model('User', userSchema)
module.exports=User