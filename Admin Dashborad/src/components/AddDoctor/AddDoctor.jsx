import { Navigate, useNavigate } from "react-router-dom";
import { useHospital } from "../../Context/UserProvider";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import "./AddDoctor.css";

const AddDoctor = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useHospital();
  const [showPassword, setShowPassword] = useState(false);
  const [docPreview, setDocPreview] = useState("");
  const [docAvator, setDocAvator] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    age: "",
    // aadhar: "",
    doctorAvator: "",
    doctorDepartment: "",
  });

  const departments = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const changehandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //! Handling files of images
  const avtarFilehandler = (e) => {
    const file = e.target.files[0];
    // const res = URL.createObjectURL(file);
    // console.log("🚀 ~ avtarFilehandler ~ res:", res);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocPreview(reader.result);
      // setDocPreview(res);
      setDocAvator(file);
      // console.log("🚀 ~ avtarFilehandler ~ file:", reader.result);
    };
  };

  const doctorHandler = async () => {
    formData.doctorAvator = docAvator;
    console.log("Doctor", formData);

    try {
      const response = await axios.post(
        "https://mern-hospital-management.onrender.com//api/v1/user/doctor/addnew",
        { ...formData },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const responseData = response.data;
      if (responseData.success) {
        toast.success(responseData.message);
        // setIsAuthenticated(true);
        navigate("/doctors");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // console.error("Error:", error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="page">
      <h1 className="adminHeading">Add New Doctor</h1>
      <div className="appointmentContainer">
        <div className="login-box">
          <div className="docPreview">
            <img
              src={docPreview ? `${docPreview}` : "/docHolder.jpg"}
              alt="Doctor Avtor"
            />
          </div>
          <form>
            <div className="user-box">
              <label className="custom-file-upload">
                <input
                  id="file-upload"
                  type="file"
                  onChange={avtarFilehandler}
                />
                <span>Upload Image</span>
              </label>
            </div>

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
                  name="doctorDepartment"
                  value={formData.doctorDepartment}
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
                <input
                  className="input"
                  placeholder=""
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changehandler}
                />
                <span>Email</span>
              </label>
            </div>
            <div className="user-box">
              <label>
                <input
                  className="input"
                  placeholder=""
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={changehandler}
                />
                <span>Password</span>
                <button
                  type="button"
                  className="toggle-button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <IoEye size={"1.5rem"} color="gray" />
                  ) : (
                    <IoMdEyeOff size={"1.5rem"} color="gray" />
                  )}
                </button>
              </label>
            </div>

            <center>
              <button className="formSubBtn" onClick={doctorHandler}>
                Submit
                <span></span>
              </button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
