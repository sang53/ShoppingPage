import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RouteStructure from "./RouteStructure.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouteStructure />
  </StrictMode>
);
