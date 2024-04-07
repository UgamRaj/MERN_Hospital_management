import express from "express";
import {
  addNewAdmin,
  userLogin,
  patientRegister,
  getAllDoctors,
  getUserDetails,
  adminLogout,
  patientLogout,
  addDoctor,
} from "../controllers/userController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", patientRegister);
router.post("/login", userLogin);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
// router.post("/admin/addnew", addNewAdmin);//! This is just added first admin
router.get("/doctors", getAllDoctors);
router.get("/admin", isAdminAuthenticated, getUserDetails);
router.get("/patient", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, adminLogout);
router.get("/patient/logout", isPatientAuthenticated, patientLogout);
router.post("/doctor/addnew", isAdminAuthenticated, addDoctor);

export default router;
