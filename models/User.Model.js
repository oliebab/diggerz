const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    country: String,//update
    city: String, //update
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default:
        "/public/img/defaultProfil.png",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
