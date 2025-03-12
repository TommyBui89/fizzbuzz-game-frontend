import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./styles/bootstrap.min.css";
import "./styles/gameForm.css";
import "./styles/buttons.css";
import "./styles/animations.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);