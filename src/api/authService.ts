// Authentication service 
// This file handles API calls related to user authentication

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  university?: string;
  graduationYear?: string;
  preferences?: {
    needsHealthInsurance: boolean;
    needsRentersInsurance: boolean;
    needsAutoInsurance: boolean;
    needsStudentDiscounts: boolean;
  };
};

// Login user
export const loginUser = async (credentials: LoginCredentials): Promise<{ token: string; user: UserProfile }> => {
  try {
    // In a real implementation, this would make an actual API call
    // For now, we'll simulate the API response
    
    // Check if we're in development mode without a backend
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCK_API === 'true') {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple validation for demo purposes
      if (credentials.email.includes('university') && credentials.password.length >= 6) {
        return {
          token: 'sample-jwt-token',
          user: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: credentials.email,
            university: 'State University',
            graduationYear: '2026',
            preferences: {
              needsHealthInsurance: true,
              needsRentersInsurance: true,
              needsAutoInsurance: false,
              needsStudentDiscounts: true,
            }
          }
        };
      } else {
        throw new Error('Invalid credentials');
      }
    }
    
    // Real API implementation
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    
    return response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register new user
export const registerUser = async (userData: RegisterData): Promise<{ token: string; user: UserProfile }> => {
  try {
    // Check if we're in development mode without a backend
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCK_API === 'true') {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation for demo purposes
      if (userData.password.length >= 6) {
        return {
          token: 'sample-jwt-token',
          user: {
            id: '2',
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            preferences: {
              needsHealthInsurance: false,
              needsRentersInsurance: false,
              needsAutoInsurance: false,
              needsStudentDiscounts: false,
            }
          }
        };
      } else {
        throw new Error('Password must be at least 6 characters');
      }
    }
    
    // Real API implementation
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    
    return response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    // Check if we're in development mode without a backend
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCK_API === 'true') {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        id: '1',
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
      };
    }
    
    // Real API implementation
    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch profile');
    }
    
    return response.json();
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    // Check if we're in development mode without a backend
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCK_API === 'true') {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return updated profile (in a real app, this would come from the backend)
      return {
        id: '1',
        firstName: profileData.firstName || 'John',
        lastName: profileData.lastName || 'Doe',
        email: profileData.email || 'john.doe@university.edu',
        university: profileData.university || 'State University',
        graduationYear: profileData.graduationYear || '2026',
        preferences: profileData.preferences || {
          needsHealthInsurance: true,
          needsRentersInsurance: true,
          needsAutoInsurance: false,
          needsStudentDiscounts: true,
        }
      };
    }
    
    // Real API implementation
    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update profile');
    }
    
    return response.json();
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
};

// Process OAuth callback
export const processOAuthCallback = async (token: string): Promise<UserProfile> => {
  try {
    // Store token
    localStorage.setItem('authToken', token);
    
    // Fetch user profile
    return await getUserProfile();
  } catch (error) {
    console.error('OAuth callback error:', error);
    throw error;
  }
}; 