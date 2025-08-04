import { useState, useEffect } from "react";
import { CustomCourseContext } from "./CustomCourseContext";

// Get custom course data from localStorage
const getStoredCustomCourses = () => {
  try {
    return JSON.parse(localStorage.getItem("customCourses")) || {};
  } catch {
    return {};
  }
};

export const CustomCourseProvider = ({ children }) => {
  const [customCourses, setCustomCourses] = useState(getStoredCustomCourses());
  const [editingCourse, setEditingCourse] = useState(null);

  // Save to localStorage whenever customCourses changes
  useEffect(() => {
    localStorage.setItem("customCourses", JSON.stringify(customCourses));
  }, [customCourses]);

  // Check if a course is an "Optativo" course
  const isOptativoCourse = (course) => {
    return course.course === "Optativo";
  };

  // Get custom course data or original if no customization
  const getCourseData = (course) => {
    if (customCourses[course.id]) {
      return {
        ...course,
        ...customCourses[course.id],
        isCustomized: true
      };
    }
    return course;
  };

  // Save custom course data
  const saveCustomCourse = (courseId, customData) => {
    setCustomCourses(prev => ({
      ...prev,
      [courseId]: customData
    }));
    setEditingCourse(null);
  };

  // Delete custom course data (revert to original)
  const deleteCustomCourse = (courseId) => {
    setCustomCourses(prev => {
      const newCustomCourses = { ...prev };
      delete newCustomCourses[courseId];
      return newCustomCourses;
    });
    setEditingCourse(null);
  };

  // Start editing a course
  const startEditing = (course) => {
    setEditingCourse(course);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingCourse(null);
  };

  return (
    <CustomCourseContext.Provider
      value={{
        customCourses,
        editingCourse,
        isOptativoCourse,
        getCourseData,
        saveCustomCourse,
        deleteCustomCourse,
        startEditing,
        cancelEditing
      }}
    >
      {children}
    </CustomCourseContext.Provider>
  );
};