import express from "express";
import {
  addNewAdmin,
  userLogin,
  patientRegister,
  getAllDoctors,
  getUserDetails,
  adminLogout,
  patientLogout,
} from "../controllers/userController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middleware/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/user/login", userLogin);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, adminLogout);
router.get("/patient/logout", isPatientAuthenticated, patientLogout);

export default router;
