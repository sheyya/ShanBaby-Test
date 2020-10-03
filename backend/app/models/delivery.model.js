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
    // required: true,
  },
  orderID: {
    type: String,
    // required: true,
  },
  deliveryAddress: {
    type: String,
    // required: true,
  },
  products: {
    type: [],
    // required: false,
  },
  deliveryMethod: {
    type: String,
    // required: true,
  },
  TrackingInfo: {
    type: String,
  },
  shipped: {
    type: Boolean,
    default: false,
    required: true,
  },
  recieved: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("delivery", Delivery);
