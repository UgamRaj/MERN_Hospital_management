import { catchError } from "../middleware/catchErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import UserModel from "../models/userModel.js";
import { generateToken } from "../utils/jwtToken.js";

const patientRegister = catchError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    aadhar,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !aadhar ||
    !role
  ) {
    return next(new ErrorHandler("Please fill full form", 400));
  }
  let user = await UserModel.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Registered", 400));
  }
  user = await UserModel.create(req.body);
  generateToken(user, "User Registered", 200, res);
  //   res.status(200).json({ success: true, message: "User Registered" });
});

//! Patient Login
const userLogin = catchError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please Provide All Details", 400));
  }
  const user = await UserModel.findOne({ email }).select("+password");
  //   console.log("🚀 ~ patientLogin ~ user:", user);
  if (!user) {
    return next(new ErrorHandler("Invalid Password or Email", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  //   console.log(
  //     "🚀 ~ patientLogin ~ isPasswordMatched:",
  //     isPasswordMatched,
  //     password
  //   );
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password or Email", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found", 400));
  }

  //! Token
  generateToken(user, "User Logged in Successfully", 200, res);

  //   res
  // .status(200)
  // .json({ success: true, message: "User Logged in Successfully" });
});

//! Adding new Admin
const addNewAdmin = catchError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    aadhar,
    role,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !aadhar
  ) {
    return next(new ErrorHandler("Please fill full form", 400));
  }
  const isAlreadyRegistered = await UserModel.findOne({ email });
  if (isAlreadyRegistered) {
    return next(
      new ErrorHandler(
        `${isAlreadyRegistered.role} with this email already exists`
      )
    );
  }
  const admin = await UserModel.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    aadhar,
    role: "Admin",
  });
  res.status(200).json({ success: true, message: "New Admin Registered" });
});

//! All Doctors
const getAllDoctors = catchError(async (req, res, next) => {
  const doctors = await UserModel.find({ role: "Doctor" });
  res.status(200).json({ success: true, doctors });
});

//! Get User Details
const getUserDetails = catchError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ success: true, user });
});

//! Logout
const adminLogout = catchError(async (req, res, next) => {
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({ success: true, message: "Admin Logged Out Successfully" });
});

//! Patient Logout
const patientLogout = catchError(async (req, res, next) => {
  res
    .status(201)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({ success: true, message: "Patient Logged Out Successfully" });
});

export {
  patientRegister,
  userLogin,
  addNewAdmin,
  getAllDoctors,
  getUserDetails,
  adminLogout,
  patientLogout,
};
