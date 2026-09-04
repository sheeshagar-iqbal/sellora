// exports.signup =(req,res)=>{
//     res.json("log sin con")
// }

const asyncerror = require("../middleware/Asyncerror");
const Errorhandler = require("../middleware/Errorhandler");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken')
require('dotenv').config()

const home = asyncerror(async (req, res) => {
  res.json("home");
});

const signup = async (req, res) => {
  const { name, email, password,phone,address } = req.body;
  const data = await userModel.findOne({email});
   if (data) return next(new Errorhandler("user already exiting", 404));
  const hashpass = await bcrypt.hash(password, 10);
  const user = await userModel.create({ name, email, password: hashpass,phone,address });
  res.status(201).json(user);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  // const data = await userModel.findOne({ email });
    const data = await userModel.findOne({ email }).select('+password');
  console.log(data);

  if (!data) return next(new Errorhandler("user  not fount", 404));

  const comp = await bcrypt.compare(password, data.password);

  console.log(comp);

  if (!comp) {
    return next(new Errorhandler("Invalid email or password", 401));
  }

  const token = jwt.sign(
    {
      id: data._id,
      email: data.email,
      role:data.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    },
  );

   res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 60 * 60 * 1000,
});

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: data._id,
      name: data.name,
      email: data.email,
      role:data.role
    },
  });
};

const logout = async (req, res) => {
    res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json("logout successful");
};


const getProfile = async (req, res) => {
  
  const data = await userModel.findById(req.user.id)
  if (!data) {
    res.json("user not found");
  }
  res.json(data);
};

module.exports = { signup, home, login, logout,getProfile };
