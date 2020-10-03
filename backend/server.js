const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "uploads/profilepic/" });
require("dotenv").config();
//define server running port
let port = 5000;

const MongoClient = require("mongodb").MongoClient;

// import db
const dbConfig = require("./config/db.config");

//======================================================================================================
//===================================open apps services  ===============================================
//======================================================================================================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
mongoose.set("useCreateIndex", true);

//======================================================================================================
//===================================import routes    =================================================
//======================================================================================================
const cartRoutes = require("./app/routes/shoppingcart.route");

const userRoutes = require("./app/routes/user.router");

const categoryRoutes = require("./app/routes/category.router");

const adminRoutes = require("./app/routes/admin.route");

const productRoutes = require("./app/routes/product.router");

const ordersRoutes = require("./app/routes/orders.route");

const commonRoute = require("./app/routes/common.route");

const deliveryRoute = require("./app/routes/delivery.route");

//======================================================================================================
//=================================== defines routes     ===============================================
//======================================================================================================

app.use("/cart", cartRoutes);

app.use("/user", userRoutes);

app.use("/category", categoryRoutes);

app.use("/admin", adminRoutes);

app.use("/product", productRoutes);

app.use("/order", ordersRoutes);

app.use("/common", commonRoute);

app.use("/delivery", deliveryRoute);

//======================================================================================================
//================================== Handlle Error     ===========================================
//======================================================================================================
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  console.log(error);

  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

//======================================================================================================
//=================================== critical functions     ===========================================
//======================================================================================================

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database now");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

//open server
app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
