const express =require("express")
const { signup, home, logout, login,getProfile } = require("../controller/user.controller")
const {auth} = require("../middleware/auth")
const router = express.Router()


router.get("/user",home)
router.post("/user/signup",signup)
router.post("/user/login",login)
router.get("/user/logout",logout)
router.get("/user/profile",auth,getProfile)

module.exports=router