import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../public/css/input.css";
import "../public/css/styles.css";
import "../public/css/output.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
