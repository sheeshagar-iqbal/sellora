
const mongoose =require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGOURL)
.then(()=>console.log('database connected'))
.catch((err)=>console.log(err))