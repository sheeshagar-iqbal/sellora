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
  res.json("login");
});

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const hashpass = await bcrypt.hash(password, 10);
  const user = await userModel.create({ name, email, password: hashpass });
  res.status(201).json(user);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const data = await userModel.findOne({ email });
  //   const data = await userModel.findOne({ email }).select('+password');
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
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    },
  );

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: data._id,
      name: data.name,
      email: data.email,
    },
  });
};

const logout = async (req, res) => {
  const { email, password } = req.body;
  const data = await userModel.findOne({ email });
  const comp = await bcrypt.compare(password, data.password);
  if (!comp) {
    res.json("user not found");
  } else {
    res.json("user not found");
  }
  res.json(user);
};

module.exports = { signup, home, login, logout };
