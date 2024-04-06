import Hero from "../components/Hero";
import WhyUs from "../components/WhyUs/WhyUs";
import Department from "../components/Department";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <>
      <Hero imageUrl={"/mainbanner.png"} />
      <WhyUs />
      <Department />
      <MessageForm />
    </>
  );
};

export default Home;
