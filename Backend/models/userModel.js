import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name Must Contain At Least 3 Characters."],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "First Name Must Contain At Least 3 Characters."],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Provide a valid Email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone Number must contain exact 10 digits"],
    maxLength: [10, "Phone Number must contain exact 10 digits"],
  },
  // aadhar: {
  //   type: String,
  //   minLength: [12, "Aadhar Must Contain Only 12 Digits!"],
  //   maxLength: [12, "Aadhar Must Contain Only 12 Digits!"],
  // },
  age: {
    type: Number,
    required: [true, "DOB is required"],
  },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must Contain at least 8 characters"],
    select: false,
  },
  role: { type: String, required: true, enum: ["Admin", "Patient", "Doctor"] },
  doctorDepartment: { type: String },
  doctorAvator: { public_id: String, url: String },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//! Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  //   console.log("pass:", this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

//!
// console.log("process.env.JWT_SECRET_KEY ", process.env.JWT_SECRET_KEY);

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
