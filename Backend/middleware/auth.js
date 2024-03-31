import { catchError } from "./catchErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/userModel.js";

dotenv.config();

//todo--> Admin Authenticate
const isAdminAuthenticated = catchError(async (req, res, next) => {
  const token = req.cookies.adminToken;
  console.log("🚀 ~ isAdminAuthenticated ~ token:", token);
  if (!token) {
    return next(new ErrorHandler("Admin not authenticated", 400));
  }
  //! Authentication
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log("🚀 ~ isAdminAuthenticated ~ decoded:", decoded);
  const user = await UserModel.findById(decoded.id);

  req.user = user;

  //! Authorization from here
  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} not authorized for this resources`,
        403
      )
    );
  }
  next();
});

//Todo-->For patient
const isPatientAuthenticated = catchError(async (req, res, next) => {
  const token = req.cookies.patientToken;
  console.log("🚀 ~ isPatientAuthenticated ~ token:", token);
  if (!token) {
    return next(new ErrorHandler("Patient not authenticated", 400));
  }
  //! Authentication
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log("🚀 ~ isPatientAuthenticated ~ decoded:", decoded);
  const user = await UserModel.findById(decoded.id);

  req.user = user;

  //! Authorization from here
  if (req.user.role !== "Patient") {
    return next(
      new ErrorHandler(
        `${req.user.role} not authorized for this resources`,
        403
      )
    );
  }
  next();
});

export { isAdminAuthenticated, isPatientAuthenticated };
