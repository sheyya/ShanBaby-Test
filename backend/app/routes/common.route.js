const express = require("express");
const router = express.Router();
const Common = require("../controllers/common.controller");

router.get("/counts", Common.counts);
router.get("/revenue", Common.revenue);

module.exports = router;
