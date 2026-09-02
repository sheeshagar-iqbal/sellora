const multer =require('multer')

const st =multer.diskStorage({
    destination:(req,res ,cb)=>{
            cb(null,"upload/")
    },
    filename:(req, file ,cb)=>{
            cb(null, Date.now() + "-" + file.originalname)
    }
})

let upload =multer({
    storage:st
})

module.exports =upload