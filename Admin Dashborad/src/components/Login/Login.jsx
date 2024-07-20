import { useState } from "react";
import { useHospital } from "../../Context/UserProvider";
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
        "https://mern-hospital-management.onrender.com/api/v1/user/login",
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
    <div className="formLoginContainer">
      <form className="form">
        <p className="title">Login </p>
        <p className="message">Login now and get full access to our app. </p>

        <label>
          <input
            className="input"
            type="email"
            placeholder=""
            required
            name="email"
            value={formData.email}
            onChange={changehandler}
          />
          <span>Email</span>
        </label>

        <label>
          <input
            className="input"
            type="password"
            placeholder=""
            required
            name="password"
            value={formData.password}
            onChange={changehandler}
          />
          <span>Password</span>
        </label>

        <button className="continueBtn" onClick={loginHandler}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default Login;
