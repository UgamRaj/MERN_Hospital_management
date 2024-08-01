import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useHospital } from "../../Context/UserProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { RxHamburgerMenu } from "react-icons/rx";
import "./Navbar.css";
import Loader from "../Loader/Loader";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useHospital();
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://mern-hospital-management.onrender.com/api/v1/user/patient/logout",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setLoading(false);
        toast.success(res.data.message);
        setIsAuthenticated(false);
        navigate("/");
      }
    } catch (error) {
      //   console.log("🚀 ~ handleLogout ~ error:", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleLogin = async () => {
    navigate("/loginsignup");
  };
  const toggleMenu = () => {
    setShow(!show);
  };

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}

      <div
        className={`navbar ${
          scrollPosition > 950
            ? "hide-navbar"
            : scrollPosition > 200
            ? "blur-navbar"
            : ""
        }`}
      >
        <div className="navbarMain">
          <div className="logo">
            <NavLink to={"/"}>
              <img src="/smlogo1.png" alt="logo" />
            </NavLink>
          </div>

          <div className="navLinks">
            <div
              className={`linksAll ${
                show && scrollPosition <= 950 ? "show-linksAll" : ""
              }`}
            >
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
              <NavLink
                to={"/aboutus"}
                activeclassname="active"
                className="links"
              >
                About Us
              </NavLink>
            </div>
          </div>

          <div
            className={`authBtnContainer ${
              show && scrollPosition <= 950 ? "show-authBtnContainer" : ""
            }`}
          >
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
          <div className="hamburger" onClick={toggleMenu}>
            <RxHamburgerMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
