const express=require('express')
const path=require('path')
const morgan=require('morgan')
const appError=require('./utils/appError')
const globalErrorHandler=require('./controllers/errorController')
const tourRouter=require('./routes/tourRoutes')
const userRouter=require('./routes/userRoutes')
const rateLimit=require('express-rate-limit')
const helmet=require('helmet')
const xssclean=require('xss-clean')
const mongoSanitize=require('express-mongo-sanitize')
const hpp=require('hpp')

const reviewRouter=require('./routes/reviewRoutes')


const app= express()
//MIDDLEWARES

//Body parser reading datat from body into req.body
app.use(express.json({limit:'10kb'}))

//Data sanitization against nosql injection  
app.use(mongoSanitize())

//data sanitization against  cross site scripting
app.use(xssclean())


app.use(helmet())
if(process.env.NODE_ENV==='development'){
    
    app.use(morgan('dev'))
}

const limiter=rateLimit({
    max:100,
    windowMs:60*600*1000,
    message:'To many requests from this IP please try again in an hours'
})

app.use('/api', limiter)

//Prevent parameter pollution
app.use(hpp({
    whitelist:['duration','difficulty','price']
}))

app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString()
    next()
})
//Set static folder
app.use(express.static(path.join(__dirname, 'public')))
///ROUTES
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/reviews', reviewRouter)
app.all('*', (req, res,next)=>{
    next(new appError(`Can't find ${req.originalUrl} on server!`, 404))
})

app.use(globalErrorHandler)
module.exports=app