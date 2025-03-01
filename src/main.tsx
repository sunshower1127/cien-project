import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NekoEngine from "./lib/neko-engine";
import Dashboard from "./pages/dashboard";

createRoot(document.getElementById("root")!).render(
  <>
    <NekoEngine />
    <StrictMode>
      <Dashboard />
    </StrictMode>
  </>,
);
