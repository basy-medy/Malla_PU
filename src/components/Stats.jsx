import React, { useContext } from "react";
import { CourseContext } from "../context/CourseContext";

export const Stats = () => {
  const { totalCredits, finishedCourses, title } = useContext(CourseContext);

  const maxCredits = title === "Malla Directa" ? 505 : 565;
  const maxCourses = title === "Malla Directa" ? 49 : 60;
  const creditsPercentage = ((totalCredits * 100) / maxCredits).toFixed(1);
  const approvedCoursesPercentage = (finishedCourses.length * 100) / maxCourses;

  return (
    <div className="w-full py-4">
      <h2 className="text-center text-2xl font-bold mb-4">Estadísticas</h2>

      <div className="flex justify-center text-sm mb-4 space-x-8">
        <p>Créditos Totales: {totalCredits} ({creditsPercentage}%)</p>
        <p>Ramos Aprobados: {finishedCourses.length} ({approvedCoursesPercentage.toFixed(1)}%)</p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3.5">
        <div
          className="bg-teal-500 h-3.5 rounded-full"
          style={{ width: `${approvedCoursesPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};
