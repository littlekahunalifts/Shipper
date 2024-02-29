import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Vessels from "./pages/Vessels";
import AddVessel from "./pages/AddVessel";
import About from "./pages/About";
import EditVessel from "./pages/EditVessel";

// where I found this stuff
// https://www.youtube.com/watch?v=fBA-jaWab9k
// run command: npm run dev
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/view-vessels" element={<Vessels />} />
        <Route path="/add-new-vessel" element={<AddVessel />} />
        <Route path="/edit-vessel/:naccs" element={<EditVessel />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
