import WhyCard from "./WhyCard";
import "./WhyUs.css";

const WhyUs = () => {
  return (
    <div className="WhyUsMain">
      <div className="whyusTitle">
        <p>WHY US</p>
        <h3>Why You Should Use Our Medical Services</h3>
      </div>
      <div className="whyCardMainContainer">
        <WhyCard
          imgUrl={"/icon-cardio.png"}
          titleH6={"Serve With Smile"}
          para="Our doctors will always greet you with a smile because we prioritize the comfort of our patients."
        />
        <WhyCard
          imgUrl={"/icon-smile.png"}
          titleH6={"Work from the Heart"}
          para="We care about your health with all our heart and sincerity so you
              can live happily."
        />
        <WhyCard
          imgUrl={"/icon-pharmacy.png"}
          titleH6="Always Ready"
          para="We always serve whatever your health problems are at any time, even on weekends or holidays."
        />
        <WhyCard
          imgUrl={"/icon-stethoscope.png"}
          titleH6="Accurate Diagnostics"
          para="We care about your health with all our heart and sincerity so you can live happily."
        />
        <WhyCard
          imgUrl={"/icon-calendar.png"}
          titleH6="Yearly Checkup"
          para="Our doctors will always greet you with a smile because we prioritize the comfort of our patients."
        />
        <WhyCard
          imgUrl={"/icon-wallet.png"}
          titleH6="Pay in Instalments"
          para="We always serve whatever your health problems are at any time, even on weekends or holidays."
        />
      </div>
    </div>
  );
};

export default WhyUs;
