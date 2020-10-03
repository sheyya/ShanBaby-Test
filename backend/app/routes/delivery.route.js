const express = require("express");
const router = express.Router();
const Delivery = require("../controllers/delivery.controller");
const checkAuth = require("../middleware/checkauth.middleware");

//add delivery info
router.post("/add", Delivery.AddDeliveryInfo);

module.exports = router;
