import Biography from "../components/Biography";
import Hero from "../components/Hero";

const AboutUs = () => {
  return (
    <div>
      <Hero
        title={"Learn More About us | SeerviCare"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </div>
  );
};

export default AboutUs;
