//import User model
const User = require("../models/user.model");
//import Sign model
const SignInToken = require("../models/signtokens.model");
//import Admin
const Admin = require("../models/admin.model");
// import hash mwthod
const bcrypt = require("crypto-js");
// import jason web token
const jwt = require("jsonwebtoken");
// import nodemon
const attributes = require("../../nodemon.json");

//======================================================================================================
//================================== Register Super Admin  =============================================
//======================================================================================================

exports.registerSuperAdmin = function (req, res, next) {
  console.log("Pako wada karanawada");

  console.log(req.body);

  let new_admin = new Admin({
    fname: req.body.firstname,
    lname: req.body.lastname,
    email: req.body.useremail,
    password: req.body.password,
  });
  // check all values
  if (
    (new_admin.fname != null || new_admin.fname != undefined) &&
    (new_admin.lname != null || new_admin.lname != undefined) &&
    (new_admin.password != null || new_admin.password != undefined) &&
    (new_admin.email != null || new_admin.email != undefined)
  ) {
    console.log(new_admin);
    // check userdata
    Admin.find({ email: new_admin.email }, function (err, docs) {
      if (docs.length == 0) {
        //save
        new_admin.save(function (erro) {
          if (err) {
            return next(err);
          }
          res.status(200).send(new_admin);
          console.log("New user register");
        });
      } else {
        res.status(403).send("Already have");
      }
    });
  } else {
    res.status(600).send("Not Added");
  }
};

//======================================================================================================
//================================== Sign Super Admin  =============================================
//======================================================================================================
exports.signInAdmin = function (req, res, next) {
  console.log(req.body);

  Admin.find({ email: req.body.uEmail })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Faild , No user data availble in this email",
        });
      }

      console.log("REQUEST -------------------------------------------");

      var _signuser_hashed_password = req.body.uPass;

      var _user_hashed_password = user[0].password;
      var isAvalabel = _signuser_hashed_password.localeCompare(
        _user_hashed_password,
        { sensitivity: "base" }
      );

      console.log("Available User Password : ", _user_hashed_password);
      console.log("Comming User Password   : ", _signuser_hashed_password);
      console.log("is availabel ", isAvalabel);

      if (isAvalabel == 0) {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id,
          },
          attributes.env.JWT_KEY,
          {
            expiresIn: "240h",
          }
        );

        return res.status(200).json({
          message: "Auth Sucess",

          userData: {
            id: user[0]._id,
            fname: user[0].fname,
            lname: user[0].lname,
            email: user[0].email,
            createdat: user[0].created_at,
            token: token,
            type: user[0].type,
          },
        });
        // -----------------------------------
      } else if (isAvalabel == 1 || isAvalabel == -1) {
        return res.status(403).json({
          message: "Auth faild, passwod did not match",
        });
      } else {
        return res.status(401).json({
          message: "Auth faild, passwod did not match",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//======================================================================================================
//===================================  Get All Users     ==============================================
//======================================================================================================

exports.getAllUsers = function (req, res, next) {
  User.find(null, {
    _id: true,
    fname: true,
    lname: true,
    email: true,
    profilepic: true,
    created_at: true,
  })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(402).json({
          message: " No User data availble in this email",
        });
      } else {
        return res.status(200).json({
          users: user,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
