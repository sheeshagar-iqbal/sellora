const jwt = require("jsonwebtoken");
// const Errorhandler = require("../utils/Errorhandler");
require('dotenv').config()



const auth = (req,res,next)=>{
    const token = req.cookies.token
    if(!token) return res.json("please login first")
    let verified =jwt.verify(token,process.env.JWT_SECRET)
    console.log(verified);
    req.user =verified

    next()
    
}

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

module.exports = auth;