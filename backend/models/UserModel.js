const { model } = require("mongoose");
const UserSchema = require("../schemas/UserDataSchema");
const UserData = new model("userdata", UserSchema);
module.exports = UserData;
