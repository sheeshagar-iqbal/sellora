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



//============== userwish list   =============
const addWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const user = await userModel.findById(userId);

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({
        message: "Product already in wishlist"
      });
    }

    user.wishlist.push(productId);

    await user.save();

    res.status(200).json({
      message: "Product added to wishlist",
      wishlist: user.wishlist
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};






// getwishlist

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel
      .findById(userId)
      .populate("wishlist");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      wishlist: user.wishlist
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// delete

const removeWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.wishlist = user.wishlist.filter(
      id => id.toString() !== productId
    );

    await user.save();

    res.status(200).json({
      message: "Product removed from wishlist"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};



// =======add cart =========

const addCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const existingProduct = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      user.cart.push({
        product: productId,
        quantity: 1
      });
    }

    await user.save();

    res.status(200).json({
      message: "Product added to cart",
      cart: user.cart
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel
      .findById(userId)
      .populate("cart.product");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      cart: user.cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const { quantity } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const item = user.cart.find(
      item => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart"
      });
    }

    if (quantity <= 0) {
      user.cart = user.cart.filter(
        item => item.product.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    await user.save();

    res.status(200).json({
      message: "Cart updated"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
const removeCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.cart = user.cart.filter(
      item => item.product.toString() !== productId
    );

    await user.save();

    res.status(200).json({
      message: "Product removed from cart"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
module.exports = { signup, home, login, logout,getProfile,addWishlist ,addCart,getWishlist,removeWishlist,getCart,updateCart,removeCart};
