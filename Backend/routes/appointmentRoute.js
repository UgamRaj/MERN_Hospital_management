import express from "express";
import {
  bookAppointment,
  getAllAppointment,
  removeAppointment,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middleware/auth.js";

const router = express.Router();

router.post("/book", isPatientAuthenticated, bookAppointment);
router.get("/get-all-appointments", isAdminAuthenticated, getAllAppointment);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, removeAppointment);

export default router;
