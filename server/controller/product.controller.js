const path = require("path");
const productModel = require("../models/product.model");
const fs = require("fs");

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
    const data = await productModel.create({
      ...req.body,
      images: req.files ? req.files.map((e)=>e.filename) : [],
    });

    res.status(201).json(data);
  } catch (error) {
     if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const filePath = path.join('upload', file.filename);

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
    const data = await productModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getsingleproduct = async (req, res) => {
  try {
    const data = await productModel.findById(req.params.id);

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
          const filepath = path.join('upload',file.filename);

          fs.unlink(filepath, (err) => {
            if (err) {
              console.log( "Failed to delete new image:",err.message);
            }
          });
        });
      }

      return res.status(404).json({
        message: "Product not found"
      });
    }

    if (req.files && req.files.length > 0) {

      const newImages = req.files.map(
        (file) => file.filename
      );

      req.body.images = newImages;


      // Delete old images
      if (existingdata.images && existingdata.images.length > 0 ) {
        existingdata.images.forEach((image) => {

          const filepath = path.join( "upload",image);

          fs.unlink(filepath, (err) => {
            if (err) {
              console.log(
                "Failed to delete old image:",
                err.message
              );
            }
          });

        });
      }
    }


    const data = await productModel.findByIdAndUpdate(req.params.id,req.body,{returnDocument:"after"})


    res.status(200).json({message: "Product updated successfully", data});

  } catch (error) {

    // If update fails,
    // delete newly uploaded images
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {

        const filepath = path.join('upload',file.filename);

        fs.unlink(filepath, (err) => {
          if (err) {
            console.log(
              "Failed to delete uploaded image:",
              err.message
            );
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
    const data = await productModel.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: "product not found" });
   if ( data.images && data.images.length > 0 ) {

      data.images.forEach((image) => {
        const filepath = path.join("upload",image);
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
module.exports = {
  getproduct,
  getsingleproduct,
  postproduct,
  putproduct,
  deleteproduct,
};
