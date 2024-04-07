import { useEffect, useState } from "react";
import { useHospital } from "../Context/UserProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated, setNoOfDoctor } = useHospital();

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
      <h1>Doctors</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors?.map((doctor, i) => {
            return (
              <div className="card" key={i}>
                <img
                  src={doctor.doctorAvator && doctor.doctorAvator.url}
                  alt="doctor Avator"
                />
                <h4>{`${doctor.firstName} ${doctor.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email : <span>{doctor.email}</span>
                  </p>
                  <p>
                    Phone : <span>{doctor.phone}</span>
                  </p>
                  <p>
                    Age : <span>{doctor.age}</span>
                  </p>
                  <p>
                    Gender : <span>{doctor.gender}</span>
                  </p>
                  <p>
                    Department : <span>{doctor.doctorDepartment}</span>
                  </p>
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
