const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "userdata", required: true },
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
});

module.exports = { HoldingsSchema };
