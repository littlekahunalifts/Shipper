import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/js/dist/dropdown";
import $ from "jquery";
import Popper from "popper.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
