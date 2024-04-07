import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [isVisited, setIsVisited] = useState(false);
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

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:10000/api/v1/user/doctors",
        {
          withCredentials: true,
        }
      );
      //   console.log("🚀 ~ fetchDoctors ~ data:", data);
      setDoctors(data.doctors);
    };
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
    console.log("form", formData);
    try {
      const { data } = await axios.post(
        `http://localhost:10000/api/v1/appointment/book`,
        { ...formData, isVisited },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("🚀 ~ handleAppointment ~ data:", data);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.log("🚀 ~ handleAppointment ~ error:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="loginSignup">
      <div className="loginSignupContainer">
        <h1>Appointment Form</h1>
        <div className="loginSignupFields">
          <>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
              onChange={changehandler}
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={changehandler}
            />
            <input
              type="number"
              name="phone"
              value={formData.phone}
              placeholder="Phone Number"
              onChange={changehandler}
            />
            <input
              type="date"
              placeholder="Appointment Date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={changehandler}
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              placeholder="Age"
              onChange={changehandler}
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={changehandler}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <select
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
            <select
              name="doctorName"
              value={`${formData.doctorName}`}
              onChange={changehandler}
              disabled={!formData.department}
            >
              <option value="">Select Doctor</option>
              {doctors
                ?.filter(
                  (doctor) => doctor.doctorDepartment === formData.department
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
          </>
        </div>
        <button onClick={handleAppointment}>Book</button>
      </div>
    </div>
  );
};

export default AppointmentForm;
