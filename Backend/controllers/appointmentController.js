import { catchError } from "../middleware/catchErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import AppointmentModel from "../models/appointmentModel.js";
import UserModel from "../models/userModel.js";

const bookAppointment = catchError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    aadhar,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    isVisited,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !aadhar ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please fill full form", 400));
  }

  const isConflict = await UserModel.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor Not Found", 400));
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctor conflict! Please contect through email or phone",
        400
      )
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const appointment = await AppointmentModel.create({
    firstName,
    lastName,
    email,
    phone,
    aadhar,
    dob,
    gender,
    appointment_date,
    department,
    doctor: { firstName: doctor_firstName, lastName: doctor_lastName },
    isVisited,
    address,
    doctorId,
    patientId,
  });
  res
    .status(200)
    .json({ success: true, message: "Appointment Sent Successfully" });
});

//! All Appointment

const getAllAppointment = catchError(async (req, res, next) => {
  const appointments = await AppointmentModel.find();
  res.status(200).json({ success: true, appointments });
});

//! Update Appointment Status
const updateAppointmentStatus = catchError(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await AppointmentModel.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 404));
  }
  appointment = await AppointmentModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Appointment Status Updated",
    appointment,
  });
});

//! Delete Appointment

const removeAppointment = catchError(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await AppointmentModel.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({ success: true, message: "Appointment Deleted" });
});

export {
  bookAppointment,
  getAllAppointment,
  updateAppointmentStatus,
  removeAppointment,
};
