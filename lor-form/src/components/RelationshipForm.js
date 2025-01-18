import React, { useState } from "react";

const RelationshipForm = ({ nextStep, prevStep, formData, handleFormData }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Role validation (Do I know you)
    if (!formData.role) {
      newErrors.role = "Please select how you know the recommender";
    }

    // Years known validation
    if (!formData.years_known) {
      newErrors.years_known = "Please enter how long you've known the recommender";
    } else if (formData.years_known < 0 || formData.years_known > 50) {
      newErrors.years_known = "Please enter a valid number of years (0-50)";
    }

    // BE Enrollment batch validation
    if (!formData.enrollment_batch) {
      newErrors.enrollment_batch = "Please enter your BE enrollment batch";
    } else if (!/^\d{4}$/.test(formData.enrollment_batch)) {
      newErrors.enrollment_batch = "Please enter a valid year (YYYY)";
    }

    // Program validation
    if (!formData.program_enrolled) {
      newErrors.program_enrolled = "Please select your program";
    }

    // Passed year validation
    if (!formData.passed_year) {
      newErrors.passed_year = "Please enter your passed year";
    } else if (!/^\d{4}$/.test(formData.passed_year)) {
      newErrors.passed_year = "Please enter a valid year (YYYY)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-5xl font-bold mb-3 text-gray-800 text-center leading-tight">
        Relation with you and Background
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            In what role do I know you? <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                name="role"
                value="instructor"
                checked={formData.role === "instructor"}
                onChange={handleChange}
                required
                className="mr-2"
              />
              <label>Instructor</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="role"
                value="supervisor"
                checked={formData.role === "supervisor"}
                onChange={handleChange}
                required
                className="mr-2"
              />
              <label>Supervisor in final year project</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="role"
                value="thesis_supervisor"
                checked={formData.role === "thesis_supervisor"}
                onChange={handleChange}
                required
                className="mr-2"
              />
              <label>Thesis Supervisor</label>
            </div>
          </div>
          {errors.role && (
            <p className="mt-2 text-sm text-red-600">{errors.role}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How long have I known you (in years)? <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="years_known"
            value={formData.years_known}
            onChange={handleChange}
            required
            min="0"
            max="50"
            className={`w-full px-4 py-2 border ${
              errors.years_known ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.years_known && (
            <p className="mt-2 text-sm text-red-600">{errors.years_known}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            BE Enrollment Batch <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="enrollment_batch"
            value={formData.enrollment_batch}
            onChange={handleChange}
            required
            pattern="\d{4}"
            placeholder="YYYY"
            className={`w-full px-4 py-2 border ${
              errors.enrollment_batch ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.enrollment_batch && (
            <p className="mt-2 text-sm text-red-600">{errors.enrollment_batch}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program <span className="text-red-500">*</span>
          </label>
          <select
            name="program_enrolled"
            value={formData.program_enrolled}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border ${
              errors.program_enrolled ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select Program</option>
            <option value="BE">BE</option>
            <option value="BTech">BTech</option>
          </select>
          {errors.program_enrolled && (
            <p className="mt-2 text-sm text-red-600">{errors.program_enrolled}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            BE Passed Year <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="passed_year"
            value={formData.passed_year}
            onChange={handleChange}
            required
            pattern="\d{4}"
            placeholder="YYYY"
            className={`w-full px-4 py-2 border ${
              errors.passed_year ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.passed_year && (
            <p className="mt-2 text-sm text-red-600">{errors.passed_year}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Which courses have I taught you?
          </label>
          <textarea
            name="courses_taught"
            value={formData.courses_taught}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="List the courses (optional)"
          ></textarea>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={prevStep}
            className="w-1/2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200"
          >
            Previous
          </button>
          <button
            type="submit"
            className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default RelationshipForm;