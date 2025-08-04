import React, { useContext } from "react";
import { CourseContext } from "../context/CourseContext";
import { OptativosContext } from "../context/OptativosContext";

export const Button = () => {
  const { handleReset } = useContext(CourseContext);
  const { openAddModal } = useContext(OptativosContext);
  
  return (
    <div className="flex flex-wrap gap-2 mb-1">
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleReset}
      >
        Limpiar Cursos
      </button>
      
      <button
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
        onClick={openAddModal}
      >
        Gestionar Optativos
      </button>
    </div>
  );
};
