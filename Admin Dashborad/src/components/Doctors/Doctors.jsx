import { useEffect, useState } from "react";
import { useHospital } from "../../Context/UserProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "./Doctors.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated, setNoOfDoctor, noOfDoctor } = useHospital();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://mern-hospital-management.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );

        setDoctors(data.doctors);
        setNoOfDoctor(data.doctors.length);
      } catch (error) {
        toast.error(error.response.message);
      }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="page doctors">
      <div className="doctorsHeading">
        <h1>Doctors & Medical Specialists</h1>
        <h2>
          Total: <span>{noOfDoctor}</span>
        </h2>
      </div>

      <div className="doctorsCards">
        {doctors && doctors.length > 0 ? (
          doctors?.map((doctor, i) => {
            return (
              <div className="doctorCard" key={i}>
                <div className="doctorImage">
                  <img
                    src={doctor.doctorAvator && doctor.doctorAvator.url}
                    alt=""
                  />
                </div>
                <h2>{`${doctor.firstName} ${doctor.lastName}`}</h2>
                <div className="doctorCardDetails">
                  <h3>
                    Department:
                    <span className="lightText">{doctor.doctorDepartment}</span>
                  </h3>

                  <h3>
                    Email: <span className="lightText">{doctor.email}</span>
                  </h3>

                  <h3>
                    Phone: <span className="lightText">{doctor.phone}</span>
                  </h3>

                  <h3>
                    Gender: <span className="lightText">{doctor.gender}</span>
                  </h3>
                  <h3>
                    Age: <span className="lightText">{doctor.age}</span>
                  </h3>
                </div>
              </div>
            );
          })
        ) : (
          <h2 className="noDoctor">No Registered Doctors found</h2>
        )}
      </div>
    </div>
  );
};

export default Doctors;
