const express = require('express')
const upload = require('../config/multer')
const { postproduct, getproduct, getsingleproduct, putproduct, deleteproduct, myProducts } = require('../controller/product.controller')
const { auth } = require('../middleware/auth')
const router = express.Router()

router.post("/product",upload.array("images"),auth,postproduct)
router.get("/product",getproduct)
router.get("/myproduct",auth,myProducts)
router.get("/product/:id",getsingleproduct)
router.put("/product/:id",auth,upload.array("images"),putproduct)
router.delete("/product/:id",auth,deleteproduct)
module.exports=router