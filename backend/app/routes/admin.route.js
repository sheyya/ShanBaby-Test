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

// admin get all users loging browe
router.post(
  "/g/all/users/logins",
  checkRole(["admin"]),
  checkAuth,
  adminController.getUsersBrowserDetails
);
// admin get all users  time
router.post(
  "/g/all/users/time",
  checkRole(["admin"]),
  checkAuth,
  adminController.getUsersLoginTimeDetails
);
// admin get all user statics
router.post("/g/user/stat", adminController.userStat);
//admin get user registtrion from month
router.post("/g/user/months", adminController.getUserRegistrationMonths);

router.post("/g/test", adminController.getuserbyMonth);
router.post("/g/u/test", adminController.newBrowserDetails);

//export router
module.exports = router;
