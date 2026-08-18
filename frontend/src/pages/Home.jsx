import Navbar from "../components/Navbar";
import StartupForm from "../components/StartupForm";

function Home() {
  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Validate Your Startup Idea</h1>

        <StartupForm />
      </div>
    </>
  );
}

export default Home;