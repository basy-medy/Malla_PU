import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CourseProviderWrapper } from "./context/CourseProviderWrapper.jsx";
import { OptativosProvider } from "./context/OptativosProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OptativosProvider>
      <CourseProviderWrapper>
        <App />
      </CourseProviderWrapper>
    </OptativosProvider>
  </React.StrictMode>
);
