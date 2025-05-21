import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  
  // User profile data state
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    university: '',
    graduationYear: '',
    preferences: {
      needsHealthInsurance: false,
      needsRentersInsurance: false,
      needsAutoInsurance: false,
      needsStudentDiscounts: false,
    }
  });
  
  // Form data for editing
  const [formData, setFormData] = useState({...profile});
  
  // Check if user is authenticated
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
      navigate('/signin');
      return;
    }
    
    // Fetch user profile - this would be an API call in production
    // Simulating API call with timeout
    setTimeout(() => {
      setProfile({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@university.edu',
        university: 'State University',
        graduationYear: '2026',
        preferences: {
          needsHealthInsurance: true,
          needsRentersInsurance: true,
          needsAutoInsurance: false,
          needsStudentDiscounts: true,
        }
      });
      setFormData({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@university.edu',
        university: 'State University',
        graduationYear: '2026',
        preferences: {
          needsHealthInsurance: true,
          needsRentersInsurance: true,
          needsAutoInsurance: false,
          needsStudentDiscounts: true,
        }
      });
      setIsLoading(false);
    }, 1000);
  }, [navigate]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('pref_')) {
      const prefName = name.replace('pref_', '');
      setFormData({
        ...formData,
        preferences: {
          ...formData.preferences,
          [prefName]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setFormData({...profile});
    setIsEditing(false);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // This would be an API call in production
      // Example: await updateUserProfile(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update profile state with form data
      setProfile({...formData});
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-indigo-700 px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg leading-6 font-medium text-white">User Profile</h2>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Profile Content */}
          <div className="px-4 py-5 sm:p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                        University
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="university"
                          id="university"
                          value={formData.university}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">
                        Graduation Year
                      </label>
                      <div className="mt-1">
                        <select
                          id="graduationYear"
                          name="graduationYear"
                          value={formData.graduationYear}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select year</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Insurance Preferences</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Select the insurance options you're interested in learning more about.
                    </p>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="needsHealthInsurance"
                            name="pref_needsHealthInsurance"
                            type="checkbox"
                            checked={formData.preferences.needsHealthInsurance}
                            onChange={handleChange}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="needsHealthInsurance" className="font-medium text-gray-700">Health Insurance</label>
                          <p className="text-gray-500">I'm interested in student health insurance options</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="needsRentersInsurance"
                            name="pref_needsRentersInsurance"
                            type="checkbox"
                            checked={formData.preferences.needsRentersInsurance}
                            onChange={handleChange}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="needsRentersInsurance" className="font-medium text-gray-700">Renters Insurance</label>
                          <p className="text-gray-500">I'm interested in coverage for my off-campus housing</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="needsAutoInsurance"
                            name="pref_needsAutoInsurance"
                            type="checkbox"
                            checked={formData.preferences.needsAutoInsurance}
                            onChange={handleChange}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="needsAutoInsurance" className="font-medium text-gray-700">Auto Insurance</label>
                          <p className="text-gray-500">I have a car and need auto insurance</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="needsStudentDiscounts"
                            name="pref_needsStudentDiscounts"
                            type="checkbox"
                            checked={formData.preferences.needsStudentDiscounts}
                            onChange={handleChange}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="needsStudentDiscounts" className="font-medium text-gray-700">Student Discounts</label>
                          <p className="text-gray-500">I want to receive information about student discounts</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : 'Save'}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                  <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{profile.firstName} {profile.lastName}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-900">{profile.email}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">University</dt>
                      <dd className="mt-1 text-sm text-gray-900">{profile.university || 'Not specified'}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Graduation Year</dt>
                      <dd className="mt-1 text-sm text-gray-900">{profile.graduationYear || 'Not specified'}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Insurance Preferences</h3>
                  <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Health Insurance</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profile.preferences.needsHealthInsurance ? 'Interested' : 'Not interested'}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Renters Insurance</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profile.preferences.needsRentersInsurance ? 'Interested' : 'Not interested'}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Auto Insurance</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profile.preferences.needsAutoInsurance ? 'Interested' : 'Not interested'}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Student Discounts</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profile.preferences.needsStudentDiscounts ? 'Interested' : 'Not interested'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 