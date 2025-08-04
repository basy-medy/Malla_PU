import React, { useState, useEffect } from "react";
import { OptativosContext } from "./OptativosContext";
import { OPR, OPR32 } from "../utils/colors";

// Get custom optativos from localStorage
const getStoredCustomOptativos = () => {
  try {
    return JSON.parse(localStorage.getItem("customOptativos")) || [];
  } catch {
    return [];
  }
};

export const OptativosProvider = ({ children }) => {
  const [customOptativos, setCustomOptativos] = useState(getStoredCustomOptativos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Save to localStorage whenever customOptativos changes
  useEffect(() => {
    localStorage.setItem("customOptativos", JSON.stringify(customOptativos));
  }, [customOptativos]);

  // Generate unique ID for new courses (starting from 1000 to avoid conflicts)
  const generateNewId = () => {
    const existingIds = customOptativos.map(course => course.id);
    let newId = 1000;
    while (existingIds.includes(newId)) {
      newId++;
    }
    return newId;
  };

  // Add new custom optativo
  const addCustomOptativo = (courseData) => {
    const newCourse = {
      id: generateNewId(),
      code: courseData.code || "",
      course: courseData.course,
      semester: courseData.semester,
      year: parseInt(courseData.year),
      cc: courseData.year <= 4 ? OPR : OPR32, // Use appropriate color based on year
      cr: parseInt(courseData.cr),
      req: courseData.req || [],
      isCustom: true // Mark as custom course
    };
    
    setCustomOptativos(prev => [...prev, newCourse]);
    return newCourse;
  };

  // Update existing custom optativo
  const updateCustomOptativo = (courseId, courseData) => {
    setCustomOptativos(prev => 
      prev.map(course => 
        course.id === courseId 
          ? {
              ...course,
              code: courseData.code || "",
              course: courseData.course,
              semester: courseData.semester,
              year: parseInt(courseData.year),
              cc: courseData.year <= 4 ? OPR : OPR32,
              cr: parseInt(courseData.cr),
              req: courseData.req || []
            }
          : course
      )
    );
  };

  // Delete custom optativo
  const deleteCustomOptativo = (courseId) => {
    setCustomOptativos(prev => prev.filter(course => course.id !== courseId));
  };

  // Open modal for adding new course
  const openAddModal = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  // Open modal for editing existing course
  const openEditModal = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const value = {
    customOptativos,
    isModalOpen,
    editingCourse,
    addCustomOptativo,
    updateCustomOptativo,
    deleteCustomOptativo,
    openAddModal,
    openEditModal,
    closeModal
  };

  return (
    <OptativosContext.Provider value={value}>
      {children}
    </OptativosContext.Provider>
  );
};