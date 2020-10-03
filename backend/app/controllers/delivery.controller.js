const Order = require("../models/order.model");
const Delivery = require("../models/delivery.model");

exports.GetAll = (req, res, next) => {
  Delivery.find({}, (err, result) => {
    if (err) {
      return next(err);
    }

    data = {
      status: "success",
      code: 200,
      data: result,
    };

    res.json(data);
  });
};

exports.GetOrderById = (req, res, next) => {
  console.log(req.params.id);
  Order.findOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      data = {
        status: "failed",
        code: 404,
        data: null,
      };
    } else {
      data = {
        status: "success",
        code: 200,
        data: result,
      };
    }
    res.json(data);
  });
};

exports.AddDeliveryInfo = (req, res, next) => {
  console.log(req.body);
  Order.findOne({ _id: req.body.id }, (err, found_order) => {
    if (err) {
      return next(err);
    }
    if (!found_order) {
      res.status(404).send();
    } else {
      if (req.body.shipped) {
        found_order.shipped = req.body.shipped;
      }
      let delivery = new Delivery({
        orderID: found_order.id,
        deliveryMethod: req.body.deliveryMethod,
        TrackingInfo: req.body.TrackingInfo,
        recieved: req.body.recieved,
        shipped: req.body.shipped,
        deliveryAddress: found_order.deliveryAddress,
        userName: found_order.userName,
        userId: found_order.userId,
        products: found_order.products,
      });

      delivery.save((err, results) => {
        if (err) {
          return next(err);
        }

        data = {
          status: "success",
          code: 200,
          data: results,
          message: "Successfully Delivered",
        };
        res.json(data);
      });
    }
  });
};
