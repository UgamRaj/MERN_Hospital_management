const Hero = ({ imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner ">
        <h1>Welcome to </h1>
        <h1>Seervi Medical Institute</h1>
        <h2>|Inspiring Better Health Care For Everyone</h2>
        <p>
          Health always begins with a healthy life style. Being healthy will
          makes you happier.
        </p>
      </div>
      <div className="banner mainImage">
        <img src={imageUrl} alt="hero" className="animated-image" />
        {/* <span>
          <img src="/Vector.png" alt="vector" />
        </span> */}
      </div>
    </div>
  );
};

export default Hero;
