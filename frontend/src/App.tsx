import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Vessels from "./pages/Vessels";
import About from "./pages/About";

// where I found this stuff
// https://www.youtube.com/watch?v=fBA-jaWab9k
// run command: npm run dev

const url = "http://localhost:8000/shipper/api/";

function App() {
  let Component;
  switch (window.location.pathname) {
    case "/about": {
      Component = About;
      break;
    }
    case "/vessels": {
      Component = Vessels;
      break;
    }
    default: {
      Component = App;
      break;
    }
  }
  return (
    <>
      <Navbar></Navbar>
      <Component />
    </>
  );
}

export default App;
