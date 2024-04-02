import { useState } from "react";
import { useHospital } from "../Context/UserProvider";
import { toast } from "react-toastify";
import axios from "axios";
import "./Login.css";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useHospital();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
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
        { ...formData, role: "Admin" },
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

  return (
    <div className="loginSignup">
      <div className="loginSignupContainer">
        <h1>Login</h1>
        <div className="loginSignupFields">
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
            loginHandler();
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Login;
