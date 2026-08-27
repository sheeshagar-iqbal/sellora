const express = require("express")
const app = express()
require("dotenv").config()
const logger =require("morgan")
const router = require("./routes/user.route")
app.use(logger("tiny"))
// routes
app.use(router)

app.listen(process.env.PORT,()=>console.log(`server is running ${process.env.PORT}`))