import { useState } from "react";
import { useHospital } from "../Context/UserProvider";
import { toast } from "react-toastify";
import axios from "axios";
import "./Login.css";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useHospital();
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    age: "",
  });

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  const changehandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    console.log("login", formData);
    try {
      const response = await axios.post(
        "http://localhost:10000/api/v1/user/login",
        { ...formData, role: "Patient" },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("🚀 ~ loginHandler ~ response:", response);

      const responseData = response.data;

      if (responseData.success) {
        toast.success(responseData.message);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error:", error);
    }
  };
  const signUpHandler = async () => {
    console.log("signup", formData);
    try {
      const response = await axios.post(
        "http://localhost:10000/api/v1/user/signup",
        { ...formData },
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

  return (
    <div className="loginSignup">
      <div className="loginSignupContainer">
        <h1>{state}</h1>
        <div className="loginSignupFields">
          {state == "Sign Up" && (
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
            </>
          )}
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
        <button
          onClick={() => {
            state == "Login" ? loginHandler() : signUpHandler();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginSignupLogin">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login Here</span>
          </p>
        ) : (
          <p className="loginSignupLogin">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click Here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
