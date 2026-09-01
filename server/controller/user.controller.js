// exports.signup =(req,res)=>{
//     res.json("log sin con")
// }

const asyncerror = require("../middleware/Asyncerror")
const userModel = require('../models/user.model')
const bcrypt= require('bcrypt')

const home =asyncerror(async(req,res)=>{
    res.json("login")
})

const signup =(async(req,res)=>{
    const {password} = await userModel.create(req.body)
    bcrypt.hash(password,10)
    res.status(201).json(user)
})

// const signup =(async(req,res)=>{
//     const user =  userModel.create(req.body)
//     res.json(user)
// })


module.exports ={signup,home}