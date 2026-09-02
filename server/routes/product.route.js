const express = require('express')
const upload = require('../config/multer')
const { postproduct, getproduct, getsingleproduct, putproduct, deleteproduct } = require('../controller/product.controller')
const router = express.Router()

router.post("/product",upload.array("images"),postproduct)
router.get("/product",getproduct)
router.get("/product/:id",getsingleproduct)
router.put("/product/:id",upload.array("images"),putproduct)
router.delete("/product/:id",deleteproduct)
module.exports=router