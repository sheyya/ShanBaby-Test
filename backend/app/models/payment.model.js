const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Payment = new Schema({
  user: {
    type: Array,
    default: [],
  },
  data: {
    type: Array,
    default: [],
  },
  products: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("payment", Payment);
