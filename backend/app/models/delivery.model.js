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
    type: Schema.Types.ObjectId,
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
  },
  recieved: {
    type: Boolean,
  },
});

module.exports = mongoose.model("deliveries", Delivery);
