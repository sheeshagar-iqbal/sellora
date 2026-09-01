const express = require("express")
const app = express()
require("dotenv").config()
const logger =require("morgan")
const router = require("./routes/user.route")
const Errorhandler = require("./middleware/Errorhandler")
// db connected
require('./config/db')
app.use(logger("tiny"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// routes
app.use(router)
app.use((req,res,next)=>{
    next(new Errorhandler(`requested not found ${req.url}`,404));
})

app.use((err,req,res,next)=>{
    const statuscode = err.statuscode ||500
    if(err.name==="MongoServerError" && err.message.includes("E11000 duplicate key")){
        err.message='user with this email address already exists'
    }
    res.status(statuscode).json({
        message:err.message,
        errName:err.name,
        stack:err.stack
    })
})
app.listen(process.env.PORT,()=>console.log(`server is running ${process.env.PORT}`))