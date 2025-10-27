const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "userdata", required: true },
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  date: { type: Date, default: Date.now },
});

module.exports = { OrdersSchema };
