const express =require("express")
const { signup, home, logout, login,getProfile, addWishlist, addCart, getWishlist, removeWishlist, getCart, updateCart, removeCart } = require("../controller/user.controller")
const {auth} = require("../middleware/auth")
const router = express.Router()


router.get("/user",home)
router.post("/user/signup",signup)
router.post("/user/login",login)
router.get("/user/logout",auth,logout)
router.get("/user/profile",auth,getProfile)
router.get("/userwishlist",auth,getWishlist);
router.post("/userwishlist/:productId",auth,addWishlist);
router.delete("/userwishlist/:productId",auth,removeWishlist);

router.get("/addcard",auth, getCart);
router.post("/addcard/:productId",auth, addCart);
router.put("/addcard/:productId",auth, updateCart);
router.delete("/addcard/:productId",auth, removeCart);
module.exports=router