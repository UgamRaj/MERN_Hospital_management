import { Navigate } from "react-router-dom";
import { useHospital } from "../Context/UserProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const Home = () => {
  const { isAuthenticated, user } = useHospital();
  const [availableAppointment, setavailableAppointment] = useState([]);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:10000/api/v1/appointment/get-all-appointments",
          { withCredentials: true }
        );
        setavailableAppointment(data.appointments);
      } catch (error) {
        setavailableAppointment([]);
        console.log(error);
      }
    };
    fetchAppointment();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  const statusHandler = async (id, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:10000/api/v1/appointment/update/${id}`,
        { status },
        { withCredentials: true }
      );
      setavailableAppointment((prevAppoint) =>
        prevAppoint.map((appointment) =>
          appointment._id === id ? { ...appointment, status } : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log("🚀 ~ statusHandler ~ error:", error);
    }
  };

  return (
    <div className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/doc.png" alt="docter" />
          <div className="content">
            <div>
              <p>Hello</p>
              <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              iure asperiores quas ab dolor repudiandae placeat odio, optio
              necessitatibus. Praesentium, consequuntur quos obcaecati quia
              numquam et beatae error voluptatum corporis!
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointment</p>
          <p>{availableAppointment.length}</p>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors</p>
          <p>{2}</p>
        </div>
      </div>
      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {availableAppointment && availableAppointment.length > 0 ? (
              availableAppointment?.map((appointment) => {
                return (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName} `}</td>
                    <td>{appointment.appointment_date.substring(0, 10)}</td>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <select
                        name=""
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Rejected"
                            ? "value-rejected"
                            : "value-accepted"
                        }
                        value={appointment.status}
                        onChange={(e) =>
                          statusHandler(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td>
                      {appointment.isVisited === true ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>No Appointments</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
