const Order = require("../models/order.model");
const Delivery = require("../models/delivery.model");
exports.Insert = (req, res, next) => {
  console.log(req.body);

  let newOrder = Order({
    date: new Date(),
    amount: req.body.amount,
    userId: req.body.userId,
    userName: req.body.userName,
    deliveryAddress: req.body.deliveryAddress,
    products: req.body.products,
  });

  console.log("New Order: ", newOrder);

  newOrder.save((err, result) => {
    if (err) {
      return next(err);
    }

    data = {
      status: "success",
      code: 200,
      data: result,
      message: "Order Added Successfully",
    };

    res.json(data);
  });
};

exports.GetAll = (req, res, next) => {
  Order.find({}, (err, result) => {
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

exports.Delete = (req, res, next) => {
  const id = req.params.id;

  Order.findOne({ _id: id }, (err, found_order) => {
    if (err) {
      return next(err);
    }

    //if object not found
    if (!found_order) {
      res.status(404).send();
    } else {
      found_order.remove((err, result) => {
        if (err) {
          return next(err);
        }

        data = {
          status: "success",
          code: 200,
          data: result,
          message: "Successfully Removed",
        };
        res.json(data);
      });
    }
  });
};

exports.GetOrdersByUserId = (req, res, next) => {
  let query = { userId: req.params.id };

  Order.find(query, (err, result) => {
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

exports.update = async (req, res, next) => {
  const id = req.params.id;

  const found_item = await Order.findOne({ _id: id });

  console.log(req.body);
  //if object not found
  if (!found_item) {
    return res.status(404).send();
  } else {
    //if address changed
    if (req.body.deliveryAddress) {
      found_item.deliveryAddress = req.body.deliveryAddress;
    }
    if (req.body.shipped) {
      found_item.shipped = req.body.shipped;
    }
    if (req.body.deleteRequest) {
      found_item.deleteRequest = req.body.deleteRequest;
    }
    const update = await Order.findOneAndUpdate(
      { _id: id },
      {
        deliveryAddress: req.body.deliveryAddress,
        shipped: req.body.shipped,
        deleteRequest: found_item.deleteRequest,
      },
      {
        new: true,
      }
    );
    console.log("UPdatred ======================================");

    let deliver = Delivery({
      deliveryMethod: req.body.method,
      TrackingInfo: req.body.trackinginfo,
      recieved: req.body.recieved,
      orderID: req.body.u_id,
      userName: req.body.userName,
      products: req.body.products,
      shipped: req.body.shipped,
    });

    const save_res = await deliver.save();

    console.log(save_res);

    return res.status(200).send({
      msg: "Success",
    });
  }
};

exports.RequestDelete = (req, res, next) => {
  const id = req.params.id;

  Order.findOne({ _id: id }, (err, found_item) => {
    if (err) {
      return next(err);
    }

    //if object not found
    if (!found_item) {
      res.status(404).send();
    } else {
      //if address changed
      if (req.body.deleteRequest) {
        found_item.deleteRequest = req.body.deleteRequest;
      }

      found_item.save((err, updated_object) => {
        if (err) {
          return next(err);
        }

        data = {
          status: "success",
          code: 200,
          data: updated_object,
          message: "Successfully Updated",
        };
        res.json(data);
      });
    }
  });
};
