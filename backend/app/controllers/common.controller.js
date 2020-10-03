//import User model

const moment = require("moment");

const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const Products = require("../models/product.model");
const Categories = require("../models/category.model");
const Orders = require("../models/order.model");

exports.counts = async function (req, res, next) {
  const User_count = await User.count({});
  const Products_count = await Products.count({});
  const Categories_count = await Categories.count({});
  const Orders_count = await Orders.count({});

  let result = [];
  result.push({ name: "Users", value: User_count });
  result.push({ name: "Products", value: Products_count });
  result.push({ name: "Categories", value: Categories_count });
  result.push({ name: "Orders", value: Orders_count });

  data = {
    status: "success",
    code: 200,
    data: result,
  };

  res.json(data);
};

exports.revenue = function (req, res, next) {
  var today = new Date(moment(new Date()).format("YYYY-MM-DD"));
  var prev = new Date(today - 12096e5);
  let dataset = [];

  Orders.aggregate([
    {
      $project: {
        xx: { $toDouble: "$amount" },
        orderdate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
      },
    },
    {
      $group: { _id: "$orderdate", total: { $sum: "$xx" } },
    },
  ]).exec(function (err, result) {
    if (err) {
      return next(err);
    }

    let revenue = result.map((item) => {
      return {
        date: new Date(item._id),
        total: item.total,
      };
    });

    for (var arr = [], dt = prev; dt <= today; dt.setDate(dt.getDate() + 1)) {
      let c = new Date(dt);
      let total = 0;
      let find = revenue.findIndex(
        (item) => item.date.getTime() == c.getTime()
      );
      if (find >= 0) {
        total = revenue[find].total;
      }

      dataset.push({
        date: c,
        total: total,
      });
    }

    data = {
      status: "success",
      code: 200,
      data: dataset,
    };
    res.json(data);
  });
};
