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
    const {name,email,password} = await userModel.create(req.body)

    const hashpass = await bcrypt.hash(password,10)
    res.status(201).json({name,email,password:hashpass})
})

const  login =(async(req,res)=>{
    const {email,password}=req.body
    const data = await userModel.findOne({email})
    const comp = await bcrypt.compare(password,data.password)
    if(!comp){
        res.json("user not found")
    }else{
        res.json("user not found")

    }
    res.json(user)
})


module.exports ={signup,home,login}