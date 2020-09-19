const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
//define server running port
let port = 5000;

// open server

// import db
const dbConfig = require("./config/db.config");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.set("useCreateIndex", true);

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

//======================================================================================================
//===================================import routes    =================================================
//======================================================================================================
const adminRoutes = require("./app/routes/admin.route");

const userRoutes = require("./app/routes/user.router");

//======================================================================================================
//=================================== defines routes     ===============================================
//======================================================================================================

app.use("/admin", adminRoutes);

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
