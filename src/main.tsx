import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "./styles.css";
import { App } from "./App";
import { Admin } from "./components/Admin";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {new URLSearchParams(location.search).has("admin") ? <Admin /> : <App />}
  </StrictMode>,
);
