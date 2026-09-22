const path = require("path");
const productModel = require("../models/product.model");
const fs = require("fs");
const userModel = require("../models/user.model");

// const imgUpload = async (req, res) => {
//   console.log(req.file);
//   let data = await productModel.create({ images: req.file.filename });
//   res.json({ message: "Image uploaded", file: data });
// };

// const imgUpload = async (req,res)=>{
//     console.log(req.files);
//     let images = req.files.map((e)=>e.filename)
//     console.log(images);

//     let data = await productModel.create({image:images})
//     res.json({message:"Image uploaded",data})

// }

// const imgretrive = async (req, res) => {
//   let data = await productModel.find();
//   res.json({ message: "Image retrive", data });
// };

// form

const postproduct = async (req, res) => {
  try {
    const { title, description, price, category, condition, location } =
      req.body;
    if (
      !title || !description ||!price || !category ||!condition ||!location ) {
      return res.status(400).json({
        success: false,
        message: "All product fields are required",
      });
    }
     if (description.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "Description must contain at least 20 characters"
      });
    }
      if (Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0"
      });
    }

     if (!req.files || req.files.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least 5 images"
      });
    }

    if (req.files.length > 8) {
      return res.status(400).json({
        success: false,
        message: "You can upload maximum 8 images"
      });
    }
    const data = await productModel.create({
      ...req.body,
      images: req.files ? req.files.map((e) => e.filename) : [],
      seller: req.user.id,
    });

    res.status(201).json(data);
  } catch (error) {
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const filePath = path.join("upload", file.filename);

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("Image delete error:", err.message);
          } else {
            console.log("Deleted:", file.filename);
          }
        });
      });
    }
    res.status(500).json({ message: error.message });
  }
};

const getproduct = async (req, res) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    // ================= SEARCH =================

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // ================= CATEGORY =================

    if (category && category !== "All") {
      filter.category = {
        $regex: category,
        $options: "i",
      };
    }

    const products = await productModel
      .find(filter)
      .populate("seller")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to get products",
    });
  }
};

// const getproduct = async (req, res) => {
//   try {
//     const data = await productModel.find().populate("seller");
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const getsingleproduct = async (req, res) => {
  try {
    const data = await productModel.findById(req.params.id).populate("seller");

    if (!data) return res.status(500).json({ message: "user not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putproduct = async (req, res) => {
  try {
    const existingdata = await productModel.findById(req.params.id);
    if (!existingdata) {
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          const filepath = path.join("upload", file.filename);

          fs.unlink(filepath, (err) => {
            if (err) {
              console.log("Failed to delete new image:", err.message);
            }
          });
        });
      }

      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.filename);

      req.body.images = newImages;

      // Delete old images
      if (existingdata.images && existingdata.images.length > 0) {
        existingdata.images.forEach((image) => {
          const filepath = path.join("upload", image);

          fs.unlink(filepath, (err) => {
            if (err) {
              console.log("Failed to delete old image:", err.message);
            }
          });
        });
      }
    }

    const data = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    res.status(200).json({ message: "Product updated successfully", data });
  } catch (error) {
    // If update fails,
    // delete newly uploaded images
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const filepath = path.join("upload", file.filename);

        fs.unlink(filepath, (err) => {
          if (err) {
            console.log("Failed to delete uploaded image:", err.message);
          }
        });
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteproduct = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user) {
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== req.params.id,
      );
      user.cart = user.cart.filter(
        (item) => item.product.toString() !== req.params.id,
      );
      await user.save();
    }

    const data = await productModel.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: "product not found" });
    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        const filepath = path.join("upload", image);
        fs.unlink(filepath, (err) => {
          if (err) {
            console.log("Failed to delete image:", err.message);
          }
        });
      });
    }
    res.json("product delete ", data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const myProducts = async (req, res) => {
  try {
    console.log(req.user);

    const products = await productModel
      .find({ seller: req.user.id })
      .populate("seller");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getproduct,
  getsingleproduct,
  postproduct,
  putproduct,
  deleteproduct,
  myProducts,
};
