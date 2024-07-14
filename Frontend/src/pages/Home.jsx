import Hero from "../components/Hero/Hero";
import WhyUs from "../components/WhyUs/WhyUs";
import Department from "../components/Department";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <>
      <Hero imageUrl={"/medicine.svg"} />
      <WhyUs />
      <Department />
      <MessageForm />
    </>
  );
};

export default Home;
