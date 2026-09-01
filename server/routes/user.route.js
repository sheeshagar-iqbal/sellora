const express =require("express")
const { signup, home } = require("../controller/user.controller")
const router = express.Router()


router.get("/user",home)
router.post("/user",signup)

module.exports=router