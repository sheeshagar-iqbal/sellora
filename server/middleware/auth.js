const jwt = require("jsonwebtoken");
// const Errorhandler = require("../utils/Errorhandler");
require('dotenv').config()



const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("VERIFIED:", verified);

    req.user = verified;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const admin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Please login first"
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required"
    });
  }

  next();
};



module.exports = {auth,admin};