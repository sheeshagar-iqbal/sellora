const express =require("express")
const { signup, home, logout, login, userget } = require("../controller/user.controller")
const auth = require("../middleware/auth")
const router = express.Router()


router.get("/user",auth,home)
router.post("/user/signup",signup)
router.post("/user/login",login)
router.get("/user/logout",logout)
router.get("/user/:id",userget)

module.exports=router