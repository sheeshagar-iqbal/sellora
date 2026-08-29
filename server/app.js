const express = require("express")
const app = express()
require("dotenv").config()
const logger =require("morgan")
const router = require("./routes/user.route")
const Errorhandler = require("./config/Errorhandler")
app.use(logger("tiny"))
// routes
app.use(router)
app.use((req,res,next)=>{
    next(new Errorhandler(`requested not found ${req.url}`,404));
})

app.use((err,req,res,next)=>{
    const statuscode = err.statuscode ||500

    res.status(statuscode).json({
        message:err.message,
        errName:err.name,
        stack:err.stack
    })
})
app.listen(process.env.PORT,()=>console.log(`server is running ${process.env.PORT}`))