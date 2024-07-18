import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = ({ imageUrl }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/appointment?scrollToForm=true");
  };

  return (
    <>
      <div className="hero">
        <div className="heroLeft ">
          <h1>Welcome to </h1>
          <h1>Seervi Medical Institute</h1>
          <h2>Inspiring Better Health Care For Everyone</h2>
          <p>
            Health always begins with a healthy life style. Being healthy will
            makes you happier.
          </p>
        </div>
        <div className="mainImage">
          <img src={imageUrl} alt="hero" className="animated-image" />
        </div>
      </div>

      <div className="appointmentFormBtnHero">
        <button className="animated-button" onClick={handleButtonClick}>
          <svg
            viewBox="0 0 24 24"
            className="arr-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
          <span className="text">Appointment Form</span>
          <span className="circle"></span>
          <svg
            viewBox="0 0 24 24"
            className="arr-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default Hero;
