import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NekoManager from "@/lib/neko-manager";
import Dashboard from "@/page/dashboard";

createRoot(document.getElementById("root")!).render(
  <>
    <NekoManager />
    <StrictMode>
      <Dashboard />
    </StrictMode>
  </>,
);
