const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Delivery = new Schema({
  date: {
    type: Date,
  },
  userId: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  products: {
    type: [],
    required: true,
  },
  deliveryMethod: {
    type: String,
    required: true,
  },
  TrackingInfo: {
    type: String,
    required: true,
  },
  shipped: {
    type: Boolean,
    default: false,
  },
  recieved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("orders", Order);
