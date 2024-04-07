import mongoose from "mongoose";
// import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name Must Contain At Least 3 Characters."],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [1, "Last Name Must Contain At Least 1 Characters."],
  },

  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone Number must contain exact 10 digits"],
    maxLength: [10, "Phone Number must contain exact 10 digits"],
  },

  // dob: {
  //   type: Date,
  //   required: [true, "DOB is required"],
  // },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  appointment_date: { type: Date, required: true },
  department: { type: String, required: true },
  doctor: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  isVisited: { type: Boolean, default: false },
  doctorId: { type: mongoose.Schema.ObjectId, required: true },
  patientId: { type: mongoose.Schema.ObjectId, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

const AppointmentModel = mongoose.model("appointment", appointmentSchema);

export default AppointmentModel;
