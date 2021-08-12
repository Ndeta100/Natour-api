const mongoose=require('mongoose')
const dontenv=require('dotenv')
dontenv.config({path:'./config.env'})
const app=require('./app')

const DB=process.env.DATABASE
mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(con=>{
    console.log('DB connection successfull')
})


//STARTING SERVER
const port=process.env.PORT|| 3000
app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})

