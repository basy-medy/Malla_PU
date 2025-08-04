import { useState, useContext, useEffect } from "react";
import { CustomCourseContext } from "../context/CustomCourseContext";
import { CourseContext } from "../context/CourseContext";

export const EditCourseModal = () => {
  const { 
    editingCourse, 
    saveCustomCourse, 
    deleteCustomCourse, 
    cancelEditing,
    getCourseData 
  } = useContext(CustomCourseContext);
  
  const { coursesBySemesterAndYear } = useContext(CourseContext);

  const [formData, setFormData] = useState({
    course: "",
    code: "",
    cr: "",
  });
  const [errors, setErrors] = useState({});

  // Initialize form when editing course changes
  useEffect(() => {
    if (editingCourse) {
      const courseData = getCourseData(editingCourse);
      setFormData({
        course: courseData.course === "Optativo" ? "" : courseData.course,
        code: courseData.code || "",
        cr: courseData.cr || "",
      });
      setErrors({});
    }
  }, [editingCourse, getCourseData]);

  if (!editingCourse) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.course.trim()) {
      newErrors.course = "El nombre del curso es requerido";
    }
    
    if (formData.cr && (isNaN(formData.cr) || Number(formData.cr) < 0)) {
      newErrors.cr = "Los créditos deben ser un número válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const customData = {
      course: formData.course.trim(),
      code: formData.code.trim() || editingCourse.code,
      cr: formData.cr ? Number(formData.cr) : editingCourse.cr,
    };

    saveCustomCourse(editingCourse.id, customData);
  };

  const handleDelete = () => {
    deleteCustomCourse(editingCourse.id);
  };

  const courseData = getCourseData(editingCourse);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Editar Curso Optativo
            </h2>
            <button
              onClick={cancelEditing}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            {/* Course Info Display */}
            <div className="bg-gray-50 p-3 rounded border">
              <p className="text-sm text-gray-600">
                <strong>Posición:</strong> Año {editingCourse.year}, Semestre {editingCourse.semester}
              </p>
              <p className="text-sm text-gray-600">
                <strong>ID:</strong> {editingCourse.id}
              </p>
            </div>

            {/* Course Name */}
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
                placeholder="Ingresa el nombre del curso"
              />
              {errors.course && (
                <p className="text-red-500 text-xs mt-1">{errors.course}</p>
              )}
            </div>

            {/* Course Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código del Curso
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Código actual: ${editingCourse.code || "Sin código"}`}
              />
              <p className="text-xs text-gray-500 mt-1">
                Opcional. Si se deja vacío, se mantendrá el código original.
              </p>
            </div>

            {/* Credits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Créditos
              </label>
              <input
                type="number"
                value={formData.cr}
                onChange={(e) => handleInputChange("cr", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cr ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={`Créditos actuales: ${editingCourse.cr || 0}`}
                min="0"
              />
              {errors.cr && (
                <p className="text-red-500 text-xs mt-1">{errors.cr}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Si se deja vacío, se mantendrán los créditos originales.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6 pt-4 border-t">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            >
              Restaurar Original
            </button>
            <div className="space-x-2">
              <button
                onClick={cancelEditing}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};