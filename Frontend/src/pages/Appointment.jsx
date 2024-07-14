import AppointmentForm from "../components/AppointmentForm";
import Emergency from "../components/Emergency/Emergency";
import Expert from "../components/Expert/Expert";

const Appointment = () => {
  return (
    <>
      <Expert />
      <Emergency />
      <AppointmentForm />
    </>
  );
};

export default Appointment;
