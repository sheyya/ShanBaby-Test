const express = require("express");
const router = express.Router();
const Delivery = require("../controllers/delivery.controller");
const checkAuth = require("../middleware/checkauth.middleware");

//add delivery info
router.post("/add", Delivery.AddDeliveryInfo);
router.get("/GetAll/", Delivery.GetAllWithOrder);
router.post("/received", Delivery.MarkRecevied);

module.exports = router;
