const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/checkauth.middleware");
const { checkRole } = require("../middleware/roleauth.middleware");
const adminController = require("../controllers/admin.controller");

//======================================================================================================
//===================================  POST REQUEST       ==============================================
//======================================================================================================
// admin register
router.post("/ad/s/am", adminController.registerSuperAdmin);

// admin sign in
router.post("/sign", adminController.signInAdmin);

// admin get all users
router.post(
  "/g/all/users",
  checkRole(["admin"]),
  checkAuth,
  adminController.getAllUsers
);

//export router
module.exports = router;
