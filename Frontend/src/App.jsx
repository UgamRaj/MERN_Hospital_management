import "./App.css";
import { useHospital } from "./Context/UserProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const { setUser, isAuthenticated, setIsAuthenticated } = useHospital();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:10000/api/v1/user/patient/me",
          { withCredentials: true }
        );
        // console.log("🚀 ~ fetchUser ~ response:", response);
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/loginsignup" element={<Login />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
