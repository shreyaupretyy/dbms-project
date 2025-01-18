import React, { useState } from "react";
import axios from "axios";
import { XCircleIcon } from '@heroicons/react/24/solid';

const AcademicInfo = ({ prevStep, formData, handleFormData }) => {
  const [errors, setErrors] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({
    transcript: null,
    cv: null,
    photo: null
  });

  const validateForm = () => {
    const newErrors = {};

    // Final percentage validation
    if (!formData.final_percentage) {
      newErrors.final_percentage = "Final percentage is required";
    } else {
      const percentage = parseFloat(formData.final_percentage);
      if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        newErrors.final_percentage = "Please enter a valid percentage between 0 and 100";
      }
    }

    // Tentative ranking validation
    if (!formData.tentative_ranking) {
      newErrors.tentative_ranking = "Please select your tentative ranking";
    }

    // Final year project validation
    if (!formData.final_year_project?.trim()) {
      newErrors.final_year_project = "Please enter your final year project details";
    } else if (formData.final_year_project.length < 50) {
      newErrors.final_year_project = "Please provide more details about your project (minimum 50 characters)";
    }

    // Strong points validation
    if (!formData.strong_points?.trim()) {
      newErrors.strong_points = "Please enter your strong points";
    }

    // Weak points validation
    if (!formData.weak_points?.trim()) {
      newErrors.weak_points = "Please enter your weak points";
    }

    // File validations
    if (!selectedFiles.transcript) {
      newErrors.transcript = "Please upload your transcript";
    }
    if (!selectedFiles.cv) {
      newErrors.cv = "Please upload your CV";
    }
    if (!selectedFiles.photo) {
      newErrors.photo = "Please upload your photo";
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setSelectedFiles(prev => ({
        ...prev,
        [name]: files[0]
      }));
      handleFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };

  const handleFileCancel = (fieldName) => {
    setSelectedFiles(prev => ({
      ...prev,
      [fieldName]: null
    }));
    handleFormData({
      ...formData,
      [fieldName]: null
    });
    // Reset the file input
    const fileInput = document.querySelector(`input[name="${fieldName}"]`);
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        
        // Append all text data
        Object.keys(formData).forEach(key => {
          formDataToSend.append(key, formData[key]);
        });
        
        // Append files
        Object.keys(selectedFiles).forEach(key => {
          if (selectedFiles[key]) {
            formDataToSend.append(key, selectedFiles[key]);
          }
        });

        const response = await axios.post("http://localhost:5000/submit", formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert("Form submitted successfully!");
      } catch (error) {
        alert("An error occurred while submitting the form.");
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-5xl font-bold mb-3 text-gray-800 text-center leading-tight">
        Academic Information
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Final Percentage Score <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="final_percentage"
            value={formData.final_percentage}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            max="100"
            className={`w-full px-4 py-2 border ${
              errors.final_percentage ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.final_percentage && (
            <p className="mt-2 text-sm text-red-600">{errors.final_percentage}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tentative ranking <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {['Top 5%', 'Top 10%', 'Top 20%', 'Top 30%', 'Top 40%'].map((rank) => (
              <div key={rank} className="flex items-center">
                <input
                  type="radio"
                  name="tentative_ranking"
                  value={rank}
                  checked={formData.tentative_ranking === rank}
                  onChange={handleChange}
                  required
                  className="mr-2"
                />
                <label>{rank}</label>
              </div>
            ))}
          </div>
          {errors.tentative_ranking && (
            <p className="mt-2 text-sm text-red-600">{errors.tentative_ranking}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What was your final year project (or MSc Thesis) about? <span className="text-red-500">*</span>
          </label>
          <textarea
            name="final_year_project"
            value={formData.final_year_project}
            onChange={handleChange}
            required
            rows="4"
            className={`w-full px-4 py-2 border ${
              errors.final_year_project ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Describe your project in detail..."
          ></textarea>
          {errors.final_year_project && (
            <p className="mt-2 text-sm text-red-600">{errors.final_year_project}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any other notable research or project work?
          </label>
          <textarea
            name="other_research"
            value={formData.other_research}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe any other research or projects..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Publications <span className="text-sm text-gray-500">(with me or without me)</span>
          </label>
          <textarea
            name="publications"
            value={formData.publications}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Title, name of conference or journal, etc..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notable extracurricular activities and awards
          </label>
          <textarea
            name="extracurricular"
            value={formData.extracurricular}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="List your achievements and activities..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Experience
          </label>
          <textarea
            name="professional_experience"
            value={formData.professional_experience}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Briefly describe your work experience..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Strong Points <span className="text-red-500">*</span>
          </label>
          <textarea
            name="strong_points"
            value={formData.strong_points}
            onChange={handleChange}
            required
            rows="3"
            className={`w-full px-4 py-2 border ${
              errors.strong_points ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            placeholder="List your strong points..."
          ></textarea>
          {errors.strong_points && (
            <p className="mt-2 text-sm text-red-600">{errors.strong_points}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weak Points <span className="text-red-500">*</span>
          </label>
          <textarea
            name="weak_points"
            value={formData.weak_points}
            onChange={handleChange}
            required
            rows="3"
            className={`w-full px-4 py-2 border ${
              errors.weak_points ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            placeholder="List your weak points..."
          ></textarea>
          {errors.weak_points && (
            <p className="mt-2 text-sm text-red-600">{errors.weak_points}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transcript <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              name="transcript"
              onChange={handleFileChange}
              required={!selectedFiles.transcript}
              accept=".pdf,.doc,.docx"
              className={`flex-1 px-4 py-2 border ${
                errors.transcript ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            />
            {selectedFiles.transcript && (
              <button
                type="button"
                onClick={() => handleFileCancel('transcript')}
                className="text-red-500 hover:text-red-700"
                title="Remove file"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            )}
          </div>
          {errors.transcript && (
            <p className="mt-2 text-sm text-red-600">{errors.transcript}</p>
          )}
          {selectedFiles.transcript && (
            <p className="mt-1 text-sm text-gray-500">
              Selected: {selectedFiles.transcript.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CV <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              name="cv"
              onChange={handleFileChange}
              required={!selectedFiles.cv}
              accept=".pdf,.doc,.docx"
              className={`flex-1 px-4 py-2 border ${
                errors.cv ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            />
            {selectedFiles.cv && (
              <button
                type="button"
                onClick={() => handleFileCancel('cv')}
                className="text-red-500 hover:text-red-700"
                title="Remove file"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            )}
          </div>
          {errors.cv && (
            <p className="mt-2 text-sm text-red-600">{errors.cv}</p>
          )}
          {selectedFiles.cv && (
            <p className="mt-1 text-sm text-gray-500">
              Selected: {selectedFiles.cv.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              required={!selectedFiles.photo}
              accept="image/*"
              className={`flex-1 px-4 py-2 border ${
                errors.photo ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:ring-blue-500 focus:border-blue-500`}
            />
            {selectedFiles.photo && (
              <button
                type="button"
                onClick={() => handleFileCancel('photo')}
                className="text-red-500 hover:text-red-700"
                title="Remove file"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            )}
          </div>
          {errors.photo && (
            <p className="mt-2 text-sm text-red-600">{errors.photo}</p>
          )}
          {selectedFiles.photo && (
            <p className="mt-1 text-sm text-gray-500">
              Selected: {selectedFiles.photo.name}
            </p>
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcademicInfo;