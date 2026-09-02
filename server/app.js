const express = require("express")
const app = express()
require("dotenv").config()
const logger =require("morgan")
const router = require("./routes/user.route")
const Errorhandler = require("./middleware/Errorhandler")
const generateError = require("./middleware/ErrorFormatjs")
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require("cors")
// db connected
require('./config/db')
app.use(cors())
app.use(logger("tiny"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// routes
app.use(router)
app.use((req,res,next)=>{
    next(new Errorhandler(`requested not found ${req.url}`,404));
})

app.use(generateError)
app.listen(process.env.PORT,()=>console.log(`server is running ${process.env.PORT}`))