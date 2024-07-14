import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import "./Footer.css";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "10:00 AM - 5:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "8:00 AM - 6:00 PM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "8:00 AM - 6:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "8:00 AM - 6:00 PM",
    },
    {
      id: 5,
      day: "Friday",
      time: "8:00 AM - 6:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "10:00 AM - 5:00 PM",
    },
    {
      id: 7,
      day: "Sunday",
      time: "10:00 AM - 5:00 PM",
    },
  ];

  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerlogo">
          <img src="/smlogo1.png" alt="logo" className="logo-img" />
        </div>
        <div className="footerQuickLink">
          <h4>Quick Links</h4>
          <ul>
            <Link to={"/"}>Home</Link>
            <Link to={"/appointment"}>Appointment</Link>
            <Link to={"/aboutus"}>About Us</Link>
          </ul>
        </div>

        <div className="footerContact">
          <h4>Contact</h4>
          <div className="fooerContactDetails">
            <div>
              {<FaPhone />}
              <p>+91-98765-4321</p>
            </div>
            <div>
              {<MdEmail />}
              <p>seervi@gmail.com</p>
            </div>
            <div>
              <FaLocationArrow />
              <p>Jodhpur, Rajasthan</p>
            </div>
          </div>
        </div>
        <div className="footerSchedule">
          <h4>SCHEDULE</h4>
          <ul>
            {hours.map((elm) => {
              return (
                <li key={elm.id}>
                  <p>{elm.day}</p>
                  <p>{elm.time}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
