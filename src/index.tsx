import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PhotographyWebsite } from "./screens/PhotographyWebsite/PhotographyWebsite";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <PhotographyWebsite />
  </StrictMode>,
);
