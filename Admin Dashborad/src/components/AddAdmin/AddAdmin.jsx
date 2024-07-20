import { Navigate, useNavigate } from "react-router-dom";
import "./AddAdmin.css";
import { useHospital } from "../../Context/UserProvider";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddAdmin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useHospital();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    age: "",
  });

  const changehandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUpAdminHandler = async () => {
    console.log("signup", formData);
    try {
      const response = await axios.post(
        "https://mern-hospital-management.onrender.com//api/v1/user/admin/addnew",
        { ...formData, role: "Admin" },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = response.data;
      if (responseData.success) {
        toast.success(responseData.message);
        setIsAuthenticated(true);
        navigate("/");
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
      <h1 className="adminHeading">Add New Admin</h1>
      <div className="appointmentContainer">
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
              <button className="formSubBtn" onClick={signUpAdminHandler}>
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

export default AddAdmin;
