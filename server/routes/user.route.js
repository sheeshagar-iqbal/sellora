const express =require("express")
const { signup, home, logout, login } = require("../controller/user.controller")
const router = express.Router()


router.get("/user",home)
router.post("/user/signup",signup)
router.post("/user/login",login)
router.get("/user/logout",logout)

module.exports=router