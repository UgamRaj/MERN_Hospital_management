import "./App.css";
import { useHospital } from "./Context/UserProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import AddDoctor from "./components/AddDoctor";
import AddAdmin from "./components/AddAdmin";
import Message from "./components/Message";
import Doctors from "./components/Doctors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "axios";
import SideBar from "./components/SideBar";

const App = () => {
  const { setUser, isAuthenticated, setIsAuthenticated } = useHospital();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://mern-hospital-management.onrender.com/api/v1/user/admin",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        console.log("🚀 ~ fetchUser ~ error:", error);
        setIsAuthenticated(false);
        setUser(false);
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adddoctor" element={<AddDoctor />} />
          <Route path="/addadmin" element={<AddAdmin />} />
          <Route path="/messages" element={<Message />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
