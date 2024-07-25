import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AppointmentForm.css";
import Loader from "../Loader/Loader";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [isVisited, setIsVisited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    age: "",
    appointment_date: "",
    department: "",
    // doctor_firstName: "",
    // doctor_lastName: "",
    // isVisited: false,
    doctorName: "",
  });

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://mern-hospital-management.onrender.com/api/v1/user/doctors",
        {
          withCredentials: true,
        }
      );
      //   console.log("🚀 ~ fetchDoctors ~ data:", data);
      setDoctors(data.doctors);
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ fetchDoctors ~ error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const departments = [
    "Gyneocology",
    "Orthopedics",
    "Pediatrics",
    "Cardiology",
    "Oncology",
    "Orthopedics",
    "Urology",
    "ENT",
    "Physical Therapy",
    "Dermatology",
    "Neurology",
    "Radiology",
    "Gastroenterology",
  ];

  const changehandler = (e) => {
    const { name, value } = e.target;

    // if (name === "doctorName") {
    //   const fullName = value.split(" ");
    //   console.log("🚀 ~ changehandler ~ fullName:", fullName[0]);
    //   setFormData({
    //     ...formData,
    //     // doctor_firstName: fullName[0] || "",
    //     // doctor_lastName: fullName[1] || "",
    //   });
    // }
    setFormData({ ...formData, [name]: value });
  };

  const handleAppointment = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("form", formData);
    try {
      const { data } = await axios.post(
        `https://mern-hospital-management.onrender.com/api/v1/appointment/book`,
        { ...formData, isVisited },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("🚀 ~ handleAppointment ~ data:", data);
      toast.success(data.message);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log("🚀 ~ handleAppointment ~ error:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <div className="appointmentContainer">
        <h1>Appointment Form</h1>
        <div className="login-box">
          <form>
            <div className="user-box">
              <label>
                <input
                  type="text"
                  className="input"
                  name="firstName"
                  value={formData.firstName}
                  placeholder=""
                  required
                  onChange={changehandler}
                />
                <span>First Name</span>
              </label>
            </div>
            <div className="user-box">
              <label>
                <input
                  className="input"
                  type="text"
                  placeholder=""
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={changehandler}
                />
                <span>Last Name</span>
              </label>
            </div>
            <div className="user-box">
              <label>
                <input
                  className="input"
                  placeholder=""
                  required
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={changehandler}
                />
                <span>Phone Number</span>
              </label>
            </div>
            <div className="user-box">
              <label>
                <input
                  className="input"
                  placeholder=""
                  required
                  type="date"
                  name="appointment_date"
                  value={formData.appointment_date}
                  onChange={changehandler}
                />
                <span>Appointment Date</span>
              </label>
            </div>
            <div className="user-box">
              <label>
                <input
                  className="input"
                  placeholder=""
                  required
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={changehandler}
                />
                <span>Age</span>
              </label>
            </div>
            <div className="user-box">
              <label>
                <select
                  className="select"
                  name="gender"
                  value={formData.gender}
                  onChange={changehandler}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>
            <div className="user-box">
              <label>
                <select
                  className="select"
                  name="department"
                  value={formData.department}
                  onChange={changehandler}
                >
                  <option value="">Select Department</option>
                  {departments.map((department, i) => {
                    return (
                      <option key={i} value={department}>
                        {department}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>

            <div className="user-box">
              <label>
                <select
                  className="select"
                  name="doctorName"
                  value={`${formData.doctorName}`}
                  onChange={changehandler}
                  disabled={!formData.department}
                >
                  <option value="">Select Doctor</option>
                  {doctors
                    ?.filter(
                      (doctor) =>
                        doctor.doctorDepartment === formData.department
                    )
                    .map((doctor, index) => (
                      <option
                        value={`${doctor.firstName} ${doctor.lastName}`}
                        key={index}
                      >
                        {doctor.firstName} {doctor.lastName}
                      </option>
                    ))}
                </select>
              </label>
            </div>

            <div className="user-box">
              <div className="isVisitedContainer">
                <input
                  className="isVisited"
                  type="checkbox"
                  name="isVisited"
                  onChange={(e) => setIsVisited(e.target.checked)}
                  checked={isVisited}
                />
                <p>Is Visited</p>
              </div>
            </div>

            <center>
              <button className="formSubBtn" onClick={handleAppointment}>
                Submit
                <span></span>
              </button>
            </center>
          </form>
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
