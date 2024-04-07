import { useEffect, useState } from "react";
// import { useHospital } from "../../Context/UserProvider";
import { toast } from "react-toastify";
import axios from "axios";
// import { Navigate } from "react-router-dom";
import "./Expert.css";

const Expert = () => {
  const [doctors, setDoctors] = useState([]);
  // const { isAuthenticated } = useHospital();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:10000/api/v1/user/doctors",
          { withCredentials: true }
        );

        setDoctors(data.doctors);
        // console.log(data.doctors);
      } catch (error) {
        toast.error(error.response.message);
      }
    };
    fetchDoctors();
  }, []);

  // if (!isAuthenticated) {
  //   return <Navigate to={"/loginsignup"} />;
  // }

  return (
    <div className="expertMain">
      <div className="expertMainUpper">
        <h6>OUR EXPERTS</h6>
        <h2>Our Doctors & Medical Specialists</h2>
        <p>
          Our doctors and experts are very sincere and professional in handling
          your every problem, armed with qualified experience in their fields.
        </p>
      </div>

      <div className="expertContainer">
        {doctors && doctors.length > 0 ? (
          doctors.map(
            ({ _id, firstName, lastName, doctorAvator, doctorDepartment }) => {
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
                <img src="/Doctor-8.jpg" alt="doctor" />
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
  );
};

export default Expert;
