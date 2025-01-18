import React, { useState} from 'react';
import LORForm from './components/LORForm';
import PersonalDetails from './components/PersonalDetails';
import RelationshipForm from './components/RelationshipForm';
import AcademicInfo from './components/AcademicInfo';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // LOR Form data
    email: "",
    program: "",
    universities: "",
    deadline: "",
    // Personal Details
    first_name: "",
    middle_name: "",
    last_name: "",
    contact_number: "",
    gender: "",
    // Relationship Form data
    role: "",
    years_known: "",
    courses_taught: "",
    enrollment_batch: "",
    passed_year: "",
    // Academic Info
    final_percentage: "",
    tentative_ranking: "",
    final_year_project: ""
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleFormData = (data) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}>
              1
            </div>
            <div className="flex-1 h-1 bg-gray-300">
              <div className={`h-full bg-blue-500 transition-all duration-300 ${
                step >= 2 ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 2 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}>
              2
            </div>
            <div className="flex-1 h-1 bg-gray-300">
              <div className={`h-full bg-blue-500 transition-all duration-300 ${
                step >= 3 ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 3 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}>
              3
            </div>
            <div className="flex-1 h-1 bg-gray-300">
              <div className={`h-full bg-blue-500 transition-all duration-300 ${
                step === 4 ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 4 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}>
              4
            </div>
          </div>
        </div>

        {step === 1 && (
          <LORForm 
            nextStep={nextStep} 
            formData={formData} 
            handleFormData={handleFormData}
          />
        )}
        
        {step === 2 && (
          <PersonalDetails 
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData} 
            handleFormData={handleFormData}
          />
        )}
        
        {step === 3 && (
          <RelationshipForm 
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData} 
            handleFormData={handleFormData}
          />
        )}

        {step === 4 && (
          <AcademicInfo 
            prevStep={prevStep}
            formData={formData} 
            handleFormData={handleFormData}
          />
        )}
      </div>
    </div>
  );
};

export default App;