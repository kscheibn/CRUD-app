const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  items: [{ type: mongoose.Types.ObjectId, required: true, ref: "Item" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
