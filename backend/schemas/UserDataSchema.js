const { Schema } = require("mongoose");
const UserSchema = new Schema({
  email: String,
  password: String,
});
module.exports = UserSchema;
