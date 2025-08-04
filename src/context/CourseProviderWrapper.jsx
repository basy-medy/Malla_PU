import React, { useContext } from "react";
import { CourseProvider } from "./CourseProvider";
import { OptativosContext } from "./OptativosContext";

export const CourseProviderWrapper = ({ children }) => {
  const { customOptativos } = useContext(OptativosContext);
  
  return (
    <CourseProvider customOptativos={customOptativos}>
      {children}
    </CourseProvider>
  );
};