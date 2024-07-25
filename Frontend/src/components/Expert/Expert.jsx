import { useEffect, useState } from "react";
// import { useHospital } from "../../Context/UserProvider";
import { toast } from "react-toastify";
import axios from "axios";
// import { Navigate } from "react-router-dom";
import "./Expert.css";
import Loader from "../Loader/Loader";

const Expert = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { isAuthenticated } = useHospital();
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://mern-hospital-management.onrender.com/api/v1/user/doctors",
        { withCredentials: true }
      );

      setDoctors(data.doctors);
      setLoading(false);
      // console.log(data.doctors);
    } catch (error) {
      toast.error(error.response.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // if (!isAuthenticated) {
  //   return <Navigate to={"/loginsignup"} />;
  // }

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}

      <div className="expertMain">
        <div className="expertMainUpper">
          <h6>OUR EXPERTS</h6>
          <h2>Our Doctors & Medical Specialists</h2>
          <p>
            Our doctors and experts are very sincere and professional in
            handling your every problem, armed with qualified experience in
            their fields.
          </p>
        </div>

        <div className="expertContainer">
          {doctors && doctors.length > 0 ? (
            doctors.map(
              ({
                _id,
                firstName,
                lastName,
                doctorAvator,
                doctorDepartment,
              }) => {
                return (
                  <div className="expertDoctorMain" key={_id}>
                    <div className="expertCard">
                      <img src={doctorAvator.url} alt="doctor" />
                    </div>

                    <div className="expertDctorDetail">
                      <h6>
                        {firstName} {lastName}
                      </h6>
                      <p>{doctorDepartment}</p>
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <>
              <div className="expertDoctorMain">
                <div className="expertCard">
                  <img src="/doctor-8.jpg" alt="doctor" />
                </div>
                <div className="expertDctorDetail">
                  <h6>Cameron Williamson</h6>
                  <p>Doctor</p>
                </div>
              </div>
              <div className="expertDoctorMain">
                <div className="expertCard">
                  <img src="/Doctor-4.jpg" alt="doctor" />
                </div>
                <div className="expertDctorDetail">
                  <h6>Cameron Williamson</h6>
                  <p>Doctor</p>
                </div>
              </div>
              <div className="expertDoctorMain">
                <div className="expertCard">
                  <img src="/Doctor-2.jpg" alt="doctor" />
                </div>
                <div className="expertDctorDetail">
                  <h6>Cameron Williamson</h6>
                  <p>Doctor</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Expert;
