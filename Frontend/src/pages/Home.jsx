import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Department from "../components/Department";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <>
      <Hero
        title={"Welcome to Seervi Medical Institute | Your Trusted Healthcare"}
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Department />
      <MessageForm />
    </>
  );
};

export default Home;
