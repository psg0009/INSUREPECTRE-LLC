import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser, getUserProfile, updateUserProfile, LoginCredentials, RegisterData, UserProfile } from '../api/authService';

// Define types for our context
type AuthContextType = {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  refreshUserProfile: () => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<boolean>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  loading: true,
  refreshUserProfile: async () => {},
  updateProfile: async () => false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
          // Fetch user profile from API
          const userProfile = await getUserProfile();
          setUser(userProfile);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error validating token:', error);
          localStorage.removeItem('authToken');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Refresh user profile
  const refreshUserProfile = async (): Promise<void> => {
    if (!isAuthenticated) return;
    
    try {
      const userProfile = await getUserProfile();
      setUser(userProfile);
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      if ((error as Error).message.includes('authentication')) {
        logout();
      }
    }
  };

  // Login method
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { token, user } = await loginUser({ email, password });
      
      // Store token in localStorage
      localStorage.setItem('authToken', token);
      
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Register method
  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const { token, user } = await registerUser(userData);
      
      // Store token in localStorage
      localStorage.setItem('authToken', token);
      
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  // Update profile method
  const updateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    try {
      const updatedUser = await updateUserProfile(profileData);
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  // Logout method
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      register, 
      logout, 
      loading,
      refreshUserProfile,
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 