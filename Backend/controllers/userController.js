import { catchError } from "../middleware/catchErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import UserModel from "../models/userModel.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

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

//! Add New Doctor

const addDoctor = catchError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avator Required", 400));
  }
  const { doctorAvator } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(doctorAvator.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    aadhar,
    doctorDepartment,
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
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please provide full details", 400));
  }
  const isRegistered = await UserModel.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} already registered with this email`,
        400
      )
    );
  }
  const cloudinaryRes = await cloudinary.uploader.upload(
    doctorAvator.tempFilePath
  );
  console.log("🚀 ~ addDoctor ~ cloudinaryRes:", cloudinaryRes);
  if (!cloudinaryRes || cloudinaryRes.error) {
    console.error(
      "Cloudinary Error",
      cloudinaryRes.error || "Unknown Cloudinary Error"
    );
  }
  const doctor = await UserModel.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    aadhar,
    doctorDepartment,
    role: "Doctor",
    doctorAvator: {
      public_id: cloudinaryRes.public_id,
      url: cloudinaryRes.secure_url,
    },
  });

  res
    .status(200)
    .json({ success: true, message: "New Doctor Registered", doctor });
});

export {
  patientRegister,
  userLogin,
  addNewAdmin,
  getAllDoctors,
  getUserDetails,
  adminLogout,
  patientLogout,
  addDoctor,
};
