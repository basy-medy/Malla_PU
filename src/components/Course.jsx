import React, { useContext, useEffect, useState } from "react";
import { CourseContext } from "../context/CourseContext";
import { CustomCourseContext } from "../context/CustomCourseContext";

export const Course = ({ course }) => {
  const { finishedCourses, totalCredits, handleClick } =
    useContext(CourseContext);
  
  const { 
    isOptativoCourse, 
    getCourseData, 
    startEditing 
  } = useContext(CustomCourseContext);

  const [takeCourse, setTakeCourse] = useState(false);

  // Get the course data (original or customized)
  const courseData = getCourseData(course);
  const isOptativo = isOptativoCourse(course);

  useEffect(() => {
    const isCreditRequired = "rc" in courseData;
    const creditCheck = isCreditRequired && totalCredits >= 400;

    const reqCheck = courseData.req.every(req => {
      const isCompleted = finishedCourses.includes(req.id);
      return isCompleted && (!isCreditRequired || creditCheck);
    });

    if ("rc" in courseData) {
      setTakeCourse(reqCheck && creditCheck);
    } else {
      setTakeCourse(reqCheck);
    }
  }, [finishedCourses, courseData, totalCredits]);

  const isFinished = finishedCourses.includes(courseData.id);
  const color = courseData.cc || "bg-[#F0F0F0]";

  // Handle course click - for optativo courses, check if it's a regular click or edit click
  const handleCourseClick = (e) => {
    // If clicking on edit button, don't trigger course completion toggle
    if (e.target.closest('.edit-button')) {
      return;
    }
    handleClick(courseData);
  };

  // Handle edit button click
  const handleEditClick = (e) => {
    e.stopPropagation();
    startEditing(course); // Pass original course for editing
  };

  return (
    <div
      className={`w-32 bg-gray-600 mb-2 rounded-lg hover:cursor-pointer relative group ${
        isFinished ? "custom-line" : ""
      } ${!takeCourse ? "opacity-25" : ""} mx-1 ${
        isOptativo && takeCourse ? "hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50" : ""
      }`}
      onClick={handleCourseClick}
    >
      <div className="flex justify-between items-center h-6">
        <p className="text-white font-bold text-xs pl-1">{courseData.code}</p>
        <div className="bg-white course-code mr-1">
          <p className="">{courseData.id}</p>
        </div>
      </div>
      <div
        className={`${color} h-12 flex justify-center items-center text-center w-full relative`}
      >
        <p className={`line-clamp text-sm ${courseData.isCustomized ? "font-semibold" : ""}`}>
          {courseData.course}
        </p>
        {/* Edit icon for Optativo courses */}
        {isOptativo && takeCourse && (
          <button
            onClick={handleEditClick}
            className="edit-button absolute top-1 right-1 w-5 h-5 bg-blue-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs hover:bg-blue-600"
            title="Editar curso optativo"
          >
            ✎
          </button>
        )}
      </div>
      <div className="flex justify-between p-1">
        <div className="flex justify-start">
          {/* {courseData.req.map(r => (
            <div key={r.id} className={`course-code ${color} mx-0 border`}>
              <p className="text-xs">{"p" + r.id}</p>
            </div>
          ))} */}
        </div>
        <div className="flex items-center justify-center">
          {/* creditos */}
          <p
            className={`${
              courseData.cr ? "bg-white" : ""
            } h-4 w-4 text-center text-xs`}
          >
            {courseData.cr}
          </p>
        </div>
      </div>
    </div>
  );
};
