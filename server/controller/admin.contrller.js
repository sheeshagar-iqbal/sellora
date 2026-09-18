const userModel = require("../models/user.model");
const productModel = require("../models/product.model");


// =====================================================
// ADMIN DASHBOARD
// =====================================================

const getDashboard = async (req, res) => {
  try {
    // Total users
    const totalUsers = await userModel.countDocuments();

    // Total products
    const totalProducts = await productModel.countDocuments();

    // New users this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const newUsers = await userModel.countDocuments({
      createdAt: {
        $gte: startOfMonth,
      },
    });

    // New products this month
    const newProducts = await productModel.countDocuments({
      createdAt: {
        $gte: startOfMonth,
      },
    });

    // Product condition
    const newConditionProducts = await productModel.countDocuments({
      condition: "New",
    });

    const usedConditionProducts = await productModel.countDocuments({
      condition: "Used",
    });

    // Product categories
    const categoryStats = await productModel.aggregate([
      {
        $group: {
          _id: "$category",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    // User growth - last 7 months
    const userGrowth = await userModel.aggregate([
      {
        $match: {
          createdAt: {
            $exists: true,
          },
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          users: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $limit: 12,
      },
    ]);

    // Recent users
    const recentUsers = await userModel
      .find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent products
    const recentProducts = await productModel
      .find()
      .populate("seller", "name email")
      .sort({ createdAt: -1 })
      .limit(5);


    res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalProducts,
        newUsers,
        newProducts,
        newConditionProducts,
        usedConditionProducts,
      },

      categoryStats,

      userGrowth,

      recentUsers,

      recentProducts,
    });

  } catch (error) {
    console.log("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// ALL USERS
// =====================================================

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// SINGLE USER
// =====================================================

const getSingleUser = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// DELETE USER
// =====================================================

const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent admin deleting himself
    if (user._id.toString() === req.user.id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own admin account",
      });
    }

    await userModel.findByIdAndDelete(req.params.id);

    // Delete products belonging to this user
    await productModel.deleteMany({
      seller: req.params.id,
    });

    res.status(200).json({
      success: true,
      message: "User and user's products deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// ALL PRODUCTS
// =====================================================

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("seller", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// SINGLE PRODUCT
// =====================================================

const getAdminProduct = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("seller", "name email phone");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// DELETE PRODUCT BY ADMIN
// =====================================================

const deleteAdminProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await productModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getDashboard,
  getAllUsers,
  getSingleUser,
  deleteUser,
  getAllProducts,
  getAdminProduct,
  deleteAdminProduct,
};