import React, { useState, useContext, useEffect } from "react";
import { OptativosContext } from "../context/OptativosContext";

export const OptativosModal = () => {
  const { 
    isModalOpen, 
    editingCourse, 
    addCustomOptativo, 
    updateCustomOptativo, 
    deleteCustomOptativo,
    closeModal 
  } = useContext(OptativosContext);

  const [formData, setFormData] = useState({
    course: "",
    code: "",
    semester: "I",
    year: "2",
    cr: "10",
    req: []
  });

  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes or editing course changes
  useEffect(() => {
    if (editingCourse) {
      setFormData({
        course: editingCourse.course,
        code: editingCourse.code || "",
        semester: editingCourse.semester,
        year: editingCourse.year.toString(),
        cr: editingCourse.cr.toString(),
        req: editingCourse.req || []
      });
    } else {
      setFormData({
        course: "",
        code: "",
        semester: "I",
        year: "2",
        cr: "10",
        req: []
      });
    }
    setErrors({});
  }, [editingCourse, isModalOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.course.trim()) {
      newErrors.course = "El nombre del curso es obligatorio";
    }
    
    if (!formData.cr || parseInt(formData.cr) <= 0) {
      newErrors.cr = "Los créditos deben ser un número mayor a 0";
    }
    
    if (!formData.year || parseInt(formData.year) < 1 || parseInt(formData.year) > 6) {
      newErrors.year = "El año debe estar entre 1 y 6";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (editingCourse) {
      updateCustomOptativo(editingCourse.id, formData);
    } else {
      addCustomOptativo(formData);
    }
    
    closeModal();
  };

  const handleDelete = () => {
    if (editingCourse && window.confirm("¿Estás seguro de que quieres eliminar este optativo?")) {
      deleteCustomOptativo(editingCourse.id);
      closeModal();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {editingCourse ? "Editar Optativo" : "Agregar Nuevo Optativo"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Curso *
            </label>
            <input
              type="text"
              value={formData.course}
              onChange={(e) => handleInputChange("course", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.course ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ej: Electivo de Urbanismo"
            />
            {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código del Curso
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => handleInputChange("code", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: IEU3XXX (opcional)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Año *
              </label>
              <select
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.year ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semestre *
              </label>
              <select
                value={formData.semester}
                onChange={(e) => handleInputChange("semester", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="I">I</option>
                <option value="II">II</option>
                {parseInt(formData.year) === 6 && <option value="XI">XI</option>}
                {parseInt(formData.year) === 5 && (
                  <>
                    <option value="IX">IX</option>
                    <option value="X">X</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Créditos *
            </label>
            <input
              type="number"
              min="1"
              max="25"
              value={formData.cr}
              onChange={(e) => handleInputChange("cr", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.cr ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cr && <p className="text-red-500 text-sm mt-1">{errors.cr}</p>}
          </div>

          <div className="flex justify-between pt-4">
            <div>
              {editingCourse && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Eliminar
                </button>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {editingCourse ? "Actualizar" : "Agregar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};