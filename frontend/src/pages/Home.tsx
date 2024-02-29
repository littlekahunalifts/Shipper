import { Link } from "react-router-dom";
import FadeInSection from "../components/FadeInSection";

function Home() {
  return (
    <>
      <div className="container">
        <br />
        <div className="d-flex justify-content-center">
          <h1>Welcome To Shipper!</h1>
        </div>
        <br />
        <FadeInSection>
          <p>
            This application is stil in the works, but there are a few things
            implemented to show a simple demonstration of my learning thus far
            and what I'm able to do. See the <Link to="/about">about</Link> page
            for more details.
          </p>
        </FadeInSection>
      </div>
    </>
  );
}

export default Home;
