
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { auth } from '../services/api';

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

          // --- ENHANCED LOGGING FOR USER OBJECT AFTER /auth/me ---
          console.log('AuthContext: User object from /auth/me:');
          console.log('  ID:', res.data.id);
          console.log('  Email:', res.data.email);
          console.log('  Role:', res.data.role);
          console.log('  Profile exists:', !!res.data.profile);
          if (res.data.profile) {
            console.log('  Profile ID:', res.data.profile.id);
            console.log('  Profile Name:', res.data.profile.name);
          }
          // --- END ENHANCED LOGGING ---

          setUser(res.data);
          setIsAuthenticated(true);
          console.log('AuthContext: User authenticated successfully via token.');
        } catch (error) {
          console.error('AuthContext: Token validation failed:', error);
          logout(true);
        }
      }
      setIsLoading(false);
      console.log('AuthContext: Loading complete. IsAuthenticated:', !!localStorage.getItem('token'));
    };

    loadUserFromToken();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      console.log('AuthContext: Attempting login...');
      const res = await auth.login({ email, password });
      const { token, ...userData } = res.data;

      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('AuthContext: Login successful. Token stored and header set.');

      // --- ENHANCED LOGGING FOR USER OBJECT AFTER LOGIN ---
      console.log('AuthContext: User object after successful login:');
      console.log('  ID:', userData.id);
      console.log('  Email:', userData.email);
      console.log('  Role:', userData.role);
     
      console.log('  Profile expected from /auth/me, not login endpoint directly.');
      // --- END ENHANCED LOGGING ---

      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);
      console.log('AuthContext: User state updated after login.');
      return true;
    } catch (error) {
      console.error('AuthContext: Login failed:', error);
      setIsLoading(false);
      throw new Error(error.userMessage || error.message || 'Login failed. Please check your credentials.');
    }
  };

  const logout = (forceClear = false) => {
    console.log('AuthContext: Logging out. Force clear:', forceClear);
    if (forceClear) {
      localStorage.clear();
      console.log('AuthContext: localStorage.clear() executed.');
    } else {
      localStorage.removeItem('token');
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