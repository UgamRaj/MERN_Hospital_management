import "./Hero.css";

const Hero = ({ imageUrl }) => {
  return (
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
  );
};

export default Hero;
