import { useState } from "react";
import { useHospital } from "../Context/UserProvider";
import { toast } from "react-toastify";
import axios from "axios";
import "./Login.css";
import { Navigate, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useHospital();
  const [state, setState] = useState("Sign In");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        "https://mern-hospital-management.onrender.com/api/v1/user/signup",
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
    <div className="formContainer">
      <form className="form">
        <p className="title">{state}</p>
        <p className="message">{state} now and get full access to our app.</p>
        {state == "Sign Up" && (
          <>
            <div className="flex">
              <label>
                <input
                  className="input"
                  type="text"
                  placeholder=""
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={changehandler}
                />
                <span>Firstname</span>
              </label>

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
                <span>Lastname</span>
              </label>
            </div>

            <label>
              <input
                className="input"
                type="number"
                placeholder=""
                required
                name="phone"
                value={formData.phone}
                onChange={changehandler}
              />
              <span>Phone Number</span>
            </label>

            <label>
              <input
                className="input"
                type="number"
                placeholder=""
                required
                name="age"
                value={formData.age}
                onChange={changehandler}
              />
              <span>Age</span>
            </label>
            <label>
              <select
                className="select"
                name="gender"
                value={formData.gender}
                onChange={changehandler}
              >
                <option value="" className="lightOption">
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <span>Select Gender</span>
            </label>
          </>
        )}
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
            type={showPassword ? "text" : "password"}
            placeholder=""
            required
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

        <button
          className="submit"
          onClick={() => {
            state == "Login" ? loginHandler() : signUpHandler();
          }}
        >
          Submit
        </button>

        {state === "Sign Up" ? (
          <p className="signin">
            Already have an account?
            <span onClick={() => setState("Login")}>Signin</span>
          </p>
        ) : (
          <p className="signin">
            Create an account?
            <span onClick={() => setState("Sign Up")}>Register</span>
          </p>
        )}
      </form>
    </div>
    // <div className="loginSignup">
    //   <div className="loginSignupContainer">
    //     <h1>{state}</h1>
    //     <div className="loginSignupFields">
    //       {state == "Sign Up" && (
    //         <>
    //           <input
    //             type="text"
    //             name="firstName"
    //             value={formData.firstName}
    //             onChange={changehandler}
    //             placeholder="First Name"
    //           />
    //           <input
    //             type="text"
    //             name="lastName"
    //             value={formData.lastName}
    //             onChange={changehandler}
    //             placeholder="Last Name"
    //           />
    //           <input
    //             type="number"
    //             name="phone"
    //             value={formData.phone}
    //             onChange={changehandler}
    //             placeholder="Phone Number"
    //           />
    //           <input
    //             type="number"
    //             name="age"
    //             value={formData.age}
    //             onChange={changehandler}
    //             placeholder="Age"
    //           />

    //           <select
    //             name="gender"
    //             value={formData.gender}
    //             onChange={changehandler}
    //           >
    //             <option value="">Select Gender</option>
    //             <option value="Male">Male</option>
    //             <option value="Female">Female</option>
    //             <option value="Other">Other</option>
    //           </select>
    //         </>
    //       )}
    //       <input
    //         type="email"
    //         name="email"
    //         value={formData.email}
    //         onChange={changehandler}
    //         placeholder="Email Address"
    //       />
    //       <input
    //         type="password"
    //         name="password"
    //         value={formData.password}
    //         onChange={changehandler}
    //         placeholder="Password"
    //       />
    //     </div>
    //     <button
    //       onClick={() => {
    //         state == "Login" ? loginHandler() : signUpHandler();
    //       }}
    //     >
    //       Continue
    //     </button>
    //     {state === "Sign Up" ? (
    //       <p className="loginSignupLogin">
    //         Already have an account?{" "}
    //         <span onClick={() => setState("Login")}>Login Here</span>
    //       </p>
    //     ) : (
    //       <p className="loginSignupLogin">
    //         Create an account?{" "}
    //         <span onClick={() => setState("Sign Up")}>Click Here</span>
    //       </p>
    //     )}
    //   </div>
    // </div>
  );
};

export default Login;
