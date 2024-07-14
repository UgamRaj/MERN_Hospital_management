import "./App.css";
import { useHospital } from "./Context/UserProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer/Footer";

const App = () => {
  const { setUser, isAuthenticated, setIsAuthenticated } = useHospital();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://mern-hospital-management.onrender.com/api/v1/user/patient",
          { withCredentials: true }
        );

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
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
