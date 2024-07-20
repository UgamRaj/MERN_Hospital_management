import { useState } from "react";
import { useHospital } from "../../Context/UserProvider";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const SideBar = () => {
  const [show, setShow] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useHospital();
  const navigate = useNavigate();

  const handleNavigation = (path = "/", linkName = "home") => {
    navigate(path);
    setShow(!show);
    setActiveLink(linkName);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "https://mern-hospital-management.onrender.com/api/v1/user/admin/logout",
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div
          className="logoImage"
          onClick={() => handleNavigation("/", "home")}
        >
          <img src="smlogo1.png" alt="ssfsf" />
        </div>
        <div className="links">
          <div
            className={`sidebarLinks ${activeLink === "home" ? "active" : ""}`}
            onClick={() => handleNavigation("/", "home")}
          >
            <TiHome title="Home" />
            <p>Home</p>
          </div>
          <div
            className={`sidebarLinks ${
              activeLink === "doctors" ? "active" : ""
            }`}
            onClick={() => handleNavigation("/doctors", "doctors")}
          >
            <FaUserDoctor title="Doctors" />
            <p>Doctors</p>
          </div>
          <div
            className={`sidebarLinks ${
              activeLink === "addAdmin" ? "active" : ""
            }`}
            onClick={() => handleNavigation("/addadmin", "addAdmin")}
          >
            <MdAddModerator title="Add Admin" />
            <p>Add Admin</p>
          </div>
          <div
            className={`sidebarLinks ${
              activeLink === "addDoctor" ? "active" : ""
            }`}
            onClick={() => handleNavigation("/adddoctor", "addDoctor")}
          >
            <IoPersonAddSharp title="Add Doctor" />
            <p>Add Doctor</p>
          </div>
          <div
            className={`sidebarLinks ${
              activeLink === "messages" ? "active" : ""
            }`}
            onClick={() => handleNavigation("/messages", "messages")}
          >
            <AiFillMessage title="Messages" />
            <p>Messages</p>
          </div>
          <div className="sidebarLinks" onClick={handleLogout}>
            <RiLogoutBoxFill title="Logout" />
            <p>Logout</p>
          </div>
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default SideBar;
