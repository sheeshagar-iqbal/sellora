const express = require("express");

const router = express.Router();

const {
  getDashboard,
  getAllUsers,
  getSingleUser,
  deleteUser,
  getAllProducts,
  getAdminProduct,
  deleteAdminProduct,
} = require("../controller/admin.contrller");
const { auth, admin } = require("../middleware/auth");

// =====================================================
// DASHBOARD
// =====================================================

router.get("/admin/dashboard", auth, admin, getDashboard);

// =====================================================
// USERS
// =====================================================

router.get("/admin/users", auth, admin, getAllUsers);

router.get("/admin/users/:id", auth, admin, getSingleUser);

router.delete("/admin/users/:id", auth, admin, deleteUser);

// =====================================================
// PRODUCTS
// =====================================================

router.get("/admin/products", auth, admin, getAllProducts);

router.get("/admin/products/:id", auth, admin, getAdminProduct);

router.delete("/admin/products/:id", auth, admin, deleteAdminProduct);

module.exports = router;
