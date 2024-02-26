import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Vessels from "./pages/Vessels";
import AddVessel from "./pages/AddVessel";
import About from "./pages/About";

// where I found this stuff
// https://www.youtube.com/watch?v=fBA-jaWab9k
// run command: npm run dev
function App() {
  let Component;
  switch (window.location.pathname) {
    case "/about": {
      Component = About;
      break;
    }
    case "/view-vessels": {
      Component = Vessels;
      break;
    }
    case "/add-new-vessel": {
      Component = AddVessel;
      break;
    }
    default: {
      console.log("hit");
      Component = Home;
      break;
    }
  }
  return (
    <>
      <Navbar />
      <br />
      <Component />
      <Footer />
    </>
  );
}

export default App;
