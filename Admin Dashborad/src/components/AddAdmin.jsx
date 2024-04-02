import { Navigate, useNavigate } from "react-router-dom";
import { useHospital } from "../Context/UserProvider";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddAdmin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useHospital();
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
        "http://localhost:10000/api/v1/user/admin/addnew",
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

  return (
    <div className="loginSignup adminPage">
      <div className="loginSignupContainer">
        <h1>Add New Admin</h1>
        <div className="loginSignupFields">
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

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email Address"
            onChange={changehandler}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={changehandler}
          />
        </div>
        <button onClick={signUpAdminHandler}>Continue</button>
      </div>
    </div>
  );
};

export default AddAdmin;
