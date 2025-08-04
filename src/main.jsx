import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CourseProvider } from "./context/CourseProvider.jsx";
import { CustomCourseProvider } from "./context/CustomCourseProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CourseProvider>
      <CustomCourseProvider>
        <App />
      </CustomCourseProvider>
    </CourseProvider>
  </React.StrictMode>
);
