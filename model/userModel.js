const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "manager", "employee", "customer"],
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false, //need to change later to false
  },
  pwdResetCode: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema, "userCollection");
module.exports = User;
