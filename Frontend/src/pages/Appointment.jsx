import { useEffect, useRef } from "react";
import AppointmentForm from "../components/AppointmentForm/AppointmentForm";
import Emergency from "../components/Emergency/Emergency";
import Expert from "../components/Expert/Expert";
import { useSearchParams } from "react-router-dom";

const Appointment = () => {
  const [searchParams] = useSearchParams();
  const appointmentFormRef = useRef(null);

  useEffect(() => {
    if (searchParams.get("scrollToForm") === "true") {
      appointmentFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // console.log("scroll");
  }, [searchParams]);

  return (
    <>
      <Expert />
      <Emergency />
      <div ref={appointmentFormRef}>
        <AppointmentForm />
      </div>
    </>
  );
};

export default Appointment;
