import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadUserFromToken = async () => {
      console.log('AuthContext: Attempting to load user from token...');
      const token = localStorage.getItem('token');
      console.log('AuthContext: Token found in localStorage:', token ? 'YES' : 'NO');

      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('AuthContext: Authorization header set for Axios.');
        try {
          const res = await api.get('/auth/me');
          console.log('AuthContext: /auth/me response:', res.data);
          setUser(res.data);
          setIsAuthenticated(true);
          console.log('AuthContext: User authenticated successfully via token.');
        } catch (error) {
          console.error('AuthContext: Token validation failed:', error);
          // If token validation fails, forcefully clear local storage and log out
          logout(true); // Pass true to indicate a forced logout
        }
      }
      setIsLoading(false);
      console.log('AuthContext: Loading complete. IsAuthenticated:', isAuthenticated);
    };

    loadUserFromToken();
  }, []); // Empty dependency array means this effect runs only once on mount

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      console.log('AuthContext: Attempting login...');
      const res = await api.post('/auth/login', { email, password });
      const { token, ...userData } = res.data;

      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('AuthContext: Login successful. Token stored and header set.');

      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);
      console.log('AuthContext: User state updated after login.');
      return true;
    } catch (error) {
      console.error('AuthContext: Login failed:', error);
      setIsLoading(false);
      throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  // Modified logout function to optionally clear all local storage
  const logout = (forceClear = false) => {
    console.log('AuthContext: Logging out. Force clear:', forceClear);
    if (forceClear) {
      localStorage.clear(); // Clear ALL items from local storage for this origin
      console.log('AuthContext: localStorage.clear() executed.');
    } else {
      localStorage.removeItem('token'); // Only remove the token
      console.log('AuthContext: token removed from localStorage.');
    }
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
    console.log('AuthContext: User state reset.');
  };

  const updateUser = (updatedUserData) => {
    console.log('AuthContext: Updating user data in context:', updatedUserData);
    setUser(prevUser => ({ ...prevUser, ...updatedUserData }));
  };

  const authContextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};