import React, { useState } from "react";

const PersonalDetails = ({ nextStep, prevStep, formData, handleFormData }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.first_name?.trim()) {
      newErrors.first_name = "First name is required";
    }

    // Last Name validation
    if (!formData.last_name?.trim()) {
      newErrors.last_name = "Last name is required";
    }

    // Contact number validation
    if (!formData.contact_number) {
      newErrors.contact_number = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact_number)) {
      newErrors.contact_number = "Please enter a valid 10-digit number";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
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
        Personal Details
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border ${
              errors.first_name ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter your first name"
          />
          {errors.first_name && (
            <p className="mt-2 text-sm text-red-600">{errors.first_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Middle Name
          </label>
          <input
            type="text"
            name="middle_name"
            value={formData.middle_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your middle name (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border ${
              errors.last_name ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter your last name"
          />
          {errors.last_name && (
            <p className="mt-2 text-sm text-red-600">{errors.last_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            className={`w-full px-4 py-2 border ${
              errors.contact_number ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter 10-digit mobile number"
          />
          {errors.contact_number && (
            <p className="mt-2 text-sm text-red-600">{errors.contact_number}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
                className="mr-2"
              />
              <label>Male</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                required
                className="mr-2"
              />
              <label>Female</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
                required
                className="mr-2"
              />
              <label>Other</label>
            </div>
          </div>
          {errors.gender && (
            <p className="mt-2 text-sm text-red-600">{errors.gender}</p>
          )}
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

export default PersonalDetails;