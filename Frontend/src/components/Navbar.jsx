import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useHospital } from "../Context/UserProvider";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useHospital();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "https://mern-hospital-management.onrender.com/api/v1/user/patient/logout",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      }
    } catch (error) {
      //   console.log("🚀 ~ handleLogout ~ error:", error);
      toast.error(error.response.data.message);
    }
  };
  const handleLogin = async () => {
    navigate("/loginsignup");
  };

  return (
    <div className="container navbar">
      <div className="logo">
        <img src="/logoS.png" alt="" />
      </div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <NavLink to={"/"} activeclassname="active" className="links">
            Home
          </NavLink>
          <NavLink
            to={"/appointment"}
            activeclassname="active"
            className="links"
          >
            Appointment
          </NavLink>
          <NavLink to={"/aboutus"} activeclassname="active" className="links">
            About Us
          </NavLink>
        </div>
      </div>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logoutBtn btn">
            Log Out
          </button>
        ) : (
          <button onClick={handleLogin} className="logoutBtn btn">
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
