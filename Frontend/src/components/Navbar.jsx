import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        "http://localhost:10000/api/v1/user/patient/logout",
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
    navigate("/login");
  };

  return (
    <div className="container navbar">
      <div className="logo">SeerviCare</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"}>Home</Link>
          <Link to={"/appointment"}>Appoinment</Link>
          <Link to={"/aboutus"}>About Us</Link>
        </div>
      </div>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logoutBtn btn">
            Logout
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
