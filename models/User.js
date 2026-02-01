const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const email_validation_regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name required"],
    lowercase: true,
    minLength: [3, "Name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    minLength: [3, "Email must be at least 3 characters long"],
    match: [email_validation_regex, "Invalid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minLength: [6, "Name must be at least 6 characters long"],
  },
});

// 'function' keyword ties the function to the User object, allows use of 'this'
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getName = function () {
  return this.name;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.EXPIRES_IN,
    },
  );
};

UserSchema.methods.checkPassword = async function (password) {
  const passIsCorrect = await bcrypt.compare(password, this.password);
  return passIsCorrect;
};

module.exports = model("User", UserSchema);
