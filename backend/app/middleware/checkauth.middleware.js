// check auth middle ware

// import jason web token
const jwt = require("jsonwebtoken");
// import nodemon

const attributes = require("../../nodemon.json");

const SignInToken = require("../models/signtokens.model");

//======================================================================================================
//===================================  User autanticazion         ==============================================
//======================================================================================================
module.exports = (req, res, next) => {
  console.log(req.body);

  try {
    const decorded = jwt.verify(req.body.token, attributes.env.JWT_KEY);
    req.userData = decorded;
    console.log("Decord Data");
    console.log(req.userData);
    var email = req.userData.email;
    if (email != null || email != undefined) {
      SignInToken.find({ email: email }, function (err, docs) {
        try {
          if (docs.length > 0) {
            next();
            console.log("working");
          }
          // var dbtoken = docs[0].token
          // var isAvailable = dbtoken.localeCompare(req.body.token, { sensitivity: 'base' })
          // if (isAvailable == 0) {
          // next();
          // } else {
          //     console.log("Tokens not match");

          //     return res.status(403).json({
          //         message: 'Tokens not match'
          //     });
          // }
        } catch (error) {
          return res.status(402).json({
            message: "No token found",
          });
        }
      }).sort([
        ["email", 1],
        ["createdAt", "desc"],
      ]);
    } else {
      return res.status(401).json({
        message: "Auth faild, in middle ware please sent token",
      });
    }
  } catch (error) {
    return res.status(409).json({
      message: "Auth faild, in middle ware please sent token",
    });
  }
};
