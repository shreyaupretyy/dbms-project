import React, { useState } from "react";

const LORForm = ({ nextStep, formData, handleFormData }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Program validation
    if (!formData.program) {
      newErrors.program = "Please select a program";
    }

    // Universities validation
    if (!formData.universities?.trim()) {
      newErrors.universities = "Please enter universities and deadlines";
    }

    // Deadline validation
    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required";
    } else {
      const selectedDate = new Date(formData.deadline);
      const today = new Date();
      if (selectedDate < today) {
        newErrors.deadline = "Deadline must be a future date";
      }
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
        Letter of Recommendation Request
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program <span className="text-red-500">*</span>
          </label>
          <select
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border ${
              errors.program ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select Program</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
            <option value="Both">Both</option>
          </select>
          {errors.program && (
            <p className="mt-2 text-sm text-red-600">{errors.program}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Universities & Deadlines <span className="text-red-500">*</span>
          </label>
          <textarea
            name="universities"
            value={formData.universities}
            onChange={handleChange}
            required
            rows="4"
            className={`w-full px-4 py-2 border ${
              errors.universities ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            placeholder="List universities and their respective deadlines..."
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            Format: University Name - Deadline (e.g., Stanford University - December 15, 2024)
          </p>
          {errors.universities && (
            <p className="mt-2 text-sm text-red-600">{errors.universities}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Deadline <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-2 border ${
              errors.deadline ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.deadline && (
            <p className="mt-2 text-sm text-red-600">{errors.deadline}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default LORForm;